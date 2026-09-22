import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Crosshair,
  Layers,
  ListChecks,
  ShieldAlert,
  Smartphone,
  Swords,
  Workflow,
} from "lucide-react";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/ui-bits";
import { BuildCard } from "@/components/build-card";
import { BUILDS } from "@/lib/builds";
import { FOREVER_IN_BETA, FOREVER_LEVEL_CAP } from "@/lib/forever";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: ListChecks,
    title: "Level-by-level paths",
    body: "Every skill, talent point and unlock at the exact level you take it. No tabs full of wiki pages, no guessing what to buy at the trainer.",
  },
  {
    icon: Layers,
    title: "Gear without the gamble",
    body: "Slot-by-slot priorities: what to equip, which affixes matter, what to vendor and what to chase. The second screen tells you what the drop is worth.",
  },
  {
    icon: Crosshair,
    title: "Rotation priorities",
    body: "Pull, standard packs, burst windows — the exact button order for each phase of a fight, tuned for both games.",
  },
  {
    icon: ShieldAlert,
    title: "Zero-guessing watch-outs",
    body: "The traps that cost you a level, a boss, or a raid slot — flagged before you trip them.",
  },
  {
    icon: Workflow,
    title: "Fork the meta, forge your own",
    body: "Every build opens in the Builder. Tweak any band, rename it, save it to your phone and share the link with your guild.",
  },
  {
    icon: Smartphone,
    title: "Built for the second screen",
    body: "Phone-first layout, sticky navigation, one-hand reach. Park your phone next to the keyboard and play optimally.",
  },
];

