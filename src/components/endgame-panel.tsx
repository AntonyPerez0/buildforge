"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Milestone, RotateCcw } from "lucide-react";
import type { EndgamePhase } from "@/data/types";
import { saveProgress, loadProgress, stepId, toggleStep } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion";

function endgameId(buildId: string, phase: number, step: number) {
  return stepId(buildId, 100 + phase, step);
}

/** Post-level-cap chapters, checkable like the level path. */
export function EndgamePanel({ buildId, phases }: { buildId: string; phases: EndgamePhase[] }) {
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

  const total = useMemo(() => phases.reduce((n, p) => n + p.steps.length, 0), [phases]);
  const done = useMemo(
    () =>
      phases.reduce(
        (n, p, i) => n + p.steps.filter((_, s) => checked.includes(endgameId(buildId, i, s))).length,
        0,
      ),
    [phases, checked, buildId],
  );

  return (
    <div>
      <FadeUp>
        <div className="panel mb-6 flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-(--accent-border) bg-(--accent-wash) font-mono text-[13px] font-bold text-(--accent-bright)">
              {loaded ? `${done}/${total}` : "–"}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Endgame checklist</p>
              <p className="text-xs text-ink-dim">Same second-screen flow — check phases off as you conquer them</p>
            </div>
          </div>
          {done > 0 ? (
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

      <div className="grid gap-4 lg:grid-cols-2">
        {phases.map((phase, i) => {
          const phaseDone = phase.steps.filter((_, s) => checked.includes(endgameId(buildId, i, s))).length;
          return (
            <FadeUp key={phase.phase} delay={Math.min(i * 0.05, 0.2)}>
              <div className="panel h-full p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-(--accent-bright)">{phase.phase}</h3>
                  <span className="text-xs text-ink-dim">
                    {phaseDone}/{phase.steps.length}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-ink-dim">{phase.goal}</p>

                <ul className="mt-4 space-y-2.5">
                  {phase.steps.map((step, s) => {
                    const id = endgameId(buildId, i, s);
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
                            <span className={cn("text-sm font-semibold text-ink", isDone && "opacity-50 line-through")}>
                              {step.name}
                            </span>
                            {step.detail ? (
                              <span className="rounded border border-(--accent-border) bg-(--accent-wash) px-1.5 py-0.5 text-[11px] font-medium text-(--accent-bright)">
                                {step.detail}
                              </span>
                            ) : null}
                          </div>
                          <p className={cn("mt-1 text-[13px] leading-relaxed text-ink-muted", isDone && "opacity-60")}>
                            {step.why}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {phase.milestone ? (
                  <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-(--accent-border) bg-(--accent-wash) p-3">
                    <Milestone className="mt-0.5 h-4 w-4 shrink-0 text-(--accent-bright)" />
                    <p className="text-[13px] leading-relaxed text-ink">{phase.milestone}</p>
                  </div>
                ) : null}
              </div>
            </FadeUp>
          );
        })}
      </div>
    </div>
  );
}
