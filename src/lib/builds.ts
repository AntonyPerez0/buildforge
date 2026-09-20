import type { Build, GameId, MetaSnapshot } from "@/data/types";
import { whirlwindBarbarian } from "@/data/d4/whirlwind-barbarian";
import { chainLightningSorcerer } from "@/data/d4/chain-lightning-sorcerer";
import { minionNecromancer } from "@/data/d4/minion-necromancer";
import { twistingBladesRogue } from "@/data/d4/twisting-blades-rogue";
import { d4MetaSnapshots } from "@/data/d4/meta-snapshots";
import { furyWarrior } from "@/data/forever/fury-warrior";
import { retPaladin } from "@/data/forever/retribution-paladin";
import { frostMage } from "@/data/forever/frost-mage";
import { combatRogue } from "@/data/forever/combat-rogue";

export const BUILDS: Build[] = [
  whirlwindBarbarian,
  chainLightningSorcerer,
  minionNecromancer,
  twistingBladesRogue,
  furyWarrior,
  retPaladin,
  frostMage,
  combatRogue,
];

export const SNAPSHOTS: MetaSnapshot[] = d4MetaSnapshots;

export function getBuildsFor(game: GameId): Build[] {
  return BUILDS.filter((b) => b.game === game);
}

export function getBuild(game: GameId, slug: string): Build | undefined {
  return BUILDS.find((b) => b.game === game && b.slug === slug);
}

export function getSnapshotsFor(game: GameId): MetaSnapshot[] {
  return SNAPSHOTS.filter((s) => s.game === game);
}

export function buildHref(build: Pick<Build, "game" | "slug">): string {
  return build.game === "d4" ? `/d4/builds/${build.slug}` : `/forever/builds/${build.slug}`;
}

export function gamePath(game: GameId): string {
  return game === "d4" ? "/d4" : "/forever";
}
