"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, CircleDot, Milestone, RotateCcw } from "lucide-react";
import type { ProgressionBand } from "@/data/types";
import {
  bandProgress,
  currentBandIndex,
  loadProgress,
  saveProgress,
  stepId,
  toggleStep,
  toggleWholeBand,
} from "@/lib/progress";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion";

/**
 * The zero-guessing centerpiece, made interactive: check steps off as you
 * complete them, with a "you are here" marker and a running progress count.
 */
export function ProgressionTimeline({ buildId, bands }: { buildId: string; bands: ProgressionBand[] }) {
  const [checked, setChecked] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setChecked(loadProgress(buildId));
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(t);
  }, [buildId]);

  function update(next: string[]) {
    setChecked(next);
    saveProgress(buildId, next);
  }

  const totalSteps = useMemo(() => bands.reduce((n, b) => n + b.steps.length, 0), [bands]);
  const doneSteps = useMemo(
    () =>
      bands.reduce(
        (n, band, b) => n + bandProgress(checked, buildId, b, band).done,
        0,
      ),
    [bands, checked, buildId],
  );
  const here = loaded ? currentBandIndex(checked, buildId, bands) : -1;
  const anyChecked = doneSteps > 0;

  return (
    <div>
      <FadeUp>
        <div className="panel mb-8 flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-(--accent-border) bg-(--accent-wash) font-mono text-[13px] font-bold text-(--accent-bright)">
              {doneSteps}/{totalSteps}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Your progress</p>
              <p className="text-xs text-ink-dim">
                {here >= 0
                  ? `You are here: Levels ${bands[here].levels}`
                  : anyChecked
                    ? "Path complete — Azeroth thanks you."
                    : "Check steps off as you complete them"}
              </p>
            </div>
          </div>
          {anyChecked ? (
            <button
              type="button"
              onClick={() => update([])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-dim transition-colors hover:border-d4/40 hover:text-d4-bright"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          ) : null}
        </div>
      </FadeUp>

      <ol className="relative space-y-0">
        {bands.map((band, b) => {
          const { done, total } = bandProgress(checked, buildId, b, band);
          const bandDone = done === total && total > 0;
          const isHere = here === b;
          return (
            <FadeUp key={`${band.levels}-${b}`} delay={Math.min(b * 0.04, 0.2)}>
              <li className="relative grid gap-4 pb-10 sm:grid-cols-[110px_1fr] sm:gap-8">
                <div className="relative flex items-center gap-3 sm:contents">
                  <div className="flex items-center gap-3 sm:sticky sm:top-20 sm:self-start">
                    <span
                      className={cn(
                        "grid place-items-center rounded-full border bg-surface px-0 font-mono text-[13px] font-semibold",
                        "h-10 w-10 shrink-0",
                        isHere
                          ? "border-(--accent-bright) text-(--accent-bright) shadow-[0_0_28px_-4px_var(--accent-glow)]"
                          : "border-(--accent-border) text-(--accent-bright)",
                        bandDone && "opacity-50",
                      )}
                    >
                      {band.levels.includes("–") ? band.levels.split("–")[0] : band.levels.replace("+", "")}
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="timeline-rail absolute top-14 bottom-0 left-[19px] w-px sm:top-6 sm:h-[calc(100%-1rem)]"
                  />
                </div>

                <div className="relative min-w-0 pl-14 sm:pl-0">
                  <div
                    className={cn(
                      "panel p-4 sm:p-5",
                      isHere && "border-(--accent-bright)/60 shadow-[0_0_0_1px_var(--accent-wash),0_18px_50px_-20px_var(--accent-glow)]",
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4
                          className={cn(
                            "text-sm font-semibold tracking-wide",
                            isHere ? "text-(--accent-bright)" : "text-(--accent-bright)",
                            bandDone && "opacity-60",
                          )}
                        >
                          Levels {band.levels}
                        </h4>
                        {isHere ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-(--accent-border) bg-(--accent-wash) px-2 py-0.5 text-[10px] font-bold tracking-widest text-(--accent-bright) uppercase">
                            <CircleDot className="h-3 w-3" /> You are here
                          </span>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-ink-dim">
                          {done}/{total}
                        </span>
                        <button
                          type="button"
                          onClick={() => update(toggleWholeBand(checked, buildId, b, band))}
                          className="rounded border border-line px-2 py-0.5 text-[10px] font-medium text-ink-dim transition-colors hover:border-(--accent-border) hover:text-(--accent-bright)"
                          aria-label={`Mark all steps in levels ${band.levels} as ${bandDone ? "undone" : "done"}`}
                        >
                          {bandDone ? "Uncheck" : "All done"}
                        </button>
                        <p className="hidden text-xs text-ink-dim sm:block">{band.goal}</p>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2.5">
                      {band.steps.map((step, s) => {
                        const id = stepId(buildId, b, s);
                        const isDone = checked.includes(id);
                        return (
                          <li
                            key={`${step.name}-${s}`}
                            className={cn(
                              "flex items-start gap-3 rounded-lg border p-3 transition-colors",
                              isDone
                                ? "border-(--accent-border)/40 bg-(--accent-wash)"
                                : "border-line/70 bg-surface-raised/60",
                            )}
                          >
                            <button
                              type="button"
                              onClick={() => update(toggleStep(checked, id))}
                              aria-pressed={isDone}
                              aria-label={`${isDone ? "Mark undone" : "Mark done"}: ${step.name}`}
                              className={cn(
                                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
                                isDone
                                  ? "border-(--accent-bright) bg-(--accent) text-base"
                                  : "border-line-bright text-transparent hover:border-(--accent-bright)",
                              )}
                            >
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </button>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-baseline gap-2">
                                <span
                                  className={cn(
                                    "text-sm font-semibold text-ink",
                                    isDone && "opacity-50 line-through",
                                  )}
                                >
                                  {step.name}
                                </span>
                                {step.detail ? (
                                  <span
                                    className={cn(
                                      "rounded border border-(--accent-border) bg-(--accent-wash) px-1.5 py-0.5 text-[11px] font-medium text-(--accent-bright)",
                                      isDone && "opacity-60",
                                    )}
                                  >
                                    {step.detail}
                                  </span>
                                ) : null}
                              </div>
                              <p
                                className={cn(
                                  "mt-1.5 text-[13px] leading-relaxed text-ink-muted",
                                  isDone && "opacity-60",
                                )}
                              >
                                {step.why}
                              </p>
                            </div>
                          </li>
                        );
                      })}
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
          );
        })}
      </ol>
    </div>
  );
}
