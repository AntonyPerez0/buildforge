import type { GameId, ItemQuality, ItemStatLine } from "@/data/types";

/** Diablo IV rarity colors — the game's own text-color table (common, magic, rare, legendary, unique, mythic). */
export const D4_QUALITY_COLORS: Record<ItemQuality, string> = {
  common: "#e3e0d9",
  magic: "#7c7cfb",
  uncommon: "#7c7cfb",
  rare: "#ffff00",
  epic: "#dc9bf2",
  legendary: "#ff8000",
  unique: "#dca779",
};

/** WoW item quality colors — the canonical ITEM_QUALITY_COLORS values. */
export const WOW_QUALITY_COLORS: Record<ItemQuality, string> = {
  common: "#ffffff",
  magic: "#1eff00",
  uncommon: "#1eff00",
  rare: "#0070dd",
  epic: "#a335ee",
  legendary: "#ff8000",
  unique: "#e6cc80",
};

/** Kept for callers without a game context. */
export const QUALITY_COLORS = D4_QUALITY_COLORS;

export function qualityColor(q: ItemQuality, game: GameId = "d4"): string {
  const table = game === "forever" ? WOW_QUALITY_COLORS : D4_QUALITY_COLORS;
  return table[q] ?? table.common;
}

/** WoW rare blue (#0070dd) is too dark for a glow on stone; slot rims use a brighter cut. */
export function slotGlowColor(q: ItemQuality, game: GameId): string {
  if (game === "forever" && q === "rare") return "#3d8fe6";
  return qualityColor(q, game);
}

export type StatTone = NonNullable<ItemStatLine["tone"]>;

/** Affix lines in the default text color, the legendary power in orange-tan, flavor in label gold. */
export const TONE_COLORS_D4: Record<StatTone, string> = {
  affix: "#e3e0d9",
  power: "#dba864",
  bonus: "#b8b2a6",
  flavor: "#b69e7a",
};

/** White stats, green "Equip:" lines, gold flavor quote — the classic tooltip. */
export const TONE_COLORS_WOW: Record<StatTone, string> = {
  affix: "#1eff00",
  power: "#1eff00",
  bonus: "#ffffff",
  flavor: "#ffd100",
};
