import type { SourceTier } from "@/data/types";
import type { HeadlineTier } from "@/lib/tiers";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("sh-eyebrow", className)}>{children}</p>;
}

/** Tier letter — rounded square (neutral), faceted gem (D4), gold-ringed medallion (Forever). */
export function TierBadge({ tier, size = "md", className }: { tier: string; size?: "sm" | "md" | "lg"; className?: string }) {
  return (
    <span
      className={cn("tier-badge", size === "sm" && "tier-badge-sm", size === "lg" && "tier-badge-lg", className)}
      data-tier={tier}
      aria-label={`Tier ${tier}`}
    >
      {tier}
    </span>
  );
}

/** Tier badge plus the list it comes from ("Maxroll Endgame" / "BuildForge rating"). */
export function HeadlineBadge({ headline, size = "md" }: { headline: HeadlineTier; size?: "md" | "lg" }) {
  return (
    <span className="inline-flex items-center gap-2" title={`Tier ${headline.tier} · ${headline.basis}`}>
      <TierBadge tier={headline.tier} size={size} />
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-ink-dim uppercase">
          {headline.fromSource ? "Tier" : "Rating"}
        </span>
        <span className="text-[11px] text-ink-muted">{headline.basis}</span>
      </span>
    </span>
  );
}

/** "Maxroll · S" pills, each linking to the tier list (or guide) it was read from. */
export function SourceTierPills({
  tiers,
  className,
  showList = true,
  emptyLabel,
}: {
  tiers: SourceTier[];
  className?: string;
  showList?: boolean;
  emptyLabel?: string;
}) {
  if (tiers.length === 0) {
    return emptyLabel ? (
      <span className={cn("src-tier", className)} data-tier="none">
        <span className="src-tier-site">{emptyLabel}</span>
        <span className="src-tier-letter">—</span>
      </span>
    ) : null;
  }
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-1.5", className)}>
      {tiers.map((t) => (
        <a
          key={t.listId}
          href={t.listUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="src-tier"
          data-tier={t.tier}
          title={`${t.site} ${t.list} tier list · ${t.auto ? "read" : "verified"} ${t.checkedAt}`}
        >
          <span className="src-tier-site">
            {t.site}
            {showList ? ` ${t.list}` : ""}
          </span>
          <span className="src-tier-letter">{t.tier}</span>
        </a>
      ))}
    </span>
  );
}

export function DifficultyDots({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Difficulty ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn("h-1.5 w-1.5 rotate-45", i <= level ? "bg-(--accent-bright)" : "bg-line-bright")}
        />
      ))}
    </span>
  );
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function AccentChip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("accent-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", className)}>
      {children}
    </span>
  );
}

/**
 * Section heading — themed by the surrounding [data-game]: Cinzel capitals
 * over an ornamental rule (D4), FrameXML gold (Forever), clean sans (neutral).
 */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  className,
  center,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("space-y-2", center && "flex flex-col items-center text-center", className)}>
      <p className="sh-eyebrow">{eyebrow}</p>
      <h2 className="sh-title">{title}</h2>
      <span aria-hidden className={cn("sh-rule", center && "mx-auto")} />
      {sub ? <p className="sh-sub pt-1">{sub}</p> : null}
    </div>
  );
}

/** D4 ornamental divider: rule — diamond — rule, with thorned end caps. Hand-drawn SVG. */
export function D4Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 16" className={cn("h-4 w-60", className)} fill="none" aria-hidden="true">
      <path d="M8 8h92 M140 8h92" stroke="#a8865f" strokeOpacity="0.7" />
      <path d="M0 8l4-2.5v5L0 8Z M240 8l-4-2.5v5l4-2.5Z" fill="#6b5340" />
      <path d="M100 8l6-3v6l-6-3Z M140 8l-6-3v6l6-3Z" fill="#a8865f" />
      <path d="M120 1l7 7-7 7-7-7 7-7Z" stroke="#a8865f" />
      <path d="M120 4.5l3.5 3.5-3.5 3.5-3.5-3.5 3.5-3.5Z" fill="#c62a20" />
    </svg>
  );
}
