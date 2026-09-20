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

export function loadCustomBuilds(): CustomBuild[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomBuild(build: CustomBuild): void {
  if (typeof window === "undefined") return;
  const builds = loadCustomBuilds().filter((b) => b.id !== build.id);
  builds.unshift(build);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
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
    const parsed = JSON.parse(json) as CustomBuild;
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.progression)) return null;
    return { ...parsed, id: uid() };
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
