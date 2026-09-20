# BuildForge

> The second-screen build companion for **Diablo IV** and **World of Warcraft: Forever** (Classic+).
> Zero guessing: every skill, talent point, gear priority and rotation step — at the exact level you need it.

![CI](https://github.com/AntonyPerez0/buildforge/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/AntonyPerez0/buildforge/actions/workflows/deploy.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)

**Live site:** https://antonyperez0.github.io/buildforge/

---

## What it is

BuildForge is designed to live on your **second screen or phone** while you play. Pick your
world — Diablo IV (Season 15) or WoW Forever (Blizzard's Classic+) — and get:

- **Level-by-level build paths** — bands like "Levels 3–5" that tell you *exactly* what to take,
  at what rank, and why it beats the alternative. Milestones call out the unlocks that matter
  (Core skills at 3, the Forever 16-point capstone around 25, Bloodthirst at 40, …).
- **Gear decoding** — slot-by-slot targets: what to equip, which affixes/stat lines matter,
  and specific uniques to chase.
- **Rotation priorities** — pull / standard / burst phases in strict button order.
- **Watch-outs** — the traps that cost levels, kills and raid slots, flagged before you trip them.
- **The Forge (custom builder)** — fork any meta build, edit it band-by-band, save it to your
  device (localStorage), share it via link or JSON export.
- **Live meta snapshots** — condensed from Maxroll / Icy Veins (D4) and ClassicWoW.gg /
  Wowhead (Forever) with attribution and links to the full guides.

## Two worlds, two themes

| | Diablo IV | WoW Forever |
|---|---|---|
| Theme | Blood red & ember, gothic serif (Cinzel) | Alliance gold & arcane blue (Marcellus) |
| Current | Season 15: Hell's Legacy (patch 3.2) | Beta live, launches Nov 4 2026 |
| Builds | Whirlwind Barbarian, Chain Lightning Sorcerer, Minion Necromancer, Twisting Blades Rogue + 9 live-meta snapshots | Fury Warrior, Ret Paladin, Frost Mage, Combat Rogue |
| Routes | `/d4` | `/forever` |

## Tech stack

- **Next.js 16** (App Router, static export) + **TypeScript**
- **Tailwind CSS v4** with runtime per-game theming (`[data-game]` CSS custom properties)
- **Framer Motion** for motion design, **lucide-react** for icons
- **Vitest** data-integrity tests, **ESLint** (flat config)
- Fully static — deploys to GitHub Pages, no server, no database; custom builds live in `localStorage`

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # data-integrity tests
npm run lint       # eslint
npm run build      # static export → ./out
```

### Environment

| Variable | Used for | Default |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | GitHub Pages subpath (e.g. `/buildforge`) | unset |
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs for sitemap/OG | `https://antonyperez0.github.io/buildforge` |

## The data pipeline

BuildForge **summarizes and attributes** — it never reproduces guide content.

1. **Curated, in-house builds** live in `src/data/{d4,forever}/*.ts` following one schema
   (`src/data/types.ts`). They anchor to patch-stable mechanics and hedge anything seasonal.
2. **Live-meta snapshots** are refreshed by a maintainer-run CLI:

   ```bash
   npm run sync
   ```

   The script checks each site's `robots.txt` first and skips disallowed paths, rate-limits
   itself to one request every 2s, identifies itself with a custom user-agent, and stores
   only names/tiers/short summaries **with** source links → `src/data/synced/meta-snapshots.json`.
3. Everything renders with a *last synced* date and links to the live guides, so seasonal
   balance shifts are always one click away from correction.

## Project structure

```
src/
  app/                  # App Router pages (/, /d4, /forever, /builder, /about)
  components/           # Timeline, build cards, explorer, section nav, share buttons…
  data/
    types.ts            # The build schema — single source of truth
    d4/                 # Diablo IV builds + S15 meta snapshots
    forever/            # WoW Forever builds
  lib/                  # Registry, game configs, custom-build storage/share helpers
scripts/sync-meta.mjs   # robots-aware, rate-limited guide sync CLI
```

## Contributing a build

1. Copy `src/data/d4/whirlwind-barbarian.ts` as your template (the schema contract is enforced by tests).
2. Follow the voice: direct, specific, zero-guessing. Hedge anything patch-fragile.
3. `npm test` enforces structure (≥8 progression bands, sources with https links, gear/stats/rotation/watch-outs all populated).
4. Open a PR.

## Disclaimer

Not affiliated with or endorsed by Blizzard Entertainment, Maxroll, Icy Veins, ClassicWoW.gg
or Wowhead. Diablo and World of Warcraft are trademarks of their respective owners. Build
summaries link back to and credit the source guides.

## License

[MIT](./LICENSE) © 2026 Antony Perez
