import type { Build, ProgressionBand, TalentRun } from "@/data/types";

/**
 * WoW Forever launches with a level-60 cap, but the running beta caps
 * characters at 20. Authored build data always describes the full launch
 * game; this constant trims what renders. Bump it to
 * FOREVER_LAUNCH_LEVEL_CAP (60) on release day and every trimmed track,
 * talent spine, endgame chapter and copy line re-extends automatically.
 */
export const FOREVER_LAUNCH_LEVEL_CAP = 60;

/** Playable cap right now — the beta only reaches 20. */
export const FOREVER_LEVEL_CAP = 20;

export const FOREVER_IN_BETA = FOREVER_LEVEL_CAP < FOREVER_LAUNCH_LEVEL_CAP;

/** One-line level status for hero/meta copy. */
export const FOREVER_LEVEL_LINE = FOREVER_IN_BETA
  ? `Beta cap · Level ${FOREVER_LEVEL_CAP}`
  : `Level ${FOREVER_LAUNCH_LEVEL_CAP} cap`;

export interface LevelRange {
  from: number;
  to: number;
}

/** Parse a band label like "1–9", "40–44", "15" or "60 / Raid-ready". */
export function parseLevelBand(levels: string): LevelRange | null {
  const match = levels.match(/(\d+)\s*(?:[–—-]\s*(\d+))?/);
  if (!match) return null;
  const from = Number(match[1]);
  const to = match[2] ? Number(match[2]) : from;
  return { from, to };
}

/** Trim level bands to the cap: drop bands above it, clamp the spanning one. */
export function clampProgression(
  bands: ProgressionBand[],
  cap = FOREVER_LEVEL_CAP,
): ProgressionBand[] {
  const kept: ProgressionBand[] = [];
  for (const band of bands) {
    const range = parseLevelBand(band.levels);
    if (!range || range.from > cap) continue;
    kept.push(range.to > cap ? { ...band, levels: String(cap) } : band);
  }
  return kept;
}

/** Trim per-level talent point runs the same way. */
export function clampTalentRuns(runs: TalentRun[], cap = FOREVER_LEVEL_CAP): TalentRun[] {
  const kept: TalentRun[] = [];
  for (const run of runs) {
    if (run.from > cap) continue;
    kept.push(run.to > cap ? { ...run, to: cap } : run);
  }
  return kept;
}

const LEVEL_PREFIX_RE = /^Level\s*~?\s*(\d+)/i;

/** Drop "Leveling Quick Reference" style rows that point past the cap, and groups left empty. */
export function clampExtras(
  extras: NonNullable<Build["extras"]>,
  cap = FOREVER_LEVEL_CAP,
): NonNullable<Build["extras"]> {
  return extras
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const m = item.name.match(LEVEL_PREFIX_RE);
        return !m || Number(m[1]) <= cap;
      }),
    }))
    .filter((group) => group.items.length > 0);
}

/**
 * Trim a Forever build to what the current level cap makes reachable:
 * progression bands, talent runs, endgame chapters and level-gated extras.
 * Returns other games (and the full build once the cap is lifted) untouched.
 */
export function applyBetaCap(build: Build, cap = FOREVER_LEVEL_CAP): Build {
  if (build.game !== "forever" || cap >= FOREVER_LAUNCH_LEVEL_CAP) return build;
  return {
    ...build,
    progression: clampProgression(build.progression, cap),
    talentRuns: build.talentRuns ? clampTalentRuns(build.talentRuns, cap) : undefined,
    endgame: undefined,
    extras: build.extras ? clampExtras(build.extras, cap) : undefined,
  };
}
