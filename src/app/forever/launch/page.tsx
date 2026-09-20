import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Compass, MapPin, Swords, Users } from "lucide-react";
import { LaunchChecklist, type LaunchTask } from "@/components/launch-checklist";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/ui-bits";
import { ogImage } from "@/lib/site";

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
    body: "Normal, PvP or Roleplaying — chosen per character, with Hardcore planned after launch. Your friends need the same ruleset and faction to group with you.",
  },
  {
    title: "Sort access",
    tag: "Before Nov 4",
    body: "Base game runs on an active WoW subscription or game time. Upgrades (Skyborne Epic Pack, Warcraft Forever Collection) add the Skyborne race, cosmetics and beta access; the Heroic Pack does not list beta.",
  },
  {
    title: "Name reservation",
    tag: "Oct 27 – Nov 3",
    body: "Upgrade owners can reserve names early — it is not early gameplay access, but it locks the name you want for launch morning.",
  },
  {
    title: "Choose race & class",
    tag: "New combos",
    body: "Gnome Priest, Human Hunter, Dwarf Shaman, Orc Mage, Troll Warlock and Undead Paladin join the roster. Paladins and Shamans exist on both factions. Skyborne (neutral, glide racial) requires the optional upgrade.",
  },
  {
    title: "Pick professions with camping in mind",
    tag: "Camping",
    body: "Campsites feed on profession-crafted objects — a Cook upgrades the campfire, others contribute utility. Matching camp buffs and class buffs do not stack, so coordinate rather than double up.",
  },
  {
    title: "Plan your Legacy points",
    tag: "16-point cap",
    body: "Legacy points are account-wide but each character spends up to 16 at launch across Professions, Adventure and Resourcefulness. Decide your priority tree before launch night.",
  },
  {
    title: "Set expectations: no flying, no scaling",
    tag: "Classic rules",
    body: "Original continents, level 60 cap, ground mounts only. Leveling routes and travel time matter — check the class build paths for the dungeon level bands.",
  },
  {
    title: "Book raid nights",
    tag: "Dec 9",
    body: "Barrow Deeps (10), Hyjal Summit (20) and Onyxia's Lair (40) unlock December 9. The launch window is your dungeon-gearing and consumable runway — see the raid plan below.",
  },
];

