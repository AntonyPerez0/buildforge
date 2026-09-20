import type { GameId } from "@/data/types";
import { BUILDS, buildHref } from "@/lib/builds";
import { SNAPSHOTS } from "@/lib/snapshots";
import { GAMES } from "@/lib/games";

export interface SearchEntry {
  type: "build" | "guide" | "page";
  title: string;
  subtitle: string;
  href: string;
  game?: GameId;
  keywords: string;
}

/**
 * Server-built compact search index — passed to the client command palette
 * so the full build objects never ship in the client bundle.
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const build of BUILDS) {
    entries.push({
      type: "build",
      title: build.name,
      subtitle: `${GAMES[build.game].label} · ${build.className} · ${build.role} · Tier ${build.tier}`,
      href: buildHref(build),
      game: build.game,
      keywords: [build.className, build.role, build.tagline, build.tier, build.game]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const snap of SNAPSHOTS) {
    entries.push({
      type: "guide",
      title: snap.buildName,
      subtitle: `${GAMES[snap.game].label} · ${snap.className} · live guide${snap.tier ? ` · Tier ${snap.tier}` : ""}`,
      href: snap.sources[0]?.url ?? "#",
      game: snap.game,
      keywords: [snap.className, snap.game, snap.summary].join(" ").toLowerCase(),
    });
  }

  for (const [title, subtitle, href] of [
    ["Diablo IV hub", "Season 15 build paths & live meta", "/d4"],
    ["WoW Forever hub", "Classic+ build paths & guide index", "/forever"],
    ["Forever launch hub", "Day-one checklist, new dungeons, Dec 9 raids", "/forever/launch"],
    ["Custom Build Forge", "Fork, edit and share your own builds", "/builder"],
    ["Nightly sync report", "What the pipeline found on its last run", "/sync"],
    ["About & data pipeline", "How BuildForge stays fresh", "/about"],
  ] as const) {
    entries.push({ type: "page", title, subtitle, href, keywords: `${title} ${subtitle}`.toLowerCase() });
  }

  return entries;
}
