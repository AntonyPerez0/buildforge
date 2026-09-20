export type GameId = "d4" | "forever";

export type Tier = "S" | "A" | "B" | "C";

export type SourceName = "Maxroll" | "Icy Veins" | "ClassicWoW.gg" | "Wowhead" | "Blizzard";

export interface SourceRef {
  site: SourceName;
  url: string;
  label?: string;
}

/** One instruction row inside a level band. */
export interface SkillStep {
  /** Skill / talent / gear name. */
  name: string;
  /** Optional rank or point detail, e.g. "Rank 5" or "3 points". */
  detail?: string;
  /** Why this is taken now — the reasoning behind the pick. */
  why: string;
}

/** A band of levels that are answered together, e.g. levels 1-4. */
export interface ProgressionBand {
  /** "1–4", "15", "50–59" … */
  levels: string;
  /** What this band is trying to achieve. */
  goal: string;
  /** Exact picks in order. */
  steps: SkillStep[];
  /** A key unlock / milestone worth calling out. */
  milestone?: string;
}

/** One gear slot: what to equip and what to look for. */
export interface GearSlot {
  slot: string;
  /** The item, item type or enchant to target. */
  target: string;
  /** Stat lines / affixes to prioritize on it. */
  affixes?: string[];
  /** A specific unique / best-in-slot item and where it comes from. */
  unique?: string;
}

/** Priority list grouped by combat phase. */
export interface RotationPhase {
  phase: string;
  steps: string[];
}

export interface PriorityStat {
  label: string;
  note?: string;
}

/** Grouped extras: aspects, glyphs, enchants, consumables… */
export interface ExtraGroup {
  label: string;
  items: { name: string; note?: string }[];
}

export type DataQuality =
  /** Fully in-house authored level-by-level build. */
  | "authored"
  /** Condensed from linked guides; always opens the full guide. */
  | "snapshot";

export interface Build {
  /** Unique id, e.g. "d4-whirlwind-barbarian". */
  id: string;
  game: GameId;
  slug: string;
  name: string;
  className: string;
  /** Short role description, e.g. "Melee AoE speedfarm". */
  role: string;
  tier: Tier;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tagline: string;
  summary: string;
  /** e.g. "Season 15 · Patch 3.2" or "Forever Beta · Sep 2026". */
  patchLabel: string;
  /** ISO date of last content sync. */
  lastSynced: string;
  dataQuality: DataQuality;
  sources: SourceRef[];
  progression: ProgressionBand[];
  /** Top-of-page quick pick order. */
  skillPriority?: string[];
  statPriority: PriorityStat[];
  gear: GearSlot[];
  rotation: RotationPhase[];
  /** The "zero guessing" gotchas: what to avoid, what to watch. */
  watchOuts: string[];
  extras?: ExtraGroup[];
  /** Game-specific quick facts rendered as chips. */
  meta?: Record<string, string>;
}

/** Condensed current-meta card synced from guide sites. */
export interface MetaSnapshot {
  id: string;
  game: GameId;
  className: string;
  buildName: string;
  tier: Tier;
  summary: string;
  sources: SourceRef[];
  fetchedAt: string;
}

export interface ClassInfo {
  name: string;
  color: string;
}
