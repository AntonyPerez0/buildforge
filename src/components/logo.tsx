import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="BuildForge home">
      <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg border border-line bg-surface-raised">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
          <path
            d="M3 15h9l2 3H5l-2-3Zm11 3h6l1-2h-5l-2 2Zm-2-3 4.5-7.5L15 5l-5 7 2 3Z"
            stroke="url(#bf-grad)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="bf-grad" x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a5a1ff" />
              <stop offset="0.55" stopColor="#ef4652" />
              <stop offset="1" stopColor="#e4b54a" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-(--accent-glow)" />
      </span>
      <span className="text-[15px] font-bold tracking-tight text-ink">
        Build<span className="text-ink-dim font-semibold">Forge</span>
      </span>
    </Link>
  );
}
