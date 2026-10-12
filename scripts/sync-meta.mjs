#!/usr/bin/env node
/**
 * BuildForge nightly meta-sync pipeline.
 *
 * Runs daily via GitHub Actions (see .github/workflows/sync.yml):
 *   1. Fetches the public guide indexes — Maxroll (D4 build guides) and
 *      Icy Veins (D4 tier-list guides, WoW Forever spec guides). ClassicWoW.gg
 *      Forever specs come from that site's own nav.
 *   2. Reads every tier list in curated-meta.json (Maxroll + Icy Veins). When a
 *      page parses cleanly (scripts/lib/tier-parse.mjs) its tiers replace the
 *      curated ones for that list; otherwise the human-verified tiers stay.
 *   3. Honors robots.txt, rate-limits itself, identifies via a custom UA.
 *   4. Keeps guides discovered on earlier runs — they age out after
 *      MAX_CARRIED_AGE_DAYS unseen — and writes src/data/synced/meta-snapshots.json
 *      plus a human-readable report.
 *
 * Tiers are only ever read from Maxroll / Icy Veins or curated by a human in
 * src/data/synced/curated-meta.json — this script never invents them.
 *
 *   npm run sync               live run (network)
 *   npm run sync -- --offline  re-apply curated edits without fetching anything
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { normalizeGuideUrl, parseTierList, titleFromGuidePath } from "./lib/tier-parse.mjs";

const OFFLINE = process.argv.includes("--offline");
const DELAY_MS = 2000;
const UA = "BuildForgeSync/1.1 (open-source build companion; +https://github.com/AntonyPerez0/buildforge)";
const SYNCED_DIR = path.resolve("src/data/synced");
const CURATED_FILE = path.join(SYNCED_DIR, "curated-meta.json");
const OUT_FILE = path.join(SYNCED_DIR, "meta-snapshots.json");
const REPORT_FILE = path.join(SYNCED_DIR, "sync-report.md");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

const ORIGINS = {
  Maxroll: "https://maxroll.gg",
  "Icy Veins": "https://www.icy-veins.com",
};

/** Guide-link patterns per site + game. Group 1 = guide path or absolute URL. */
const GUIDE_LINKS = {
  "Maxroll:d4": /href="((?:https:\/\/maxroll\.gg)?\/d4\/build-guides\/[a-z0-9-]{12,})\/?"/g,
  "Icy Veins:d4": /href="((?:https:\/\/www\.icy-veins\.com)?\/d4\/guides\/[a-z0-9-]+-build)\/?"/g,
  "Icy Veins:forever": /href="((?:https:\/\/www\.icy-veins\.com)?\/wow-forever\/[a-z0-9-]+-pve-guide)\/?"/g,
};

/** Pages whose guide links feed the live guide index. */
const INDEXES = [
  { site: "Maxroll", game: "d4", url: "https://maxroll.gg/d4/build-guides" },
  { site: "Icy Veins", game: "d4", url: "https://www.icy-veins.com/d4/guides/endgame-tier-list/" },
  { site: "Icy Veins", game: "d4", url: "https://www.icy-veins.com/d4/guides/leveling-tier-list/" },
  { site: "Icy Veins", game: "forever", url: "https://www.icy-veins.com/wow-forever/all-class-guides" },
];

/** ClassicWoW.gg renders class guides client-side; these spec URLs come from the site's own nav. */
const CLASSICWOW_SPECS = [
  ["warrior", "arms"], ["warrior", "fury"], ["warrior", "protection"],
  ["paladin", "holy"], ["paladin", "protection"], ["paladin", "retribution"],
  ["hunter", "beast-mastery"], ["hunter", "marksmanship"], ["hunter", "survival"],
  ["rogue", "assassination"], ["rogue", "combat"], ["rogue", "subtlety"],
  ["priest", "discipline"], ["priest", "holy"], ["priest", "shadow"],
  ["shaman", "elemental"], ["shaman", "enhancement"], ["shaman", "restoration"],
  ["mage", "arcane"], ["mage", "fire"], ["mage", "frost"],
  ["warlock", "affliction"], ["warlock", "demonology"], ["warlock", "destruction"],
  ["druid", "balance"], ["druid", "cat"], ["druid", "bear"], ["druid", "restoration"],
];

