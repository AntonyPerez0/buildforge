"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import type { Build } from "@/data/types";
import { buildHref } from "@/lib/builds";
import { getFavorites, toggleFavorite, FAVORITES_EVENT } from "@/lib/favorites";
import { GAMES } from "@/lib/games";

export function FavoritesBar({ builds }: { builds: Build[] }) {
  const [favIds, setFavIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refresh = () => setFavIds(getFavorites());
    const t = window.setTimeout(() => {
      refresh();
      setReady(true);
    }, 0);
    window.addEventListener(FAVORITES_EVENT, refresh);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(FAVORITES_EVENT, refresh);
    };
  }, []);

  const favorites = builds.filter((b) => favIds.includes(b.id));
  if (!ready || favorites.length === 0) return null;

  return (
    <div className="panel mb-6 flex flex-wrap items-center gap-2 border-(--accent-border)/40 p-3">
      <span className="eyebrow mr-1 inline-flex items-center gap-1.5 text-(--accent-bright)">
        <Star className="h-3.5 w-3.5 fill-current" /> Pinned
      </span>
      {favorites.map((b) => (
        <span
          key={b.id}
          className="inline-flex items-center overflow-hidden rounded-full border border-line bg-surface-raised"
        >
          <Link
            href={buildHref(b)}
            className="inline-flex items-center gap-1.5 py-1.5 pr-2 pl-3 text-xs font-medium text-ink hover:text-(--accent-bright)"
          >
            <span className={GAMES[b.game].id === "d4" ? "text-d4-bright" : "text-forever-bright"}>
              {GAMES[b.game].shortLabel}
            </span>
            {b.name}
          </Link>
          <button
            type="button"
            aria-label={`Unpin ${b.name}`}
            onClick={() => setFavIds(toggleFavorite(b.id))}
            className="grid h-6 w-6 place-items-center border-l border-line text-ink-dim transition-colors hover:text-d4-bright"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
    </div>
  );
}
