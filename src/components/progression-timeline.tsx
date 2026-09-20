import { Milestone } from "lucide-react";
import type { ProgressionBand } from "@/data/types";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion";

/**
 * The zero-guessing centerpiece: a level-by-level path where every band
 * states exactly what to take and why.
 */
export function ProgressionTimeline({ bands }: { bands: ProgressionBand[] }) {
  return (
    <ol className="relative space-y-0">
      {bands.map((band, i) => (
        <FadeUp key={`${band.levels}-${i}`} delay={Math.min(i * 0.04, 0.2)}>
          <li className="relative grid gap-4 pb-10 sm:grid-cols-[110px_1fr] sm:gap-8">
            {/* Level marker column */}
            <div className="relative flex items-center gap-3 sm:contents">
              <div className="flex items-center gap-3 sm:sticky sm:top-20 sm:self-start">
                <span
                  className={cn(
                    "grid place-items-center rounded-full border bg-surface px-0 font-mono text-[13px] font-semibold",
                    "h-10 w-10 shrink-0 border-(--accent-border) text-(--accent-bright)",
                    "shadow-[0_0_24px_-6px_var(--accent-glow)]",
                  )}
                >
                  {band.levels.includes("–") ? band.levels.split("–")[0] : band.levels.replace("+", "")}
                </span>
              </div>
              {/* Rail segment */}
              <span
                aria-hidden
                className="timeline-rail absolute top-14 bottom-0 left-[19px] w-px sm:top-6 sm:h-[calc(100%-1rem)]"
              />
            </div>

            {/* Content */}
            <div className="relative min-w-0 pl-14 sm:pl-0">
              <div className="panel p-4 sm:p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-sm font-semibold tracking-wide text-(--accent-bright)">
                    Levels {band.levels}
                  </h4>
                  <p className="text-xs text-ink-dim">{band.goal}</p>
                </div>

                <ul className="mt-4 space-y-3">
                  {band.steps.map((step, j) => (
                    <li key={`${step.name}-${j}`} className="rounded-lg border border-line/70 bg-surface-raised/60 p-3">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-sm font-semibold text-ink">{step.name}</span>
                        {step.detail ? (
                          <span className="rounded border border-(--accent-border) bg-(--accent-wash) px-1.5 py-0.5 text-[11px] font-medium text-(--accent-bright)">
                            {step.detail}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{step.why}</p>
                    </li>
                  ))}
                </ul>

                {band.milestone ? (
                  <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-(--accent-border) bg-(--accent-wash) p-3">
                    <Milestone className="mt-0.5 h-4 w-4 shrink-0 text-(--accent-bright)" />
                    <p className="text-[13px] leading-relaxed text-ink">{band.milestone}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        </FadeUp>
      ))}
    </ol>
  );
}
