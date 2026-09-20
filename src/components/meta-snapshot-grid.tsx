import type { GameId, MetaSnapshot } from "@/data/types";
import { GAMES } from "@/lib/games";
import { formatDate } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { TierBadge } from "@/components/ui-bits";
import { FadeUp } from "@/components/motion";

export function MetaSnapshotGrid({ snapshots }: { snapshots: MetaSnapshot[] }) {
  const game = GAMES[snapshots[0]?.game ?? ("d4" satisfies GameId)];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {snapshots.map((s, i) => (
        <FadeUp key={s.id} delay={Math.min(i * 0.05, 0.25)}>
          <div className="panel panel-hover flex h-full flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[15px] font-semibold leading-tight text-ink">{s.buildName}</p>
                <p className="text-xs text-ink-dim">{s.className}</p>
              </div>
              {s.tier ? (
                <TierBadge tier={s.tier} size="sm" />
              ) : (
                <span className="inline-flex h-6 items-center rounded-md border border-(--accent-border) bg-(--accent-wash) px-2 text-[10px] font-bold tracking-widest text-(--accent-bright)">
                  NEW
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed text-ink-muted">{s.summary}</p>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
              {s.sources.map((src) => (
                <a
                  key={src.site}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-(--accent-border) bg-(--accent-wash) px-2.5 py-1 text-[11px] font-medium text-(--accent-bright) transition-colors hover:brightness-125"
                >
                  {src.label ?? `Open on ${src.site}`}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
            <p className="text-[11px] text-ink-dim">Synced {formatDate(s.fetchedAt)} · {game.metaLine}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}
