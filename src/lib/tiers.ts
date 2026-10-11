import type { Build, GameId, MetaSnapshot, SourceRef, SourceTier, Tier, TierAssignment, TierListMeta } from "@/data/types";
import { TIER_ASSIGNMENTS, TIER_LISTS } from "@/lib/snapshots";

/**
 * Tier resolution. Every tier shown on the site comes from a Maxroll or Icy
 * Veins tier list (curated-meta.json, refreshed by the nightly sync). Builds
 * and guides are matched to placements by guide URL first, then by build
 * name — "Twisting Blades Rogue" matches Maxroll's "Poison Twisting Blades Rogue".
 */

export const TIER_ORDER: Tier[] = ["S", "A", "B", "C", "D"];

/** Display order: endgame before leveling, Maxroll before Icy Veins. */
const LIST_PRIORITY = ["maxroll-d4-endgame", "icyveins-d4-endgame", "maxroll-d4-leveling", "icyveins-d4-leveling"];
const listRank = (id: string) => {
  const i = LIST_PRIORITY.indexOf(id);
  return i === -1 ? LIST_PRIORITY.length : i;
};

const LISTS_BY_ID = new Map(TIER_LISTS.map((l) => [l.id, l]));

const normalizeName = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

export function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    return `${u.origin.toLowerCase()}${u.pathname.replace(/\/+$/, "").toLowerCase()}`;
  } catch {
    return url.replace(/[?#].*$/, "").replace(/\/+$/, "").toLowerCase();
  }
}

/** Same build on two lists? Exact name, or one name containing the other (≥ 10 chars). */
export function sameBuild(a: string, b: string): boolean {
  const na = normalizeName(a);
  const nb = normalizeName(b);
  if (na === nb) return true;
  if (na.length < 10 || nb.length < 10) return false;
  return na.includes(nb) || nb.includes(na);
}

export function tierListsFor(game: GameId): TierListMeta[] {
  return TIER_LISTS.filter((l) => l.game === game).sort((a, b) => listRank(a.id) - listRank(b.id));
}

export function getTierList(id: string): TierListMeta | undefined {
  return LISTS_BY_ID.get(id);
}

export function assignmentsFor(listId: string): TierAssignment[] {
  return TIER_ASSIGNMENTS.filter((a) => a.list === listId);
}

function toSourceTier(a: TierAssignment): SourceTier | null {
  const list = LISTS_BY_ID.get(a.list);
  if (!list) return null;
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

/** All placements for a build/guide, one per tier list, best list first. */
export function resolveTiers(game: GameId, name: string, sources: Pick<SourceRef, "url">[] = []): SourceTier[] {
  const urls = new Set(sources.map((s) => normalizeUrl(s.url)));
  const byList = new Map<string, SourceTier>();
  for (const a of TIER_ASSIGNMENTS) {
    const list = LISTS_BY_ID.get(a.list);
    if (!list || list.game !== game || byList.has(a.list)) continue;
    const urlHit = a.url ? urls.has(normalizeUrl(a.url)) : false;
    if (!urlHit && !sameBuild(a.build, name)) continue;
    const st = toSourceTier(a);
    if (st) byList.set(a.list, st);
  }
  return [...byList.values()].sort((x, y) => listRank(x.listId) - listRank(y.listId));
}

export function buildTiers(build: Pick<Build, "game" | "name" | "sources">): SourceTier[] {
  return resolveTiers(build.game, build.name, build.sources);
}

export function snapshotTiers(snap: Pick<MetaSnapshot, "game" | "buildName" | "sources">): SourceTier[] {
  return resolveTiers(snap.game, snap.buildName, snap.sources);
}

export interface HeadlineTier {
  tier: Tier;
  /** Where the letter comes from — "Maxroll Endgame", "Icy Veins Endgame" or "BuildForge rating". */
  basis: string;
  fromSource: boolean;
}

/** The single letter to lead with: the best source placement, else the build's own rating. */
export function headlineTier(build: Pick<Build, "game" | "name" | "sources" | "tier">): HeadlineTier {
  const [best] = buildTiers(build);
  if (best) return { tier: best.tier, basis: `${best.site} ${best.list}`, fromSource: true };
  return { tier: build.tier, basis: "BuildForge rating", fromSource: false };
}

/** Group a tier list's rows S → D, preserving source order inside each tier. */
export function groupByTier(rows: TierAssignment[]): { tier: Tier; rows: TierAssignment[] }[] {
  return TIER_ORDER.map((tier) => ({ tier, rows: rows.filter((r) => r.tier === tier) })).filter(
    (g) => g.rows.length > 0,
  );
}
