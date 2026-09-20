"use client";

import { useEffect, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { loadProgress, saveProgress, stepId, toggleStep } from "@/lib/progress";
import { cn } from "@/lib/utils";

export interface LaunchTask {
  title: string;
  body: string;
  tag?: string;
}

const LIST_ID = "forever-launch-checklist";

/** Day-one checklist for the Forever launch — checkable, saved on device. */
export function LaunchChecklist({ tasks }: { tasks: LaunchTask[] }) {
  const [checked, setChecked] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setChecked(loadProgress(LIST_ID));
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  function update(next: string[]) {
    setChecked(next);
    saveProgress(LIST_ID, next);
  }

  const done = tasks.filter((_, i) => checked.includes(stepId(LIST_ID, 0, i))).length;

  return (
    <div>
      <div className="panel mb-5 flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg border border-(--accent-border) bg-(--accent-wash) font-mono text-[13px] font-bold text-(--accent-bright)">
            {loaded ? `${done}/${tasks.length}` : "–"}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Launch-day checklist</p>
            <p className="text-xs text-ink-dim">Saved on this device — work through it before Nov 4</p>
          </div>
        </div>
        {done > 0 ? (
          <button
            type="button"
            onClick={() => update([])}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-dim transition-colors hover:border-forever/40 hover:text-forever-bright"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        ) : null}
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {tasks.map((task, i) => {
          const id = stepId(LIST_ID, 0, i);
          const isDone = checked.includes(id);
          return (
            <li
              key={task.title}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-4 transition-colors",
                isDone
                  ? "border-(--accent-border)/40 bg-(--accent-wash)"
                  : "border-line bg-surface",
              )}
            >
              <button
                type="button"
                onClick={() => update(toggleStep(checked, id))}
                aria-pressed={isDone}
                aria-label={`${isDone ? "Mark undone" : "Mark done"}: ${task.title}`}
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
                    {task.title}
                  </span>
                  {task.tag ? (
                    <span className="rounded border border-(--accent-border) bg-(--accent-wash) px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-(--accent-bright) uppercase">
                      {task.tag}
                    </span>
                  ) : null}
                </div>
                <p className={cn("mt-1 text-[13px] leading-relaxed text-ink-muted", isDone && "opacity-60")}>
                  {task.body}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