const CLASSES = [
  "Barbarian", "Rogue", "Sorcerer", "Necromancer", "Druid", "Spiritborn", "Paladin", "Warlock",
  "Warrior", "Hunter", "Priest", "Shaman", "Mage", "Death Knight", "Monk", "Demon Hunter", "Evoker",
];

/** Class names that aren't spelled out in a guide title. */
const CLASS_ALIASES = [[/auradin|zealot|zeal\b|blessed hammer|fist of the heavens/i, "Paladin"]];

function guessClass(text) {
  const found = CLASSES.find((c) => text.toLowerCase().includes(c.toLowerCase()));
  if (found) return found;
  return CLASS_ALIASES.find(([re]) => re.test(text))?.[1] ?? "Unknown";
}

const cap = (s) =>
  s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** Forever titles carry a suffix so short spec names ("Fire Mage") still de-duplicate across sources. */
const indexTitle = (title, game) => (game === "forever" && !/\(Forever\)$/.test(title) ? `${title} (Forever)` : title);

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

/** One fetch per URL per run — index pages and tier lists overlap on Icy Veins. */
const pageCache = new Map();
async function getPage(url) {
  if (pageCache.has(url)) return pageCache.get(url);
  const u = new URL(url);
  let result;
  if (!(await robotsAllows(u.origin, u.pathname))) {
    result = { error: "skipped (robots.txt)" };
  } else {
    try {
      result = { html: await fetchText(url) };
    } catch (err) {
      result = { error: `failed (${err.message})` };
    }
    await sleep(DELAY_MS);
  }
  pageCache.set(url, result);
  return result;
}

function guideLinks(html, site, game) {
  const re = GUIDE_LINKS[`${site}:${game}`];
  const origin = ORIGINS[site];
  const out = [];
  const seen = new Set();
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(html)) && out.length < 250) {
    const absolute = m[1].startsWith("http") ? m[1] : `${origin}${m[1]}`;
    const key = normalizeGuideUrl(absolute);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ url: absolute, title: titleFromGuidePath(new URL(absolute).pathname) });
  }
  return out;
}

async function collectIndexEntries(curated) {
  const fresh = [];
  const report = [];
  /** Entries fetched from remote indexes — static/curated entries never count. */
  let remoteEntries = 0;
  /** "site:game" pairs with an index that wasn't read this run — their old links stay trusted. */
  const unreached = new Set();

  for (const idx of INDEXES) {
    if (OFFLINE) {
      unreached.add(`${idx.site}:${idx.game}`);
      report.push(`| ${idx.site} | ${idx.url} | skipped (offline run) |`);
      continue;
    }
    const page = await getPage(idx.url);
    if (page.error) {
      unreached.add(`${idx.site}:${idx.game}`);
      console.log(`✗ ${idx.site}: ${idx.url} ${page.error} — keeping previous data`);
      report.push(`| ${idx.site} | ${idx.url} | ${page.error} |`);
      continue;
    }
    const links = guideLinks(page.html, idx.site, idx.game);
    for (const link of links) {
      const title = indexTitle(link.title, idx.game);
      fresh.push({ site: idx.site, game: idx.game, className: guessClass(title), title, url: link.url });
    }
    remoteEntries += links.length;
    console.log(`✓ ${idx.site}: ${links.length} guide links (${idx.url})`);
    report.push(`| ${idx.site} | ${idx.url} | ${links.length} links |`);
  }

  // Hand-verified guide links (curated-meta.json → guides).
  for (const g of curated.guides ?? []) {
    const title = indexTitle(g.title, g.game);
    fresh.push({ site: g.site, game: g.game, className: guessClass(title), title, url: g.url });
  }
  report.push(`| Curated | curated-meta.json guides | ${(curated.guides ?? []).length} verified links |`);

  for (const [cls, spec] of CLASSICWOW_SPECS) {
    fresh.push({
      site: "ClassicWoW.gg",
      game: "forever",
      className: cap(cls),
      title: `${cap(spec)} ${cap(cls)} (Forever)`,
      url: `https://classicwow.gg/forever/guides/${cls}/${spec}`,
    });
  }
  report.push(`| ClassicWoW.gg | (static spec index from site nav) | ${CLASSICWOW_SPECS.length} specs |`);

  return { fresh, report, remoteEntries, unreached };
}

