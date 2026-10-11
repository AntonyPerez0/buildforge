import { describe, expect, it } from "vitest";
import { normalizeGuideUrl, parseTierList, titleFromGuidePath } from "../../scripts/lib/tier-parse.mjs";

const MAXROLL_LINK = /href="((?:https:\/\/maxroll\.gg)?\/d4\/build-guides\/[a-z0-9-]+)"/g;
const ICY_LINK = /href="((?:https:\/\/www\.icy-veins\.com)?\/d4\/guides\/[a-z0-9-]+-build)\/?"/g;

const guide = (slug: string) => `<a href="/d4/build-guides/${slug}">${slug}</a>`;

describe("tier-list parsing", () => {
  it("reads heading-style tier sections in document order", () => {
    const html = `
      <nav>${guide("nav-only-guide")}</nav>
      <h2>S Tier</h2>${guide("blazing-scream-warlock-guide")}${guide("whirlwind-barbarian-guide")}${guide("firewall-sorcerer-guide")}
      <h2>A Tier</h2>${guide("rend-barbarian-guide")}${guide("tornado-druid-guide")}
      <h2>B Tier</h2>${guide("pulverize-druid-guide")}
      <h2>Related guides</h2>${guide("leveling-overview-guide")}`;
    const res = parseTierList(html, MAXROLL_LINK, "https://maxroll.gg");
    expect(res.ok).toBe(true);
    const byUrl = Object.fromEntries(res.hits.map((h) => [h.url.split("/").pop(), h.tier]));
    expect(byUrl["blazing-scream-warlock-guide"]).toBe("S");
    expect(byUrl["rend-barbarian-guide"]).toBe("A");
    expect(byUrl["pulverize-druid-guide"]).toBe("B");
    // Links before the first tier and after a non-tier heading are ignored.
    expect(byUrl["nav-only-guide"]).toBeUndefined();
    expect(byUrl["leveling-overview-guide"]).toBeUndefined();
  });

  it("reads table rows with tier-classed label cells and keeps the first tier seen", () => {
    const row = (t: string, slugs: string[]) =>
      `<tr><td class="tier-label">${t}</td><td>${slugs.map((s) => `<a href="https://www.icy-veins.com/d4/guides/${s}/">x</a>`).join("")}</td></tr>`;
    const html = `<table>${row("S", ["whirlwind-barbarian-build", "rapid-fire-rogue-build", "dance-of-knives-rogue-build"])}${row("A", ["fireball-sorcerer-build", "shifter-pulverize-druid-build", "hota-barbarian-build", "whirlwind-barbarian-build"])}</table>`;
    const res = parseTierList(html, ICY_LINK, "https://www.icy-veins.com");
    expect(res.ok).toBe(true);
    const ww = res.hits.find((h) => h.url.endsWith("whirlwind-barbarian-build"));
    expect(ww?.tier).toBe("S");
    expect(ww?.url).toBe("https://www.icy-veins.com/d4/guides/whirlwind-barbarian-build");
  });

  it("supports data-tier attributes and class suffixes, never reading 'tiers' as S", () => {
    const html = `
      <section class="tiers"><p>A tier list ranks builds.</p></section>
      <div data-tier="s">${guide("a-guide-one")}${guide("a-guide-two")}${guide("a-guide-three")}</div>
      <div class="row tier_b">${guide("b-guide-one")}${guide("b-guide-two")}${guide("b-guide-three")}</div>`;
    const res = parseTierList(html, MAXROLL_LINK, "https://maxroll.gg");
    expect(res.ok).toBe(true);
    expect(res.hits.filter((h) => h.tier === "S")).toHaveLength(3);
    expect(res.hits.filter((h) => h.tier === "B")).toHaveLength(3);
  });

  it("refuses pages that do not look like a tier list", () => {
    const flat = `<h2>All build guides</h2>${guide("one-guide")}${guide("two-guide")}`;
    expect(parseTierList(flat, MAXROLL_LINK, "https://maxroll.gg").ok).toBe(false);

    const oneTier = `<h2>S Tier</h2>${["a", "b", "c", "d", "e", "f", "g"].map((s) => guide(`${s}-long-guide`)).join("")}`;
    const res = parseTierList(oneTier, MAXROLL_LINK, "https://maxroll.gg");
    expect(res.ok).toBe(false);
    expect(res.reason).toMatch(/1 tier/);
  });

  it("normalizes URLs and titles", () => {
    expect(normalizeGuideUrl("https://www.icy-veins.com/d4/guides/whirlwind-barbarian-build/?x=1")).toBe(
      "https://www.icy-veins.com/d4/guides/whirlwind-barbarian-build",
    );
    expect(titleFromGuidePath("/d4/build-guides/blazing-scream-warlock-guide")).toBe("Blazing Scream Warlock");
    expect(titleFromGuidePath("/wow-forever/fury-warrior-melee-dps-pve-guide")).toBe("Fury Warrior");
    expect(titleFromGuidePath("/d4/guides/hellfire-blazing-scream-warlock-build/")).toBe(
      "Hellfire Blazing Scream Warlock",
    );
  });
});
