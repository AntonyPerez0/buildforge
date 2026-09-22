import { describe, expect, it } from "vitest";
import type { ProgressionBand } from "@/data/types";
import { getBuildsFor } from "@/lib/builds";
import {
  applyBetaCap,
  clampExtras,
  clampProgression,
  clampTalentRuns,
  FOREVER_LAUNCH_LEVEL_CAP,
  FOREVER_LEVEL_CAP,
  parseLevelBand,
} from "@/lib/forever";
import { expandTalentRuns } from "@/lib/talents";

const band = (levels: string): ProgressionBand => ({
  levels,
  goal: "test goal",
  steps: [{ name: "Step", why: "because it is right" }],
});

describe("parseLevelBand", () => {
  it("parses en-dashed ranges, single levels and trailing prose", () => {
    expect(parseLevelBand("1–9")).toEqual({ from: 1, to: 9 });
    expect(parseLevelBand("40–44")).toEqual({ from: 40, to: 44 });
    expect(parseLevelBand("15")).toEqual({ from: 15, to: 15 });
    expect(parseLevelBand("60 / Raid-ready")).toEqual({ from: 60, to: 60 });
  });

  it("returns null for labels without a number", () => {
    expect(parseLevelBand("Beta cap")).toBeNull();
  });
});

describe("clampProgression", () => {
  it("keeps bands under the cap, clamps the spanning band and drops the rest", () => {
    const clamped = clampProgression(
      [band("1–9"), band("10–14"), band("20–24"), band("25–29"), band("60 / Raid-ready")],
      20,
    );
    expect(clamped.map((b) => b.levels)).toEqual(["1–9", "10–14", "20"]);
    for (const b of clamped) {
      expect(parseLevelBand(b.levels)!.to).toBeLessThanOrEqual(20);
    }
  });
});

describe("clampTalentRuns", () => {
  it("clamps runs so every expanded level is reachable in beta", () => {
    const fury = getBuildsFor("forever").find((b) => b.slug === "fury-warrior")!;
    const clamped = clampTalentRuns(fury.talentRuns!, 20);
    const levels = expandTalentRuns(clamped).map((r) => r.level);
    expect(Math.max(...levels)).toBeLessThanOrEqual(FOREVER_LEVEL_CAP);
    for (let level = 10; level <= FOREVER_LEVEL_CAP; level++) {
      expect(levels).toContain(level);
    }
  });
});

describe("clampExtras", () => {
  it("drops quick-reference rows above the cap and groups left empty", () => {
    const clamped = clampExtras(
      [
        {
          label: "Leveling Quick Reference",
          items: [
            { name: "Level 20", note: "dual wield" },
            { name: "Level ~30", note: "stance" },
            { name: "Level 60", note: "finalize" },
          ],
        },
        { label: "Core Enchants", items: [{ name: "Crusader", note: "main hand" }] },
        { label: "All past cap", items: [{ name: "Level 40", note: "bt" }] },
      ],
      20,
    );
    const quickRef = clamped.find((g) => g.label === "Leveling Quick Reference")!;
    expect(quickRef.items.map((i) => i.name)).toEqual(["Level 20"]);
    expect(clamped.find((g) => g.label === "Core Enchants")).toBeDefined();
    expect(clamped.find((g) => g.label === "All past cap")).toBeUndefined();
  });
});

describe("applyBetaCap", () => {
  it("trims every Forever build to the beta cap", () => {
    for (const build of getBuildsFor("forever")) {
      const clamped = applyBetaCap(build);
      expect(clamped).not.toBe(build);
      expect(clamped.endgame).toBeUndefined();
      expect(clamped.progression.length).toBeGreaterThanOrEqual(3);
      for (const b of clamped.progression) {
        expect(parseLevelBand(b.levels)!.to).toBeLessThanOrEqual(FOREVER_LEVEL_CAP);
      }
      for (const run of clamped.talentRuns ?? []) {
        expect(run.to).toBeLessThanOrEqual(FOREVER_LEVEL_CAP);
        expect(run.from).toBeLessThanOrEqual(FOREVER_LEVEL_CAP);
      }
      for (const group of clamped.extras ?? []) {
        for (const item of group.items) {
          const m = item.name.match(/^Level\s*~?\s*(\d+)/i);
          if (m) expect(Number(m[1])).toBeLessThanOrEqual(FOREVER_LEVEL_CAP);
        }
      }
    }
  });

  it("returns the full authored build once the launch cap is restored", () => {
    const fury = getBuildsFor("forever").find((b) => b.slug === "fury-warrior")!;
    expect(applyBetaCap(fury, FOREVER_LAUNCH_LEVEL_CAP)).toBe(fury);
    expect(applyBetaCap(fury, FOREVER_LAUNCH_LEVEL_CAP).progression.length).toBe(
      fury.progression.length,
    );
    expect(applyBetaCap(fury, 60).endgame).toEqual(fury.endgame);
  });

  it("leaves other games untouched", () => {
    const d4 = getBuildsFor("d4")[0];
    expect(applyBetaCap(d4)).toBe(d4);
  });
});
