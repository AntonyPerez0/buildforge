import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Compass, MapPin, Swords, Users } from "lucide-react";
import { LaunchChecklist, type LaunchTask } from "@/components/launch-checklist";
import { WowHeading } from "@/components/wowui";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";
import { ogImage } from "@/lib/site";
import { FOREVER_DATES, FOREVER_IN_BETA, FOREVER_LEVEL_CAP } from "@/lib/forever";

export const metadata: Metadata = {
  title: "Forever launch hub — day-one checklist, dungeons & raids",
  description:
    "Everything before and at World of Warcraft: Forever launch (Nov 4, 2026): day-one checklist, the nine new dungeons, the December 9 raid unlock, new zones and the Classic+ systems that change your build.",
  openGraph: {
    title: "BuildForge — WoW Forever launch hub",
    images: [ogImage("forever", "hub")],
  },
  twitter: { card: "summary_large_image", images: [ogImage("forever", "hub")] },
};

const TASKS: LaunchTask[] = [
  {
    title: "Pick your ruleset",
    tag: "Permanent",
    body: "Normal, PvP or Roleplaying — chosen per character (there is no realm list), with Hardcore planned after launch. PvP locks an account to one faction, and friends need the same ruleset and faction to group.",
  },
  {
    title: "Sort access",
    tag: "Before Nov 4",
    body: "The base game runs on an active WoW subscription or game time. The Skyborne Heroic Pack unlocks the Skyborne race; the Epic Pack and Warcraft Forever Collection add beta access (live until Oct 21) — the Heroic Pack does not.",
  },
  {
    title: "Name reservation",
    tag: "Oct 27 – Nov 3",
    body: "Upgrade owners can reserve names early — it is not early gameplay access, but it locks the name you want for launch morning.",
  },
  {
    title: "Choose race & class",
    tag: "New combos",
    body: "Human Hunter, Gnome Priest, Dwarf Shaman, Orc Mage, Troll Warlock and Undead Paladin join the roster, so Paladins and Shamans exist on both factions. Skyborne Elves (paid upgrade) pick a side at creation — High Order or Windshapers — and play Warrior, Hunter, Rogue or Druid, plus Mage (Alliance) or Shaman (Horde).",
  },
  {
    title: "Pick professions with camping in mind",
    tag: "Camping",
    body: "Campsites feed on profession-crafted objects — a Cook upgrades the campfire, others contribute utility. Matching camp buffs and class buffs do not stack, so coordinate rather than double up.",
  },
  {
    title: "Plan your Legacy points",
    tag: "16-point cap",
    body: "Legacy points are account-wide, but each character spends up to 16 at launch (Blizzard plans to raise the cap later) across Professions, Adventure and Resourcefulness. Decide your priority tree before launch night.",
  },
  {
    title: "Set expectations: no flying, no scaling",
    tag: "Classic rules",
    body: "Original continents, level 60 cap, ground mounts only. Leveling routes and travel time matter — check the class build paths for the dungeon level bands.",
  },
  {
    title: "Book raid nights",
    tag: "Dec 9",
    body: "Barrow Deeps (10), Hyjal Summit (20) and Onyxia's Lair (40) are on the roadmap for December 9 — Blizzard notes timing can shift. The launch window is your dungeon-gearing and consumable runway.",
  },
];

const DUNGEONS: { name: string; level: string }[] = [
  { name: "Hall of Thanes", level: "~13" },
  { name: "Ruins of Lordaeron", level: "15" },
  { name: "Excavation Site: Wetlands", level: "26" },
  { name: "City of Dalaran", level: "28" },
  { name: "The Drowned City", level: "35" },
  { name: "Krol'dok Stronghold", level: "40" },
  { name: "Alcaz Prison", level: "48" },
  { name: "Blackmaw Hold", level: "55" },
  { name: "Shaper's Terrace", level: "58" },
];

const RAIDS: { name: string; size: string; note: string }[] = [
  {
    name: "Barrow Deeps",
    size: "10 players",
    note: "The entry tier — where guilds forming at launch cut their teeth.",
  },
  {
    name: "Hyjal Summit",
    size: "20 players",
    note: "The mid tier in the new Mount Hyjal region — tight compositions matter.",
  },
  {
    name: "Onyxia's Lair",
    size: "40 players",
    note: "The classic 40 — attunement questline, coordinated buffs and the famous loot table.",
  },
];

