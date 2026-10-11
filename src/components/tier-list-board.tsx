"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Tier, TierListMeta } from "@/data/types";
import { TierBadge } from "@/components/ui-bits";
import { formatDate } from "@/lib/utils";

export interface BoardRow {
  build: string;
  className: string;
  href: string;
  external: boolean;
  /** BuildForge level path for this build, if we have one. */
  pathHref?: string;
  /** Placement on the other lists, e.g. "Icy Veins S". */
  elsewhere: { label: string; tier: Tier }[];
}

export interface BoardList {
  meta: TierListMeta;
  groups: { tier: Tier; rows: BoardRow[] }[];
  total: number;
}

/** A D4-menu tier board — one tab per Maxroll / Icy Veins list. */
export function TierListBoard({ lists }: { lists: BoardList[] }) {
  const [active, setActive] = useState(0);
  const list = lists[active];
  if (!list) return null;
  const { meta } = list;

  return (
    <div className="panel overflow-hidden">
      <div className="tabbar-shell !static !mx-0 border-b px-2" role="tablist" aria-label="Tier lists">
        <div className="tabbar">
          {lists.map((l, i) => (
            <button
              key={l.meta.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className="tab"
              onClick={() => setActive(i)}
            >
              {l.meta.site} · {l.meta.list}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <p className="text-xs text-ink-dim">
          <span className="font-semibold text-ink">
            {meta.site} {meta.list} tier list
          </span>
          {meta.sourceUpdated ? ` · updated by ${meta.site} ${formatDate(meta.sourceUpdated)}` : ""}
          {` · ${meta.status === "auto" ? "read" : "verified"} by BuildForge ${formatDate(meta.checkedAt)}`}
          {` · ${list.total} builds shown`}
        </p>
        <a href={meta.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
          Full list on {meta.site} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div role="tabpanel" className="relative">
        {list.groups.map((g) => (
          <div key={g.tier} className="d4-tier-row" style={{ "--tier": `var(--color-tier-${g.tier.toLowerCase()})` } as React.CSSProperties}>
            <div className="d4-tier-label py-4">
              <TierBadge tier={g.tier} size="lg" />
            </div>
            <ul className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-3">
              {g.rows.map((row) => (
                <li key={`${row.build}-${row.href}`} className="min-w-0">
                  <div className="flex items-stretch gap-1">
                    <a
                      href={row.href}
                      target={row.external ? "_blank" : undefined}
                      rel={row.external ? "noopener noreferrer" : undefined}
                      className="d4-entry min-w-0 flex-1"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="d4-entry-name block">{row.build}</span>
                        <span className="d4-entry-class block">
                          {row.className}
                          {row.elsewhere.map((e) => ` · ${e.label} ${e.tier}`).join("")}
                        </span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#6b5340]" />
                    </a>
                    {row.pathHref ? (
                      <Link href={row.pathHref} className="d4-path-flag grid place-items-center" title="BuildForge level path">
                        Path
                      </Link>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {meta.note ? (
        <p className="relative border-t border-line px-4 py-3 text-xs leading-relaxed text-ink-dim sm:px-5">{meta.note}</p>
      ) : null}
    </div>
  );
}
