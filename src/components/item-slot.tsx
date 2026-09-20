"use client";

import { useState } from "react";
import type { GameId, ItemStatLine, ItemVisual } from "@/data/types";
import { qualityColor, TONE_COLORS_D4, TONE_COLORS_WOW, type StatTone } from "@/lib/item-visuals";
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
  const color = item ? qualityColor(item.quality) : "#4a4a56";

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
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
          "slot-frame group grid h-14 w-14 place-items-center rounded-md text-lg transition-all hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-bright)/60 sm:h-16 sm:w-16",
          !item && "slot-frame-empty",
        )}
        style={{ "--slot-color": color } as React.CSSProperties}
      >
        <span
          className="transition-transform duration-200 group-hover:scale-110"
          style={{ color: item ? color : undefined }}
        >
          {icon}
        </span>
      </button>

      <span
        className="mt-1 block text-center text-[10px] font-medium tracking-wide text-ink-dim"
        aria-hidden="true"
      >
        {label}
      </span>

      {item ? (
        <div
          className={cn(
            "z-[70] w-[290px] sm:w-[320px]",
            "max-sm:fixed max-sm:inset-x-3 max-sm:bottom-3 max-sm:w-auto",
            // Desktop placement
            align === "left" && "max-sm:fixed sm:absolute sm:left-full sm:top-0 sm:ml-3",
            align === "right" && "max-sm:fixed sm:absolute sm:right-full sm:top-0 sm:mr-3",
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
  const tones = game === "d4" ? TONE_COLORS_D4 : TONE_COLORS_WOW;
  const toneColor = (tone: StatTone | undefined) => tones[tone ?? "bonus"];
  const displayClass = game === "d4" ? "display-d4" : "display-forever";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md p-4 text-left shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)]",
        game === "d4" ? "tooltip-d4" : "tooltip-wow",
      )}
    >
      <p className={cn("text-[17px] leading-snug font-semibold", displayClass)} style={{ color: qualityColor(item.quality) }}>
        {item.name}
      </p>
      <p className="mt-0.5 text-[13px]" style={{ color: qualityColor(item.quality) }}>
        {item.type}
      </p>
      {item.itemPower ? (
        <p className="mt-1 text-[13px] text-(--tooltip-base)">{item.itemPower}</p>
      ) : null}
      {item.armor ? (
        <p className="text-[13px] text-(--tooltip-base)">{item.armor}</p>
      ) : null}

      <div className="my-2.5 h-px w-full opacity-40" style={{ background: "currentColor", color: "#6a6880" }} />

      <ul className="space-y-1">
        {item.stats.map((line: ItemStatLine, i) => (
          <li
            key={i}
            className={cn("text-[13px] leading-snug", line.tone === "flavor" && "italic")}
            style={{ color: toneColor(line.tone) }}
          >
            {line.text}
          </li>
        ))}
      </ul>

      {goal ? (
        <div className="mt-3 border-t border-white/5 pt-2.5">
          <p className="text-[10px] font-semibold tracking-widest text-ink-dim uppercase">What to look for</p>
          <p className="mt-1 text-[12px] leading-snug text-ink-muted">{goal}</p>
          {affixes && affixes.length > 0 ? (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {affixes.map((a) => (
                <span key={a} className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] text-ink-muted">
                  {a}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/5 pt-2">
        <span className="text-[10px] text-ink-dim">{item.source ?? slotLabel}</span>
      </div>
      <p className="mt-1 text-[10px] leading-snug text-ink-dim">
        Representative stats — verify live values in the linked guide.
      </p>
    </div>
  );
}
