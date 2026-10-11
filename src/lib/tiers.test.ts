import { describe, expect, it } from "vitest";
import { BUILDS, getBuild, getBuildsFor } from "@/lib/builds";
import { TIER_ASSIGNMENTS, TIER_LISTS } from "@/lib/snapshots";
import { buildTiers, headlineTier, resolveTiers, sameBuild, TIER_ORDER } from "@/lib/tiers";

describe("tier list data", () => {
  it("every tier list is a Maxroll or Icy Veins https page", () => {
    expect(TIER_LISTS.length).toBeGreaterThanOrEqual(4);
    for (const list of TIER_LISTS) {
      expect(["Maxroll", "Icy Veins"]).toContain(list.site);
      expect(list.url.startsWith("https://")).toBe(true);
      expect(Number.isNaN(Date.parse(list.checkedAt))).toBe(false);
    }
  });

  it("every placement points at a known list with a valid tier", () => {
    const ids = new Set(TIER_LISTS.map((l) => l.id));
    for (const a of TIER_ASSIGNMENTS) {
      expect(ids.has(a.list)).toBe(true);
      expect(TIER_ORDER).toContain(a.tier);
      if (a.url) expect(a.url.startsWith("https://")).toBe(true);
    }
  });

  it("D4 has a Maxroll endgame list with an S tier", () => {
    const sTier = TIER_ASSIGNMENTS.filter((a) => a.list === "maxroll-d4-endgame" && a.tier === "S");
    expect(sTier.length).toBeGreaterThanOrEqual(5);
  });
});

describe("tier resolution", () => {
  it("matches builds by name containment, not loose substrings", () => {
    expect(sameBuild("Twisting Blades Rogue", "Poison Twisting Blades Rogue")).toBe(true);
    expect(sameBuild("Bone Spear Necromancer", "Bone Spirit Necromancer")).toBe(false);
    expect(sameBuild("Fire Mage", "Firewall Sorcerer")).toBe(false);
  });

  it("resolves an authored build to every list it appears on, Maxroll endgame first", () => {
    const ww = getBuild("d4", "whirlwind-barbarian")!;
    const tiers = buildTiers(ww);
    expect(tiers[0]).toMatchObject({ site: "Maxroll", list: "Endgame", tier: "S" });
    expect(tiers.map((t) => t.listId)).toEqual(
      expect.arrayContaining(["maxroll-d4-endgame", "icyveins-d4-endgame", "maxroll-d4-leveling"]),
    );
  });

  it("falls back to the BuildForge rating when no list ranks the build", () => {
    const cl = getBuild("d4", "chain-lightning-sorcerer")!;
    expect(buildTiers(cl)).toEqual([]);
    expect(headlineTier(cl)).toMatchObject({ fromSource: false, basis: "BuildForge rating" });
  });

  it("keeps each authored D4 build's own tier in step with its Maxroll endgame placement", () => {
    for (const build of getBuildsFor("d4")) {
      const maxroll = buildTiers(build).find((t) => t.listId === "maxroll-d4-endgame");
      if (maxroll) expect(build.tier).toBe(maxroll.tier);
    }
  });

  it("matches guide links by URL even when titles differ", () => {
    const [best] = resolveTiers("d4", "Hellfire Blazing Scream Warlock", [
      { url: "https://www.icy-veins.com/d4/guides/hellfire-blazing-scream-warlock-build/" },
    ]);
    expect(best?.tier).toBe("S");
  });

  it("links every Forever build to its Icy Veins spec guide first", () => {
    for (const build of BUILDS.filter((b) => b.game === "forever")) {
      expect(build.sources[0].site).toBe("Icy Veins");
      expect(build.sources[0].url).toMatch(/^https:\/\/www\.icy-veins\.com\/wow-forever\/.+-pve-guide$/);
    }
  });
});
