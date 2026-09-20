import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Build } from "@/data/types";
import { buildHref } from "@/lib/builds";
import { cn, formatDate } from "@/lib/utils";
import { DifficultyDots, TierBadge } from "@/components/ui-bits";
import { FavoriteStar } from "@/components/favorite-star";
import { GAMES } from "@/lib/games";

export function BuildCard({ build, className }: { build: Build; className?: string }) {
  const game = GAMES[build.game];
  return (
    <div className={cn("group relative", className)}>
      <Link href={buildHref(build)} className={cn("panel panel-hover flex h-full flex-col gap-4 p-5")}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <TierBadge tier={build.tier} />
            <div>
              <p className="text-[15px] font-semibold leading-tight text-ink">{build.name}</p>
              <p className="text-xs text-ink-dim">
                {build.className} · {build.role}
              </p>
            </div>
          </div>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-muted">{build.tagline}</p>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between gap-2 text-xs text-ink-dim">
            <span className="inline-flex items-center gap-1.5">
              Difficulty <DifficultyDots level={build.difficulty} />
            </span>
            <span>{build.progression.length} level bands</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className={cn("rounded px-1.5 py-0.5 font-semibold", game.id === "d4" ? "bg-d4/10 text-d4-bright" : "bg-forever/10 text-forever-bright")}>
              {game.shortLabel}
            </span>
            <span className="rounded border border-line px-1.5 py-0.5 text-ink-dim">{build.patchLabel}</span>
            <span className="rounded border border-line px-1.5 py-0.5 text-ink-dim">
              {build.sources.map((s) => s.site).slice(0, 2).join(" · ")}
            </span>
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-ink-dim transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent-bright)" />
          </div>
        </div>
      </Link>
      <FavoriteStar buildId={build.id} className="absolute top-2.5 right-2.5" />
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
