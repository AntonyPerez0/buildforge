import type { Build, GearSlot, ItemIconKey } from "@/data/types";
import { GAMES } from "@/lib/games";
import { cn } from "@/lib/utils";
import { CharacterSilhouette, ITEM_ICONS } from "@/components/item-icons";
import { ItemSlot } from "@/components/item-slot";

type Bucket = "left" | "right" | "bottom" | "weapons";

interface LayoutRule {
  bucket: Bucket;
  pattern: RegExp;
}

const D4_LAYOUT: LayoutRule[] = [
  { bucket: "left", pattern: /helm|chest|glove|pant|boot/i },
  { bucket: "weapons", pattern: /weapon|main hand|off-?hand/i },
  { bucket: "right", pattern: /amulet|ring/i },
];

const FOREVER_LAYOUT: LayoutRule[] = [
  { bucket: "left", pattern: /head|neck|shoulder|back|chest|wrist/i },
  { bucket: "right", pattern: /hands|gauntlet|waist|belt|legs|feet|boot/i },
  {
    bucket: "bottom",
    pattern: /ring|trinket|relic|wand|ranged|off-?hand|main hand|weapon|throw/i,
  },
];

const CANONICAL_D4: { slot: string; icon: ItemIconKey; bucket: Bucket }[] = [
  { slot: "Helm", icon: "helm", bucket: "left" },
  { slot: "Chest", icon: "chest", bucket: "left" },
  { slot: "Gloves", icon: "hands", bucket: "left" },
  { slot: "Pants", icon: "legs", bucket: "left" },
  { slot: "Boots", icon: "feet", bucket: "left" },
  { slot: "Main Hand", icon: "sword", bucket: "weapons" },
  { slot: "Off-Hand", icon: "axe", bucket: "weapons" },
  { slot: "Amulet", icon: "amulet", bucket: "right" },
  { slot: "Ring 1", icon: "ring", bucket: "right" },
  { slot: "Ring 2", icon: "ring", bucket: "right" },
];

const CANONICAL_FOREVER: { slot: string; icon: ItemIconKey; bucket: Bucket }[] = [
  { slot: "Head", icon: "helm", bucket: "left" },
  { slot: "Neck", icon: "amulet", bucket: "left" },
  { slot: "Shoulders", icon: "shoulders", bucket: "left" },
  { slot: "Back", icon: "offhand", bucket: "left" },
  { slot: "Chest", icon: "chest", bucket: "left" },
  { slot: "Wrists", icon: "wrist", bucket: "left" },
  { slot: "Hands", icon: "hands", bucket: "right" },
  { slot: "Waist", icon: "belt", bucket: "right" },
  { slot: "Legs", icon: "legs", bucket: "right" },
  { slot: "Feet", icon: "feet", bucket: "right" },
  { slot: "Ring 1", icon: "ring", bucket: "bottom" },
  { slot: "Ring 2", icon: "ring", bucket: "bottom" },
  { slot: "Trinket 1", icon: "trinket", bucket: "bottom" },
  { slot: "Trinket 2", icon: "trinket", bucket: "bottom" },
  { slot: "Main Hand", icon: "sword", bucket: "weapons" },
  { slot: "Off-Hand", icon: "offhand", bucket: "weapons" },
  { slot: "Ranged", icon: "gun", bucket: "weapons" },
];

const ICON_BY_NAME: [RegExp, ItemIconKey][] = [
  [/helm|crown|hood/i, "helm"],
  [/shoulder|pauldron|mantle/i, "shoulders"],
  [/chest|robe|breastplate|vest/i, "chest"],
  [/glove|gauntlet|hand/i, "hands"],
  [/wrist|brace|bracer/i, "wrist"],
  [/belt|waist|sash/i, "belt"],
  [/leg|pant|kilt/i, "legs"],
  [/boot|feet|sabaton|sandal/i, "feet"],
  [/amulet|neck|pendant|choker/i, "amulet"],
  [/ring|band/i, "ring"],
  [/trinket/i, "trinket"],
  [/staff|stave/i, "staff"],
  [/scythe/i, "scythe"],
  [/dagger/i, "dagger"],
  [/axe/i, "axe"],
  [/mace|hammer|sulfuras/i, "mace"],
  [/wand|scepter/i, "wand"],
  [/gun|crossbow|rifle|bow|smiting/i, "gun"],
  [/off.?hand|book|grim|orb|cloak|shield/i, "offhand"],
  [/relic|libram|totem|idol/i, "relic"],
  [/sword|blade|krol|vis.?kag|mirah|deathbringer|frostbite/i, "sword"],
];

