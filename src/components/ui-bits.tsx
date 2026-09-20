import { cn } from "@/lib/utils";
import { TIER_STYLES } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow text-ink-dim", className)}>{children}</p>;
}

export function TierBadge({ tier, size = "md" }: { tier: string; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border font-bold tracking-widest",
        TIER_STYLES[tier] ?? TIER_STYLES.C,
        size === "sm" ? "h-6 w-6 text-[11px]" : "h-8 w-8 text-sm",
      )}
      aria-label={`Tier ${tier}`}
    >
      {tier}
    </span>
  );
}

export function DifficultyDots({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Difficulty ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i <= level ? "bg-(--accent-bright)" : "bg-line-bright",
          )}
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
    <span
      className={cn(
        "accent-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  className,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {sub ? <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">{sub}</p> : null}
    </div>
  );
}
