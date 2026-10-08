import type { Build, GameId } from "@/data/types";
import { BUILDS, getBuild } from "@/lib/builds";

const STORAGE_KEY = "buildforge.custom-builds.v1";

export type CustomBuild = Build;

function uid(): string {
  return `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function emptyBuild(game: GameId): CustomBuild {
  const now = new Date().toISOString();
  return {
    id: uid(),
    game,
    slug: "custom-build",
    name: "My Custom Build",
    className: "",
    role: "Off-meta experiment",
    tier: "A",
    difficulty: 2,
    tagline: "Describe the fantasy of your build in one line.",
    summary:
      "Explain the core loop: what you press, what it does, and why someone would take this over the meta build.",
    patchLabel: game === "d4" ? "Season 15 · Patch 3.2" : "Forever · Launch",
    lastSynced: now,
    dataQuality: "authored",
    sources: [],
    progression: [
      {
        levels: "1–5",
        goal: "What you're setting up",
        steps: [{ name: "First pick", detail: "Rank 1", why: "Why this first" }],
      },
    ],
    skillPriority: [],
    statPriority: [{ label: "Main stat", note: "Why it's first" }],
    gear: [{ slot: "Weapon", target: "What to equip here", affixes: ["Affix one", "Affix two"] }],
    rotation: [{ phase: "Standard", steps: ["Step one", "Step two"] }],
    watchOuts: ["The trap most players fall into."],
    extras: [],
    meta: {},
  };
}

/**
 * Runtime guard for builds arriving from localStorage, share links or JSON
 * files: rejects anything missing the arrays the editor and build pages map
 * over, repairs harmless gaps (per-phase steps, invalid dates), and always
 * hands back a fully shaped CustomBuild. freshId=false keeps the stored id
 * (saved builds); share links and imports always get a fresh one.
 */
export function normalizeCustomBuild(value: unknown, freshId = true): CustomBuild | null {
  if (!value || typeof value !== "object") return null;
  const b = value as Partial<CustomBuild>;
  if (b.game !== "d4" && b.game !== "forever") return null;
  if (
    !Array.isArray(b.progression) ||
    !Array.isArray(b.statPriority) ||
    !Array.isArray(b.gear) ||
    !Array.isArray(b.rotation) ||
    !Array.isArray(b.watchOuts) ||
    !Array.isArray(b.sources)
  ) {
    return null;
  }
  const base = emptyBuild(b.game);
  return {
    ...base,
    ...b,
    progression: b.progression.map((band) => ({
      ...band,
      steps: Array.isArray(band?.steps) ? band.steps : [],
    })),
    rotation: b.rotation.map((phase) => ({
      ...phase,
      steps: Array.isArray(phase?.steps) ? phase.steps : [],
    })),
    lastSynced:
      typeof b.lastSynced === "string" && !Number.isNaN(Date.parse(b.lastSynced))
        ? b.lastSynced
        : base.lastSynced,
    id: freshId || typeof b.id !== "string" || !b.id ? uid() : b.id,
  } as CustomBuild;
}

export function loadCustomBuilds(): CustomBuild[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((b) => normalizeCustomBuild(b, false))
      .filter((b): b is CustomBuild => b !== null);
  } catch {
    return [];
  }
}

/** Returns false when storage is full or blocked, so the UI can warn. */
export function saveCustomBuild(build: CustomBuild): boolean {
  if (typeof window === "undefined") return false;
  const builds = loadCustomBuilds().filter((b) => b.id !== build.id);
  builds.unshift(build);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
    return true;
  } catch {
    return false;
  }
}

export function deleteCustomBuild(id: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(loadCustomBuilds().filter((b) => b.id !== id)),
  );
}

export function forkMetaBuild(id: string): CustomBuild | null {
  const source = BUILDS.find((b) => b.id === id) ?? getBuild("d4", id) ?? getBuild("forever", id);
  if (!source) return null;
  return {
    ...structuredClone(source),
    id: uid(),
    name: `${source.name} (my fork)`,
    tagline: source.tagline,
    lastSynced: new Date().toISOString(),
    forkedFrom: source.id,
  };
}

/* ─── Share-link encoding (base64url JSON) ─────────────────── */

export function encodeShare(build: CustomBuild): string {
  const json = JSON.stringify(build);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeShare(encoded: string): CustomBuild | null {
  try {
    let b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return normalizeCustomBuild(JSON.parse(json));
  } catch {
    return null;
  }
}

export function downloadBuild(build: CustomBuild): void {
  const blob = new Blob([JSON.stringify(build, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${build.slug || "buildforge-build"}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
