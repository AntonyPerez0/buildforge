import type { Build, GameId, MetaSnapshot, SourceRef, SourceTier, Tier, TierAssignment, TierListMeta } from "@/data/types";
import { TIER_ASSIGNMENTS, TIER_LISTS } from "@/lib/snapshots";

/**
 * Tier resolution. Every tier letter shown for a list comes from a Maxroll or
 * Icy Veins tier list (curated-meta.json, refreshed by the nightly sync).
 *
 * Builds and guides are matched to a list's rows by guide URL first. A row
 * matches by build name only when the names are the same build (exact, after
 * dropping "guide"/"build" filler) and the URLs can't settle it — so "Cold
 * Penetrating Shot Rogue" never inherits "Penetrating Shot Rogue"'s tier.
 */

export const TIER_ORDER: Tier[] = ["S", "A", "B", "C", "D"];

/** Display order: endgame before leveling, Maxroll before Icy Veins. */
const LIST_PRIORITY = ["maxroll-d4-endgame", "icyveins-d4-endgame", "maxroll-d4-leveling", "icyveins-d4-leveling"];
const listRank = (id: string) => {
  const i = LIST_PRIORITY.indexOf(id);
  return i === -1 ? LIST_PRIORITY.length : i;
};

const SITE_HOSTS: Record<TierListMeta["site"], string> = {
  Maxroll: "maxroll.gg",
  "Icy Veins": "icy-veins.com",
};

export function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    return `${u.origin.toLowerCase()}${u.pathname.replace(/\/+$/, "").toLowerCase()}`;
  } catch {
    return url.replace(/[?#].*$/, "").replace(/\/+$/, "").toLowerCase();
  }
}

/** Build-name key: lowercase alphanumerics, trailing "guide"/"build" filler dropped. */
export function buildKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\((?:forever)\)/g, "")
    .replace(/\b(?:build\s+guide|guide|build)\s*$/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

/** Same build on two lists? Exact name match after normalization — variants ("Poison …", "Cold …") are different builds. */
export function sameBuild(a: string, b: string): boolean {
  const ka = buildKey(a);
  return ka.length > 0 && ka === buildKey(b);
}

function onSite(url: string, site: TierListMeta["site"]): boolean {
  try {
    return new URL(url).hostname.endsWith(SITE_HOSTS[site]);
  } catch {
    return false;
  }
}

/** Tier-list and hub pages are where a build is ranked, not the build's own guide. */
function isTierListUrl(url: string): boolean {
  try {
    return /tier-?lists?\b|tierlists|tier-list-hub/i.test(new URL(url).pathname);
  } catch {
    return false;
  }
}

/** Leveling lists name builds plainly ("Barrage Rogue") while their guides say "… Leveling". */
const levelingKey = (name: string) => buildKey(name).replace(/leveling$/, "");

export interface TierResolver {
  tierListsFor(game: GameId): TierListMeta[];
  getTierList(id: string): TierListMeta | undefined;
  assignmentsFor(listId: string): TierAssignment[];
  /** `name` may list several titles for the same build (e.g. its title on each site). */
  resolveTiers(game: GameId, name: string | string[], sources?: Pick<SourceRef, "url">[]): SourceTier[];
}

/** Build a resolver over any tier data — the site uses the synced data, tests use fixtures. */
export function createTierResolver(lists: TierListMeta[], assignments: TierAssignment[]): TierResolver {
  const byId = new Map(lists.map((l) => [l.id, l]));

  function toSourceTier(a: TierAssignment, list: TierListMeta): SourceTier {
    return {
      listId: list.id,
      site: list.site,
      list: list.list,
      tier: a.tier,
      listUrl: list.url,
      guideUrl: a.url,
      checkedAt: list.checkedAt,
      auto: Boolean(a.auto),
    };
  }

  return {
    tierListsFor: (game) => lists.filter((l) => l.game === game).sort((a, b) => listRank(a.id) - listRank(b.id)),
    getTierList: (id) => byId.get(id),
    assignmentsFor: (listId) => assignments.filter((a) => a.list === listId),
    resolveTiers(game, name, sources = []) {
      const names = Array.isArray(name) ? name : [name];
      const out: SourceTier[] = [];
      for (const list of lists) {
        if (list.game !== game) continue;
        const rows = assignments.filter((a) => a.list === list.id);
        // The build's own guide links on this site (a tier-list page it cites doesn't count).
        const ownUrls = sources.map((s) => s.url).filter((u) => onSite(u, list.site) && !isTierListUrl(u));
        const ownKeys = new Set(ownUrls.map(normalizeUrl));
        const key = list.list === "Leveling" ? levelingKey : buildKey;
        const nameKeys = new Set(names.map(key).filter(Boolean));

        // Pass 1: the guide's own link on this site is on the list.
        let hit = rows.find((r) => r.url !== null && ownKeys.has(normalizeUrl(r.url)));
        // Pass 2: same build by name — unless both sides carry a guide link on
        // this site and the links differ (then they're different guides).
        if (!hit) {
          hit = rows.find((r) => nameKeys.has(key(r.build)) && !(r.url !== null && ownUrls.length > 0));
        }
        if (hit) out.push(toSourceTier(hit, list));
      }
      return out.sort((x, y) => listRank(x.listId) - listRank(y.listId));
    },
  };
}

const resolver = createTierResolver(TIER_LISTS, TIER_ASSIGNMENTS);

export const tierListsFor = resolver.tierListsFor;
export const getTierList = resolver.getTierList;
export const assignmentsFor = resolver.assignmentsFor;
export const resolveTiers = resolver.resolveTiers;

export function buildTiers(build: Pick<Build, "game" | "name" | "sources">, r: TierResolver = resolver): SourceTier[] {
  return r.resolveTiers(build.game, build.name, build.sources);
}

export function snapshotTiers(
  snap: Pick<MetaSnapshot, "game" | "buildName" | "sources">,
  r: TierResolver = resolver,
): SourceTier[] {
  return r.resolveTiers(snap.game, snap.buildName, snap.sources);
}

export interface HeadlineTier {
  tier: Tier;
  /** Where the letter comes from — "Maxroll Endgame", "Icy Veins Endgame" or "BuildForge rating". */
  basis: string;
  fromSource: boolean;
}

/** The single letter to lead with: the best source placement, else the build's own (labelled) rating. */
export function headlineTier(
  build: Pick<Build, "game" | "name" | "sources" | "tier">,
  r: TierResolver = resolver,
): HeadlineTier {
  const [best] = buildTiers(build, r);
  if (best) return { tier: best.tier, basis: `${best.site} ${best.list}`, fromSource: true };
  return { tier: build.tier, basis: "BuildForge rating", fromSource: false };
}

/** Group a tier list's rows S → D, preserving source order inside each tier. */
export function groupByTier(rows: TierAssignment[]): { tier: Tier; rows: TierAssignment[] }[] {
  return TIER_ORDER.map((tier) => ({ tier, rows: rows.filter((r) => r.tier === tier) })).filter(
    (g) => g.rows.length > 0,
  );
}
