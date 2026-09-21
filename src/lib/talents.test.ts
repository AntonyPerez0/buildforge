import { describe, expect, it } from "vitest";
import { expandTalentRuns } from "@/lib/talents";
import { BUILDS } from "@/lib/builds";

describe("expandTalentRuns", () => {
  const gates = [
    { gate: "16", label: "Forever capstone" },
    { gate: "21", label: "Signature" },
    { gate: "31", label: "31-pointer" },
  ];

  it("expands a run into one row per level with incrementing ranks", () => {
    const rows = expandTalentRuns([{ from: 10, to: 14, name: "Cruelty", rankFrom: 1 }], gates);
    expect(rows.map((r) => r.placement)).toEqual([
      "Rank 1",
      "Rank 2",
      "Rank 3",
      "Rank 4",
      "Rank 5",
    ]);
    expect(rows[0].points).toBe(1);
    expect(rows[4].points).toBe(5);
  });

  it("renders single-level runs as one point and attaches gate labels", () => {
    const rows = expandTalentRuns(
      [
        { from: 25, to: 25, name: "Forever 16-point capstone", rankFrom: 1 },
        { from: 40, to: 40, name: "Bloodthirst", rankFrom: 1 },
      ],
      gates,
    );
    expect(rows.find((r) => r.level === 25)?.placement).toBe("1 point");
    expect(rows.find((r) => r.level === 25)?.gate).toBe("Forever capstone");
    expect(rows.find((r) => r.level === 40)?.gate).toBe("31-pointer");
  });

  it("every Forever build covers levels 10–44 with the gate levels present", () => {
    for (const build of BUILDS.filter((b) => b.game === "forever")) {
      const rows = expandTalentRuns(build.talentRuns ?? [], build.specGates);
      const levels = new Set(rows.map((r) => r.level));
      for (let level = 10; level <= 44; level++) {
        expect(levels.has(level), `${build.id} missing level ${level}`).toBe(true);
      }
      const gatesOnPage = rows.filter((r) => r.gate);
      expect(gatesOnPage.length, build.id).toBeGreaterThanOrEqual(build.specGates?.length ?? 0);
    }
  });
});
