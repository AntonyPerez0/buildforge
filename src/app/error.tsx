"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RotateCcw, ShieldAlert } from "lucide-react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div data-game="neutral" className="world-bg noise">
      <div className="mx-auto grid min-h-[70vh] max-w-2xl place-items-center px-4 text-center">
        <div className="space-y-5">
          <ShieldAlert className="mx-auto h-8 w-8 text-(--accent-bright)" />
          <h1 className="text-4xl font-bold tracking-tight text-ink">The forge went cold</h1>
          <p className="text-sm leading-relaxed text-ink-muted">
            Something broke on this page — probably our fault, not the meta&apos;s. Try again,
            or jump back to a world below.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg bg-(--accent) px-4 py-2 text-sm font-semibold text-base transition-transform hover:scale-[1.03]"
            >
              <RotateCcw className="h-4 w-4" /> Try again
            </button>
            <Link
              href="/"
              className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
            >
              Home
            </Link>
            <Link
              href="/d4"
              className="rounded-lg border border-d4/40 bg-d4/10 px-4 py-2 text-sm font-semibold text-d4-bright hover:bg-d4/20"
            >
              Diablo IV
            </Link>
            <Link
              href="/forever"
              className="rounded-lg border border-forever/40 bg-forever/10 px-4 py-2 text-sm font-semibold text-forever-bright hover:bg-forever/20"
            >
              WoW Forever
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