function iconFor(slot: string, item?: GearSlot["item"]): ItemIconKey {
  if (item) return item.icon;
  for (const [pattern, icon] of ICON_BY_NAME) {
    if (pattern.test(slot)) return icon;
  }
  return "relic";
}

interface AssignedSlot {
  slot: string;
  icon: ItemIconKey;
  bucket: Bucket;
  gear?: GearSlot;
}

function assignSlots(build: Build): { assigned: AssignedSlot[]; leftovers: GearSlot[] } {
  const canonical = build.game === "d4" ? CANONICAL_D4 : CANONICAL_FOREVER;
  const layout = build.game === "d4" ? D4_LAYOUT : FOREVER_LAYOUT;
  const assigned: AssignedSlot[] = canonical.map((c) => ({ ...c }));
  const used = new Set<string>();
  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

  for (const gear of build.gear) {
    const exact = assigned.find((a) => !used.has(a.slot) && norm(a.slot) === norm(gear.slot));
    if (exact) {
      exact.gear = gear;
      used.add(exact.slot);
    }
  }

  for (const gear of build.gear) {
    if (assigned.some((a) => a.gear === gear)) continue;
    for (const rule of layout) {
      if (!rule.pattern.test(gear.slot)) continue;
      const target = assigned.find((a) => a.bucket === rule.bucket && !a.gear && !used.has(a.slot));
      if (target) {
        target.gear = gear;
        used.add(target.slot);
        break;
      }
    }
  }

  const leftovers = build.gear.filter((g) => !assigned.some((a) => a.gear === g));
  return { assigned, leftovers };
}

function SlotButton({
  build,
  entry,
  align,
}: {
  build: Build;
  entry: AssignedSlot;
  align: "left" | "right" | "center";
}) {
  const gear = entry.gear;
  const icon = iconFor(entry.slot, gear?.item);
  const Icon = ITEM_ICONS[icon];
  return (
    <ItemSlot
      game={build.game}
      label={entry.slot}
      item={gear?.item}
      goal={gear?.target}
      affixes={gear?.affixes}
      icon={
        <span className="block h-7 w-7 sm:h-8 sm:w-8 [&>svg]:h-full [&>svg]:w-full">
          <Icon />
        </span>
      }
      align={align}
    />
  );
}

export function PaperDoll({ build }: { build: Build }) {
  const game = GAMES[build.game];
  const { assigned, leftovers } = assignSlots(build);
  const byBucket = (b: Bucket) => assigned.filter((a) => a.bucket === b);
  const isD4 = build.game === "d4";

  return (
    <div
      className={cn(
        "relative rounded-xl p-4 sm:p-5",
        isD4 ? "doll-frame-d4" : "doll-frame-forever",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className={cn("text-sm font-semibold tracking-widest text-ink uppercase", game.displayClass)}>
          {isD4 ? "Equipment" : "Character"}
        </p>
        <p className="text-[10px] tracking-wider text-ink-dim uppercase">
          {isD4 ? "Ancestral target · hover any slot" : "Raid-ready target · hover any slot"}
        </p>
      </div>

      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {byBucket("left").map((entry) => (
            <SlotButton key={entry.slot} build={build} entry={entry} align="left" />
          ))}
        </div>

        <div className="flex min-w-24 flex-1 flex-col items-center justify-end self-stretch pt-2">
          <CharacterSilhouette
            className={cn("h-36 w-24 sm:h-44 sm:w-28", isD4 ? "text-d4/50" : "text-forever-arcane/50")}
          />
          <div className="mt-4 flex gap-2.5 sm:gap-4">
            {byBucket("weapons").map((entry) => (
              <SlotButton key={entry.slot} build={build} entry={entry} align="center" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:gap-3">
          {byBucket("right").map((entry) => (
            <SlotButton key={entry.slot} build={build} entry={entry} align="right" />
          ))}
        </div>
      </div>

      {byBucket("bottom").length > 0 ? (
        <div className="mt-5 border-t border-white/5 pt-4">
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {byBucket("bottom").map((entry) => (
              <SlotButton
                key={entry.slot}
                build={build}
                entry={entry}
                align="center"
              />
            ))}
          </div>
        </div>
      ) : null}

      {leftovers.length > 0 ? (
        <div className="mt-5 border-t border-white/5 pt-4">
          <p className="eyebrow mb-2 text-ink-dim">Also prioritize</p>
          <ul className="space-y-1.5">
            {leftovers.map((g) => (
              <li key={g.slot} className="text-[13px] text-ink-muted">
                <span className="font-semibold text-(--accent-bright)">{g.slot}:</span> {g.target}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-4 text-[11px] leading-relaxed text-ink-dim">
        Tap or hover a slot for the full item card — stats are representative rolls tuned for
        this build; the sources section links the live guides for exact values.
      </p>
    </div>
  );
}
