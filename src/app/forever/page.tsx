import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Compass, Info } from "lucide-react";
import { GAMES } from "@/lib/games";
import { getBuildsFor } from "@/lib/builds";
import { BuildExplorer } from "@/components/build-explorer";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/ui-bits";

export const metadata: Metadata = {
  title: "WoW Forever — Classic+ build paths",
  description:
    "Zero-guessing World of Warcraft: Forever (Classic+) builds. Classic talent trees with Forever twists — 16-point capstones, unified hit/crit, new dungeons and raids. Every talent point mapped from 1 to 60.",
};

const FOREVER_CHANGES = [
  {
    title: "Unified hit & crit",
    body: "Melee, ranged and spells now share one hit system. Gear with hit once and everything benefits — old classic hit-cap tables no longer apply.",
  },
  {
    title: "Raid buffs are baseline",
    body: "Kings, Might, Mark of the Wild and Divine Spirit no longer eat talent points. Every point you save goes straight into damage or survivability.",
  },
  {
    title: "16-point capstones",
    body: "Every tree gains a new one-point ability at 16 points invested — alongside the classic 11/21/31 milestones. Exact values are still tuning in beta.",
  },
  {
    title: "Both factions, new combos",
    body: "Paladins and Shamans on both sides. Gnome Priests, Human Hunters, Dwarf Shamans, Orc Mages, Troll Warlocks and Undead Paladins join the roster.",
  },
  {
    title: "Reworked itemization",
    body: "Every dungeon drop re-examined — hundreds of new or adjusted items, some tied to environments and creature types. Healer gear now grants spell damage too.",
  },
  {
    title: "Camping & Legacy",
    body: "Campfires become campsites with buffs, vendors and repairs (they don't stack with matching class buffs). Account-wide Legacy points spend at a 16-point cap per character.",
  },
];

export default function ForeverPage() {
  const game = GAMES.forever;
  const builds = getBuildsFor("forever");

  return (
    <div data-game="forever" className="world-bg noise">
      {/* Hero band */}
      <section className="border-b border-line bg-[radial-gradient(90%_100%_at_50%_0%,rgba(78,134,212,0.14),transparent_70%),radial-gradient(60%_60%_at_80%_10%,rgba(228,181,74,0.1),transparent_60%)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <FadeUp>
            <div className="flex flex-wrap items-center gap-3">
              <span className="accent-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                <CalendarClock className="h-3.5 w-3.5" />
                {game.statusChip}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-dim">
                <Compass className="h-3 w-3" />
                {game.metaLine}
              </span>
            </div>
            <h1 className="display-forever mt-5 text-4xl font-bold tracking-wide text-ink sm:text-6xl">
              WOW FOREVER
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
              {game.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* What changes */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <FadeUp>
          <SectionHeading
            eyebrow="Classic+ briefing"
            title="What changes in Forever"
            sub="The mechanics that reshape every build before you spend your first talent point. Full details on the linked official pages."
          />
        </FadeUp>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FOREVER_CHANGES.map((c) => (
            <StaggerItem key={c.title}>
              <div className="panel panel-hover h-full p-5">
                <Info className="h-4.5 w-4.5 text-(--accent-bright)" />
                <h3 className="mt-3 text-[15px] font-semibold text-ink">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeUp className="mt-6">
          <p className="text-xs leading-relaxed text-ink-dim">
            Sources:{" "}
            <a
              href="https://worldofwarcraft.blizzard.com/en-us/news/24302093/carve-a-new-path-with-world-of-warcraft-forever"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--accent-bright) hover:underline"
            >
              Blizzard&apos;s announcement
            </a>
            {" · "}
            <a
              href="https://classicwow.gg/forever/changes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--accent-bright) hover:underline"
            >
              ClassicWoW.gg changes guide
            </a>
            {" · "}
            <Link href="/about" className="text-(--accent-bright) hover:underline">
              our data pipeline
            </Link>
          </p>
        </FadeUp>
      </section>

      {/* Builds */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <FadeUp>
          <SectionHeading
            eyebrow="Core collection"
            title="Level-by-level build paths"
            sub="Classic talent trees with Forever deltas baked in — from level 1 ability ranks to the December 9 raid unlock."
          />
        </FadeUp>
        <div className="mt-10">
          <BuildExplorer builds={builds} />
        </div>
      </section>
    </div>
  );
}
