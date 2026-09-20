import type { ProgressionBand } from "@/data/types";

const PREFIX = "buildforge.progress.v1";

export function stepId(buildId: string, bandIndex: number, stepIndex: number): string {
  return `${buildId}#b${bandIndex}s${stepIndex}`;
}

export function progressKey(buildId: string): string {
  return `${PREFIX}:${buildId}`;
}

/** Pure helpers (unit-tested); storage wrappers below. */
export function toggleStep(checked: string[], id: string): string[] {
  return checked.includes(id) ? checked.filter((c) => c !== id) : [...checked, id];
}

export function toggleWholeBand(
  checked: string[],
  buildId: string,
  bandIndex: number,
  band: ProgressionBand,
): string[] {
  const ids = band.steps.map((_, s) => stepId(buildId, bandIndex, s));
  const allChecked = ids.every((id) => checked.includes(id));
  return allChecked
    ? checked.filter((c) => !ids.includes(c))
    : Array.from(new Set([...checked, ...ids]));
}

export function bandProgress(
  checked: string[],
  buildId: string,
  bandIndex: number,
  band: ProgressionBand,
): { done: number; total: number } {
  const done = band.steps.filter((_, s) => checked.includes(stepId(buildId, bandIndex, s))).length;
  return { done, total: band.steps.length };
}

/**
 * "You are here": the first band (top-down) that still has unchecked steps.
 * Returns -1 when the whole path is complete or nothing has been checked yet.
 */
export function currentBandIndex(
  checked: string[],
  buildId: string,
  bands: ProgressionBand[],
): number {
  if (checked.length === 0) return -1;
  for (let b = 0; b < bands.length; b++) {
    const { done, total } = bandProgress(checked, buildId, b, bands[b]);
    if (done < total) return b;
  }
  return -1;
}

/* Storage wrappers — browser only. */

export function loadProgress(buildId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(progressKey(buildId));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveProgress(buildId: string, checked: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(progressKey(buildId), JSON.stringify(checked));
  } catch {
    /* storage full or blocked — tracking is a progressive enhancement */
  }
}

export function clearProgress(buildId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(progressKey(buildId));
  } catch {
    /* ignore */
  }
}
