import { describe, expect, it } from "vitest";
import type { Build } from "@/data/types";
import { BUILDS, getBuild, getSnapshotsFor, buildHref } from "@/lib/builds";
import { GAMES } from "@/lib/games";
import { decodeShare, encodeShare, forkMetaBuild } from "@/lib/custom-builds";

/** Data-integrity contract for every published build. */
describe("build data integrity", () => {
  it("has unique ids and slugs per game", () => {
    const ids = new Set(BUILDS.map((b) => b.id));
    expect(ids.size).toBe(BUILDS.length);
    const gameSlugs = new Set(BUILDS.map((b) => `${b.game}:${b.slug}`));
    expect(gameSlugs.size).toBe(BUILDS.length);
  });

  it.each(BUILDS.map((b) => [b.id, b] as const))(
    "%s is structurally complete",
    (_id, build: Build) => {
      expect(build.name.length).toBeGreaterThan(2);
      expect(build.className.length).toBeGreaterThan(2);
      expect(build.tagline.length).toBeGreaterThan(10);
      expect(build.sources.length).toBeGreaterThanOrEqual(1);
      for (const src of build.sources) {
        expect(src.url.startsWith("https://")).toBe(true);
      }

      expect(build.progression.length).toBeGreaterThanOrEqual(8);
      for (const band of build.progression) {
        expect(band.levels).toMatch(/\d/);
        expect(band.goal.length).toBeGreaterThan(3);
        expect(band.steps.length).toBeGreaterThanOrEqual(1);
        for (const step of band.steps) {
          expect(step.name.trim().length).toBeGreaterThan(1);
          expect(step.why.trim().length).toBeGreaterThan(3);
        }
      }

      expect(build.statPriority.length).toBeGreaterThanOrEqual(3);
      expect(build.gear.length).toBeGreaterThanOrEqual(4);
      expect(build.rotation.length).toBeGreaterThanOrEqual(1);
      expect(build.watchOuts.length).toBeGreaterThanOrEqual(4);
      expect(["authored", "snapshot"]).toContain(build.dataQuality);
    },
  );

  it("resolves builds by game + slug", () => {
    for (const build of BUILDS) {
      expect(getBuild(build.game, build.slug)).toBe(build);
      expect(buildHref(build)).toMatch(new RegExp(`^/${build.game}/builds/`));
    }
  });

  it("every game config lists classes that exist in data or snapshots", () => {
    for (const build of BUILDS) {
      expect(Object.keys(GAMES)).toContain(build.game);
    }
  });
});

describe("meta snapshots", () => {
  it("d4 snapshots carry attribution links", () => {
    const snaps = getSnapshotsFor("d4");
    expect(snaps.length).toBeGreaterThanOrEqual(5);
    for (const s of snaps) {
      expect(s.sources.length).toBeGreaterThanOrEqual(1);
      expect(s.buildName.length).toBeGreaterThan(2);
      expect(s.summary.length).toBeGreaterThan(20);
    }
  });
});

describe("custom build sharing", () => {
  it("round-trips a build through the share encoding", () => {
    const source = BUILDS[0];
    const encoded = encodeShare({ ...source, id: "custom-x" });
    const decoded = decodeShare(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded?.name).toBe(source.name);
    expect(decoded?.progression.length).toBe(source.progression.length);
    expect(decoded?.id).not.toBe("custom-x");
  });

  it("rejects garbage share strings", () => {
    expect(decodeShare("not-a-build!!!")).toBeNull();
  });

  it("forks a meta build with a fresh id and renamed title", () => {
    const fork = forkMetaBuild("d4-whirlwind-barbarian");
    expect(fork).not.toBeNull();
    expect(fork?.id).toMatch(/^custom-/);
    expect(fork?.name).toContain("my fork");
    expect(fork?.progression.length).toBeGreaterThanOrEqual(8);
  });
});
