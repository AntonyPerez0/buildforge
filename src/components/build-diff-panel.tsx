"use client";

import { useState } from "react";
import { GitCompare, Minus, Pencil, Plus } from "lucide-react";
import type { DiffKind, DiffRow } from "@/lib/build-diff";
import { cn } from "@/lib/utils";

const KIND_STYLES: Record<Exclude<DiffKind, "same">, { icon: typeof Plus; label: string; cls: string }> = {
  added: { icon: Plus, label: "You added", cls: "text-tier-a border-tier-a/30 bg-tier-a/10" },
  removed: { icon: Minus, label: "Removed", cls: "text-d4-bright border-d4/30 bg-d4/10" },
  changed: { icon: Pencil, label: "You changed", cls: "text-tier-s border-tier-s/30 bg-tier-s/10" },
};

function Row({ row }: { row: DiffRow }) {
  if (row.kind === "same") return null;
  const style = KIND_STYLES[row.kind];
  const Icon = style.icon;
  return (
    <li className={cn("flex items-start gap-3 rounded-lg border p-3", style.cls)}>
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <div className="min-w-0 text-[13px] leading-relaxed">
        {row.kind === "changed" ? (
          <>
            <p className="text-ink-muted line-through opacity-70">{row.a}</p>
            <p className="font-medium text-ink">{row.b}</p>
          </>
        ) : (
          <p className="font-medium text-ink">{row.b ?? row.a}</p>
        )}
      </div>
    </li>
  );
}

export function BuildDiffPanel({
  metaName,
  progression,
  stats,
  gear,
  summary,
  changed,
}: {
  metaName: string;
  progression: DiffRow[];
  stats: DiffRow[];
  gear: DiffRow[];
  summary: { progression: number; stats: number; gear: number };
  changed: boolean;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <GitCompare className="h-4.5 w-4.5 text-(--accent-bright)" />
          <span>
            <span className="block text-sm font-semibold text-ink">
              Diff vs {metaName}
            </span>
            <span className="block text-xs text-ink-dim">
              {changed
                ? `${summary.progression} path changes · ${summary.stats} stat changes · ${summary.gear} gear changes`
                : "Identical to the meta build so far — start editing to see your changes."}
            </span>
          </span>
        </span>
        <span className="text-xs text-ink-dim">{open ? "Hide" : "Show"}</span>
      </button>

      {open ? (
        <div className="grid gap-4 border-t border-line p-4 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3 text-(--accent-bright)">Level path</p>
            {progression.length === 0 || !changed ? (
              <p className="text-sm text-ink-dim">No differences yet.</p>
            ) : (
              <ul className="space-y-2">
                {progression.map((row, i) => (
                  <Row key={`p-${i}`} row={row} />
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-5">
            <div>
              <p className="eyebrow mb-3 text-(--accent-bright)">Stats</p>
              {stats.length === 0 || !changed ? (
                <p className="text-sm text-ink-dim">No differences yet.</p>
              ) : (
                <ul className="space-y-2">
                  {stats.map((row, i) => (
                    <Row key={`s-${i}`} row={row} />
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="eyebrow mb-3 text-(--accent-bright)">Gear</p>
              {gear.length === 0 || !changed ? (
                <p className="text-sm text-ink-dim">No differences yet.</p>
              ) : (
                <ul className="space-y-2">
                  {gear.map((row, i) => (
                    <Row key={`g-${i}`} row={row} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
