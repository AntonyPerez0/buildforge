import type { Build } from "@/data/types";

export type DiffKind = "same" | "added" | "removed" | "changed";

export interface DiffRow {
  kind: DiffKind;
  /** Section label, e.g. "Levels 3–5" or the slot name. */
  group: string;
  a?: string;
  b?: string;
}

export interface BuildDiff {
  changed: boolean;
  progression: DiffRow[];
  stats: DiffRow[];
  gear: DiffRow[];
  summary: { progression: number; stats: number; gear: number };
}

const stepText = (s: { name: string; detail?: string; why: string }) =>
  `${s.name}${s.detail ? ` · ${s.detail}` : ""} — ${s.why}`;

/**
 * Diff a custom build against the meta build it was forked from.
 * Progression compares band-by-band (same band index); stats and gear
 * compare positionally by label/slot.
 */
export function diffBuilds(meta: Build, custom: Build): BuildDiff {
  const progression: DiffRow[] = [];
  const bandCount = Math.max(meta.progression.length, custom.progression.length);

  for (let i = 0; i < bandCount; i++) {
    const aBand = meta.progression[i];
    const bBand = custom.progression[i];
    const levels = bBand?.levels ?? aBand?.levels ?? `Band ${i + 1}`;
    const group = `Levels ${levels}`;
    const aSteps = (aBand?.steps ?? []).map(stepText);
    const bSteps = (bBand?.steps ?? []).map(stepText);
    const rows = Math.max(aSteps.length, bSteps.length);

    if (!aBand || !bBand) {
      for (const step of aBand ? aSteps : []) progression.push({ kind: "removed", group, a: step });
      for (const step of bBand ? bSteps : []) progression.push({ kind: "added", group, b: step });
      continue;
    }
    if (aBand.levels !== bBand.levels || aBand.goal !== bBand.goal) {
      progression.push({
        kind: "changed",
        group: "Band structure",
        a: `Levels ${aBand.levels} — ${aBand.goal}`,
        b: `Levels ${bBand.levels} — ${bBand.goal}`,
      });
    }

    for (let s = 0; s < rows; s++) {
      const a = aSteps[s];
      const b = bSteps[s];
      if (a === undefined) progression.push({ kind: "added", group, b });
      else if (b === undefined) progression.push({ kind: "removed", group, a });
      else if (a !== b) progression.push({ kind: "changed", group, a, b });
    }
  }

  const stats: DiffRow[] = positionalDiff(
    meta.statPriority.map((s) => s.label),
    custom.statPriority.map((s) => s.label),
    "Stat",
  );

  const gear: DiffRow[] = positionalDiff(
    meta.gear.map((g) => `${g.slot}: ${g.target}`),
    custom.gear.map((g) => `${g.slot}: ${g.target}`),
    "Gear",
  );

  return {
    changed:
      progression.some((r) => r.kind !== "same") ||
      stats.some((r) => r.kind !== "same") ||
      gear.some((r) => r.kind !== "same"),
    progression,
    stats,
    gear,
    summary: {
      progression: progression.filter((r) => r.kind !== "same").length,
      stats: stats.filter((r) => r.kind !== "same").length,
      gear: gear.filter((r) => r.kind !== "same").length,
    },
  };
}

function positionalDiff(aList: string[], bList: string[], group: string): DiffRow[] {
  const rows: DiffRow[] = [];
  const count = Math.max(aList.length, bList.length);
  for (let i = 0; i < count; i++) {
    const a = aList[i];
    const b = bList[i];
    if (a === undefined) rows.push({ kind: "added", group, b });
    else if (b === undefined) rows.push({ kind: "removed", group, a });
    else if (a !== b) rows.push({ kind: "changed", group, a, b });
  }
  return rows;
}
