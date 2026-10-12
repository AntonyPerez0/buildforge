import type { Metadata } from "next";
import Link from "next/link";
import { GAMES } from "@/lib/games";
import { BUILDS, buildHref, getBuildsFor, getSnapshotsFor } from "@/lib/builds";
import { latestSyncDate } from "@/lib/snapshots";
import { assignmentsFor, groupByTier, normalizeUrl, resolveTiers, sameBuild, tierListsFor } from "@/lib/tiers";
import { ogImage } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { BuildExplorer } from "@/components/build-explorer";
import { TierListBoard, type BoardList } from "@/components/tier-list-board";
import { GuideIndexGrid, type GuideIndexEntry } from "@/components/guide-index-grid";
import { FavoritesBar } from "@/components/favorites-bar";
import { FadeUp } from "@/components/motion";
import { D4Ornament, SectionHeading } from "@/components/ui-bits";

export const metadata: Metadata = {
  title: "Diablo IV — Season 15 build paths & tier list",
  description:
    "Zero-guessing Diablo IV builds for Season 15: Hell's Legacy (patch 3.2). Level-by-level skill paths, gear priorities and rotations, with tiers from the Maxroll and Icy Veins Season 15 tier lists.",
  openGraph: {
    title: "BuildForge — Diablo IV build paths",
    images: [ogImage("d4", "hub")],
  },
  twitter: { card: "summary_large_image", images: [ogImage("d4", "hub")] },
};

const MENU = [
  { href: "#builds", label: "Build paths", hint: "Level-by-level" },
  { href: "#tier-list", label: "Season 15 tier list", hint: "Maxroll · Icy Veins" },
  { href: "#guides", label: "Live guide index", hint: "Synced nightly" },
];

function boardLists(): BoardList[] {
  const authored = getBuildsFor("d4");
  return tierListsFor("d4")
    .map((meta) => {
      const rows = assignmentsFor(meta.id);
      const groups = groupByTier(rows).map((g) => ({
        tier: g.tier,
        rows: g.rows.map((r) => {
          const path = authored.find(
            (b) =>
              sameBuild(b.name, r.build) ||
              (r.url !== null && b.sources.some((s) => normalizeUrl(s.url) === normalizeUrl(r.url!))),
          );
          const elsewhere = resolveTiers("d4", r.build, r.url ? [{ url: r.url }] : [])
            .filter((t) => t.listId !== meta.id)
            .map((t) => ({ label: `${t.site}${t.list === meta.list ? "" : ` ${t.list}`}`, tier: t.tier }));
          return {
            build: r.build,
            className: r.className,
            href: r.url ?? meta.url,
            external: true,
            pathHref: path ? buildHref(path) : undefined,
            elsewhere,
          };
        }),
      }));
      return { meta, groups, total: rows.length };
    })
    .filter((l) => l.total > 0);
}

function guideEntries(): GuideIndexEntry[] {
  return getSnapshotsFor("d4").map((s) => {
    const [best] = resolveTiers("d4", s.buildName, s.sources);
    return {
      id: s.id,
      name: s.buildName,
      className: s.className,
      sources: s.sources.map(({ site, url }) => ({ site, url })),
      tier: best ? { tier: best.tier, label: `${best.site} ${best.list} · ${best.tier}` } : undefined,
    };
  });
}

export default function D4Page() {
  const game = GAMES.d4;
  const builds = getBuildsFor("d4");
  const lists = boardLists();
  const guides = guideEntries();
  const sTier = lists[0]?.groups.find((g) => g.tier === "S")?.rows.length ?? 0;

  return (
    <div data-game="d4" className="world-bg noise">
      {/* ─── Season splash ──────────────────────────────────── */}
      <section className="d4-hero">
        <div className="d4-embers" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 pb-14 text-center sm:px-6 sm:pt-24 sm:pb-20">
          <FadeUp className="flex flex-col items-center">
            <p className="d4-season">Season 15 · Season of Hell&apos;s Legacy</p>
            <h1 className="d4-title mt-5 text-5xl sm:text-7xl">Diablo IV</h1>
            <D4Ornament className="mt-6" />
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">{game.description}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              <span className="d4-stat">
                <b>Patch 3.2</b> · Lord of Hatred
              </span>
              <span className="d4-stat">
                <b>{builds.length}</b> build paths
              </span>
              <span className="d4-stat">
                <b>{sTier}</b> S-tier builds on Maxroll
              </span>
              <span className="d4-stat">
                Synced <b>{formatDate(latestSyncDate())}</b>
              </span>
            </div>
          </FadeUp>

          <FadeUp className="mt-10 w-full max-w-md" delay={0.1}>
            <nav aria-label="Diablo IV menu" className="flex flex-col gap-2">
              {MENU.map((m) => (
                <a key={m.href} href={m.href} className="d4-menu-btn">
                  {m.label}
                  <small>{m.hint}</small>
                </a>
              ))}
            </nav>
          </FadeUp>
        </div>
      </section>

      {/* ─── Build paths ────────────────────────────────────── */}
      <section id="builds" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20">
        <FadeUp>
          <SectionHeading
            eyebrow="Core collection"
            title="Level-by-level build paths"
            sub="Hand-authored and anchored to patch-stable mechanics — every skill point accounted for from level 1 to the Pit. Each card shows where the build sits on the Maxroll and Icy Veins Season 15 lists."
          />
        </FadeUp>
        <div className="mt-10">
          <FavoritesBar builds={builds} />
          <BuildExplorer builds={builds} />
        </div>
      </section>

      {/* ─── Tier list ──────────────────────────────────────── */}
      <section id="tier-list" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-14 sm:px-6 sm:pb-20">
        <FadeUp>
          <SectionHeading
            eyebrow="Live meta"
            title="Season 15 tier list"
            sub="Straight from the Maxroll and Icy Veins tier lists — re-read every night, with a human-verified fallback. Entries marked Path have a full BuildForge level path."
          />
        </FadeUp>
        <FadeUp className="mt-10">
          <TierListBoard lists={lists} />
        </FadeUp>
        <FadeUp className="mt-5">
          <p className="text-xs leading-relaxed text-ink-dim">
            Want a level path for a build without one? Fork the closest authored build in the{" "}
            <Link href="/builder" className="text-(--accent-bright) hover:underline">
              Builder
            </Link>{" "}
            and adjust it from the linked guide. Tiers move with every balance patch — the{" "}
            <Link href="/sync" className="text-(--accent-bright) hover:underline">
              sync report
            </Link>{" "}
            shows when each list was last read.
          </p>
        </FadeUp>
      </section>

      {/* ─── Guide index ────────────────────────────────────── */}
      <section id="guides" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28">
        <FadeUp>
          <SectionHeading
            eyebrow="Synced nightly"
            title="Live guide index"
            sub={`Every Diablo IV guide the nightly sync found on Maxroll and Icy Veins — ${guides.length} links, grouped by class, with its tier where a list we mirror ranks that exact guide.`}
          />
        </FadeUp>
        <div className="mt-10">
          <GuideIndexGrid entries={guides} classOrder={game.classOrder} />
        </div>
        <p className="sr-only">{BUILDS.length} builds in total across both games.</p>
      </section>
    </div>
  );
}
