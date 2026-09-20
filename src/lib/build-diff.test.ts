import { describe, expect, it } from "vitest";
import type { Build } from "@/data/types";
import { diffBuilds } from "@/lib/build-diff";

const base: Build = {
  id: "b",
  game: "d4",
  slug: "b",
  name: "B",
  className: "C",
  role: "r",
  tier: "A",
  difficulty: 2,
  tagline: "t",
  summary: "s",
  patchLabel: "p",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [{ site: "Maxroll", url: "https://maxroll.gg/d4" }],
  progression: [
    {
      levels: "1–2",
      goal: "start",
      steps: [
        { name: "Frenzy", detail: "Rank 1", why: "gen" },
        { name: "Whirlwind", detail: "Rank 1", why: "core" },
      ],
    },
    {
      levels: "3–5",
      goal: "core",
      steps: [{ name: "Rallying Cry", detail: "Rank 1", why: "shout" }],
    },
  ],
  statPriority: [
    { label: "Strength" },
    { label: "Crit Damage" },
  ],
  gear: [
    { slot: "Helm", target: "CDR helm" },
    { slot: "Boots", target: "speed boots" },
  ],
  watchOuts: ["a", "b", "c", "d"],
  rotation: [{ phase: "Standard", steps: ["spin"] }],
};

describe("diffBuilds", () => {
  it("reports no changes for identical builds", () => {
    const diff = diffBuilds(base, structuredClone(base));
    expect(diff.changed).toBe(false);
    expect(diff.summary.progression).toBe(0);
    expect(diff.summary.stats).toBe(0);
    expect(diff.summary.gear).toBe(0);
  });

  it("detects edited steps as changed", () => {
    const custom = structuredClone(base);
    custom.progression[0].steps[1].why = "changed why";
    const diff = diffBuilds(base, custom);
    const row = diff.progression.find((r) => r.a?.startsWith("Whirlwind") || r.b?.startsWith("Whirlwind"));
    expect(row?.kind).toBe("changed");
    expect(diff.summary.progression).toBeGreaterThan(0);
  });

  it("detects added and removed steps within a band", () => {
    const custom = structuredClone(base);
    custom.progression[0].steps.push({ name: "War Cry", detail: "Rank 1", why: "new" });
    custom.progression[1].steps = [];
    const diff = diffBuilds(base, custom);
    expect(diff.progression.some((r) => r.kind === "added" && r.b?.startsWith("War Cry"))).toBe(true);
    expect(diff.progression.some((r) => r.kind === "removed" && r.a?.startsWith("Rallying Cry"))).toBe(true);
  });

  it("handles whole bands added or removed", () => {
    const custom = structuredClone(base);
    custom.progression.push({ levels: "6–10", goal: "more", steps: [{ name: "Leap", why: "mobility" }] });
    const added = diffBuilds(base, custom);
    expect(added.progression.some((r) => r.kind === "added" && r.b?.startsWith("Leap"))).toBe(true);

    const removed = diffBuilds(custom, base);
    expect(removed.progression.some((r) => r.kind === "removed" && r.a?.startsWith("Leap"))).toBe(true);
  });

  it("detects stat and gear changes positionally", () => {
    const custom = structuredClone(base);
    custom.statPriority[1].label = "Fury per Second";
    custom.gear[0].target = "Dust Devil helm";
    const diff = diffBuilds(base, custom);
    expect(diff.stats.find((r) => r.b === "Fury per Second")?.kind).toBe("changed");
    expect(diff.gear.find((r) => r.b?.includes("Dust Devil"))?.kind).toBe("changed");
  });
});
