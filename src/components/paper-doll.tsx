import Link from "next/link";
import { X as XIcon } from "lucide-react";
import type { Build, GearSlot, ItemIconKey } from "@/data/types";
import { cn } from "@/lib/utils";
import { CharacterSilhouette, ITEM_ICONS } from "@/components/item-icons";
import { ItemSlot } from "@/components/item-slot";
import { D4Ornament } from "@/components/ui-bits";

type Bucket = "left" | "right" | "weapons";

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
  { bucket: "left", pattern: /head|neck|shoulder|back|chest|shirt|tabard|wrist/i },
  { bucket: "right", pattern: /hands|gauntlet|waist|belt|legs|feet|boot|ring|finger|trinket/i },
  { bucket: "weapons", pattern: /relic|libram|totem|idol|wand|ranged|off-?hand|main hand|weapon|throw/i },
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

/** The Classic CharacterFrame order: eight slots down each side, weapons along the bottom. */
const CANONICAL_FOREVER: { slot: string; icon: ItemIconKey; bucket: Bucket }[] = [
  { slot: "Head", icon: "helm", bucket: "left" },
  { slot: "Neck", icon: "amulet", bucket: "left" },
  { slot: "Shoulders", icon: "shoulders", bucket: "left" },
  { slot: "Back", icon: "offhand", bucket: "left" },
  { slot: "Chest", icon: "chest", bucket: "left" },
  { slot: "Shirt", icon: "chest", bucket: "left" },
  { slot: "Tabard", icon: "chest", bucket: "left" },
  { slot: "Wrists", icon: "wrist", bucket: "left" },
  { slot: "Hands", icon: "hands", bucket: "right" },
  { slot: "Waist", icon: "belt", bucket: "right" },
  { slot: "Legs", icon: "legs", bucket: "right" },
  { slot: "Feet", icon: "feet", bucket: "right" },
  { slot: "Ring 1", icon: "ring", bucket: "right" },
  { slot: "Ring 2", icon: "ring", bucket: "right" },
  { slot: "Trinket 1", icon: "trinket", bucket: "right" },
  { slot: "Trinket 2", icon: "trinket", bucket: "right" },
  { slot: "Main Hand", icon: "sword", bucket: "weapons" },
  { slot: "Off-Hand", icon: "offhand", bucket: "weapons" },
  { slot: "Ranged", icon: "gun", bucket: "weapons" },
];

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
  compact = false,
}: {
  build: Build;
  entry: AssignedSlot;
  align: "left" | "right" | "center";
  compact?: boolean;
}) {
  const gear = entry.gear;
  const icon = gear?.item ? gear.item.icon : entry.icon;
  const Icon = ITEM_ICONS[icon];
  return (
    <ItemSlot
      game={build.game}
      label={entry.slot}
      item={gear?.item}
      goal={gear?.target}
      affixes={gear?.affixes}
      compact={compact}
      icon={
        <span
          className={cn(
            "block [&>svg]:h-full [&>svg]:w-full",
            compact ? "h-[22px] w-[22px]" : "h-7 w-7 sm:h-8 sm:w-8",
            compact && !gear && "opacity-35",
          )}
        >
          <Icon />
        </span>
      }
      align={align}
    />
  );
}

const ORDINALS = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

/**
 * WoW Classic CharacterFrame: portrait breaking the top-left corner, name
 * strip, gold level line, red close button, eight slots per side, model inset
 * with a stats panel, weapons along the bottom and tabs hanging below.
 */
function WowCharacterFrame({ build }: { build: Build }) {
  const { assigned, leftovers } = assignSlots(build);
  const byBucket = (b: Bucket) => assigned.filter((a) => a.bucket === b);
  const stats = build.statPriority.slice(0, 5);

  return (
    <div className="wow-cf-wrap">
      <div className="wow-cf">
        <div className="wow-cf-portrait" aria-hidden="true">
          <span>{build.className.charAt(0)}</span>
        </div>
        <div className="wow-cf-title">
          <span className="truncate">{build.name}</span>
        </div>
        <Link href="/forever#builds" className="wow-cf-close" aria-label="Close — back to build paths">
          <XIcon className="h-3.5 w-3.5" strokeWidth={3.5} />
        </Link>
        <div className="wow-cf-sub">
          <p>Level 60 {build.className}</p>
          <p className="truncate">{build.role}</p>
        </div>

        <div className="wow-cf-body">
          <div className="wow-cf-col">
            {byBucket("left").map((entry) => (
              <SlotButton key={entry.slot} build={build} entry={entry} align="left" compact />
            ))}
          </div>

          <div className="wow-cf-center">
            <div className="wow-cf-model">
              <CharacterSilhouette className="h-28 w-20 text-[#4e86d4]/45 sm:h-32 sm:w-24" />
            </div>
            <div className="wow-cf-stats">
              <p className="wow-cf-stats-head">Stat priority</p>
              <dl>
                {stats.map((s, i) => (
                  <div key={`${s.label}-${i}`} className="wow-cf-stat" title={s.note}>
                    <dt>{s.label}:</dt>
                    <dd>{ORDINALS[i]}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="wow-cf-weapons">
              {byBucket("weapons").map((entry) => (
                <SlotButton key={entry.slot} build={build} entry={entry} align="center" compact />
              ))}
            </div>
          </div>

          <div className="wow-cf-col">
            {byBucket("right").map((entry) => (
              <SlotButton key={entry.slot} build={build} entry={entry} align="right" compact />
            ))}
          </div>
        </div>

        {leftovers.length > 0 ? (
          <ul className="wow-cf-leftovers">
            {leftovers.map((g) => (
              <li key={g.slot}>
                <span>{g.slot}:</span> {g.target}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <nav className="wow-cf-tabs" aria-label="Character frame">
        <span className="wow-cf-tab" aria-current="page">
          Character
        </span>
        <a href="#level-path" className="wow-cf-tab">
          Talents
        </a>
        <a href="#stats" className="wow-cf-tab">
          Stats
        </a>
        <a href="#rotation" className="wow-cf-tab">
          Spells
        </a>
      </nav>
    </div>
  );
}

export function PaperDoll({ build }: { build: Build }) {
  if (build.game === "forever") return <WowCharacterFrame build={build} />;
  const { assigned, leftovers } = assignSlots(build);
  const byBucket = (b: Bucket) => assigned.filter((a) => a.bucket === b);

  return (
    <div className="doll-frame-d4 relative p-4 sm:p-5">
      <div className="mb-5 flex flex-col items-center gap-1 text-center">
        <p className="font-[family-name:var(--font-cinzel)] text-sm font-bold tracking-[0.3em] text-[#efe4d0] uppercase">
          Equipment
        </p>
        <D4Ornament className="w-44" />
        <p className="text-[10px] tracking-[0.14em] text-[#8a7f70] uppercase">Ancestral target · hover or tap any slot</p>
      </div>

      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {byBucket("left").map((entry) => (
            <SlotButton key={entry.slot} build={build} entry={entry} align="left" />
          ))}
        </div>

        <div className="flex min-w-24 flex-1 flex-col items-center justify-end self-stretch pt-2">
          <CharacterSilhouette className="h-36 w-24 text-[#6d110c] sm:h-44 sm:w-28" />
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

      <p className="mt-4 text-[11px] leading-relaxed text-[#8a7f70]">
        Tap or hover a slot for the full item card. Stats are representative rolls for this build — the sources
        section links the live guides for exact values.
      </p>
    </div>
  );
}
