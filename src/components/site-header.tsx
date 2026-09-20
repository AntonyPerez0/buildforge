"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Hammer } from "lucide-react";
import { Logo } from "@/components/logo";
import { CommandPalette } from "@/components/command-palette";
import type { SearchEntry } from "@/lib/search-index";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/d4", label: "Diablo IV" },
  { href: "/forever", label: "WoW Forever" },
  { href: "/builder", label: "Builder" },
  { href: "/about", label: "About" },
];

export function SiteHeader({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-base/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active ? "bg-surface-raised text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <CommandPalette entries={searchIndex} />
          <Link
            href="/builder"
            className="hidden items-center gap-2 rounded-lg bg-(--accent, #8b87f4) px-3.5 py-1.5 text-sm font-semibold text-base shadow-[0_0_20px_-6px_var(--accent,#8b87f4)] transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <Hammer className="h-4 w-4" />
            Forge a build
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-muted md:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-line bg-base px-4 py-3 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
