"use client";

import { Milestone } from "lucide-react";
import type { Build } from "@/data/types";
import { expandTalentRuns } from "@/lib/talents";
import { cn } from "@/lib/utils";
import { FOREVER_IN_BETA, FOREVER_LEVEL_CAP } from "@/lib/forever";

/**
 * Exact per-level talent placement for levels 10→44 — the answer to
 * "where does my point go at this level?" for Forever's classic-style trees.
 */
export function TalentLevelTable({ build }: { build: Build }) {
  if (build.game !== "forever" || !build.talentRuns?.length) return null;

  const rows = expandTalentRuns(build.talentRuns, build.specGates);

  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-5">
        <h3 className="text-sm font-semibold tracking-wide text-(--accent-bright) uppercase">
          Talent points, level by level
        </h3>
        <p className="text-xs text-ink-dim">
          One point per level from 10 — exactly where this build spends each one
        </p>
      </div>

      <div className="max-h-[560px] overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-surface-raised text-[11px] tracking-wider text-ink-dim uppercase backdrop-blur">
            <tr className="border-b border-line">
              <th className="px-4 py-2.5 font-semibold">Level</th>
              <th className="px-4 py-2.5 font-semibold">Points</th>
              <th className="px-4 py-2.5 font-semibold">Where the point goes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.level}
                className={cn(
                  "border-b border-line/50 last:border-0",
                  row.gate ? "bg-(--accent-wash)" : "hover:bg-surface-raised/30",
                )}
              >
                <td className="px-4 py-2.5 font-mono text-[13px] font-bold text-(--accent-bright)">
                  {row.level}
                </td>
                <td className="px-4 py-2.5 font-mono text-[13px] text-ink-dim">{row.points}</td>
                <td className="px-4 py-2.5">
                  <span className="font-medium text-ink">{row.name}</span>{" "}
                  <span className="text-ink-muted">{row.placement}</span>
                  {row.note ? (
                    <span className="ml-2 text-xs text-ink-dim">({row.note})</span>
                  ) : null}
                  {row.gate ? (
                    <span className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-(--accent-bright)">
                      <Milestone className="h-3 w-3" />
                      {row.points}-point gate: {row.gate}
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-line px-4 py-3 sm:px-5">
        <p className="text-xs leading-relaxed text-ink-dim">
          {FOREVER_IN_BETA
            ? `The beta caps at level ${FOREVER_LEVEL_CAP} — placement resumes here at launch, running through level 44 before points spill into your secondary tree. Gate levels (16/21/31 points) are structural; beta values may shift.`
            : "After level 44 the core build is banked — spend 45–60 on your secondary tree and final tuning, then verify the beta-tuned split in the linked calculator before lock-in. Beta values may shift; the gate levels (16/21/31 points) are structural."}
        </p>
      </div>
    </div>
  );
}
