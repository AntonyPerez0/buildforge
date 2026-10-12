import Link from "next/link";
import { ArrowRight, ExternalLink, Layers, ListChecks, ShieldCheck, Smartphone, Swords, Workflow } from "lucide-react";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";
import { D4Ornament, SectionHeading } from "@/components/ui-bits";
import { BuildCard } from "@/components/build-card";
import { BUILDS } from "@/lib/builds";
import { FOREVER_DATES, FOREVER_IN_BETA, FOREVER_LEVEL_CAP } from "@/lib/forever";
import { TIER_LISTS } from "@/lib/snapshots";
import { formatDate } from "@/lib/utils";

const FEATURES = [
  {
    icon: ListChecks,
    title: "Level-by-level paths",
    body: "Every skill, talent point and unlock at the level you take it — with the reason it beats the alternative. Check steps off as you play.",
  },
  {
    icon: Layers,
    title: "In-game character screens",
    body: "Gear on a paper doll with game-styled item tooltips, stat priorities, rotations and the watch-outs that cost runs and raid spots.",
  },
  {
    icon: ShieldCheck,
    title: "Tiers you can trace",
    body: "List placements are read from Maxroll and Icy Veins and link back to them with the date they were checked; anything unranked is labelled as BuildForge's own rating.",
  },
  {
    icon: Workflow,
    title: "Fork and forge",
    body: "Open any build in the Builder, change a band, compare against the meta, and share it with your group as a link.",
  },
  {
    icon: Smartphone,
    title: "Built for the second screen",
    body: "Phone-first, installable and offline-capable. Park it next to the keyboard and keep playing.",
  },
  {
    icon: Swords,
    title: "Two worlds, two interfaces",
    body: "The Diablo IV side reads like Sanctuary's menus; the Forever side like the classic WoW interface.",
  },
];

const D4_MENU = [
  { href: "/d4#builds", label: "Build paths", hint: "8 level paths" },
  { href: "/d4#tier-list", label: "Season 15 tier list", hint: "Maxroll · Icy Veins" },
  { href: "/d4#guides", label: "Live guide index", hint: "Synced nightly" },
];

