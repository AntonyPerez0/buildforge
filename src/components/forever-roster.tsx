"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play, Star, X as XIcon } from "lucide-react";
import type { Build, MetaSnapshot } from "@/data/types";
import { buildHref } from "@/lib/builds";
import { getFavorites, toggleFavorite, FAVORITES_EVENT } from "@/lib/favorites";
import { GAMES } from "@/lib/games";

/** Classic-era WoW class colors (canonical values), brightened for dark backgrounds. */
const CLASS_COLORS: Record<string, string> = {
  Warrior: "#c69b6d",
  Paladin: "#f48cba",
  Hunter: "#aad372",
  Rogue: "#fff569",
  Priest: "#ffffff",
  Shaman: "#4a9fe3",
  Mage: "#68ccef",
  Warlock: "#9382c9",
  Druid: "#ff7d0a",
  Monk: "#00ff96",
  "Death Knight": "#c41f3e",
  "Demon Hunter": "#a330c9",
  Evoker: "#33937f",
};

const TIER_COLORS: Record<string, string> = {
  S: "#ffc24b",
  A: "#6ecf8e",
  B: "#7fa8e0",
  C: "#9a98a0",
};

const CLASS_ORDER = GAMES.forever.classOrder;
const classRank = (className: string) => {
  const i = CLASS_ORDER.indexOf(className);
  return i === -1 ? CLASS_ORDER.length : i;
};

/** Parchment scroll with wax seal in a gold-ringed medallion. Hand-drawn — no Blizzard assets. */
function ScrollBadge() {
  return (
    <div className="wow-badge" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="11" y="9" width="26" height="6" rx="3" fill="#c8b487" />
        <rect x="14" y="12" width="20" height="24" fill="#e9dcb4" />
        <rect x="17" y="16" width="14" height="2" rx="1" fill="#9c8d66" />
        <rect x="17" y="20" width="14" height="2" rx="1" fill="#9c8d66" />
        <rect x="17" y="24" width="9" height="2" rx="1" fill="#9c8d66" />
        <rect x="11" y="33" width="26" height="6" rx="3" fill="#d8c69a" />
        <circle cx="31" cy="29" r="5.5" fill="#a3231b" />
        <circle cx="31" cy="29" r="3" fill="#7a1508" />
      </svg>
    </div>
  );
}

/**
 * The Forever hub as a classic WoW guild roster: authored builds are the
 * members (gold names, class-colored classes), the live guide index hides
 * behind the "Show Live Guides" checkbox like offline members, and the
 * bottom tabs navigate the Forever section.
 */
