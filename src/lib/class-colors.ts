/**
 * Classic Era RAID_CLASS_COLORS. Vanilla drew Shamans in the Paladin pink
 * (#F58CBA) because each class lived on one faction; Forever puts both on
 * both sides, so Shaman uses the later #0070DD to stay distinguishable.
 */
export const WOW_CLASS_COLORS: Record<string, string> = {
  Warrior: "#c79c6e",
  Paladin: "#f58cba",
  Hunter: "#abd473",
  Rogue: "#fff569",
  Priest: "#ffffff",
  Shaman: "#0070dd",
  Mage: "#3fc7eb",
  Warlock: "#8787ed",
  Druid: "#ff7d0a",
};

/** Muted D4 class accents for small markers — D4 has no official class colors, these are ours. */
export const D4_CLASS_COLORS: Record<string, string> = {
  Barbarian: "#c9763c",
  Rogue: "#8fbf6a",
  Sorcerer: "#6fa6e8",
  Necromancer: "#9fd2c4",
  Druid: "#b58b4f",
  Spiritborn: "#5fc9b0",
  Paladin: "#e6c46b",
  Warlock: "#c25ad6",
};

export function classColor(className: string, game: "d4" | "forever" = "forever"): string {
  const table = game === "d4" ? D4_CLASS_COLORS : WOW_CLASS_COLORS;
  return table[className] ?? (game === "d4" ? "#b0a493" : "#ffffff");
}
