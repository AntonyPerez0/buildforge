import type { TalentRun } from "@/data/types";

export interface TalentLevelRow {
  level: number;
  points: number;
  name: string;
  placement: string;
  note?: string;
  gate?: string;
}

/** Level at which each classic talent-gate point count is reached (points = level − 9). */
export const GATE_LEVELS: Record<string, number> = {
  "11": 20,
  "16": 25,
  "21": 30,
  "31": 40,
};

/**
 * Expand compact per-run talent data into one row per level:
 * from=10, to=14, rankFrom=1 → "Level 10 · Cruelty · Rank 1 … Level 14 · Cruelty · Rank 5".
 * Single-level runs render as "1 point" (one-rank talents). Gates from specGates
 * attach to the level where points = gate value.
 */
export function expandTalentRuns(
  runs: TalentRun[],
  specGates?: { gate: string; label: string }[],
): TalentLevelRow[] {
  const gateByPoints = new Map<number, string>();
  for (const g of specGates ?? []) {
    const level = GATE_LEVELS[g.gate];
    if (level) gateByPoints.set(level - 9, g.label);
  }

  const rows: TalentLevelRow[] = [];
  const sorted = [...runs].sort((a, b) => a.from - b.from);
  for (const run of sorted) {
    for (let level = run.from; level <= run.to; level++) {
      const points = level - 9;
      const single = run.from === run.to;
      const placement = single
        ? "1 point"
        : `Rank ${run.rankFrom + (level - run.from)}`;
      rows.push({
        level,
        points,
        name: run.name,
        placement,
        note: run.note,
        gate: gateByPoints.get(points),
      });
    }
  }
  return rows.sort((a, b) => a.level - b.level);
}
