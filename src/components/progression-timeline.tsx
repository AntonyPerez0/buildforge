"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, CircleDot, Milestone, RotateCcw } from "lucide-react";
import type { GameId, ProgressionBand } from "@/data/types";
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

const COPY: Record<GameId, { done: string; idle: string; reward: string }> = {
  d4: { done: "Journey complete — Sanctuary is yours.", idle: "Mark objectives as you complete them", reward: "Unlock" },
  forever: { done: "Quest log complete — Azeroth thanks you.", idle: "Tick objectives off as you complete them", reward: "Reward" },
};

/**
 * The zero-guessing centerpiece, made interactive: check steps off as you
 * complete them, with a "you are here" marker and a running progress count.
 * Themed by [data-game]: D4 journey chapters, WoW quest-log parchment.
 */
export function ProgressionTimeline({
  buildId,
  bands,
  game = "d4",
}: {
  buildId: string;
  bands: ProgressionBand[];
  game?: GameId;
}) {
  const [checked, setChecked] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const copy = COPY[game];

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
    () => bands.reduce((n, band, b) => n + bandProgress(checked, buildId, b, band).done, 0),
    [bands, checked, buildId],
  );
  const here = loaded ? currentBandIndex(checked, buildId, bands) : -1;
  const anyChecked = doneSteps > 0;

  return (
    <div>
      <FadeUp>
        <div className="panel mb-8 flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="count-badge">
              {doneSteps}/{totalSteps}
            </div>
            <div>
              <p className="display text-sm font-semibold text-ink">Your progress</p>
              <p className="text-xs text-ink-dim">
                {here >= 0 ? `You are here: Levels ${bands[here].levels}` : anyChecked ? copy.done : copy.idle}
              </p>
            </div>
          </div>
          {anyChecked ? (
            <button type="button" onClick={() => update([])} className="btn btn-sm">
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
                  <div className="flex items-center gap-3 sm:sticky sm:top-28 sm:self-start">
                    <span className="band-node" data-here={isHere} data-done={bandDone}>
                      <span>{band.levels.includes("–") ? band.levels.split("–")[0] : band.levels.replace("+", "")}</span>
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="timeline-rail absolute top-14 bottom-0 left-[19px] w-px sm:top-6 sm:h-[calc(100%-1rem)]"
                  />
                </div>

                <div className="relative min-w-0 pl-14 sm:pl-0">
                  <div className="panel band p-4 sm:p-5" data-here={isHere}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className={cn("band-title", bandDone && "opacity-60")}>
                          {game === "forever" ? `[${band.levels}] ${band.goal}` : `Levels ${band.levels}`}
                        </h4>
                        {isHere ? (
                          <span className="here-flag">
                            <CircleDot className="h-3 w-3" /> You are here
                          </span>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="band-count text-xs">
                          {done}/{total}
                        </span>
                        <button
                          type="button"
                          onClick={() => update(toggleWholeBand(checked, buildId, b, band))}
                          className="mini-btn"
                          aria-label={`Mark all steps in levels ${band.levels} as ${bandDone ? "undone" : "done"}`}
                        >
                          {bandDone ? "Uncheck" : "All done"}
                        </button>
                      </div>
                    </div>
                    {game === "forever" ? null : <p className="band-goal mt-1 text-xs">{band.goal}</p>}

                    <ul className="mt-3">
                      {band.steps.map((step, s) => {
                        const id = stepId(buildId, b, s);
                        const isDone = checked.includes(id);
                        return (
                          <li key={`${step.name}-${s}`} className="step mt-2 first:mt-0" data-done={isDone}>
                            <button
                              type="button"
                              onClick={() => update(toggleStep(checked, id))}
                              aria-pressed={isDone}
                              aria-label={`${isDone ? "Mark undone" : "Mark done"}: ${step.name}`}
                              className="check"
                            >
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </button>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-baseline gap-2">
                                <span className="step-name">{step.name}</span>
                                {step.detail ? (
                                  <span className={cn("detail-pill", isDone && "opacity-60")}>{step.detail}</span>
                                ) : null}
                              </div>
                              <p className="step-why">{step.why}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    {band.milestone ? (
                      <div className="milestone mt-3">
                        <Milestone className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                        <p>
                          <span className="font-semibold">{copy.reward}: </span>
                          {band.milestone}
                        </p>
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
