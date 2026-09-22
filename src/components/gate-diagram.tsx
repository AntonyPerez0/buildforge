"use client";

import { Milestone } from "lucide-react";
import type { Build } from "@/data/types";
import { cn } from "@/lib/utils";
import { FOREVER_IN_BETA, FOREVER_LAUNCH_LEVEL_CAP, FOREVER_LEVEL_CAP } from "@/lib/forever";

interface SpineNode {
  levels: string;
  startLevel: number;
  points: number;
  milestone?: string;
}

function parseStart(levels: string): number {
  const m = levels.match(/\d+/);
  return m ? Number(m[0]) : NaN;
}

/**
 * The talent spine: cumulative main-tree points per level band, with the
 * classic gates marked. Derived from the build's own progression — level 10
 * starts talent points, one per level, so points at level N = N - 9 while the
 * build stays committed to its main tree (through the 31-point gate).
 */
export function GateDiagram({ build }: { build: Build }) {
  const bands = build.progression
    .map((band) => ({ band, start: parseStart(band.levels) }))
    .filter(({ start }) => Number.isFinite(start) && start >= 10 && start <= 44)
    .map(({ band, start }) => ({
      levels: band.levels,
      startLevel: start,
      points: Math.max(0, start - 9),
      milestone: band.milestone,
    })) as SpineNode[];

  if (bands.length === 0) return null;
  const gates = build.specGates ?? [];

  function gateLabel(level: number): string | null {
    const points = level - 9;
    const match = gates.find((g) => Number(g.gate) === points);
    if (match) return match.label;
    return null;
  }

  return (
    <div className="panel p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-wide text-(--accent-bright) uppercase">
          Talent spine
        </h3>
        <p className="text-xs text-ink-dim">
          Main-tree points by level — computed: points start at level 10, one per level
        </p>
      </div>

      <ol className="mt-4 space-y-0">
        {bands.map((node, i) => {
          const gate = gateLabel(node.startLevel);
          return (
            <li key={node.levels} className="relative flex gap-4 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "grid place-items-center rounded-full border font-mono text-[12px] font-bold",
                    gate
                      ? "h-9 w-9 border-(--accent-bright) bg-(--accent-wash) text-(--accent-bright) shadow-[0_0_20px_-4px_var(--accent-glow)]"
                      : "h-7 w-7 border-line bg-surface text-ink-dim",
                  )}
                >
                  {node.points}
                </span>
                {i < bands.length - 1 ? (
                  <span aria-hidden className="timeline-rail w-px flex-1" />
                ) : null}
              </div>
              <div className={cn("min-w-0 pb-1", gate && "pt-0.5")}>
                <p className="text-[13px] font-semibold text-ink">
                  Levels {node.levels}
                  <span className="ml-2 font-normal text-ink-dim">{node.points} points</span>
                </p>
                {gate ? (
                  <p className="mt-1 flex items-start gap-2 rounded-lg border border-(--accent-border) bg-(--accent-wash) px-2.5 py-1.5 text-[12px] leading-relaxed text-ink">
                    <Milestone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-(--accent-bright)" />
                    <span>
                      <span className="font-bold text-(--accent-bright)">{node.points}-point gate:</span>{" "}
                      {gate}
                    </span>
                  </p>
                ) : null}
                {!gate && node.milestone ? (
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-dim">{node.milestone}</p>
                ) : null}
              </div>
            </li>
          );
        })}
        {FOREVER_IN_BETA ? (
          <li className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-dashed border-line-bright bg-surface font-mono text-[12px] font-bold text-ink-dim">
                {FOREVER_LAUNCH_LEVEL_CAP}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-ink">
                Level {FOREVER_LEVEL_CAP} · beta cap
                <span className="ml-2 font-normal text-ink-dim">
                  spine resumes to 60 at launch
                </span>
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-dim">
                The beta stops here — secondary-tree points, the 31-point gate and the
                51-point finish return when the full game launches on Nov 4.
              </p>
            </div>
          </li>
        ) : (
          <li className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-line bg-surface font-mono text-[12px] font-bold text-ink-dim">
                51
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-ink">
                Level 60<span className="ml-2 font-normal text-ink-dim">51 points · finalize the split</span>
              </p>
              <p className="mt-1 text-[12px] text-ink-dim">
                After the 31-point gate, points spill into your secondary tree — verify the
                beta-tuned split in the linked calculator.
              </p>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}
