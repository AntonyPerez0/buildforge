"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function FavoriteStar({
  buildId,
  className,
}: {
  buildId: string;
  className?: string;
}) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setFav(isFavorite(buildId)), 0);
    return () => window.clearTimeout(t);
  }, [buildId]);

  return (
    <button
      type="button"
      aria-pressed={fav}
      aria-label={fav ? `Remove ${buildId} from favorites` : `Add ${buildId} to favorites`}
      title={fav ? "Remove from favorites" : "Pin to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setFav(toggleFavorite(buildId).includes(buildId));
      }}
      className={cn(
        "z-10 grid h-8 w-8 place-items-center rounded-lg border transition-all",
        fav
          ? "border-tier-s/50 bg-tier-s/10 text-tier-s"
          : "border-line bg-surface/80 text-ink-dim opacity-0 hover:text-tier-s focus-visible:opacity-100 group-hover:opacity-100 sm:opacity-0",
        className,
      )}
    >
      <Star className={cn("h-4 w-4", fav && "fill-current")} />
    </button>
  );
}