const DUNGEONS: { name: string; note: string }[] = [
  { name: "Hall of Thanes", note: "New — level band TBD per the dungeon overview" },
  { name: "Ruins of Lordaeron", note: "New — quest-first design" },
  { name: "City of Dalaran", note: "New" },
  { name: "Drowned City", note: "New" },
  { name: "Five more dungeons", note: "Unannounced — spanning levels 13–60" },
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
    body: "Kings, Might, Mark of the Wild and Divine Spirit cost no talent points — every point goes into damage or survivability.",
  },
  {
    title: "16-point capstones",
    body: "Every tree gains a new one-point ability at 16 points, alongside the classic 11/21/31 milestones. Exact values are still tuning in beta.",
  },
  {
    title: "Reworked itemization",
    body: "Every dungeon drop re-examined; healer gear also grants spell damage. Old BiS lists are not Forever gearing plans.",
  },
  {
    title: "Camping",
    body: "Campfires become campsites with rest, vendors, repairs and one-hour buffs — contributed by nearby players' professions.",
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
      <section className="border-b border-line bg-[radial-gradient(90%_100%_at_50%_0%,rgba(78,134,212,0.14),transparent_70%),radial-gradient(60%_60%_at_80%_10%,rgba(228,181,74,0.1),transparent_60%)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <FadeUp>
            <nav className="flex items-center gap-2 text-xs text-ink-dim" aria-label="Breadcrumb">
              <Link href="/forever" className="hover:text-ink">
                WoW Forever
              </Link>
              <span>/</span>
              <span className="text-ink">Launch hub</span>
            </nav>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="accent-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                <CalendarClock className="h-3.5 w-3.5" />
                Beta live · Launches Nov 4, 2026
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-dim">
                <Compass className="h-3 w-3" />
                Raids unlock Dec 9 · Zero level scaling · No flying
              </span>
            </div>
            <h1 className="display-forever mt-5 text-4xl font-bold tracking-wide text-ink sm:text-6xl">
              LAUNCH HUB
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
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
            <SectionHeading
              eyebrow="Before you log in"
              title="Day-one checklist"
              sub="Decisions that are permanent or time-sensitive — work through this with your group before launch."
            />
          </FadeUp>
          <div className="mt-8">
            <LaunchChecklist tasks={TASKS} />
          </div>
        </section>

        {/* Raids */}
        <section className="mt-20">
          <FadeUp>
            <SectionHeading
              eyebrow="December 9"
              title="The raid unlock"
              sub="The official roadmap lists all three for the December 9 unlock — after the November 4 launch. Use the gap to gear through the new dungeons."
            />
          </FadeUp>
          <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
            {RAIDS.map((raid) => (
              <StaggerItem key={raid.name}>
                <div className="panel panel-hover h-full p-5">
                  <div className="flex items-center gap-2.5">
                    <Swords className="h-4.5 w-4.5 text-(--accent-bright)" />
                    <h3 className="text-[15px] font-semibold text-ink">{raid.name}</h3>
                  </div>
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-(--accent-border) bg-(--accent-wash) px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-(--accent-bright) uppercase">
                    <Users className="h-3 w-3" />
                    {raid.size}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{raid.note}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Dungeons + zones */}
        <section className="mt-20">
          <FadeUp>
            <SectionHeading
              eyebrow="Level 13–60"
              title="Nine new dungeons & new zones"
              sub="Blizzard announced nine new instances and 1,000+ new quests across the original continents — the gearing funnel between launch and raids."
            />
          </FadeUp>
          <Stagger className="mt-8 grid gap-4 lg:grid-cols-2">
            <StaggerItem>
              <div className="panel h-full p-5">
                <p className="eyebrow mb-3 text-(--accent-bright)">New dungeons (announced)</p>
                <ul className="space-y-2.5">
                  {DUNGEONS.map((d) => (
                    <li key={d.name} className="flex items-start justify-between gap-3 text-sm">
                      <span className="font-medium text-ink">{d.name}</span>
                      <span className="text-right text-xs text-ink-dim">{d.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="panel h-full p-5">
                <p className="eyebrow mb-3 text-(--accent-bright)">New regions</p>
                <ul className="space-y-2.5">
                  {[
                    ["Mount Hyjal", "New raid region — home of Hyjal Summit"],
                    ["Shen'dralas", "New zone on the 1–60 journey"],
                    ["Riverglades", "New zone on the 1–60 journey"],
                    ["Zephras Isle", "Skyborne starting experience (optional upgrade)"],
                  ].map(([name, note]) => (
                    <li key={name} className="flex items-start justify-between gap-3 text-sm">
                      <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                        <MapPin className="h-3.5 w-3.5 text-(--accent-bright)" />
                        {name}
                      </span>
                      <span className="text-right text-xs text-ink-dim">{note}</span>
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
            <SectionHeading
              eyebrow="Classic+ briefing"
              title="Systems that change your build"
              sub="The Forever deltas every build page is written against — re-check them before spending your first talent point."
            />
          </FadeUp>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.map((s) => (
              <StaggerItem key={s.title}>
                <div className="panel h-full p-5">
                  <h3 className="text-[15px] font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Sources + next steps */}
        <section className="mt-20 pb-10">
          <FadeUp>
            <div className="panel p-6">
              <p className="eyebrow mb-3 text-(--accent-bright)">Sources</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  ["Blizzard: Carve a New Path", "https://worldofwarcraft.blizzard.com/en-us/news/24302093/carve-a-new-path-with-world-of-warcraft-forever"],
                  ["Blizzard: What's Next panel", "https://worldofwarcraft.blizzard.com/en-us/news/24303862/world-of-warcraft-forever-whats-next-panel-recap"],
                  ["Blizzard: Upgrades & beta", "https://worldofwarcraft.blizzard.com/en-us/news/24301508/pre-purchase-world-of-warcraft-forever-upgrades-and-begin-your-next-journey-in-azeroth"],
                  ["ClassicWoW.gg: Raids", "https://classicwow.gg/forever/raids"],
                  ["ClassicWoW.gg: Dungeons", "https://classicwow.gg/forever/dungeons"],
                  ["ClassicWoW.gg: What changes", "https://classicwow.gg/forever/changes"],
                ].map(([label, url]) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-(--accent-border) bg-(--accent-wash) px-3 py-1.5 font-medium text-(--accent-bright) transition-colors hover:brightness-125"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/forever"
                  className="inline-flex items-center gap-2 rounded-lg bg-(--accent) px-4 py-2 text-sm font-semibold text-base transition-transform hover:scale-[1.03]"
                >
                  Pick your build
                </Link>
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
                >
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