const SYSTEMS: { title: string; body: string }[] = [
  {
    title: "Unified hit & crit",
    body: "Melee, ranged and spells share one hit system — gear hit once, everything benefits. Old hit-cap tables are dead; use the linked calculator.",
  },
  {
    title: "Baseline raid buffs",
    body: "Talent-locked buffs such as Blessing of Kings, Divine Spirit and the improved Might and Mark of the Wild ranks cost no points — reports differ on the exact list.",
  },
  {
    title: "16-point capstones",
    body: "Every tree gains a new one-point ability at 16 points, alongside the classic 11/21/31 milestones. Exact values are still tuning in beta.",
  },
  {
    title: "Reworked itemization",
    body: "Every boss loot table redone, dungeon drops rare or better, world-drop epics added; caster and healer gear carry spell damage. Old BiS lists are not Forever gearing plans.",
  },
  {
    title: "Camping",
    body: "Campfires become campsites with rest, vendors, repairs and one-hour buffs — up to three nearby players each add one profession object.",
  },
  {
    title: "Transmog & visuals",
    body: "Opt-in transmog (off in Classic Mode), modern/Classic visual presets, HD or SD character models, official gamepad support.",
  },
];

export default function LaunchHubPage() {
  return (
    <div data-game="forever" className="world-bg noise">
      {/* Hero */}
      <section className="wowui-banner">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <FadeUp>
            <nav className="wowui-gold-label flex items-center gap-2 !text-[11px]" aria-label="Breadcrumb">
              <Link href="/forever" className="hover:underline">
                WoW Forever
              </Link>
              <span>/</span>
              <span className="text-(--accent-bright)">Launch hub</span>
            </nav>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="wowui-chip">
                <CalendarClock className="h-3.5 w-3.5" />
                {FOREVER_IN_BETA
                  ? `Beta to level ${FOREVER_LEVEL_CAP} until ${FOREVER_DATES.betaEnds} · Launches ${FOREVER_DATES.launch}`
                  : `Live since ${FOREVER_DATES.launch}`}
              </span>
              <span className="wowui-chip">
                <Compass className="h-3 w-3" />
                Raids unlock Dec 9 · Zero level scaling · No flying
              </span>
            </div>
            <h1 className="wowui-title display-forever mt-5 text-4xl font-bold tracking-wide sm:text-6xl">
              LAUNCH HUB
            </h1>
            <p className="wowui-sub mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
              Everything to decide and prepare before you log in on November 4 — day-one
              checklist, the nine new dungeons, the December 9 raid unlock, new zones and
              the Classic+ systems that reshape every build.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {/* Checklist */}
        <section>
          <FadeUp>
            <WowHeading
              eyebrow="Before you log in"
              title="Day-one checklist"
              sub="Decisions that are permanent or time-sensitive — work through this with your group before launch."
            />
          </FadeUp>
          <FadeUp className="mt-8">
            <LaunchChecklist tasks={TASKS} />
          </FadeUp>
        </section>

        {/* Raids */}
        <section className="mt-20">
          <FadeUp>
            <WowHeading
              eyebrow="December 9"
              title="The raid unlock"
              sub="The BlizzCon roadmap lists all three for December 9 (timing can shift), with two more raids slotted for spring and summer 2027. Use the gap to gear through the new dungeons."
            />
          </FadeUp>
          <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
            {RAIDS.map((raid) => (
              <StaggerItem key={raid.name}>
                <div className="wowui-panel h-full p-5">
                  <div className="flex items-center gap-2.5">
                    <Swords className="h-4.5 w-4.5 text-(--accent-bright)" />
                    <h3 className="wowui-title text-lg">{raid.name}</h3>
                  </div>
                  <span className="wowui-chip mt-3 text-[11px] uppercase">
                    <Users className="h-3 w-3" />
                    {raid.size}
                  </span>
                  <p className="wowui-sub mt-3 text-sm leading-relaxed">{raid.note}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Dungeons + zones */}
        <section className="mt-20">
          <FadeUp>
            <WowHeading
              eyebrow="Level 13–60"
              title="Nine new dungeons & new zones"
              sub="Nine new instances, three new zones and 1,000+ new quests — the gearing funnel between launch and raids. Levels are the announced recommended levels."
            />
          </FadeUp>
          <Stagger className="mt-8 grid gap-4 lg:grid-cols-2">
            <StaggerItem>
              <div className="wowui-parchment h-full">
                <h3 className="wowui-parchment-head">New dungeons</h3>
                <ul className="mt-3">
                  {DUNGEONS.map((d) => (
                    <li key={d.name} className="wowui-task flex items-center justify-between gap-3 py-2 text-sm">
                      <span className="font-medium" style={{ color: "#4a2c0a" }}>{d.name}</span>
                      <span className="wowui-stamp">Level {d.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="wowui-parchment h-full">
                <h3 className="wowui-parchment-head">New regions</h3>
                <ul className="mt-3 space-y-2.5">
                  {[
                    ["Mount Hyjal", "Level 60 zone — home of Hyjal Summit"],
                    ["The Riverglades", "Eastern Kingdoms · levels ~35–45 · 150+ quests"],
                    ["Zephras Isle", "Skyborne starting zone · levels 1–12"],
                    ["Shen'dralas", "South of Desolace — some outlets count it as a fourth region"],
                  ].map(([name, note]) => (
                    <li key={name} className="wowui-task flex items-start justify-between gap-3 text-sm">
                      <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: "#4a2c0a" }}>
                        <MapPin className="h-3.5 w-3.5" style={{ color: "#7d590d" }} />
                        {name}
                      </span>
                      <span className="text-right text-xs" style={{ color: "#6b5327" }}>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          </Stagger>
        </section>

        {/* Systems */}
        <section className="mt-20">
          <FadeUp>
            <WowHeading
              eyebrow="Classic+ briefing"
              title="Systems that change your build"
              sub="The Forever deltas every build page is written against — re-check them before spending your first talent point."
            />
          </FadeUp>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.map((s) => (
              <StaggerItem key={s.title}>
                <div className="wowui-parchment h-full">
                  <h3 className="wowui-parchment-head">{s.title}</h3>
                  <p className="wowui-ink-body mt-1.5 text-sm">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Sources + next steps */}
        <section className="mt-20 pb-10">
          <FadeUp>
            <div className="wowui-panel p-6">
              <p className="wowui-gold-label mb-3">Sources</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  ["Blizzard: Carve a New Path", "https://worldofwarcraft.blizzard.com/en-us/news/24302093/carve-a-new-path-with-world-of-warcraft-forever"],
                  ["Blizzard: What's Next panel", "https://worldofwarcraft.blizzard.com/en-us/news/24303862/world-of-warcraft-forever-whats-next-panel-recap"],
                  ["Blizzard: Upgrades & beta", "https://worldofwarcraft.blizzard.com/en-us/news/24301508/pre-purchase-world-of-warcraft-forever-upgrades-and-begin-your-next-journey-in-azeroth"],
                  ["Blizzard: Choose your ruleset", "https://news.blizzard.com/en-us/article/24302070/choose-your-ruleset-in-world-of-warcraft-forever"],
                  ["Icy Veins: Forever guides", "https://www.icy-veins.com/wow-forever/"],
                  ["Icy Veins: Skyborne race", "https://www.icy-veins.com/wow-forever/skyborne-race-guide"],
                  ["Icy Veins: Camping", "https://www.icy-veins.com/wow-forever/camping"],
                  ["ClassicWoW.gg: Raids", "https://classicwow.gg/forever/raids"],
                  ["ClassicWoW.gg: Dungeons", "https://classicwow.gg/forever/dungeons"],
                  ["ClassicWoW.gg: What changes", "https://classicwow.gg/forever/changes"],
                ].map(([label, url]) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wowui-chip hover:brightness-125"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/forever#builds" className="wow-redbtn !flex-none">
                  Pick your build
                </Link>
                <Link href="/builder" className="wowui-stonebtn">
                  Forge a custom build
                </Link>
              </div>
            </div>
          </FadeUp>
        </section>
      </div>
    </div>
  );
}
