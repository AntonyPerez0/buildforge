import type { Metadata } from "next";
import Link from "next/link";
import { Flame, RefreshCw } from "lucide-react";
import { GAMES } from "@/lib/games";
import { getBuildsFor, getSnapshotsFor } from "@/lib/builds";
import { latestSyncDate } from "@/lib/snapshots";
import { formatDate } from "@/lib/utils";
import { BuildExplorer } from "@/components/build-explorer";
import { MetaSnapshotGrid } from "@/components/meta-snapshot-grid";
import { GuideIndexGrid } from "@/components/guide-index-grid";
import { FavoritesBar } from "@/components/favorites-bar";
import { FadeUp } from "@/components/motion";
import { SectionHeading } from "@/components/ui-bits";

export const metadata: Metadata = {
  title: "Diablo IV — Season 15 build paths",
  description:
    "Zero-guessing Diablo IV builds for Season 15: Hell's Legacy. Level-by-level skill paths, gear priorities and rotations for Barbarian, Sorcerer, Necromancer, Rogue and the S15 meta.",
};

export default function D4Page() {
  const game = GAMES.d4;
  const builds = getBuildsFor("d4");
  const snapshots = getSnapshotsFor("d4");

  return (
    <div data-game="d4" className="world-bg noise">
      {/* Hero band */}
      <section className="border-b border-line bg-[radial-gradient(90%_100%_at_50%_0%,rgba(212,32,46,0.16),transparent_70%)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <FadeUp>
            <div className="flex flex-wrap items-center gap-3">
              <span className="accent-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                <Flame className="h-3.5 w-3.5" />
                {game.statusChip}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-dim">
                <RefreshCw className="h-3 w-3" />
                {game.metaLine} · nightly sync {formatDate(latestSyncDate())}
              </span>
            </div>
            <h1 className="display-d4 mt-5 text-4xl font-bold tracking-wide text-ink sm:text-6xl">
              DIABLO IV
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
              {game.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Authored builds */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <FadeUp>
          <SectionHeading
            eyebrow="Core collection"
            title="Level-by-level build paths"
            sub="Hand-authored, anchored to patch-stable mechanics, with every skill point accounted for from level 1 to the Pit."
          />
        </FadeUp>
        <div className="mt-10">
          <FavoritesBar builds={builds} />
          <BuildExplorer builds={builds} />
        </div>
      </section>

      {/* Live meta snapshots */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <FadeUp>
          <SectionHeading
            eyebrow="Live meta"
            title="Season 15 snapshot"
            sub="Condensed straight from Maxroll and Icy Veins. These cards are pointers — open the full guide for the complete tree, gear table and tuning notes."
          />
        </FadeUp>
        <div className="mt-10">
          <MetaSnapshotGrid snapshots={snapshots.filter((s) => s.tier)} />
        </div>
        <FadeUp className="mt-6">
          <p className="text-xs leading-relaxed text-ink-dim">
            Want the full level-by-level path for a snapshot build? Pick the closest authored
            build above, fork it in the{" "}
            <Link href="/builder" className="text-(--accent-bright) hover:underline">
              Builder
            </Link>
            , and adjust from the linked guide — seasonal tuning shifts weekly in the first
            month.
          </p>
        </FadeUp>

        <FadeUp className="mt-16">
          <SectionHeading
            eyebrow="Synced nightly"
            title="Live guide index"
            sub="Every guide the nightly pipeline finds on Maxroll and Icy Veins — refreshed once a day, linked with attribution. Tier ratings land here after human curation."
          />
        </FadeUp>
        <div className="mt-10">
          <GuideIndexGrid snapshots={snapshots.filter((s) => !s.tier)} />
        </div>
      </section>
    </div>
  );
}
