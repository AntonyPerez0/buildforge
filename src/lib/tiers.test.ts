import { describe, expect, it } from "vitest";
import type { TierAssignment, TierListMeta } from "@/data/types";
import { BUILDS } from "@/lib/builds";
import { TIER_ASSIGNMENTS, TIER_LISTS } from "@/lib/snapshots";
import { buildKey, createTierResolver, headlineTier, sameBuild, TIER_ORDER } from "@/lib/tiers";

/**
 * Tier letters move with every balance patch and the nightly sync writes them
 * straight to main, so nothing here asserts a live placement. The synced data
 * gets structural checks; the matching logic runs against fixtures.
 */

describe("synced tier data (structure only)", () => {
  it("every tier list is a Maxroll or Icy Veins https page with a check date", () => {
    expect(TIER_LISTS.length).toBeGreaterThan(0);
    for (const list of TIER_LISTS) {
      expect(["Maxroll", "Icy Veins"]).toContain(list.site);
      expect(list.url.startsWith("https://")).toBe(true);
      expect(Number.isNaN(Date.parse(list.checkedAt))).toBe(false);
    }
  });

  it("every placement points at a known list with a valid tier and https guide link", () => {
    const ids = new Set(TIER_LISTS.map((l) => l.id));
    for (const a of TIER_ASSIGNMENTS) {
      expect(ids.has(a.list)).toBe(true);
      expect(TIER_ORDER).toContain(a.tier);
      expect(a.build.trim().length).toBeGreaterThan(2);
      if (a.url) expect(a.url.startsWith("https://")).toBe(true);
    }
  });

  it("links every Forever build to its Icy Veins spec guide first", () => {
    for (const build of BUILDS.filter((b) => b.game === "forever")) {
      expect(build.sources[0].site).toBe("Icy Veins");
      expect(build.sources[0].url).toMatch(/^https:\/\/www\.icy-veins\.com\/wow-forever\/.+-pve-guide$/);
    }
  });
});

const LISTS: TierListMeta[] = [
  { id: "maxroll-d4-endgame", site: "Maxroll", game: "d4", list: "Endgame", url: "https://maxroll.gg/d4/tierlists/endgame-tier-list", checkedAt: "2026-10-11", status: "curated" },
  { id: "icyveins-d4-endgame", site: "Icy Veins", game: "d4", list: "Endgame", url: "https://www.icy-veins.com/d4/guides/endgame-tier-list/", checkedAt: "2026-10-11", status: "curated" },
  { id: "maxroll-d4-leveling", site: "Maxroll", game: "d4", list: "Leveling", url: "https://maxroll.gg/d4/tierlists/leveling-tier-list", checkedAt: "2026-10-11", status: "curated" },
];
const MX = "https://maxroll.gg/d4/build-guides/";
const ROWS: TierAssignment[] = [
  { list: "maxroll-d4-endgame", tier: "S", build: "Poison Penetrating Shot Rogue", className: "Rogue", url: `${MX}penetrating-shot-rogue-guide` },
  { list: "maxroll-d4-endgame", tier: "S", build: "Whirlwind Barbarian", className: "Barbarian", url: `${MX}whirlwind-barbarian-guide` },
  { list: "maxroll-d4-endgame", tier: "A", build: "Heartseeker Rogue", className: "Rogue", url: `${MX}heartseeker-rogue-specialized-guide` },
  { list: "maxroll-d4-endgame", tier: "A", build: "Poison Twisting Blades Rogue", className: "Rogue", url: `${MX}twisting-blades-rogue-guide` },
  { list: "maxroll-d4-endgame", tier: "C", build: "Cold Penetrating Shot Rogue", className: "Rogue", url: `${MX}cold-penetrating-shot-rogue-guide` },
  { list: "icyveins-d4-endgame", tier: "S", build: "Penetrating Shot Rogue", className: "Rogue", url: null },
  { list: "icyveins-d4-endgame", tier: "S", build: "Whirlwind Barbarian", className: "Barbarian", url: "https://www.icy-veins.com/d4/guides/whirlwind-barbarian-build" },
  { list: "maxroll-d4-leveling", tier: "S", build: "Barrage Rogue", className: "Rogue", url: null },
  { list: "maxroll-d4-leveling", tier: "A", build: "Whirlwind Barbarian", className: "Barbarian", url: null },
];
const r = createTierResolver(LISTS, ROWS);

describe("tier matching", () => {
  it("treats variants as different builds and drops guide/build filler", () => {
    expect(sameBuild("Twisting Blades Rogue", "Poison Twisting Blades Rogue")).toBe(false);
    expect(sameBuild("Cold Penetrating Shot Rogue", "Penetrating Shot Rogue")).toBe(false);
    expect(sameBuild("Cataclysm Druid Build", "Cataclysm Druid")).toBe(true);
    expect(buildKey("Fury Warrior (Forever)")).toBe(buildKey("Fury Warrior"));
  });

  it("matches by guide URL first, even when the list names the build differently", () => {
    const tiers = r.resolveTiers("d4", "Twisting Blades Rogue", [{ url: `${MX}twisting-blades-rogue-guide` }]);
    expect(tiers.map((t) => `${t.listId}:${t.tier}`)).toEqual(["maxroll-d4-endgame:A"]);
  });

  it("never lends a tier to a variant guide with its own link", () => {
    const cold = r.resolveTiers("d4", "Cold Penetrating Shot Rogue", [{ url: `${MX}cold-penetrating-shot-rogue-guide` }]);
    expect(cold.map((t) => `${t.listId}:${t.tier}`)).toEqual(["maxroll-d4-endgame:C"]);
    const leveling = r.resolveTiers("d4", "Heartseeker Rogue Leveling Build", [{ url: `${MX}heartseeker-rogue-leveling-build-guide` }]);
    expect(leveling).toEqual([]);
    expect(r.resolveTiers("d4", "Poison Barrage Rogue", [{ url: `${MX}poison-barrage-rogue-guide` }])).toEqual([]);
  });

  it("falls back to an exact name when the list row or the guide has no link on that site", () => {
    const ww = r.resolveTiers("d4", "Whirlwind Barbarian", [{ url: `${MX}whirlwind-barbarian-guide` }]);
    expect(ww.map((t) => `${t.listId}:${t.tier}`)).toEqual([
      "maxroll-d4-endgame:S",
      "icyveins-d4-endgame:S",
      "maxroll-d4-leveling:A",
    ]);
    const pen = r.resolveTiers("d4", "Penetrating Shot Rogue", [{ url: `${MX}penetrating-shot-rogue-guide` }]);
    expect(pen.map((t) => `${t.listId}:${t.tier}`)).toEqual(["maxroll-d4-endgame:S", "icyveins-d4-endgame:S"]);
  });

  it("uses the build's own rating, labelled, when no list ranks it", () => {
    const head = headlineTier({ game: "d4", name: "Chain Lightning Sorcerer", sources: [], tier: "B" }, r);
    expect(head).toEqual({ tier: "B", basis: "BuildForge rating", fromSource: false });
    const ranked = headlineTier({ game: "d4", name: "Whirlwind Barbarian", sources: [], tier: "C" }, r);
    expect(ranked).toMatchObject({ tier: "S", basis: "Maxroll Endgame", fromSource: true });
  });

  it("keeps games apart", () => {
    expect(r.resolveTiers("forever", "Whirlwind Barbarian")).toEqual([]);
  });
});
