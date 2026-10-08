import { describe, expect, it } from "vitest";
import type { ProgressionBand } from "@/data/types";
import {
  bandProgress,
  currentBandIndex,
  stepId,
  toggleStep,
  toggleWholeBand,
} from "@/lib/progress";

const band = (levels: string, stepCount: number): ProgressionBand => ({
  levels,
  goal: "test goal",
  steps: Array.from({ length: stepCount }, (_, i) => ({ name: `Step ${i}`, why: "because" })),
});

/** Third band intentionally has zero steps — it must never block the marker. */
const BANDS = [band("1–9", 2), band("10–14", 1), band("15–19", 0)];

describe("progress helpers", () => {
  it("toggleStep adds and removes a single step id", () => {
    const id = stepId("b1", 0, 0);
    const added = toggleStep([], id);
    expect(added).toEqual([id]);
    expect(toggleStep(added, id)).toEqual([]);
  });

  it("toggleWholeBand checks every step of the band, then unchecks them all", () => {
    const afterAll = toggleWholeBand([], "b1", 0, BANDS[0]);
    expect(afterAll).toEqual([stepId("b1", 0, 0), stepId("b1", 0, 1)]);
    expect(toggleWholeBand(afterAll, "b1", 0, BANDS[0])).toEqual([]);
  });

  it("toggleWholeBand leaves other bands' checks alone", () => {
    const otherBand = [stepId("b1", 1, 0)];
    const roundTrip = toggleWholeBand(toggleWholeBand(otherBand, "b1", 0, BANDS[0]), "b1", 0, BANDS[0]);
    expect(roundTrip).toEqual(otherBand);
  });

  it("bandProgress counts only this band's checked steps", () => {
    const checked = [stepId("b1", 0, 0), stepId("b1", 1, 0)];
    expect(bandProgress(checked, "b1", 0, BANDS[0])).toEqual({ done: 1, total: 2 });
    expect(bandProgress(checked, "b1", 1, BANDS[1])).toEqual({ done: 1, total: 1 });
    expect(bandProgress(checked, "b1", 2, BANDS[2])).toEqual({ done: 0, total: 0 });
  });

  it("currentBandIndex points at the first band with unchecked steps", () => {
    expect(currentBandIndex([], "b1", BANDS)).toBe(-1);
    expect(currentBandIndex([stepId("b1", 0, 0)], "b1", BANDS)).toBe(0);
    expect(currentBandIndex([stepId("b1", 0, 0), stepId("b1", 0, 1)], "b1", BANDS)).toBe(1);
  });

  it("returns -1 once the whole path is complete; empty bands never block the marker", () => {
    const checked = [stepId("b1", 0, 0), stepId("b1", 0, 1), stepId("b1", 1, 0)];
    expect(currentBandIndex(checked, "b1", BANDS)).toBe(-1);
  });
});