/** Child tier-list pages linked from a hub (e.g. Icy Veins' Forever tier-list hub). */
function childTierLists(html, listUrl) {
  const base = new URL(listUrl);
  const section = base.pathname.split("/").filter(Boolean)[0];
  const re = new RegExp(`href="((?:${base.origin.replace(/\./g, "\\.")})?/${section}/[a-z0-9-]*tier-list[a-z0-9-]*/?)"`, "g");
  const out = new Set();
  let m;
  while ((m = re.exec(html)) && out.size < 4) {
    const abs = m[1].startsWith("http") ? m[1] : `${base.origin}${m[1]}`;
    if (normalizeGuideUrl(abs) !== normalizeGuideUrl(listUrl)) out.add(abs);
  }
  return [...out];
}

/**
 * Read one tier list. Returns parsed hits when the page (or, for a hub, any
 * child list) parses cleanly; otherwise a reason and no hits.
 */
async function readTierList(list) {
  const linkRe = GUIDE_LINKS[`${list.site}:${list.game}`];
  const origin = ORIGINS[list.site];
  if (!linkRe || !origin) return { ok: false, reason: "no parser for this site" };

  const page = await getPage(list.url);
  if (page.error) return { ok: false, reason: page.error };

  const direct = parseTierList(page.html, linkRe, origin);
  if (direct.ok) return direct;

  const merged = new Map();
  const reasons = [`page: ${direct.reason}`];
  for (const child of childTierLists(page.html, list.url)) {
    const sub = await getPage(child);
    if (sub.error) {
      reasons.push(`${child}: ${sub.error}`);
      continue;
    }
    const res = parseTierList(sub.html, linkRe, origin);
    reasons.push(`${child}: ${res.reason}`);
    if (!res.ok) continue;
    for (const hit of res.hits) if (!merged.has(hit.url)) merged.set(hit.url, hit);
  }
  if (merged.size > 0) {
    return { ok: true, hits: [...merged.values()], reason: `${merged.size} guides from linked tier lists` };
  }
  return { ok: false, reason: reasons.join("; ") };
}

/** A live read this recent survives a failed fetch; older ones fall back to the curated tiers. */
const MAX_LIVE_TIER_AGE_DAYS = 30;

async function syncTierLists(curated, today, previous) {
  const lists = [];
  const assignments = [];
  const report = [];
  const changes = [];
  const freshestLive = Date.now() - MAX_LIVE_TIER_AGE_DAYS * 24 * 60 * 60 * 1000;

  for (const list of curated.tierLists ?? []) {
    const curatedRows = (curated.tierAssignments ?? []).filter((a) => a.list === list.id);
    const prevList = (previous.tierLists ?? []).find((l) => l.id === list.id);
    const prevRows = (previous.tierAssignments ?? []).filter((a) => a.list === list.id);
    const prevLive =
      prevList?.status === "auto" && prevRows.length > 0 && Date.parse(prevList.checkedAt) > freshestLive
        ? { meta: prevList, rows: prevRows }
        : null;
    const result = OFFLINE ? { ok: false, reason: "offline run" } : await readTierList(list);

    if (result.ok) {
      const baseline = prevLive ? prevLive.rows : curatedRows;
      const before = new Map(baseline.filter((a) => a.url).map((a) => [normalizeGuideUrl(a.url), a.tier]));
      for (const hit of result.hits) {
        const prev = before.get(hit.url);
        if (prev && prev !== hit.tier) changes.push(`${list.site} ${list.list}: ${hit.title} ${prev} → ${hit.tier}`);
        assignments.push({
          list: list.id,
          tier: hit.tier,
          build: hit.title,
          className: guessClass(hit.title),
          url: hit.url,
          auto: true,
        });
      }
      lists.push({ ...list, status: "auto", checkedAt: today, result: result.reason });
      report.push(`| ${list.site} ${list.list} tier list | ${list.url} | ${result.reason} (read live) |`);
      console.log(`✓ ${list.site} ${list.list} tier list: ${result.reason}`);
    } else if (prevLive) {
      // A failed fetch must not flip tiers back to an older curated snapshot.
      assignments.push(...prevLive.rows);
      lists.push({ ...list, status: "auto", checkedAt: prevLive.meta.checkedAt, result: `last live read kept (${result.reason})` });
      report.push(
        `| ${list.site} ${list.list} tier list | ${list.url} | ${prevLive.rows.length} tiers from the ${prevLive.meta.checkedAt} live read kept (${result.reason}) |`,
      );
      console.log(`· ${list.site} ${list.list} tier list: last live read kept (${result.reason})`);
    } else {
      assignments.push(...curatedRows);
      lists.push({ ...list, status: list.status ?? "curated", result: result.reason });
      report.push(
        `| ${list.site} ${list.list} tier list | ${list.url} | ${curatedRows.length} verified tiers kept (${result.reason}) |`,
      );
      console.log(`· ${list.site} ${list.list} tier list: curated tiers kept (${result.reason})`);
    }
  }
  return { lists, assignments, report, changes };
}

