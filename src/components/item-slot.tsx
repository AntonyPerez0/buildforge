"use client";

import { useState } from "react";
import type { GameId, ItemStatLine, ItemVisual } from "@/data/types";
import { qualityColor, slotGlowColor, TONE_COLORS_D4, TONE_COLORS_WOW, type StatTone } from "@/lib/item-visuals";
import { cn } from "@/lib/utils";

interface ItemSlotProps {
  game: GameId;
  label: string;
  item?: ItemVisual;
  icon: React.ReactNode;
  align?: "left" | "right" | "center";
  goal?: string;
  affixes?: string[];
}

export function ItemSlot({ game, label, item, icon, align = "center", goal, affixes }: ItemSlotProps) {
  const [open, setOpen] = useState(false);
  const color = item ? slotGlowColor(item.quality, game) : "#4a4a56";
  const isD4 = game === "d4";

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-label={item ? `${label}: ${item.name}. Show item details.` : `${label} slot`}
        aria-expanded={open}
        onClick={() => {
          if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) return;
          setOpen((v) => !v);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={cn(
          "group grid h-14 w-14 place-items-center text-lg transition-all sm:h-16 sm:w-16",
          isD4 ? "slot-d4" : "slot-wow",
          !item && "slot-frame-empty",
        )}
        style={{ "--slot-color": color } as React.CSSProperties}
      >
        <span className="transition-transform duration-200 group-hover:scale-110" style={{ color: item ? color : undefined }}>
          {icon}
        </span>
      </button>

      <span
        className={cn(
          "mt-1 block text-center text-[10px] font-medium tracking-wide",
          isD4 ? "font-[family-name:var(--font-cinzel)] font-bold tracking-[0.08em] text-[#8a7f70] uppercase" : "text-[#ffd100] [text-shadow:1px_1px_0_#000]",
        )}
        aria-hidden="true"
      >
        {label}
      </span>

      {item ? (
        <div
          className={cn(
            "z-[70] w-[290px] sm:w-[320px]",
            "max-sm:fixed max-sm:inset-x-3 max-sm:bottom-3 max-sm:w-auto",
            align === "left" && "max-sm:fixed sm:absolute sm:top-0 sm:left-full sm:ml-3",
            align === "right" && "max-sm:fixed sm:absolute sm:top-0 sm:right-full sm:mr-3",
            align === "center" && "max-sm:fixed sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2",
            open ? "block" : "hidden",
          )}
          role="tooltip"
        >
          <ItemTooltip game={game} item={item} goal={goal} affixes={affixes} slotLabel={label} />
        </div>
      ) : null}
    </div>
  );
}

export function ItemTooltip({
  game,
  item,
  goal,
  affixes,
  slotLabel,
}: {
  game: GameId;
  item: ItemVisual;
  goal?: string;
  affixes?: string[];
  slotLabel?: string;
}) {
  return game === "d4" ? (
    <D4Tooltip item={item} goal={goal} affixes={affixes} slotLabel={slotLabel} />
  ) : (
    <WowTooltip item={item} goal={goal} affixes={affixes} slotLabel={slotLabel} />
  );
}

interface TooltipBodyProps {
  item: ItemVisual;
  goal?: string;
  affixes?: string[];
  slotLabel?: string;
}

