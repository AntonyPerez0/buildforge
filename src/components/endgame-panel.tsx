"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Milestone, RotateCcw } from "lucide-react";
import type { EndgamePhase } from "@/data/types";
import { saveProgress, loadProgress, stepId, toggleStep } from "@/lib/progress";
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
            <div className="count-badge">{loaded ? `${done}/${total}` : "–"}</div>
            <div>
              <p className="display text-sm font-semibold text-ink">Endgame checklist</p>
              <p className="text-xs text-ink-dim">Same second-screen flow — check phases off as you conquer them</p>
            </div>
          </div>
          {done > 0 ? (
            <button type="button" onClick={() => update([])} className="btn btn-sm">
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
              <div className="panel band h-full p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="band-title">{phase.phase}</h3>
                  <span className="band-count text-xs">
                    {phaseDone}/{phase.steps.length}
                  </span>
                </div>
                <p className="band-goal mt-1 text-xs leading-relaxed">{phase.goal}</p>

                <ul className="mt-3">
                  {phase.steps.map((step, s) => {
                    const id = endgameId(buildId, i, s);
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
                            {step.detail ? <span className="detail-pill">{step.detail}</span> : null}
                          </div>
                          <p className="step-why">{step.why}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {phase.milestone ? (
                  <div className="milestone mt-3">
                    <Milestone className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                    <p>{phase.milestone}</p>
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