async function main() {
  console.log(`BuildForge nightly meta sync${OFFLINE ? " (offline)" : ""}\n`);
  const today = new Date().toISOString().slice(0, 10);

  const curated = JSON.parse(await readFile(CURATED_FILE, "utf8"));
  const { fresh, report, remoteEntries, unreached } = await collectIndexEntries(curated);
  const previousFile = await readPreviousFile();
  const previous = Array.isArray(previousFile.snapshots) ? previousFile.snapshots : [];
  const tierSync = await syncTierLists(curated, today, previousFile);
  const header = [`# BuildForge nightly sync — ${today}`, "", "| Source | Index | Result |", "| --- | --- | --- |"];

  // Guard the promise in the README: if every remote index fails (or a redesign
  // breaks link parsing), static lists alone must not overwrite a rich previous
  // snapshot file. Offline runs are deliberate and skip the guard.
  if (!OFFLINE && remoteEntries === 0) {
    console.log("\nNo remote index returned entries — keeping the previous snapshot file untouched.");
    await mkdir(SYNCED_DIR, { recursive: true });
    await writeFile(
      REPORT_FILE,
      [
        ...header,
        ...report,
        ...tierSync.report,
        "",
        "Every remote index failed or returned nothing; previous snapshot data was kept untouched.\n",
      ].join("\n"),
    );
    return;
  }

  // Discovered guide entries — one per build name, sources merged across sites.
  const discovered = [];
  for (const f of fresh) {
    const handles = discoverKeys(f.title);
    const existing = discovered.find(
      (d) => d.game === f.game && discoverKeys(d.buildName).some((h) => handles.includes(h)),
    );
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
      summary: `Live guide on ${f.site}. Open it for the current skill tree, gear and tuning notes — tiers come from the Maxroll and Icy Veins tier lists.`,
      sources: [{ site: f.site, url: f.url, label: `${f.site} ${f.title}` }],
      fetchedAt: today,
    });
  }

  const carried = carryPrevious(previous, discovered, unreached);
  for (const entry of discovered) entry.sources.sort((a, b) => siteRank(a.site) - siteRank(b.site));
  const snapshots = [...discovered, ...carried];
  await mkdir(SYNCED_DIR, { recursive: true });

  const payload = {
    _meta: {
      generator: "scripts/sync-meta.mjs",
      fetchedAt: today,
      note: "Generated layer. Tiers come from Maxroll / Icy Veins tier lists (read live when they parse, otherwise the human-verified curated-meta.json values). Never reproduce guide content — link to it.",
      userAgent: UA,
    },
    tierLists: tierSync.lists,
    tierAssignments: tierSync.assignments,
    snapshots,
  };
  await writeFile(OUT_FILE, JSON.stringify(payload, null, 2) + "\n");

  const summary = [
    "",
    `${discovered.length} guides indexed · ${carried.length} carried from earlier runs · ${tierSync.assignments.length} tier placements across ${tierSync.lists.length} tier lists`,
  ];
  if (tierSync.changes.length > 0) {
    summary.push("", "Tier changes since the curated snapshot:", "", ...tierSync.changes.map((c) => `- ${c}`));
  }
  summary.push("", "Verify or correct tiers in `src/data/synced/curated-meta.json`.");
  await writeFile(REPORT_FILE, [...header, ...report, ...tierSync.report, ...summary].join("\n") + "\n");

  console.log(`\n${discovered.length} discovered + ${carried.length} carried → ${OUT_FILE}`);
}

