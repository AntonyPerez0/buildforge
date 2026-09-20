import type { Build, GameId } from "@/data/types";
import { whirlwindBarbarian } from "@/data/d4/whirlwind-barbarian";
import { chainLightningSorcerer } from "@/data/d4/chain-lightning-sorcerer";
import { minionNecromancer } from "@/data/d4/minion-necromancer";
import { twistingBladesRogue } from "@/data/d4/twisting-blades-rogue";
import { boneSpearNecromancer } from "@/data/d4/bone-spear-necromancer";
import { pulverizeDruid } from "@/data/d4/pulverize-druid";
import { rapidFireRogue } from "@/data/d4/rapid-fire-rogue";
import { fireballSorcerer } from "@/data/d4/fireball-sorcerer";
import { furyWarrior } from "@/data/forever/fury-warrior";
import { retPaladin } from "@/data/forever/retribution-paladin";
import { frostMage } from "@/data/forever/frost-mage";
import { combatRogue } from "@/data/forever/combat-rogue";
import { shadowPriest } from "@/data/forever/shadow-priest";
import { beastMasteryHunter } from "@/data/forever/beast-mastery-hunter";
import { afflictionWarlock } from "@/data/forever/affliction-warlock";
import { enhancementShaman } from "@/data/forever/enhancement-shaman";
import { SNAPSHOTS, getSnapshotsFor } from "@/lib/snapshots";

export const BUILDS: Build[] = [
  whirlwindBarbarian,
  chainLightningSorcerer,
  fireballSorcerer,
  boneSpearNecromancer,
  minionNecromancer,
  pulverizeDruid,
  twistingBladesRogue,
  rapidFireRogue,
  furyWarrior,
  retPaladin,
  beastMasteryHunter,
  afflictionWarlock,
  frostMage,
  shadowPriest,
  enhancementShaman,
  combatRogue,
];

export { getSnapshotsFor, SNAPSHOTS };
export type { MetaSnapshot } from "@/data/types";

export function getBuildsFor(game: GameId): Build[] {
  return BUILDS.filter((b) => b.game === game);
}

export function getBuild(game: GameId, slug: string): Build | undefined {
  return BUILDS.find((b) => b.game === game && b.slug === slug);
}

export function buildHref(build: Pick<Build, "game" | "slug">): string {
  return build.game === "d4" ? `/d4/builds/${build.slug}` : `/forever/builds/${build.slug}`;
}

export function gamePath(game: GameId): string {
  return game === "d4" ? "/d4" : "/forever";
}
