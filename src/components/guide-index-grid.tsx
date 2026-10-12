"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { SourceName, Tier } from "@/data/types";

export interface GuideIndexEntry {
  id: string;
  name: string;
  className: string;
  sources: { site: SourceName; url: string }[];
  /** Best placement across the tier lists, if any. */
  tier?: { tier: Tier; label: string };
}

/**
 * Every guide the nightly sync indexed, grouped by class and filterable by
 * site — a D4 codex-style list.
 */
export function GuideIndexGrid({ entries, classOrder }: { entries: GuideIndexEntry[]; classOrder: string[] }) {
  const sites = useMemo(
    () => Array.from(new Set(entries.flatMap((e) => e.sources.map((s) => s.site)))),
    [entries],
  );
  const [site, setSite] = useState<SourceName | null>(null);
  const [cls, setCls] = useState<string | null>(null);

  const classes = useMemo(() => {
    const present = Array.from(new Set(entries.map((e) => e.className)));
    return present.sort((a, b) => rank(classOrder, a) - rank(classOrder, b));
  }, [entries, classOrder]);

  const filtered = entries.filter(
    (e) => (!site || e.sources.some((s) => s.site === site)) && (!cls || e.className === cls),
  );
  const groups = classes
    .map((c) => ({ c, rows: filtered.filter((e) => e.className === c).sort((a, b) => a.name.localeCompare(b.name)) }))
    .filter((g) => g.rows.length > 0);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by site">
          <button type="button" className="toggle" aria-pressed={site === null} onClick={() => setSite(null)}>
            All sites · {entries.length}
          </button>
          {sites.map((s) => (
            <button key={s} type="button" className="toggle" aria-pressed={site === s} onClick={() => setSite(site === s ? null : s)}>
              {s} · {entries.filter((e) => e.sources.some((x) => x.site === s)).length}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by class">
          <button type="button" className="toggle" aria-pressed={cls === null} onClick={() => setCls(null)}>
            All classes
          </button>
          {classes.map((c) => (
            <button key={c} type="button" className="toggle" aria-pressed={cls === c} onClick={() => setCls(cls === c ? null : c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <section key={g.c} aria-label={g.c}>
            <h3 className="d4-class-head">
              {g.c} <span className="text-[10px] tracking-normal text-[#8a7f70]">{g.rows.length}</span>
            </h3>
            <ul className="mt-3 space-y-1.5">
              {g.rows.map((e) => {
                const primary = (site && e.sources.find((s) => s.site === site)) || e.sources[0];
                return (
                  <li key={e.id}>
                    <a href={primary?.url ?? "#"} target="_blank" rel="noopener noreferrer" className="d4-entry group">
                      <span className="min-w-0 flex-1">
                        <span className="d4-entry-name block">{e.name}</span>
                        <span className="d4-entry-class block">{e.sources.map((s) => s.site).join(" · ")}</span>
                      </span>
                      {e.tier ? (
                        <span className="src-tier shrink-0" data-tier={e.tier.tier} title={e.tier.label}>
                          <span className="src-tier-letter !border-l-0">{e.tier.tier}</span>
                        </span>
                      ) : null}
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#6b5340] transition-colors group-hover:text-[#e5533f]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function rank(order: string[], c: string) {
  const i = order.indexOf(c);
  return i === -1 ? order.length : i;
}