/** The last generated file: previously discovered guides and the last tier reads. */
async function readPreviousFile() {
  try {
    const raw = JSON.parse(await readFile(OUT_FILE, "utf8"));
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}

/** Guide-page URL shapes per site + game — used to keep only real guide links from older files. */
const GUIDE_URLS = {
  "Maxroll:d4": /^https:\/\/maxroll\.gg\/d4\/build-guides\/[a-z0-9-]{12,}\/?$/,
  "Icy Veins:d4": /^https:\/\/www\.icy-veins\.com\/d4\/guides\/[a-z0-9-]+-build\/?$/,
  "Icy Veins:forever": /^https:\/\/www\.icy-veins\.com\/wow-forever\/[a-z0-9-]+-pve-guide\/?$/,
  "ClassicWoW.gg:forever": /^https:\/\/classicwow\.gg\/forever\/guides\/[a-z-]+\/[a-z-]+$/,
};
const INDEXED = new Set(INDEXES.map((i) => `${i.site}:${i.game}`));

/**
 * Entries written by the pre-tier-list format carried a curated tier and
 * summary. Turn them into plain guide entries (tier from the tier lists now)
 * so the format switch drops no guides — keeping only real guide links.
 */
function fromOldFormat(s) {
  if (s.tier == null) return s;
  const sources = (s.sources ?? []).filter((src) => GUIDE_URLS[`${src.site}:${s.game}`]?.test(src.url));
  if (sources.length === 0) return null;
  return {
    ...s,
    id: `${s.game}-snap-${normalize(s.buildName).slice(0, 60)}`,
    tier: null,
    summary: `Live guide on ${sources[0].site}. Open it for the current skill tree, gear and tuning notes — tiers come from the Maxroll and Icy Veins tier lists.`,
    sources,
  };
}

/**
 * Keep guides discovered on earlier runs that today's index pages didn't list —
 * a redesign, pagination change or index reshuffle must not wipe them. A carried
 * entry keeps its fetchedAt (its last-seen date) and ages out after
 * MAX_CARRIED_AGE_DAYS. Entries whose link is already indexed today are dropped
 * so a renamed title never shows twice.
 */
const MAX_CARRIED_AGE_DAYS = 120;

const SITE_ORDER = ["Maxroll", "Icy Veins", "ClassicWoW.gg", "Wowhead", "Blizzard"];
const siteRank = (site) => (SITE_ORDER.includes(site) ? SITE_ORDER.indexOf(site) : SITE_ORDER.length);

function carryPrevious(previousRaw, discovered, unreached) {
  // Old-format entries defer to a plain guide entry that already carries the same link.
  const plainUrls = new Set(
    previousRaw.filter((p) => p.tier == null).flatMap((p) => (p.sources ?? []).map((src) => normalizeGuideUrl(src.url))),
  );
  const previous = previousRaw
    .map((p) => {
      if (p.tier == null) return p;
      const converted = fromOldFormat(p);
      return converted && converted.sources.some((src) => !plainUrls.has(normalizeGuideUrl(src.url))) ? converted : null;
    })
    .filter(Boolean);

  // A previous entry for a guide indexed again today lends it links from sites
  // whose index wasn't read this run (offline, or that index failed). A site
  // that was read and no longer lists the guide lends nothing — the link died.
  const byId = new Map(discovered.map((d) => [d.id, d]));
  for (const prev of previous) {
    const today = byId.get(prev.id);
    if (!today) continue;
    for (const src of prev.sources ?? []) {
      const key = `${src.site}:${prev.game}`;
      const trusted = unreached.has(key) || !INDEXED.has(key);
      if (trusted && !today.sources.some((s) => s.site === src.site)) today.sources.push(src);
    }
  }

  const todayIds = new Set(discovered.map((s) => s.id));
  const todayUrls = new Set(discovered.flatMap((s) => s.sources.map((src) => normalizeGuideUrl(src.url))));
  const oldestKept = Date.now() - MAX_CARRIED_AGE_DAYS * 24 * 60 * 60 * 1000;
  return previous
    .filter(
      (s) =>
        !todayIds.has(s.id) &&
        !s.sources?.some((src) => todayUrls.has(normalizeGuideUrl(src.url))) &&
        typeof s.fetchedAt === "string" &&
        Date.parse(s.fetchedAt) > oldestKept,
    )
    .map((s) => (s.className === "Unknown" ? { ...s, className: guessClass(s.buildName) } : s));
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
