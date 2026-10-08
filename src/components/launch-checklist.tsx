"use client";

import { useEffect, useState } from "react";
import { loadProgress, saveProgress, stepId, toggleStep } from "@/lib/progress";

export interface LaunchTask {
  title: string;
  body: string;
  tag?: string;
}

const LIST_ID = "forever-launch-checklist";

/** Day-one checklist as a WoW quest-log parchment — checkable, saved on device. */
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
    <div className="wowui-parchment">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="wowui-parchment-head">Day-one Checklist</h3>
        <p className="font-mono text-sm font-bold text-[#7d590d]">
          {loaded ? `${done}/${tasks.length}` : "–"}
        </p>
      </div>
      <p className="wowui-ink-body mt-1 text-[13px]">
        Decisions that are permanent or time-sensitive — work through it before Nov 4.
      </p>

      <ul className="mt-4">
        {tasks.map((task, i) => {
          const id = stepId(LIST_ID, 0, i);
          const isDone = checked.includes(id);
          return (
            <li
              key={task.title}
              className="wowui-task flex items-start gap-3 py-3"
            >
              <button
                type="button"
                aria-pressed={isDone}
                aria-label={`${isDone ? "Mark undone" : "Mark done"}: ${task.title}`}
                onClick={() => update(toggleStep(checked, id))}
                className="wowui-taskbox"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span
                    className="text-base leading-snug"
                    style={{
                      fontFamily: "var(--font-fondamento), serif",
                      color: isDone ? "#8a744f" : "#1a0f04",
                      textShadow: "1px -1px 0 #7d590d",
                      textDecoration: isDone ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </span>
                  {task.tag ? <span className="wowui-stamp">{task.tag}</span> : null}
                </div>
                <p
                  className="mt-1 text-[13px] leading-relaxed"
                  style={{ color: isDone ? "#96835d" : "#4d2e00" }}
                >
                  {task.body}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {done > 0 ? (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => update([])}
            className="wowui-stamp cursor-pointer hover:brightness-110"
            aria-label="Reset the checklist"
          >
            Reset progress
          </button>
        </div>
      ) : null}
    </div>
  );
}
