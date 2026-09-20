import { ArrowUpRight } from "lucide-react";
import type { MetaSnapshot } from "@/data/types";

/**
 * Compact, navigable index for auto-discovered guides (tier pending curation).
 */
export function GuideIndexGrid({ snapshots }: { snapshots: MetaSnapshot[] }) {
  const sorted = [...snapshots].sort(
    (a, b) => a.className.localeCompare(b.className) || a.buildName.localeCompare(b.buildName),
  );
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((s) => (
        <a
          key={s.id}
          href={s.sources[0]?.url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="panel panel-hover group flex items-center justify-between gap-3 px-3.5 py-2.5"
        >
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-ink">{s.buildName}</p>
            <p className="text-[11px] text-ink-dim">
              {s.className} · {s.sources[0]?.site}
            </p>
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-dim transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent-bright)" />
        </a>
      ))}
    </div>
  );
}