export function ForeverRoster({ builds, guides }: { builds: Build[]; guides: MetaSnapshot[] }) {
  const [favIds, setFavIds] = useState<string[]>([]);
  const [showGuides, setShowGuides] = useState(false);

  useEffect(() => {
    const refresh = () => setFavIds(getFavorites());
    const t = window.setTimeout(refresh, 0);
    window.addEventListener(FAVORITES_EVENT, refresh);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(FAVORITES_EVENT, refresh);
    };
  }, []);

  const sorted = [...builds].sort(
    (a, b) => classRank(a.className) - classRank(b.className) || a.name.localeCompare(b.name),
  );
  const sortedGuides = [...guides].sort(
    (a, b) => classRank(a.className) - classRank(b.className) || a.buildName.localeCompare(b.buildName),
  );
  const game = GAMES.forever;

  return (
    <div>
      <div className="wow-frame">
        <div className="wow-head">
          <ScrollBadge />
          <div className="wow-titlebar">WoW Forever</div>
          <Link href="/" aria-label="Close — back to home" className="wow-close">
            <XIcon className="h-5 w-5" strokeWidth={3.5} />
          </Link>
        </div>

        <div className="wow-checkrow">
          <label className="wow-check">
            <span>Show Live Guides</span>
            <input
              type="checkbox"
              checked={showGuides}
              onChange={(e) => setShowGuides(e.target.checked)}
            />
          </label>
        </div>

        <div className="wow-grid wow-colhead" aria-hidden="true">
          <span>Name</span>
          <span className="wow-col-role">Role</span>
          <span className="wow-col-tier">Tier</span>
          <span>Class</span>
          <span />
        </div>

        <ul className="wow-rows">
          {sorted.map((b) => {
            const isFav = favIds.includes(b.id);
            return (
              <li key={b.id} className="wow-grid wow-row relative">
                <Link href={buildHref(b)} aria-label={b.name} className="absolute inset-0 z-0">
                  <span className="sr-only">{b.name}</span>
                </Link>
                <span className="wow-name relative z-10 pointer-events-none">{b.name}</span>
                <span className="wow-zone wow-cell-role relative z-10 pointer-events-none">
                  {b.role}
                </span>
                <span
                  className="wow-lvl relative z-10 pointer-events-none"
                  style={{ color: TIER_COLORS[b.tier] ?? "#e6e0d3" }}
                >
                  {b.tier}
                </span>
                <span
                  className="wow-class relative z-10 pointer-events-none"
                  style={{ color: CLASS_COLORS[b.className] ?? "#ffffff" }}
                >
                  {b.className}
                </span>
                <button
                  type="button"
                  aria-pressed={isFav}
                  aria-label={isFav ? `Unpin ${b.name}` : `Pin ${b.name} to favorites`}
                  onClick={() => setFavIds(toggleFavorite(b.id))}
                  className="wow-star relative z-10"
                >
                  <Star className={isFav ? "h-3.5 w-3.5 fill-current" : "h-3.5 w-3.5"} />
                </button>
              </li>
            );
          })}

          {showGuides
            ? sortedGuides.map((g) => (
                <li key={g.id} className="wow-grid wow-row relative" data-guide="true">
                  <a
                    href={g.sources[0]?.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${g.buildName} — live guide on ${g.sources[0]?.site ?? "source site"}`}
                    className="absolute inset-0 z-0"
                  >
                    <span className="sr-only">{g.buildName}</span>
                  </a>
                  <span className="wow-name relative z-10 pointer-events-none">{g.buildName}</span>
                  <span className="wow-zone wow-cell-role relative z-10 pointer-events-none">
                    {g.sources[0]?.site ?? "Guide"}
                  </span>
                  <span className="wow-lvl relative z-10 pointer-events-none">—</span>
                  <span
                    className="wow-class relative z-10 pointer-events-none"
                    style={{ color: CLASS_COLORS[g.className] ?? "#ffffff" }}
                  >
                    {g.className}
                  </span>
                  <span />
                </li>
              ))
            : null}
        </ul>

        <div className="wow-counts">
          <p>
            <span className="wow-count-gold">{builds.length}</span> Build Paths{" "}
            <span className="wow-count-green">({guides.length} Live Guides)</span>
          </p>
          <Link href="/forever/launch" className="wow-status">
            Beta Status
            <span className="wow-go" aria-hidden="true">
              <Play className="h-3 w-3 fill-current" />
            </span>
          </Link>
        </div>

        <div className="wow-motd">
          <p className="wow-motd-head">Message of the Day</p>
          <p>{game.description}</p>
        </div>

        <div className="wow-actions">
          <Link href="/forever/launch" className="wow-redbtn">
            Launch Checklist
          </Link>
          <Link href="/builder" className="wow-redbtn">
            Forge a Build
          </Link>
          <button
            type="button"
            aria-pressed={showGuides}
            onClick={() => setShowGuides((v) => !v)}
            className="wow-redbtn"
          >
            Live Guides
          </button>
        </div>
      </div>

      <nav className="wow-tabs" aria-label="Forever section">
        <Link href="/d4" className="wow-tab">
          D4
        </Link>
        <Link href="/forever" aria-current="page" className="wow-tab">
          Builds
        </Link>
        <Link href="/forever/launch" className="wow-tab">
          Launch
        </Link>
        <Link href="/about" className="wow-tab">
          About
        </Link>
      </nav>
    </div>
  );
}
