"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Build } from "@/data/types";
import { BuildCard } from "@/components/build-card";

export function BuildExplorer({ builds }: { builds: Build[] }) {
  const [query, setQuery] = useState("");
  const [activeClass, setActiveClass] = useState<string | null>(null);

  const classes = useMemo(() => Array.from(new Set(builds.map((b) => b.className))), [builds]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return builds.filter((b) => {
      if (activeClass && b.className !== activeClass) return false;
      if (!q) return true;
      const haystack = `${b.name} ${b.className} ${b.role} ${b.tagline} ${b.tier}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [builds, query, activeClass]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-dim" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search builds…"
            className="field pl-9"
            aria-label="Search builds"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label="Filter by class">
          <button type="button" onClick={() => setActiveClass(null)} aria-pressed={activeClass === null} className="toggle">
            All
          </button>
          {classes.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveClass(activeClass === c ? null : c)}
              aria-pressed={activeClass === c}
              className="toggle"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <BuildCard key={b.id} build={b} />
          ))}
        </div>
      ) : (
        <div className="panel mt-6 p-10 text-center">
          <p className="text-sm text-ink-muted">No builds match that filter yet. Clear the search or pick another class.</p>
        </div>
      )}
    </div>
  );
}