export default function HomePage() {
  const featured = [
    BUILDS.find((b) => b.id === "d4-whirlwind-barbarian")!,
    BUILDS.find((b) => b.id === "d4-rapid-fire-rogue")!,
    BUILDS.find((b) => b.id === "forever-fury-warrior")!,
    BUILDS.find((b) => b.id === "forever-frost-mage")!,
  ];
  const lists = TIER_LISTS;

  return (
    <div className="noise">
      {/* ─── Two worlds ──────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <h1 className="sr-only">BuildForge — build companion for Diablo IV and World of Warcraft: Forever</h1>
        <div className="grid min-h-[calc(100svh-3.5rem)] grid-cols-1 lg:grid-cols-2">
          {/* Diablo IV — the main menu */}
          <div data-game="d4" className="home-d4 relative flex items-center justify-center overflow-hidden px-6 py-16 sm:px-10">
            <div className="d4-embers" aria-hidden />
            <div className="relative flex w-full max-w-md flex-col items-center text-center">
              <p className="d4-season">Season 15 · Hell&apos;s Legacy</p>
              <h2 className="d4-title mt-4 text-5xl sm:text-6xl xl:text-7xl">Diablo IV</h2>
              <D4Ornament className="mt-5" />
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                Patch 3.2 build paths ranked against the Maxroll and Icy Veins tier lists — the exact skill at the
                exact level, from level 1 to the Pit.
              </p>
              <nav aria-label="Diablo IV" className="mt-8 flex w-full flex-col gap-2">
                {D4_MENU.map((m) => (
                  <Link key={m.href} href={m.href} className="d4-menu-btn">
                    {m.label}
                    <small>{m.hint}</small>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* WoW Forever — the login screen */}
          <div
            data-game="forever"
            className="home-forever relative flex items-center justify-center overflow-hidden border-t border-black px-6 py-16 sm:px-10 lg:border-t-0 lg:border-l"
          >
            <div className="home-stars" aria-hidden />
            <div className="wow-login relative w-full max-w-md text-center">
              <p className="wowui-gold-label relative">Classic+ · {FOREVER_IN_BETA ? "Beta live" : "Live"}</p>
              <h2 className="wowui-title display-forever relative mt-3 text-5xl sm:text-6xl">WoW Forever</h2>
              <p className="wowui-sub relative mt-4 text-sm leading-relaxed">
                {FOREVER_IN_BETA
                  ? `Talent-by-level paths for Blizzard's Classic+, trimmed to the level ${FOREVER_LEVEL_CAP} beta — full 1–60 tracks at launch.`
                  : "Talent-by-level paths for Blizzard's Classic+, from level 1 to the raid unlock."}
              </p>
              <nav aria-label="WoW Forever" className="relative mt-7 flex flex-col gap-2.5">
                <Link href="/forever#builds" className="wow-redbtn !flex-none">
                  Build Paths
                </Link>
                <Link href="/forever/launch" className="wow-redbtn !flex-none">
                  Launch Hub
                </Link>
                <Link href="/forever" className="wow-redbtn !flex-none">
                  Classic+ Briefing
                </Link>
              </nav>
              <p className="relative mt-5 text-xs text-[#cfc6b0] [text-shadow:1px_1px_0_#000]">
                {FOREVER_IN_BETA ? `Beta ends ${FOREVER_DATES.betaEnds} · ` : ""}Launch {FOREVER_DATES.launch} · Raids{" "}
                {FOREVER_DATES.raids}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What it is ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
        <FadeUp>
          <SectionHeading
            eyebrow="The second screen"
            title="Play with zero guessing."
            sub="BuildForge sits on your phone or tablet while you play. Whatever level you are and whatever just dropped, the answer is one glance away — and every page links back to the guides it was built from."
          />
        </FadeUp>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <div className="panel h-full p-5">
                <f.icon className="h-5 w-5 text-(--accent-bright)" />
                <h3 className="mt-3 text-[15px] font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{f.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ─── Featured builds ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
        <FadeUp>
          <SectionHeading
            eyebrow="From the forge"
            title="Meta builds, fully mapped."
            sub="Each build renders in its own game's interface. Tier pills show where it sits on Maxroll and Icy Veins today."
          />
        </FadeUp>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((b) => (
            <StaggerItem key={b.id} className="h-full">
              <BuildCard build={b} />
            </StaggerItem>
          ))}
        </Stagger>
        <FadeUp className="mt-6 flex flex-wrap gap-3">
          <Link href="/d4" className="btn">
            All Diablo IV builds <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/forever" className="btn">
            All WoW Forever builds <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </FadeUp>
      </section>

      {/* ─── Where tiers come from ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
        <FadeUp>
          <SectionHeading
            eyebrow="Sources"
            title="Tiers from Maxroll and Icy Veins."
            sub="Every list placement comes from Maxroll or Icy Veins and links back to it. The nightly sync re-reads each list below; when a page can't be read cleanly, the last good read (or the human-verified placement) stays. Builds no list ranks carry a clearly labelled BuildForge rating."
          />
        </FadeUp>
        <FadeUp className="mt-10">
          <div className="panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[11px] tracking-wider text-ink-dim uppercase">
                    <th className="px-5 py-3 font-semibold">Source</th>
                    <th className="px-5 py-3 font-semibold">Game</th>
                    <th className="px-5 py-3 font-semibold">List</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {lists.map((l) => (
                    <tr key={l.id} className="border-b border-line/60 last:border-0">
                      <td className="px-5 py-3 font-semibold text-ink">{l.site}</td>
                      <td className="px-5 py-3 text-ink-muted">{l.game === "d4" ? "Diablo IV" : "WoW Forever"}</td>
                      <td className="px-5 py-3">
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-(--accent-bright) hover:underline"
                        >
                          {l.list} <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                      <td className="px-5 py-3 text-ink-muted">
                        {l.status === "coming-soon" ? "Not published yet" : l.status === "auto" ? "Read nightly" : "Verified"}
                      </td>
                      <td className="px-5 py-3 text-ink-muted">{formatDate(l.checkedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-line px-5 py-3 text-xs leading-relaxed text-ink-dim">
              Also linked with attribution: ClassicWoW.gg and Wowhead for Forever specs, and Blizzard&apos;s own
              announcements.{" "}
              <Link href="/about" className="text-(--accent-bright) hover:underline">
                How the pipeline works
              </Link>
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
        <FadeUp>
          <div className="panel relative overflow-hidden p-8 text-center sm:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,var(--accent-glow),transparent_70%)]" />
            <div className="relative space-y-5">
              <Workflow className="mx-auto h-7 w-7 text-(--accent-bright)" />
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
                Forge the build you actually want to play.
              </h2>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                Off-meta, meme, or your guild&apos;s secret comp — build it level by level, save it to your phone and
                share it anywhere.
              </p>
              <Link href="/builder" className="btn btn-primary">
                Open the Builder <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
