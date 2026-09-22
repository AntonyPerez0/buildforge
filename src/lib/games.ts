import type { GameId } from "@/data/types";
import { FOREVER_IN_BETA, FOREVER_LAUNCH_LEVEL_CAP, FOREVER_LEVEL_CAP } from "@/lib/forever";

export interface GameConfig {
  id: GameId;
  label: string;
  shortLabel: string;
  tagline: string;
  description: string;
  /** Class applied for theme + display font. */
  themeClass: string;
  displayClass: string;
  href: string;
  statusChip: string;
  metaLine: string;
  classOrder: string[];
}

export const GAMES: Record<GameId, GameConfig> = {
  d4: {
    id: "d4",
    label: "Diablo IV",
    shortLabel: "D4",
    tagline: "Sanctuary, seasons, and the Pit.",
    description:
      "Meta builds for Season 15: Hell's Legacy — leveling paths that tell you exactly what to take at every level, gear priorities, and zero-guessing gotchas.",
    themeClass: "game-d4",
    displayClass: "display-d4",
    href: "/d4",
    statusChip: "Season 15 · Hell's Legacy",
    metaLine: "Patch 3.2 · Meta synced from Maxroll & Icy Veins",
    classOrder: [
      "Barbarian",
      "Rogue",
      "Sorcerer",
      "Necromancer",
      "Druid",
      "Spiritborn",
      "Paladin",
      "Warlock",
    ],
  },
  forever: {
    id: "forever",
    label: "WoW Forever",
    shortLabel: "Forever",
    tagline: "Classic+, the way it was meant to continue.",
    description: FOREVER_IN_BETA
      ? `World of Warcraft: Forever (Classic+) — the beta is live with a level ${FOREVER_LEVEL_CAP} cap. Classic trees with Forever twists; the full 1–${FOREVER_LAUNCH_LEVEL_CAP} tracks return at launch on Nov 4.`
      : "World of Warcraft: Forever (Classic+) — level 60 Azeroth with new talents, dungeons and raids. Classic trees with Forever twists, from level 1 to raid-ready.",
    themeClass: "game-forever",
    displayClass: "display-forever",
    href: "/forever",
    statusChip: "Beta live · Launches Nov 4, 2026",
    metaLine: FOREVER_IN_BETA
      ? `Beta cap ${FOREVER_LEVEL_CAP} · Classic+ trees · Full game Nov 4`
      : "Level 60 · Classic+ trees · Raids unlock Dec 9",
    classOrder: [
      "Warrior",
      "Paladin",
      "Hunter",
      "Rogue",
      "Priest",
      "Shaman",
      "Mage",
      "Warlock",
      "Druid",
    ],
  },
};

export const GAME_IDS: GameId[] = ["d4", "forever"];
