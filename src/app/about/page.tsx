import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Database, ExternalLink, GitBranch, ScrollText, ShieldCheck } from "lucide-react";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/ui-bits";

export const metadata: Metadata = {
  title: "About — data sources & sync pipeline",
  description:
    "How BuildForge keeps build data fresh: tiers read nightly from the Maxroll and Icy Veins tier lists, with robots.txt compliance, rate limiting and attribution.",
};

const SOURCES = [
  {
    name: "Maxroll",
    url: "https://maxroll.gg/d4/tierlists/endgame-tier-list",
    use: "Diablo IV tier lists (endgame, leveling) and build guides — the primary tier source for D4. Maxroll does not cover WoW Forever.",
  },
  {
    name: "Icy Veins",
    url: "https://www.icy-veins.com/d4/guides/endgame-tier-list/",
    use: "Diablo IV tier lists and build guides, plus the WoW Forever spec guides and tier-list hub (Forever tier lists are marked Coming Soon).",
  },
  {
    name: "ClassicWoW.gg",
    url: "https://classicwow.gg/forever",
    use: "WoW Forever class guides, talent calculator and itemization notes — linked alongside Icy Veins.",
  },
  {
    name: "Wowhead",
    url: "https://www.wowhead.com/forever",
    use: "WoW Forever news and databases.",
  },
  {
    name: "Blizzard News",
    url: "https://worldofwarcraft.blizzard.com/en-us/news/24302093/carve-a-new-path-with-world-of-warcraft-forever",
    use: "Official World of Warcraft: Forever announcements, rulesets and roadmap; Diablo IV season notes.",
  },
];

const PIPELINE = [
  {
    icon: Bot,
    title: "Nightly automated sync",
    body: "A scheduled GitHub Action runs the pipeline every night: Maxroll and Icy Veins guide indexes and tier lists are fetched robots-aware and rate-limited, newly published guides join the index, and if anything changed the site rebuilds and redeploys automatically.",
  },
  {
    icon: Database,
    title: "List tiers are read, not invented",
    body: "Every list placement comes from a Maxroll or Icy Veins tier list and links back to it. The sync re-reads each list nightly; if a page can't be parsed cleanly, the last good read (or the human-verified placements) stays — and the sync report says which. Builds no list ranks show a labelled BuildForge rating.",
  },
  {
    icon: ScrollText,
    title: "Anchored to stable mechanics",
    body: "In-house level paths are written against patch-stable mechanics (talent trees, unlock levels, rotation priorities). Anything that drifts per-season is hedged and points to the live guide for exact numbers.",
  },
  {
    icon: ShieldCheck,
    title: "Every number has an escape hatch",
    body: "Seasonal balance changes. Every build page carries its update date and links to its sources, and only build names, tiers and links are stored — never guide content. The source sites earn the traffic; BuildForge earns the glance.",
  },
];

export default function AboutPage() {
  return (
    <div data-game="neutral" className="world-bg noise">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <FadeUp>
          <SectionHeading
            eyebrow="How BuildForge works"
            title="Trusted data, zero guessing, honest sourcing."
            sub="BuildForge is a second-screen companion: it compresses the meta into level-by-level paths and always links back to the guides that own the content."
          />
        </FadeUp>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
          {PIPELINE.map((p) => (
            <StaggerItem key={p.title}>
              <div className="panel h-full p-5">
                <p.icon className="h-5 w-5 text-(--accent-bright)" />
                <h3 className="mt-3 text-[15px] font-semibold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeUp className="mt-14">
          <SectionHeading eyebrow="Attribution" title="Where the data comes from" />
        </FadeUp>
        <FadeUp className="mt-8">
          <div className="panel divide-y divide-line">
            {SOURCES.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-surface-raised/40"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{s.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{s.use}</p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-ink-dim transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent-bright)" />
              </a>
            ))}
          </div>
        </FadeUp>

        <FadeUp className="mt-14">
          <div className="panel p-6">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4.5 w-4.5 text-(--accent-bright)" />
              <h2 className="text-lg font-semibold text-ink">Run the sync yourself</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              BuildForge is open source. The sync pipeline is a local CLI — clone the repo,
              run <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs text-(--accent-bright)">npm run sync</code>,
              and it re-reads the guide indexes and tier lists. Verified tiers live in{" "}
              <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs text-(--accent-bright)">curated-meta.json</code>{" "}
              (used wherever no recent live read exists); rebuild without fetching via{" "}
              <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs text-(--accent-bright)">npm run sync -- --offline</code>.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://github.com/AntonyPerez0/buildforge"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View on GitHub
              </a>
              <Link
                href="/sync"
                className="btn"
              >
                Nightly sync report
              </Link>
              <Link
                href="/builder"
                className="btn"
              >
                Try the Builder
              </Link>
            </div>
          </div>
        </FadeUp>

        <FadeUp className="mt-10">
          <p className="text-xs leading-relaxed text-ink-dim">
            Disclaimer: BuildForge is a fan-made project and is not affiliated with or endorsed
            by Blizzard Entertainment, Maxroll, Icy Veins, ClassicWoW.gg or Wowhead. Diablo,
            World of Warcraft and all related trademarks belong to their respective owners.
            Game data summarized on this site remains the property of its sources and is
            linked with attribution.
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
