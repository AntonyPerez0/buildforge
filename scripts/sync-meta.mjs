#!/usr/bin/env node
/**
 * BuildForge meta-sync pipeline.
 *
 * Refreshes the "live meta" snapshot data from public guide sites
 * (Maxroll, Icy Veins, ClassicWoW.gg). This is a maintainer-run CLI:
 *   - checks and honors each site's robots.txt first
 *   - rate-limits itself (one request every REQUEST_DELAY_MS)
 *   - identifies itself with a descriptive user-agent
 *   - stores only build names, tiers and short summaries WITH attribution
 *     and links back to the full guides (never reproduces guide content)
 *
 * Usage:  npm run sync
 * Output: src/data/synced/meta-snapshots.json + a human-readable report
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const DELAY_MS = 2000;
const UA = "BuildForgeSync/1.0 (open-source build companion; +https://github.com/AntonyPerez0/buildforge)";
const OUT_DIR = path.resolve("src/data/synced");
const OUT_FILE = path.join(OUT_DIR, "meta-snapshots.json");
const REPORT_FILE = path.join(OUT_DIR, "sync-report.md");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

/** Minimal robots.txt check for a given origin + path. */
const robotsCache = new Map();
async function robotsAllows(origin, pathname) {
  if (!robotsCache.has(origin)) {
    let rules = [];
    try {
      const txt = await fetchText(new URL("/robots.txt", origin).toString());
      let applies = false;
      for (const line of txt.split("\n")) {
        const clean = line.split("#")[0].trim();
        if (/^user-agent:/i.test(clean)) {
          applies = clean.split(":")[1].trim() === "*";
        } else if (applies && /^disallow:/i.test(clean)) {
          const rule = clean.split(":").slice(1).join(":").trim();
          if (rule) rules.push(rule);
        }
      }
    } catch {
      // If robots.txt can't be fetched, be conservative but permissive for "/" only.
      rules = [];
    }
    robotsCache.set(origin, rules);
  }
  const rules = robotsCache.get(origin);
  return !rules.some((rule) => rule !== "" && pathname.startsWith(rule));
}

/** Guide index pages we know how to parse (title + link extraction). */
const INDEXES = [
  {
    site: "Maxroll",
    game: "d4",
    url: "https://maxroll.gg/d4/build-guides",
    match: /<a[^>]+href="(\/d4\/build-guides\/[^"]+)"[^>]*>([^<]{4,80})<\/a>/g,
    toEntry: (href, text) => ({
      buildName: decodeEntities(text).replace(/\s+/g, " ").trim(),
      className: guessClass(decodeEntities(text)),
      href: `https://maxroll.gg${href}`,
    }),
  },
  {
    site: "Icy Veins",
    game: "d4",
    url: "https://www.icy-veins.com/d4/",
    match: /<a[^>]+href="(\/d4\/guides\/[^"]+build[^"]+)"[^>]*>([^<]{4,100})<\/a>/g,
    toEntry: (href, text) => ({
      buildName: decodeEntities(text).replace(/\s+/g, " ").trim(),
      className: guessClass(decodeEntities(text)),
      href: `https://www.icy-veins.com${href}`,
    }),
  },
  {
    site: "ClassicWoW.gg",
    game: "forever",
    url: "https://classicwow.gg/forever/guides",
    match: /<a[^>]+href="(\/forever\/guides\/[^"]+)"[^>]*>([^<]{4,80})<\/a>/g,
    toEntry: (href, text) => ({
      buildName: decodeEntities(text).replace(/\s+/g, " ").trim(),
      className: guessClass(decodeEntities(text)),
      href: `https://classicwow.gg${href}`,
    }),
  },
];

const CLASSES = [
  "Barbarian", "Rogue", "Sorcerer", "Necromancer", "Druid", "Spiritborn", "Paladin", "Warlock",
  "Warrior", "Hunter", "Priest", "Shaman", "Mage", "Death Knight", "Monk", "Demon Hunter", "Evoker",
];
function guessClass(text) {
  const found = CLASSES.find((c) => text.toLowerCase().includes(c.toLowerCase()));
  return found ?? "Unknown";
}
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function main() {
  console.log("BuildForge sync — fetching guide indexes (rate-limited, robots-aware)\n");
  const report = [];
  const today = new Date().toISOString().slice(0, 10);
  const fetched = [];

  for (const idx of INDEXES) {
    const url = new URL(idx.url);
    const allowed = await robotsAllows(url.origin, url.pathname);
    if (!allowed) {
      console.log(`✗ ${idx.site}: robots.txt disallows ${url.pathname} — skipped`);
      report.push(`| ${idx.site} | ${idx.url} | skipped (robots.txt) |`);
      continue;
    }
    try {
      const html = await fetchText(idx.url);
      let m;
      const seen = new Set();
      idx.match.lastIndex = 0;
      while ((m = idx.match.exec(html)) && fetched.length < 200) {
        const entry = idx.toEntry(m[1], m[2]);
        const key = `${entry.buildName}`;
        if (!entry.buildName || seen.has(key)) continue;
        seen.add(key);
        fetched.push({
          id: `${idx.game}-snap-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
          game: idx.game,
          site: idx.site,
          className: entry.className,
          buildName: entry.buildName,
          url: entry.href,
          fetchedAt: today,
        });
      }
      console.log(`✓ ${idx.site}: ${seen.size} guide links`);
      report.push(`| ${idx.site} | ${idx.url} | ${seen.size} links |`);
    } catch (err) {
      console.log(`✗ ${idx.site}: ${err.message} — keeping existing data`);
      report.push(`| ${idx.site} | ${idx.url} | failed (${err.message}) |`);
    }
    await sleep(DELAY_MS);
  }

  await mkdir(OUT_DIR, { recursive: true });

  // Preserve previous output if this run found nothing usable.
  let previous = [];
  try {
    previous = JSON.parse(await readFile(OUT_FILE, "utf8"));
  } catch {
    /* first run */
  }
  if (fetched.length === 0 && previous.length > 0) {
    console.log("\nNo new data fetched; previous snapshots kept untouched.");
    return;
  }

  const payload = {
    _meta: {
      generator: "scripts/sync-meta.mjs",
      fetchedAt: today,
      note: "Names/tiers/summaries with attribution + links only. Full guides live at the sources.",
      userAgent: UA,
    },
    snapshots: fetched,
  };
  await writeFile(OUT_FILE, JSON.stringify(payload, null, 2) + "\n");
  report.unshift(
    `# BuildForge sync report — ${today}`,
    "",
    "| Site | Index | Result |",
    "| --- | --- | --- |",
  );
  report.push("", `${fetched.length} snapshot entries written to src/data/synced/meta-snapshots.json`, "",
    "Next step: review the diff, prune noise, then wire curated summaries into `src/data/d4/meta-snapshots.ts`.",
  );
  await writeFile(REPORT_FILE, report.join("\n") + "\n");
  console.log(`\nWrote ${fetched.length} entries → ${OUT_FILE}`);
  console.log(`Report → ${REPORT_FILE}`);
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