/** Diablo IV item card: rarity-lit header, diamond affix bullets, ornamental rules. */
function D4Tooltip({ item, goal, affixes, slotLabel }: TooltipBodyProps) {
  const rarity = qualityColor(item.quality, "d4");
  const tone = (t: StatTone | undefined) => TONE_COLORS_D4[t ?? "bonus"];
  return (
    <div className="tooltip-d4 p-4 text-left" style={{ "--rarity": rarity } as React.CSSProperties}>
      <p className="tooltip-d4-name text-[17px] leading-snug" style={{ color: rarity }}>
        {item.name}
      </p>
      <p className="mt-0.5 text-[12.5px]" style={{ color: rarity }}>
        {item.type}
      </p>
      {item.itemPower ? <p className="mt-1.5 text-[13px] font-semibold text-[#efe4d0]">{item.itemPower}</p> : null}
      {item.armor ? <p className="text-[13px] text-(--tooltip-base)">{item.armor}</p> : null}

      <div className="tooltip-d4-rule" aria-hidden />

      <ul className="space-y-1.5">
        {item.stats.map((line: ItemStatLine, i) => (
          <li
            key={i}
            className={cn(
              "text-[13px] leading-snug",
              line.tone === "flavor" ? "italic" : "tooltip-d4-affix",
            )}
            style={{ color: tone(line.tone) }}
          >
            <span>{line.text}</span>
          </li>
        ))}
      </ul>
      {item.flavor ? <p className="mt-2 text-[12px] leading-snug text-[#b69e7a] italic">{item.flavor}</p> : null}

      {goal ? (
        <>
          <div className="tooltip-d4-rule" aria-hidden />
          <p className="font-[family-name:var(--font-cinzel)] text-[10px] font-bold tracking-[0.16em] text-[#a8865f] uppercase">
            What to look for
          </p>
          <p className="mt-1 text-[12px] leading-snug text-[#b0a493]">{goal}</p>
          {affixes && affixes.length > 0 ? (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {affixes.map((a) => (
                <span key={a} className="border border-[#3a2f28] bg-[#15110e] px-1.5 py-0.5 text-[11px] text-[#c8bba6]">
                  {a}
                </span>
              ))}
            </div>
          ) : null}
        </>
      ) : null}

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#2a221d] pt-2">
        <span className="text-[10px] text-[#8a7f70]">{item.source ?? slotLabel}</span>
      </div>
      <p className="mt-1 text-[10px] leading-snug text-[#6f6559]">Representative rolls — verify live values in the linked guide.</p>
    </div>
  );
}

/** Classic GameTooltip: quality-colored name, white stats, green Equip lines, gold flavor quote. */
function WowTooltip({ item, goal, affixes, slotLabel }: TooltipBodyProps) {
  const quality = qualityColor(item.quality, "forever");
  const tone = (t: StatTone | undefined) => TONE_COLORS_WOW[t ?? "bonus"];
  const [slotText, kindText] = splitWowType(item.type, slotLabel);
  return (
    <div className="tooltip-wow p-3.5 text-left">
      <p className="text-[16px] leading-snug" style={{ color: quality, textShadow: "1px 1px 0 #000" }}>
        {item.name}
      </p>
      <p className="flex justify-between gap-4 text-[13px] text-white">
        <span>{slotText}</span>
        {kindText ? <span>{kindText}</span> : null}
      </p>
      {item.armor ? <p className="text-[13px] text-white">{item.armor}</p> : null}
      <ul className="mt-0.5 space-y-0.5">
        {item.stats.map((line: ItemStatLine, i) => (
          <li key={i} className="text-[13px] leading-snug" style={{ color: tone(line.tone) }}>
            {line.text}
          </li>
        ))}
      </ul>
      {item.flavor ? <p className="mt-1.5 font-sans text-[12px] leading-snug text-[#ffd100]">{item.flavor}</p> : null}

      {goal ? (
        <div className="mt-2.5 border-t border-white/15 pt-2">
          <p className="text-[12px] text-[#ffd100]">What to look for</p>
          <p className="mt-0.5 font-sans text-[12px] leading-snug text-[#d8d8e0]">{goal}</p>
          {affixes && affixes.length > 0 ? (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {affixes.map((a) => (
                <span key={a} className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-sans text-[11px] text-[#d8d8e0]">
                  {a}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="mt-2 text-[12px] text-[#1eff00]">{item.source ? `Source: ${item.source}` : slotLabel}</p>
      <p className="mt-1 font-sans text-[10px] leading-snug text-[#9a9aae]">Representative stats — verify live values in the linked guide.</p>
    </div>
  );
}

/** "Epic Plate Bracers" → ["Wrist", "Plate"]-style split for the two-column tooltip line. */
function splitWowType(type: string, slotLabel?: string): [string, string | null] {
  const armor = type.match(/\b(Cloth|Leather|Mail|Plate)\b/i)?.[1];
  const weapon = type.match(/\b(Sword|Axe|Mace|Dagger|Staff|Polearm|Bow|Gun|Crossbow|Wand|Fist Weapon|Shield|Idol|Libram|Totem)\b/i)?.[1];
  const slot = slotLabel?.replace(/\s*\d+$/, "") ?? type;
  return [slot, armor ?? weapon ?? null];
}
