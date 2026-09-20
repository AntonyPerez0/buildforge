import type { ItemQuality, ItemStatLine } from "@/data/types";

export const QUALITY_COLORS: Record<ItemQuality, string> = {
  common: "#c7c7c7",
  magic: "#7b79ff",
  uncommon: "#4ecb4e",
  rare: "#4e8fd4",
  epic: "#a86ee8",
  legendary: "#e8873a",
  unique: "#f2c14e",
};

export function qualityColor(q: ItemQuality): string {
  return QUALITY_COLORS[q] ?? QUALITY_COLORS.common;
}

export type StatTone = NonNullable<ItemStatLine["tone"]>;

export const TONE_COLORS_D4: Record<StatTone, string> = {
  affix: "#8fb0f0",
  power: "#d49a56",
  bonus: "#c9c7d4",
  flavor: "#7f7d94",
};

export const TONE_COLORS_WOW: Record<StatTone, string> = {
  affix: "#5fc45f",
  power: "#5fc45f",
  bonus: "#d8d6de",
  flavor: "#c8a15c",
};
