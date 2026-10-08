#!/usr/bin/env node
/**
 * BuildForge nightly meta-sync pipeline.
 *
 * Runs daily via GitHub Actions (see .github/workflows/sync.yml):
 *   1. Fetches the public guide indexes (Maxroll; ClassicWoW.gg specs come
 *      from that site's own nav)
 *   2. Honors robots.txt, rate-limits itself, identifies via a custom UA
 *   3. Refreshes curated snapshot source links when guides move
 *   4. Appends newly discovered guide entries (tier: null until a human curates)
 *   5. Keeps guides discovered on earlier runs — they age out after
 *      MAX_CARRIED_AGE_DAYS unseen — and writes src/data/synced/meta-snapshots.json
 *      plus a human-readable report
 *
 * Tiers and summaries are curated in src/data/synced/curated-meta.json —
 * this script never invents them.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const DELAY_MS = 2000;
const UA = "BuildForgeSync/1.0 (open-source build companion; +https://github.com/AntonyPerez0/buildforge)";
const SYNCED_DIR = path.resolve("src/data/synced");
const CURATED_FILE = path.join(SYNCED_DIR, "curated-meta.json");
const OUT_FILE = path.join(SYNCED_DIR, "meta-snapshots.json");
const REPORT_FILE = path.join(SYNCED_DIR, "sync-report.md");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

function fuzzyMatch(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  if (na.length < 10 || nb.length < 10) return false;
  return na.includes(nb) || nb.includes(na);
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

const robotsCache = new Map();
async function robotsAllows(origin, pathname) {
  if (!robotsCache.has(origin)) {
    const rules = [];
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
      /* unreachable robots.txt: treat as allowed for index paths only */
    }
    robotsCache.set(origin, rules);
  }
  const rules = robotsCache.get(origin);
  return !rules.some((rule) => rule !== "" && pathname.startsWith(rule));
}

const INDEXES = [
  {
    site: "Maxroll",
    game: "d4",
    url: "https://maxroll.gg/d4/build-guides",
    /** Guide links carry the title in the slug: /d4/build-guides/blazing-scream-warlock-guide */
    hrefMatch: /href="(\/d4\/build-guides\/([a-z0-9-]{12,}))"/g,
    titleFromHref: (slug) =>
      slug
        .replace(/^\/d4\/build-guides\//, "")
        .replace(/-guide\/?$/, "")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
  },
];

/** ClassicWoW.gg renders class guides client-side; these spec URLs come from the site's own nav. */
const STATIC_INDEX = {
  site: "ClassicWoW.gg",
  game: "forever",
  specs: [
    ["warrior", "arms"], ["warrior", "fury"], ["warrior", "protection"],
    ["paladin", "holy"], ["paladin", "protection"], ["paladin", "retribution"],
    ["hunter", "beast-mastery"], ["hunter", "marksmanship"], ["hunter", "survival"],
    ["rogue", "assassination"], ["rogue", "combat"], ["rogue", "subtlety"],
    ["priest", "discipline"], ["priest", "holy"], ["priest", "shadow"],
    ["shaman", "elemental"], ["shaman", "enhancement"], ["shaman", "restoration"],
    ["mage", "arcane"], ["mage", "fire"], ["mage", "frost"],
    ["warlock", "affliction"], ["warlock", "demonology"], ["warlock", "destruction"],
    ["druid", "balance"], ["druid", "cat"], ["druid", "bear"], ["druid", "restoration"],
  ],
};

const CLASSES = [
  "Barbarian", "Rogue", "Sorcerer", "Necromancer", "Druid", "Spiritborn", "Paladin", "Warlock",
  "Warrior", "Hunter", "Priest", "Shaman", "Mage", "Death Knight", "Monk", "Demon Hunter", "Evoker",
];

function guessClass(text) {
  const found = CLASSES.find((c) => text.toLowerCase().includes(c.toLowerCase()));
  return found ?? "Unknown";
}

async function collectIndexEntries() {
  const fresh = [];
  const report = [];
  /** Entries fetched from remote indexes — static entries never count. */
  let remoteEntries = 0;

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
      const collected = [];
      let m;
      const seen = new Set();
      idx.hrefMatch.lastIndex = 0;
      while ((m = idx.hrefMatch.exec(html)) && collected.length < 250) {
        const title = idx.titleFromHref(m[1], m[2] ?? "");
        const key = title.toLowerCase();
        if (!title || seen.has(key)) continue;
        seen.add(key);
        collected.push({
          site: idx.site,
          game: idx.game,
          className: guessClass(title),
          title,
          url: `${url.origin}${m[1]}`,
        });
      }
      remoteEntries += collected.length;
      fresh.push(...collected);
      console.log(`✓ ${idx.site}: ${seen.size} guide links`);
      report.push(`| ${idx.site} | ${idx.url} | ${seen.size} links |`);
    } catch (err) {
      console.log(`✗ ${idx.site}: ${err.message} — keeping previous data`);
      report.push(`| ${idx.site} | ${idx.url} | failed (${err.message}) |`);
    }
    await sleep(DELAY_MS);
  }

  for (const [cls, spec] of STATIC_INDEX.specs) {
    fresh.push({
      site: STATIC_INDEX.site,
      game: STATIC_INDEX.game,
      className: cls.charAt(0).toUpperCase() + cls.slice(1),
      title: `${cap(spec)} ${cap(cls)} (Forever)`,
      url: `https://classicwow.gg/forever/guides/${cls}/${spec}`,
    });
  }
  report.push(`| ${STATIC_INDEX.site} | (static spec index from site nav) | ${STATIC_INDEX.specs.length} specs |`);

  return { fresh, report, remoteEntries };
}

