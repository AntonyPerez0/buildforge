/**
 * Tier-list reading for the nightly sync — shared with the vitest suite.
 *
 * Maxroll and Icy Veins publish tier lists as HTML pages where tier
 * headings ("S Tier", a cell labelled "S", class="tier-s", data-tier="S")
 * are followed by links to the build guides placed in that tier. We walk
 * the page in document order: every guide link inherits the most recent
 * tier marker, a non-tier section heading closes the current tier (so
 * "Related guides" footers are not swept in), and a guide keeps the first
 * tier it was seen in.
 *
 * Results are only trusted when they look like a real tier list (enough
 * links spread over at least two tiers). Otherwise the caller keeps the
 * human-verified tiers from curated-meta.json, so a page redesign degrades
 * to "no change" instead of publishing wrong tiers.
 */

/** @typedef {"S" | "A" | "B" | "C" | "D"} Tier */
/** @typedef {{ url: string, tier: Tier, title: string }} TierHit */
/** @typedef {{ ok: boolean, hits: TierHit[], reason: string }} TierParseResult */

const TIER_LETTERS = new Set(["S", "A", "B", "C", "D"]);

/** Minimum evidence before parsed tiers replace curated ones. */
export const MIN_TIERED_LINKS = 6;
export const MIN_DISTINCT_TIERS = 2;

/** Marker patterns — each captures the tier letter in group 1. */
const MARKERS = [
  // <h3>S Tier</h3>, <th>S-Tier</th>, <strong>A tier builds</strong> — the phrase must end
  // the element, so prose such as "<p>A tier list ranks…" is never read as a marker.
  /<(?:h[1-6]|th|td|div|span|p|strong|b|li|dt)\b[^>]*>(?:\s*<[^>]+>)*\s*([SABCD])\s*[-–]?\s*tier(?:\s+builds?)?\s*:?\s*</gi,
  // <h3>S</h3> — a bare tier letter as a heading
  /<h[1-6]\b[^>]*>(?:\s*<[^>]+>)*\s*([SABCD])\s*</g,
  // <h3>Tier S</h3>
  /<(?:h[1-6]|th|td|div|span|p|strong|b|li|dt)\b[^>]*>(?:\s*<[^>]+>)*\s*tier\s*[-–:]?\s*([SABCD])\s*</gi,
  // data-tier="S"
  /\bdata-tier\s*=\s*["']?([SABCDsabcd])\b/g,
  // class="tier-s" / "tier_s" (a separator is required so "tiers" never reads as S)
  /\bclass\s*=\s*["'][^"']*\btier[-_]([sabcd])\b[^"']*["']/gi,
  // <div class="tier-label">S</div> — a lone letter inside a tier-classed element
  /\bclass\s*=\s*["'][^"']*tier[^"']*["'][^>]*>\s*([SABCD])\s*</g,
];

/** A section heading that is not itself a tier marker closes the current tier. */
const HEADING = /<h[1-4]\b[^>]*>([\s\S]*?)<\/h[1-4]>/gi;
const TIER_TEXT = /^\s*(?:[SABCD]\s*[-–]?\s*tier\b|tier\s*[-–:]?\s*[SABCD]\b|[SABCD]\s*$)/i;

const stripTags = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

/** Normalize a guide URL for matching: origin + path, no trailing slash, no query/hash. */
export function normalizeGuideUrl(url) {
  try {
    const u = new URL(url);
    return `${u.origin.toLowerCase()}${u.pathname.replace(/\/+$/, "").toLowerCase()}`;
  } catch {
    return url.replace(/[?#].*$/, "").replace(/\/+$/, "").toLowerCase();
  }
}

/** Human title from a guide slug: /d4/build-guides/blazing-scream-warlock-guide → "Blazing Scream Warlock". */
export function titleFromGuidePath(pathname) {
  const slug = pathname.replace(/\/+$/, "").split("/").pop() ?? "";
  return slug
    .replace(/-(?:melee-dps|ranged-dps|healer|tank)-pve-guide$/, "")
    .replace(/-(?:pve-guide|build-guide|guide|build)$/, "")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * @param {string} html     tier-list page HTML
 * @param {RegExp} linkRe   global regex; group 1 = guide path (or absolute URL)
 * @param {string} origin   e.g. "https://maxroll.gg" — resolves relative links
 * @returns {TierParseResult}
 */
export function parseTierList(html, linkRe, origin) {
  /** @type {{ at: number, kind: "tier" | "close" | "link", value: string }[]} */
  const events = [];

  for (const re of MARKERS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(html))) {
      const letter = m[1].toUpperCase();
      if (TIER_LETTERS.has(letter)) events.push({ at: m.index, kind: "tier", value: letter });
    }
  }

  HEADING.lastIndex = 0;
  let h;
  while ((h = HEADING.exec(html))) {
    if (!TIER_TEXT.test(stripTags(h[1]))) events.push({ at: h.index, kind: "close", value: "" });
  }

  const flags = linkRe.flags.includes("g") ? linkRe.flags : `${linkRe.flags}g`;
  const links = new RegExp(linkRe.source, flags);
  let l;
  while ((l = links.exec(html))) {
    events.push({ at: l.index, kind: "link", value: l[1] });
  }

  // Stable order; at the same offset a tier marker applies before the link it wraps.
  const rank = { close: 0, tier: 1, link: 2 };
  events.sort((a, b) => a.at - b.at || rank[a.kind] - rank[b.kind]);

  /** @type {Map<string, TierHit>} */
  const seen = new Map();
  /** @type {Tier | null} */
  let current = null;
  for (const ev of events) {
    if (ev.kind === "tier") current = /** @type {Tier} */ (ev.value);
    else if (ev.kind === "close") current = null;
    else if (current) {
      const absolute = ev.value.startsWith("http") ? ev.value : `${origin}${ev.value}`;
      const key = normalizeGuideUrl(absolute);
      if (!seen.has(key)) {
        seen.set(key, { url: key, tier: current, title: titleFromGuidePath(new URL(absolute).pathname) });
      }
    }
  }

  const hits = [...seen.values()];
  const tiers = new Set(hits.map((x) => x.tier));
  if (hits.length < MIN_TIERED_LINKS) {
    return { ok: false, hits, reason: `only ${hits.length} tiered guide links (need ${MIN_TIERED_LINKS})` };
  }
  if (tiers.size < MIN_DISTINCT_TIERS) {
    return { ok: false, hits, reason: `links fell into ${tiers.size} tier (need ${MIN_DISTINCT_TIERS})` };
  }
  return { ok: true, hits, reason: `${hits.length} guides across ${tiers.size} tiers` };
}
