# BuildForge

> The second-screen build companion for **Diablo IV** and **World of Warcraft: Forever** (Classic+).
> Zero guessing: every skill, talent point, gear priority, rotation step and endgame phase — at the exact level you need it.

![CI](https://github.com/AntonyPerez0/buildforge/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/AntonyPerez0/buildforge/actions/workflows/deploy.yml/badge.svg)
![Nightly sync](https://github.com/AntonyPerez0/buildforge/actions/workflows/sync.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)

**Live site:** https://antonyperez0.github.io/buildforge/

---

## What it is

BuildForge is designed to live on your **second screen or phone** while you play — installable
as a PWA and fully usable offline. Pick your world — Diablo IV (Season 15) or WoW Forever
(Blizzard's official Classic+) — and get:

### Build pages

- **Level-by-level build paths** — bands like "Levels 3–5" that tell you *exactly* what to take,
  at what rank, and why it beats the alternative. **Checkable progress tracking** with per-band
  counters, a "you are here" marker and per-device persistence.
- **In-game character screens** — paper-doll equipment panels per game (ornate D4 frame /
  classic stone-and-gold Forever frame) with **game-styled hover tooltips**: quality-colored
  names, affix/stat lines, temper lines, flavor text — like Maxroll, but ours. 21 hand-drawn
  SVG slot icons, no hotlinked assets.
- **Endgame chapters** — the loop beyond the level path, checkable like the rest:
  Torment entry → farming loop → Pit push (D4); launch → raid prep → raid tier → min-maxing (Forever).
- **Talent spine diagrams (Forever)** — main-tree talent points by level with the classic gates
  highlighted (11/16/21/31 at levels 20/25/30/40), computed from the level path rather than
  invented tree layouts.
- **Gear tables, stat priorities, rotation phases and watch-outs** — the traps that cost levels,
  kills and raid slots, flagged before you trip them.
- **Attribution on every page** — each build links to the live guides it was written against.

### Site-wide

- **Custom Build Forge** — fork any meta build, edit it band-by-band, see a **"Diff vs meta"**
  report of exactly what you changed, save to your device, share via link or JSON export/import.
- **Command palette** — `⌘K` / `Ctrl+K` (or `/`) searches all builds, the live guide index and
  site pages, with keyboard navigation.
- **Favorites pinning** — star builds; pinned to the top of both hubs.
- **Live meta pipeline** — curated Season 15 snapshot cards + an auto-discovered **live guide
  index** (85 D4 guides + 28 Forever spec guides), refreshed nightly.
- **Nightly sync report page** (`/sync`) — exactly what the pipeline checked on its last run.
- **Forever launch hub** (`/forever/launch`) — day-one checklist (rulesets, access, name
  reservation, race/class combos, camping, Legacy), the December 9 raid unlock, new dungeons
  and zones, and the Classic+ systems briefing.
- **PWA** — installable on the phone, service worker with network-first navigations and
  stale-while-revalidate assets, offline fallback page.
- **OG share images** — every build link unfurls into a game-tinted social card with tier
  badge and class/role, generated at build time.
- **Zero-guessing honesty** — representative item stats are footnoted, beta tuning is hedged,
  and every page links to the source guides for live values.

## Two worlds, two themes

| | Diablo IV | WoW Forever |
|---|---|---|
| Theme | Blood red & ember, gothic serif (Cinzel) | Alliance gold & arcane blue (Marcellus) |
| Current | Season 15: Hell's Legacy (patch 3.2) | Beta live · launches Nov 4, 2026 |
| Authored builds | Whirlwind Barbarian, Chain Lightning Sorcerer, Fireball Sorcerer, Bone Spear Necromancer, Minion Necromancer, Pulverize Druid, Twisting Blades Rogue, Rapid Fire Rogue | Fury Warrior, Retribution Paladin, Beast Mastery Hunter, Affliction Warlock, Frost Mage, Shadow Priest, Enhancement Shaman, Combat Rogue |
| Routes | `/d4` | `/forever` (+ `/forever/launch`) |

All 16 authored builds include the full package: level path, talent spine (Forever), paper-doll
gear with item tooltips, endgame chapters, rotations and watch-outs.

## Tech stack

- **Next.js 16** (App Router, static export) + **TypeScript**
- **Tailwind CSS v4** with runtime per-game theming (`[data-game]` CSS custom properties)
- **Framer Motion** (with `reducedMotion="user"` support), **lucide-react** icons
- **`next/og` ImageResponse** for build-time OG card generation (+ `sharp` for PWA icon rasterizing)
- **Vitest** data-integrity tests (28), **ESLint** (flat config)
- Fully static — deploys to GitHub Pages, no server, no database. Progress, favorites and
  custom builds live in `localStorage`; the service worker keeps everything offline.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # data-integrity tests (28)
npm run lint       # eslint
npm run build      # static export → ./out (postbuild finalizes OG .png files)
```

Utility scripts:

```bash
npm run sync               # fetch/refresh the live-meta snapshot layer
node scripts/generate-icons.mjs   # rasterize public/icon.svg → PWA PNGs
```

### Environment

| Variable | Used for | Default |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | GitHub Pages subpath (e.g. `/buildforge`) | unset |
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs for sitemap/OG images | `https://antonyperez0.github.io/buildforge` |

## The data pipeline

BuildForge **summarizes and attributes** — it never reproduces guide content.

1. **Curated, in-house builds** live in `src/data/{d4,forever}/*.ts` following one schema
   (`src/data/types.ts`): progression bands, paper-doll item payloads, endgame chapters,
   stat priorities, rotations and watch-outs. They anchor to patch-stable mechanics and hedge
   anything seasonal.
2. **Nightly automated sync** (`.github/workflows/sync.yml`, daily at 06:23 UTC):
   - Fetches public guide indexes (Maxroll, Icy Veins, ClassicWoW.gg) — `robots.txt` honored
     first, one request every 2 s, custom user-agent.
   - Refreshes curated source links, appends newly published guides as `tier: null` "NEW"
     entries, and writes `src/data/synced/meta-snapshots.json` + a human-readable report.
   - If anything changed, the workflow **auto-commits and chains the Pages deploy** — the site
     is back online with fresh data within minutes.
   - If every index is unreachable, previous data is kept untouched.
3. **Human curation stays human**: tiers and summaries live in
   `src/data/synced/curated-meta.json` — the bot never invents them. Newly discovered guides
   show a NEW badge until someone curates them.
4. Everything renders with a *last synced* date (hubs + footer + `/sync`), so seasonal balance
   shifts are always one click away from correction.

Run the same sync locally anytime with `npm run sync`.

## Project structure

```
src/
  app/                        # /, /d4, /forever, /forever/launch, /builder, /about, /sync, /og/[game]/[slug]
  components/                 # Paper doll + item tooltips, progression & endgame timelines,
                              # talent spine, command palette, build explorer/cards, share & fork UI…
  data/
    types.ts                  # The build schema — single source of truth
    d4/                       # 8 Diablo IV builds
    forever/                  # 8 WoW Forever builds
    synced/                   # Generated + curated meta layers (JSON), sync report
  lib/                        # Registry, snapshots loader, game configs, progress/favorites/
                              # custom-build storage, fork-diff engine, search index
scripts/
  sync-meta.mjs               # robots-aware, rate-limited nightly sync CLI
  generate-icons.mjs          # PWA icon rasterizer (sharp)
  fix-og.mjs                  # postbuild: name exported OG images with .png
public/
  sw.js + offline.html        # service worker + offline fallback
```

## Contributing a build

1. Copy `src/data/d4/whirlwind-barbarian.ts` (D4) or `src/data/forever/fury-warrior.ts`
   (Forever) as your template — the schema contract is enforced by tests.
2. Follow the voice: direct, specific, zero-guessing. Hedge anything patch-fragile, never
   invent item/talent names, footnote representative values.
3. `npm test` enforces structure: ≥8 progression bands, ≥3 endgame phases, ≥10 canonical
   gear slots with item payloads (D4) / 17 slots (Forever), https sources, rotations,
   stat priorities and watch-outs all populated.
4. Register it in `src/lib/builds.ts` and open a PR — CI runs lint + tests + build, and the
   deploy ships automatically on merge.

## Disclaimer

Not affiliated with or endorsed by Blizzard Entertainment, Maxroll, Icy Veins, ClassicWoW.gg
or Wowhead. Diablo and World of Warcraft are trademarks of their respective owners. Build
summaries link back to and credit the source guides.

## License

[MIT](./LICENSE) © 2026 Antony Perez