function cap(s) {
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function main() {
  console.log("BuildForge nightly meta sync\n");
  const today = new Date().toISOString().slice(0, 10);

  const curatedRaw = JSON.parse(await readFile(CURATED_FILE, "utf8"));
  const curated = curatedRaw.curated ?? [];

  const { fresh, report, remoteEntries } = await collectIndexEntries();
  const previous = await readPreviousSnapshots();

  // Guard the promise in the README: if every remote index fails (or a redesign
  // breaks link parsing), the static spec list alone must not overwrite a rich
  // previous snapshot file.
  if (remoteEntries === 0) {
    console.log("\nNo remote index returned entries — keeping the previous snapshot file untouched.");
    await mkdir(SYNCED_DIR, { recursive: true });
    await writeFile(
      REPORT_FILE,
      [
        `# BuildForge nightly sync — ${today}`,
        "",
        "| Source | Index | Result |",
        "| --- | --- | --- |",
        ...report,
        "",
        "Every remote index failed or returned nothing; previous snapshot data was kept untouched.\n",
      ].join("\n"),
    );
    return;
  }

  // 1. Refresh curated entries: find a fresh link from the same site, upgrade the URL.
  const refreshed = curated.map((entry) => {
    const updatedSources = entry.sources.map((src) => {
      const match = fresh.find(
        (f) => f.site === src.site && f.game === entry.game && fuzzyMatch(f.title, entry.buildName),
      );
      if (match && match.url !== src.url) {
        return { ...src, url: match.url, label: src.label?.startsWith(src.site) ? `${src.site} ${entry.buildName} guide` : src.label };
      }
      return src;
    });
    return { ...entry, sources: updatedSources, fetchedAt: today };
  });
  const usedHandles = new Set(refreshed.flatMap((e) => discoverKeys(e.buildName)));

  // 2. Discover entries from fresh indexes not already curated/seen.
  const discovered = [];
  for (const f of fresh) {
    const handles = discoverKeys(f.title);
    if (handles.some((h) => usedHandles.has(h))) continue;
    const existing = discovered.find((d) => discoverKeys(d.buildName).some((h) => handles.includes(h)));
    if (existing) {
      if (!existing.sources.some((s) => s.site === f.site)) {
        existing.sources.push({ site: f.site, url: f.url, label: `${f.site} ${f.title}` });
      }
      continue;
    }
    discovered.push({
      id: `${f.game}-snap-${normalize(f.title).slice(0, 60)}`,
      game: f.game,
      className: f.className,
      buildName: f.title,
      tier: null,
      summary: `Fresh from the live meta — synced from ${f.site}. Open the full guide for the current skill tree, gear table and tuning notes; a tier rating lands here once a human curates it in curated-meta.json.`,
      sources: [{ site: f.site, url: f.url, label: `${f.site} ${f.title}` }],
      fetchedAt: today,
    });
  }

  const snapshots = [...refreshed, ...discovered, ...carryPrevious(previous, curated, refreshed, discovered)];
  await mkdir(SYNCED_DIR, { recursive: true });

  const payload = {
    _meta: {
      generator: "scripts/sync-meta.mjs",
      fetchedAt: today,
      note: "Generated snapshot layer. Tiers/summaries come from curated-meta.json; links and freshness come from the nightly sync. Never reproduce guide content — link to it.",
      userAgent: UA,
    },
    snapshots,
  };
  await writeFile(OUT_FILE, JSON.stringify(payload, null, 2) + "\n");

  report.unshift(
    `# BuildForge nightly sync — ${today}`,
    "",
    "| Source | Index | Result |",
    "| --- | --- | --- |",
  );
  report.push(
    "",
    `${refreshed.length} curated snapshots refreshed · ${discovered.length} newly discovered · ${snapshots.length - refreshed.length - discovered.length} carried from earlier runs (tier pending curation)`,
    "",
    "Curate new entries by adding tier + summary to `src/data/synced/curated-meta.json`.",
  );
  await writeFile(REPORT_FILE, report.join("\n") + "\n");

  console.log(`\n${refreshed.length} curated + ${discovered.length} discovered → ${OUT_FILE}`);
}

/** Previously discovered entries (tier: null) kept from the last snapshot file. */
async function readPreviousSnapshots() {
  try {
    const raw = JSON.parse(await readFile(OUT_FILE, "utf8"));
    return Array.isArray(raw?.snapshots) ? raw.snapshots : [];
  } catch {
    return [];
  }
}

/**
 * Keep guides discovered on earlier runs that today's index pages didn't list —
 * a redesign, pagination change or index reshuffle must not wipe them. A carried
 * entry keeps its fetchedAt (its last-seen date), ages out after
 * MAX_CARRIED_AGE_DAYS, and is dropped once a human curates or replaces it.
 */
const MAX_CARRIED_AGE_DAYS = 120;

function carryPrevious(previous, curated, refreshed, discovered) {
  const curatedIds = new Set(curated.map((e) => e.id));
  const todayIds = new Set([...refreshed, ...discovered].map((s) => s.id));
  const oldestKept = Date.now() - MAX_CARRIED_AGE_DAYS * 24 * 60 * 60 * 1000;
  return previous.filter(
    (s) =>
      !todayIds.has(s.id) &&
      !curatedIds.has(s.id) &&
      typeof s.fetchedAt === "string" &&
      Date.parse(s.fetchedAt) > oldestKept,
  );
}

function discoverKeys(name) {
  const n = normalize(name ?? "");
  const keys = [n];
  if (n.length > 20) {
    keys.push(n.replace(/(endgame|leveling|guide|build|pve|pvp|farm)/g, ""));
  }
  return keys.filter((k) => k.length >= 10);
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
