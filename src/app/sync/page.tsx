import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Database, ExternalLink, RefreshCw } from "lucide-react";
import { FadeUp } from "@/components/motion";
import { SectionHeading } from "@/components/ui-bits";
import { latestSyncDate } from "@/lib/snapshots";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nightly sync report",
  description:
    "What the BuildForge nightly pipeline found on its last run: guide indexes checked, links refreshed and newly discovered meta entries.",
};

interface TableRow {
  source: string;
  index: string;
  result: string;
}

function parseReport(md: string): { heading: string; rows: TableRow[]; notes: string[] } {
  const lines = md.split("\n");
  const rows: TableRow[] = [];
  const notes: string[] = [];
  let heading = "Nightly sync report";
  for (const line of lines) {
    if (line.startsWith("# ")) heading = line.slice(2).trim();
    if (line.startsWith("|")) {
      const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
      if (cells.length >= 3 && !/^[-\s:|]+$/.test(line)) {
        rows.push({ source: cells[0], index: cells[1], result: cells[2] });
      }
    } else if (line.trim() && !line.startsWith("#") && !line.startsWith("|") && !line.startsWith("---")) {
      notes.push(line.trim());
    }
  }
  return { heading, rows: rows.slice(1), notes };
}

export default async function SyncPage() {
  const md = await readFile(
    path.join(process.cwd(), "src/data/synced/sync-report.md"),
    "utf8",
  ).catch(() => "");
  const { heading, rows, notes } = parseReport(md);

  return (
    <div data-game="neutral" className="world-bg noise">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <FadeUp>
          <SectionHeading
            eyebrow="Transparency"
            title="Nightly sync report"
            sub="Exactly what the pipeline checked on its most recent run — robots-aware, rate-limited, attributed. The footer of every page shows this date."
          />
        </FadeUp>

        <FadeUp className="mt-8">
          <div className="panel flex flex-wrap items-center gap-3 p-4">
            <RefreshCw className="h-4 w-4 text-(--accent-bright)" />
            <span className="text-sm font-semibold text-ink">Last sync:</span>
            <span className="text-sm text-(--accent-bright)">{formatDate(latestSyncDate())}</span>
            <span className="ml-auto text-xs text-ink-dim">
              {heading.replace(/^BuildForge nightly sync — /, "")}
            </span>
          </div>
        </FadeUp>

        <FadeUp className="mt-6">
          <div className="panel overflow-hidden">
            {rows.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-surface-raised/50 text-[11px] tracking-wider text-ink-dim uppercase">
                      <th className="px-4 py-3 font-semibold">Source</th>
                      <th className="px-4 py-3 font-semibold">Index</th>
                      <th className="px-4 py-3 font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="border-b border-line/60 last:border-0">
                        <td className="px-4 py-3 font-semibold text-(--accent-bright)">{row.source}</td>
                        <td className="px-4 py-3 text-xs text-ink-muted">
                          <span className="inline-flex items-center gap-1.5">
                            {row.index}
                            {row.index.startsWith("http") ? (
                              <a href={row.index} target="_blank" rel="noopener noreferrer" aria-label="Open source index">
                                <ExternalLink className="h-3 w-3 text-ink-dim hover:text-(--accent-bright)" />
                              </a>
                            ) : null}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-ink">{row.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6">
                <p className="flex items-center gap-2 text-sm text-ink-muted">
                  <Database className="h-4 w-4 text-ink-dim" />
                  The report file hasn&apos;t been generated yet — it appears after the first
                  nightly run (or <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs">npm run sync</code> locally).
                </p>
              </div>
            )}
          </div>
        </FadeUp>

        {notes.length > 0 ? (
          <FadeUp className="mt-6">
            <div className="panel space-y-2 p-5">
              {notes.map((note, i) => (
                <p key={i} className="text-[13px] leading-relaxed text-ink-muted">
                  {note}
                </p>
              ))}
            </div>
          </FadeUp>
        ) : null}

        <FadeUp className="mt-8">
          <p className="text-xs leading-relaxed text-ink-dim">
            This page is generated at build time from{" "}
            <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs">src/data/synced/sync-report.md</code>{" "}
            — rewritten by every pipeline run. Curate newly discovered builds any time in{" "}
            <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs">curated-meta.json</code>.
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
