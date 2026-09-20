"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, Search } from "lucide-react";
import type { SearchEntry } from "@/lib/search-index";
import { cn } from "@/lib/utils";

const GROUP_LABELS: Record<SearchEntry["type"], string> = {
  build: "Builds",
  guide: "Live guides",
  page: "Pages",
};

export function CommandPalette({ entries }: { entries: SearchEntry[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  function togglePalette(open: boolean) {
    setOpen(open);
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const inField =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePalette(!open);
        return;
      }
      if (e.key === "/" && !inField) {
        e.preventDefault();
        togglePalette(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries.slice(0, 24);
    const scored = entries
      .map((entry) => {
        const title = entry.title.toLowerCase();
        let score = -1;
        if (title.startsWith(q)) score = 100;
        else if (title.includes(q)) score = 60;
        else if (entry.keywords.includes(q)) score = 30;
        else {
          const tokens = q.split(/\s+/).filter(Boolean);
          if (tokens.length > 1 && tokens.every((t) => `${title} ${entry.keywords}`.includes(t))) score = 20;
        }
        return { entry, score };
      })
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score);
    return scored.slice(0, 24).map((r) => r.entry);
  }, [entries, query]);

  function navigate(entry: SearchEntry) {
    setOpen(false);
    if (entry.href.startsWith("http")) {
      window.open(entry.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(entry.href);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      navigate(results[active]);
    }
  }
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let lastGroup: string | null = null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        aria-label="Search (Ctrl+K)"
      >
        <Search className="h-4 w-4" />
        <kbd className="hidden text-[11px] font-medium text-ink-dim lg:inline">⌘K</kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[90] bg-base/70 px-4 pt-[10vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          role="presentation"
        >
          <div
            className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-line-bright bg-surface-raised shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-ink-dim" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search builds, guides, pages…"
                className="w-full bg-transparent py-3.5 text-[15px] text-ink placeholder:text-ink-dim focus:outline-none"
                aria-label="Search builds, guides, pages"
              />
              <kbd className="shrink-0 rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-dim">esc</kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-ink-dim">
                  Nothing matches that. Try a class name or spec.
                </p>
              ) : (
                results.map((entry, i) => {
                  const showGroup = entry.type !== lastGroup;
                  lastGroup = entry.type;
                  return (
                    <div key={`${entry.type}-${entry.href}-${entry.title}`}>
                      {showGroup ? (
                        <p className="eyebrow px-3 pb-1.5 pt-3 text-ink-dim">{GROUP_LABELS[entry.type]}</p>
                      ) : null}
                      <button
                        type="button"
                        data-index={i}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => navigate(entry)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left",
                          active === i ? "bg-(--accent-wash)" : "",
                        )}
                      >
                        <span className="min-w-0">
                          <span
                            className={cn(
                              "block truncate text-sm font-medium",
                              active === i ? "text-(--accent-bright)" : "text-ink",
                            )}
                          >
                            {entry.title}
                          </span>
                          <span className="block truncate text-xs text-ink-dim">{entry.subtitle}</span>
                        </span>
                        {active === i ? (
                          <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-(--accent-bright)" />
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-dim" />
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
