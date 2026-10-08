import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Compass, Info } from "lucide-react";
import { GAMES } from "@/lib/games";
import { getBuildsFor, getSnapshotsFor } from "@/lib/builds";
import { latestSyncDate } from "@/lib/snapshots";
import { ogImage } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { ForeverRoster } from "@/components/forever-roster";
import { WowHeading } from "@/components/wowui";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";
import { FOREVER_IN_BETA, FOREVER_LEVEL_CAP } from "@/lib/forever";

export const metadata: Metadata = {
  title: "WoW Forever — Classic+ build paths",
  description: FOREVER_IN_BETA
    ? `Zero-guessing World of Warcraft: Forever (Classic+) builds for the level ${FOREVER_LEVEL_CAP} beta. Classic talent trees with Forever twists — 16-point capstones, unified hit/crit, new dungeons and raids. Full 1–60 tracks return at launch.`
    : "Zero-guessing World of Warcraft: Forever (Classic+) builds. Classic talent trees with Forever twists — 16-point capstones, unified hit/crit, new dungeons and raids. Every talent point mapped from 1 to 60.",
  openGraph: {
    title: "BuildForge — WoW Forever build paths",
    images: [ogImage("forever", "hub")],
  },
  twitter: { card: "summary_large_image", images: [ogImage("forever", "hub")] },
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
      {/* Hero band — carved stone banner */}
      <section className="wowui-banner">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <FadeUp>
            <div className="flex flex-wrap items-center gap-3">
              <span className="wowui-chip">
                <CalendarClock className="h-3.5 w-3.5" />
                {game.statusChip}
              </span>
              <span className="wowui-chip">
                <Compass className="h-3 w-3" />
                {game.metaLine} · nightly sync {formatDate(latestSyncDate())}
              </span>
            </div>
            <h1 className="wowui-title display-forever mt-5 text-4xl font-bold tracking-wide sm:text-6xl">
              WOW FOREVER
            </h1>
            <p className="wowui-sub mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
              {game.description}
            </p>
            <Link href="/forever/launch" className="wow-redbtn mt-6 inline-flex">
              <CalendarClock className="h-4 w-4" />
              Launch hub — day-one checklist, dungeons &amp; raids
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* What changes — quest-log parchment */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <FadeUp>
          <WowHeading
            eyebrow="Classic+ briefing"
            title="What changes in Forever"
            sub="The mechanics that reshape every build before you spend your first talent point. Full details on the linked official pages."
          />
        </FadeUp>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FOREVER_CHANGES.map((c) => (
            <StaggerItem key={c.title}>
              <div className="wowui-parchment h-full">
                <h3 className="wowui-parchment-head flex items-start gap-2">
                  <Info className="mt-1.5 h-4 w-4 shrink-0" />
                  {c.title}
                </h3>
                <p className="wowui-ink-body mt-2 text-sm">{c.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeUp className="mt-6">
          <p className="text-xs leading-relaxed" style={{ color: "#9d968a" }}>
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
          <WowHeading
            eyebrow="Core collection"
            title="Level-by-level build paths"
            sub={FOREVER_IN_BETA
              ? "Classic talent trees with Forever deltas baked in — paths cover everything reachable in the beta; the post-cap track returns at launch."
              : "Classic talent trees with Forever deltas baked in — from level 1 ability ranks to the December 9 raid unlock."}
          />
        </FadeUp>
        <FadeUp className="mx-auto mt-10 max-w-3xl">
          <ForeverRoster builds={builds} guides={getSnapshotsFor("forever")} />
        </FadeUp>
      </section>
    </div>
  );
}