export default function HomePage() {
  const featured = [
    BUILDS.find((b) => b.id === "d4-whirlwind-barbarian")!,
    BUILDS.find((b) => b.id === "d4-chain-lightning-sorcerer")!,
    BUILDS.find((b) => b.id === "forever-fury-warrior")!,
    BUILDS.find((b) => b.id === "forever-frost-mage")!,
  ];

  return (
    <div className="noise">
      {/* ─── Hero: choose your world ─────────────────────────── */}
      <section className="relative min-h-[calc(100svh-3.5rem)] overflow-hidden">
        <div className="grid min-h-[calc(100svh-3.5rem)] grid-cols-1 lg:grid-cols-2">
          {/* Diablo IV half */}
          <Link
            href="/d4"
            className="group relative flex flex-col justify-end overflow-hidden p-6 sm:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(212,32,46,0.28),transparent_55%),radial-gradient(100%_70%_at_80%_100%,rgba(240,164,59,0.14),transparent_60%),linear-gradient(180deg,#150709_0%,#0a0a0e_100%)] transition-opacity duration-500 group-hover:opacity-80" />
            <div className="absolute inset-0 opacity-60 transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="absolute top-[18%] left-[12%] h-72 w-72 rounded-full bg-d4/20 blur-[110px]" />
              <div className="absolute bottom-[12%] right-[8%] h-56 w-56 rounded-full bg-d4-ember/10 blur-[90px]" />
            </div>
            <div className="relative space-y-4">
              <p className="eyebrow text-d4-bright/90">Season 15 · Hell&apos;s Legacy · Patch 3.2</p>
              <h1 className="display-d4 text-5xl leading-[0.95] font-bold text-ink sm:text-6xl lg:text-7xl">
                DIABLO IV
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                Warlocks are breaking Pit 150. Paladins lanced their way into the meta.
                Start from the exact right skill at the exact right level — Sanctuary
                doesn&apos;t wait.
              </p>
              <span className="inline-flex items-center gap-2 rounded-lg border border-d4/40 bg-d4/10 px-4 py-2 text-sm font-semibold text-d4-bright transition-all group-hover:bg-d4/20">
                Enter Sanctuary <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          {/* Forever half */}
          <Link
            href="/forever"
            className="group relative flex flex-col justify-end overflow-hidden border-t border-line p-6 sm:p-10 lg:border-t-0 lg:border-l"
          >
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_0%,rgba(78,134,212,0.22),transparent_55%),radial-gradient(100%_70%_at_15%_100%,rgba(228,181,74,0.16),transparent_60%),linear-gradient(180deg,#0a1424_0%,#0a0a0e_100%)] transition-opacity duration-500 group-hover:opacity-80" />
            <div className="absolute inset-0 opacity-60 transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="absolute top-[18%] right-[12%] h-72 w-72 rounded-full bg-forever-arcane/20 blur-[110px]" />
              <div className="absolute bottom-[12%] left-[8%] h-56 w-56 rounded-full bg-forever/15 blur-[90px]" />
            </div>
            <div className="relative space-y-4">
              <p className="eyebrow text-forever-bright/90">Beta live · Launches Nov 4, 2026</p>
              <h1 className="display-forever text-5xl leading-[0.95] font-bold tracking-wide text-ink sm:text-6xl lg:text-7xl">
                WoW FOREVER
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                {FOREVER_IN_BETA
                  ? `Blizzard's Classic+ beta is live: new dungeons, new raids, new trees with 16-point capstones. Paths cover the level ${FOREVER_LEVEL_CAP} beta cap — full 1–60 tracks at launch.`
                  : "Blizzard's Classic+ is here: level 60 Azeroth, new dungeons, new raids, new trees with 16-point capstones. Every talent point, mapped from 1 to 60."}
              </p>
              <span className="inline-flex items-center gap-2 rounded-lg border border-forever/40 bg-forever/10 px-4 py-2 text-sm font-semibold text-forever-bright transition-all group-hover:bg-forever/20">
                Return to Azeroth <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>

        {/* Floating center emblem */}
        <div className="pointer-events-none absolute top-6 left-1/2 hidden -translate-x-1/2 lg:block">
          <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-base/70 px-5 py-4 backdrop-blur-md">
            <Swords className="h-5 w-5 text-ink-dim" />
            <p className="text-xs font-semibold tracking-[0.3em] text-ink-dim uppercase">BuildForge</p>
          </div>
        </div>
      </section>

      {/* ─── Value prop ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
        <FadeUp>
          <SectionHeading
            eyebrow="The second screen"
            title="Play with zero guessing."
            sub="BuildForge sits on your phone or tablet while you play. Whatever level you are, whatever just dropped, the answer is one glance away — and every page links back to the full guide it was synced from."
          />
        </FadeUp>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <div className="panel panel-hover h-full p-5">
                <f.icon className="h-5 w-5 text-(--accent-bright)" />
                <h3 className="mt-3 text-[15px] font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{f.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ─── How it works ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
        <FadeUp>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps to optimal."
          />
        </FadeUp>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pick your world",
              body: "Diablo IV Season 15 or WoW Forever Classic+. Each has its own theme, its own classes, its own meta.",
            },
            {
              step: "02",
              title: "Follow the level path",
              body: "Open a build and scroll. Every level band tells you exactly what to take, rank it, and why it beats the alternative.",
            },
            {
              step: "03",
              title: "Forge your own",
              body: "Fork any meta build into the Builder, bend it to your style, save it offline and share the link with your guild.",
            },
          ].map((s) => (
            <StaggerItem key={s.step}>
              <div className="panel h-full p-6">
                <p className="font-mono text-sm font-semibold text-(--accent-bright)">{s.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
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
            sub="Hand-authored level paths for the staples, synced snapshots for the freshest meta."
          />
        </FadeUp>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((b) => (
            <StaggerItem key={b.id}>
              <BuildCard build={b} />
            </StaggerItem>
          ))}
        </Stagger>
        <FadeUp className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/d4"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-d4/40 hover:text-d4-bright"
          >
            All Diablo IV builds <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/forever"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-forever/40 hover:text-forever-bright"
          >
            All WoW Forever builds <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </FadeUp>
      </section>

      {/* ─── Data trust strip ────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
        <FadeUp>
          <div className="panel p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2 text-ink-dim">
                <Compass className="h-4 w-4" />
                <p className="eyebrow">Synced, not scraped-in-the-dark</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {["Maxroll", "Icy Veins", "ClassicWoW.gg", "Wowhead", "Blizzard News"].map((site) => (
                  <span key={site} className="rounded-lg border border-line bg-surface-raised px-3 py-1.5 text-xs font-medium text-ink-muted">
                    {site}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Meta cards are refreshed by a maintainer-run sync pipeline that respects each
              site&apos;s robots.txt, rate-limits itself and attributes every source. In-house
              build paths are anchored to patch-stable mechanics and always link out to the
              live guides for seasonal tuning.
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-(--accent-bright) hover:underline"
            >
              How the data pipeline works <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
        <FadeUp>
          <div className={cn("relative overflow-hidden rounded-2xl border border-(--accent-border) p-8 text-center sm:p-14")}>
            <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,var(--accent-glow),transparent_70%)]" />
            <div className="relative space-y-5">
              <Workflow className="mx-auto h-7 w-7 text-(--accent-bright)" />
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
                Forge the build you actually want to play.
              </h2>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                Off-meta, meme, or your guild&apos;s secret comp — build it level-by-level,
                save it to your phone, share it anywhere.
              </p>
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 rounded-xl bg-(--accent) px-6 py-3 text-sm font-semibold text-base shadow-[0_0_40px_-8px_var(--accent)] transition-transform hover:scale-[1.03]"
              >
                Open the Builder <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
