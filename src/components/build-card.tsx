import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Build } from "@/data/types";
import { buildHref } from "@/lib/builds";
import { cn, formatDate } from "@/lib/utils";
import { DifficultyDots, TierBadge } from "@/components/ui-bits";
import { GAMES } from "@/lib/games";

export function BuildCard({ build, className }: { build: Build; className?: string }) {
  const game = GAMES[build.game];
  return (
    <Link
      href={buildHref(build)}
      className={cn(
        "panel panel-hover group flex h-full flex-col gap-4 p-5",
        className,
      )}
    >
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
        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-dim transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent-bright)" />
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
        </div>
      </div>
    </Link>
  );
}

export function BuildCardMeta({ build }: { build: Build }) {
  return (
    <p className="text-[11px] text-ink-dim">
      Updated {formatDate(build.lastSynced)} · {build.patchLabel}
    </p>
  );
}
