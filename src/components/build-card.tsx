import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Build } from "@/data/types";
import { buildHref } from "@/lib/builds";
import { buildTiers, headlineTier } from "@/lib/tiers";
import { cn, formatDate } from "@/lib/utils";
import { DifficultyDots, TierBadge } from "@/components/ui-bits";
import { FavoriteStar } from "@/components/favorite-star";
import { GAMES } from "@/lib/games";
import { classColor } from "@/lib/class-colors";

/**
 * A build in its own game's skin — carries data-game, so it renders as a D4
 * menu card or a WoW frame wherever it's placed (including the neutral home page).
 */
export function BuildCard({ build, className }: { build: Build; className?: string }) {
  const game = GAMES[build.game];
  const headline = headlineTier(build);
  const tiers = buildTiers(build);
  const isD4 = build.game === "d4";
  return (
    <div data-game={build.game} className={cn("group relative h-full", className)}>
      <Link href={buildHref(build)} className="panel panel-hover flex h-full flex-col gap-4 p-5">
        <div className="relative flex items-start gap-3 pr-8">
          <TierBadge tier={headline.tier} />
          <div className="min-w-0">
            <p className={cn("leading-tight text-ink", isD4 ? "display-d4 text-[15px] font-bold" : "display-forever text-base text-[#ffd100] [text-shadow:1px_1px_0_#000]")}>
              {build.name}
            </p>
            <p className="mt-1 text-xs text-ink-dim">
              <span style={isD4 ? undefined : { color: classColor(build.className) }}>{build.className}</span> · {build.role}
            </p>
          </div>
        </div>

        <p className="relative line-clamp-2 text-sm leading-relaxed text-ink-muted">{build.tagline}</p>

        <div className="relative mt-auto space-y-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {tiers.length > 0 ? (
              tiers.slice(0, 2).map((t) => (
                <span key={t.listId} className="src-tier" data-tier={t.tier}>
                  <span className="src-tier-site">
                    {t.site} {t.list}
                  </span>
                  <span className="src-tier-letter">{t.tier}</span>
                </span>
              ))
            ) : (
              <span
                className="src-tier"
                data-tier="none"
                title={isD4 ? "Not on the Maxroll or Icy Veins Season 15 lists" : "Not ranked by an Icy Veins Forever list"}
              >
                <span className="src-tier-site">{isD4 ? "Unranked · BuildForge rating" : "BuildForge rating"}</span>
                <span className="src-tier-letter">{headline.tier}</span>
              </span>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 text-xs text-ink-dim">
            <span className="inline-flex items-center gap-1.5">
              Difficulty <DifficultyDots level={build.difficulty} />
            </span>
            <span>{build.progression.length} level bands</span>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-line/70 pt-3 text-[11px] text-ink-dim">
            <span>
              {game.shortLabel} · {build.patchLabel}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent-bright)" />
          </div>
        </div>
      </Link>
      <FavoriteStar buildId={build.id} className="absolute top-3 right-3" />
    </div>
  );
}

export function BuildCardMeta({ build }: { build: Build }) {
  return (
    <p className="text-[11px] text-ink-dim">
      Updated {formatDate(build.lastSynced)} · {build.patchLabel}
    </p>
  );
}
