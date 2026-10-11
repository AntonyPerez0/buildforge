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

/** The header takes on the chrome of the world you're in. */
function sectionGame(pathname: string): "d4" | "forever" | "neutral" {
  if (pathname === "/d4" || pathname.startsWith("/d4/")) return "d4";
  if (pathname === "/forever" || pathname.startsWith("/forever/")) return "forever";
  return "neutral";
}

export function SiteHeader({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const game = sectionGame(pathname);

  return (
    <header data-game={game} className="site-header sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className="nav-link">
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <CommandPalette entries={searchIndex} />
          <Link href="/builder" className="btn btn-primary btn-sm hidden sm:inline-flex">
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
        <nav className="border-t border-line px-4 py-3 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn("nav-link py-2.5")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
