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
import { FOREVER_DATES, FOREVER_IN_BETA, FOREVER_LEVEL_CAP } from "@/lib/forever";
import { getTierList } from "@/lib/tiers";

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
    body: "Talent-locked buffs such as Blessing of Kings, Divine Spirit and the improved Might and Mark of the Wild ranks no longer cost points. Reports differ on the full list — check the changes guide.",
  },
  {
    title: "16-point capstones",
    body: "All 27 trees gain a new one-point talent at 16 points invested — alongside the classic 11/21/31 milestones. Exact values are still tuning in beta.",
  },
  {
    title: "Both factions, new combos",
    body: "Paladins and Shamans on both sides. Human Hunters, Gnome Priests, Dwarf Shamans, Orc Mages, Troll Warlocks and Undead Paladins join the roster; Skyborne Elves need an optional upgrade.",
  },
  {
    title: "Reworked itemization",
    body: "Every boss loot table redone: dungeon drops are rare or better, world-drop epics added, caster weapons carry spell damage and healer gear grants spell damage too.",
  },
  {
    title: "Camping & Legacy",
    body: "Campfires become campsites with buffs, vendors and repairs (they don't stack with matching class buffs). Account-wide Legacy points spend at a 16-point cap per character.",
  },
];

export default function ForeverPage() {
  const game = GAMES.forever;
  const builds = getBuildsFor("forever");
  const tierHub = getTierList("icyveins-forever-hub");

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
              {FOREVER_IN_BETA ? (
                <span className="wowui-chip">
                  <Compass className="h-3 w-3" />
                  Level {FOREVER_LEVEL_CAP} cap · beta ends {FOREVER_DATES.betaEnds}
                </span>
              ) : null}
              <span className="wowui-chip">
                <Compass className="h-3 w-3" />
                Raids unlock {FOREVER_DATES.raids}
              </span>
            </div>
            <h1 className="wowui-title display-forever mt-5 text-4xl font-bold tracking-wide sm:text-6xl">
              WOW FOREVER
            </h1>
            <p className="wowui-sub mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
              {game.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/forever/launch" className="wow-redbtn !flex-none">
                <CalendarClock className="h-4 w-4" />
                Launch hub — checklist, dungeons &amp; raids
              </Link>
              <a href="#builds" className="wowui-stonebtn">
                Build paths
              </a>
            </div>
            <p className="mt-5 text-xs text-[#9d968a]">
              {game.metaLine} · nightly sync {formatDate(latestSyncDate())}
            </p>
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
              href="https://www.icy-veins.com/wow-forever/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--accent-bright) hover:underline"
            >
              Icy Veins Forever guides
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
      <section id="builds" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28">
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
        <FadeUp className="mx-auto mt-8 max-w-3xl">
          <div className="wow-dialog flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-[#ffd100] [text-shadow:1px_1px_0_#000]">Where do the tiers come from?</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#d8d8e0]">
                {tierHub?.note ??
                  "Icy Veins' Forever tier lists aren't published yet; ratings here are BuildForge's own until they are."}
              </p>
            </div>
            <a
              href={tierHub?.url ?? "https://www.icy-veins.com/wow-forever/tier-list-hub"}
              target="_blank"
              rel="noopener noreferrer"
              className="wowui-stonebtn shrink-0"
            >
              Icy Veins tier hub
            </a>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
