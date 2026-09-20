import type { Build } from "@/data/types";

export const retPaladin: Build = {
  id: "forever-retribution-paladin",
  game: "forever",
  slug: "retribution-paladin",
  name: "Retribution Paladin",
  className: "Paladin",
  role: "Two-handed holy melee DPS",
  tier: "A",
  difficulty: 1,
  tagline: "Seal of Command procs, Judgement bombs, and a self-heal that never stops.",
  summary:
    "Ret is the Paladin you play when you want to hit things with a very large hammer and never stop for water. Seal of Command swings turn auto-attacks into burst bombs, Judgement delivers periodic holy nukes, and your healing keeps you leveling in a straight line. Forever makes this spec better for everyone: Blessings are baseline and the new capstone slot sweetens every tree.",
  patchLabel: "Forever Beta · Sep 2026",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [
    { site: "ClassicWoW.gg", url: "https://classicwow.gg/forever/guides/paladin/retribution", label: "ClassicWoW.gg Ret guide" },
    { site: "Wowhead", url: "https://www.wowhead.com/forever", label: "Wowhead Forever hub" },
    { site: "Blizzard", url: "https://worldofwarcraft.blizzard.com/en-us/news/24302093/carve-a-new-path-with-world-of-warcraft-forever", label: "Official Forever announcement" },
  ],
  meta: {
    "Best races": "Human (Alliance) · Undead Paladin (new in Forever)",
    "Key mechanic": "Seal of Command proc swings",
    "Weapons": "Slow two-handed mace/sword — always",
    "Playstyle": "Auto-attack engine with Judgement bursts",
    "Faction note": "Forever adds both-faction Paladins — Horde Ret is now a thing",
    "Professions": "Blacksmithing + Mining",
  },
  skillPriority: [
    "Seal of Command (11-point talent — your entire identity)",
    "Two-Handed Weapon Specialization (all damage, every swing)",
    "Vengeance (crit → 30% damage windows)",
    "Repentance at 31 (CC + interrupt toolkit)",
  ],
  progression: [
    {
      levels: "1–9",
      goal: "Seals, Judgement and the auto-attack mindset",
      steps: [
        { name: "Seal of Righteousness", detail: "Level 1", why: "Your first seal — every melee swing gains holy damage. This IS a Ret rotation preview." },
        { name: "Judgement", detail: "Level 4", why: "Releases your seal for a holy hit — your burst button and mana rhythm." },
        { name: "Holy Light + Divine Protection", detail: "As trained", why: "Self-sustain: Ret leveling speed comes from never stopping to drink or eat." },
        { name: "Blessing of Might", detail: "Baseline in Forever", why: "Attack power for you and the party — zero talent cost, just cast it." },
      ],
    },
    {
      levels: "10–14",
      goal: "Open Retribution immediately",
      steps: [
        { name: "Benediction", detail: "Ranks 1–5", why: "Cuts the mana cost of Judgement and seals — Ret's entire economy lives or dies here." },
        { name: "Improved Judgement", detail: "Ranks 1–2 (as ranks open)", why: "Shorter Judgement cooldown = more holy nukes." },
      ],
      milestone: "Level 10: talent points begin — one per level, 51 total at 60.",
    },
    {
      levels: "15–19",
      goal: "Push toward Seal of Command",
      steps: [
        { name: "Improved Blessing of Might", detail: "Ranks 1–5", why: "Your baseline buff gets bigger — party-wide attack power scales now." },
        { name: "Seal of Command countdown", detail: "11-point talent", why: "Everything before it is filler; SoC needs 11 Ret points by roughly level 20–21." },
      ],
    },
    {
      levels: "20–24",
      goal: "SEAL OF COMMAND. The build ignites.",
      steps: [
        { name: "Seal of Command", detail: "11-point talent", why: "Every melee swing has a chance to trigger a massive holy strike for 70% of weapon damage. From now on you play around procs and slow weapons." },
        { name: "Slow weapon", detail: "Priority", why: "SoC procs per swing — slow, high-damage weapons make every proc detonate. Never dual-wield, never use fast weapons." },
      ],
      milestone: "Level ~20–21: Seal of Command is live. Every auto-attack is now a lottery ticket you win constantly.",
    },
    {
      levels: "25–29",
      goal: "16-point capstone + crit scaling",
      steps: [
        { name: "Conviction", detail: "Ranks 1–5", why: "Melee and spell crit — feeds Vengeance windows later and procs more SoC bursts." },
        { name: "16-point capstone", detail: "Reserved", why: "Forever's new one-point ability at 16 points into the tree — check the beta talent calculator for its current effect." },
      ],
      milestone: "Level ~25: your 16th Ret point unlocks Forever's new capstone ability.",
    },
    {
      levels: "30–34",
      goal: "Weapon Specialization + Sanctity Aura",
      steps: [
        { name: "Two-Handed Weapon Specialization", detail: "Ranks 1–5", why: "Flat damage on every single swing — with SoC procs scaling off weapon damage, this compounds hard." },
        { name: "Sanctity Aura", detail: "21-point talent", why: "+Holy damage to the whole raid — Ret brings party-wide scaling, not just self damage." },
        { name: "Hammer of Justice", detail: "Rank as trained", why: "Stun utility for dungeon control and interrupt duty." },
      ],
    },
    {
      levels: "35–39",
      goal: "Vindication and sustain tuning",
      steps: [
        { name: "Vindication", detail: "Ranks 1–3", why: "Crits reduce target attack power — team defensive utility that also fires constantly with Conviction up." },
        { name: "Benediction finish", detail: "Ranks if unfinished", why: "Full mana efficiency before the deep talents." },
        { name: "Judgement of the Crusader", detail: "As trained", why: "+Holy damage taken on the target — debuff for your own SoC and the raid's holy damage." },
      ],
    },
    {
      levels: "40–44",
      goal: "Vengeance — the crit payoff",
      steps: [
        { name: "Vengeance", detail: "Ranks 1–5", why: "After a crit, deal 30% bonus Physical and Holy damage for 8 seconds. With Conviction stacked, you live in this buff." },
        { name: "Weapon check", detail: "40s sweep", why: "This is the classic 'big slow two-hander' era — Maraudon/Sunken Temple-era weapons or the new dungeons' reworked drops." },
      ],
    },
    {
      levels: "45–49",
      goal: "Deep Ret depth charges",
      steps: [
        { name: "Improved Sanctity Aura", detail: "Ranks 1–2", why: "Sanctity gets bigger and gives you holy damage too." },
        { name: "Sanctified Judgment", detail: "If tuned in", why: "Judgement refunds part of the seal's cost — check the beta calculator for current ranks/effects." },
        { name: "Dungeon circuit", detail: "Hall of Thanes, Ruins of Lordaeron…", why: "Forever's nine new dungeons are the gear pipeline — run the ones in your level band." },
      ],
    },
    {
      levels: "50–54",
      goal: "Repentance and quality-of-life depth",
      steps: [
        { name: "Repentance", detail: "31-point talent", why: "6-second disable on demand — dungeon interrupt, elite control, escape button. The 31-point capstone that makes Ret feel complete." },
        { name: "Holy sustain", detail: "Keep Holy Light ranks current", why: "Your healing IS your leveling speed — out-of-combat self-heals turn mana into XP." },
      ],
      milestone: "Level ~50: Repentance online. You now stun, judge, proc and heal — the full toolkit.",
    },
    {
      levels: "55–59",
      goal: "Enchant everything, prep the raid kit",
      steps: [
        { name: "Weapon enchant", detail: "Crusader", why: "Strength + healing procs on a slow two-hander — the classic Ret leveling companion into raids." },
        { name: "Armor sweep", why: "Leg kits + stamina enchants before the raid window." },
        { name: "Consumable bench", detail: "Elixirs + food", why: "Strength and agility elixirs, sharpening stone, camp buff that doesn't overlap a blessing." },
      ],
    },
    {
      levels: "60 / Raid-ready",
      goal: "Barrow Deeps (10) · Hyjal Summit (20) · Onyxia's Lair (40) — December 9",
      steps: [
        { name: "Final talents", detail: "31+/Hybrid", why: "Repentance core with two-handed crit scaling; verify the beta-tuned split in the linked calculator." },
        { name: "Hit target", detail: "Unified hit/crit", why: "Forever unifies hit across melee and spells — check current thresholds in the linked guide instead of classic tables." },
        { name: "Raid role", detail: "Utility + damage", why: "Sanctity Aura buffs the raid's holy damage, Vindication softens bosses, Blessings are baseline now — bring the whole package." },
      ],
      milestone: "Raids unlock December 9 — the launch window is your dungeon-gearing and enchanting runway.",
    },
  ],
  statPriority: [
    { label: "Attack Power / Strength", note: "Scales every swing and every SoC proc." },
    { label: "Hit (unified)", note: "Forever merges melee and spell hit — one stat, every benefit." },
    { label: "Crit", note: "Feeds Vengeance windows and more SoC procs." },
    { label: "Weapon Skill", note: "Reduced per item in Forever, but still smooths boss-level swings." },
    { label: "Intellect", note: "Mana pool for the Judgement/Holy Light economy — don't zero it out." },
  ],
  gear: [
    { slot: "Head", target: "Plate with strength/stam, new-dungeon drops", affixes: ["Strength", "Stamina", "Crit"] },
    { slot: "Shoulders", target: "Reworked dungeon pieces", affixes: ["Strength", "Attack Power"] },
    { slot: "Chest", target: "Stat-stick plate", affixes: ["Strength", "Stamina", "Intellect"] },
    { slot: "Wrists", target: "Cheap upgrades — enchant on arrival", affixes: ["Strength", "Stamina"] },
    { slot: "Hands", target: "Crit or hit pieces", affixes: ["Crit", "Hit", "Strength"] },
    { slot: "Waist", target: "Any clean strength plate", affixes: ["Strength", "Stamina"] },
    { slot: "Legs", target: "Armor-kit immediately", affixes: ["Strength", "Stamina"] },
    { slot: "Feet", target: "Minor Speed enchant", affixes: ["Stamina", "Movement via enchant"] },
    { slot: "Weapon", target: "The slowest, hardest-hitting two-handed mace or sword available", affixes: ["Slow speed", "High max damage", "Crusader enchant"], unique: "SoC procs 70% of weapon damage — weapon damage range beats every other stat on the item." },
    { slot: "Trinkets", target: "Flat attack power or on-use burst", affixes: ["Attack Power", "On-use effects"] },
    { slot: "Rings", target: "Strength + hit pairing", affixes: ["Strength", "Hit", "Crit"] },
    { slot: "Necklace", target: "Stamina with attack power", affixes: ["Strength", "Stamina", "Attack Power"] },
  ],
  rotation: [
    {
      phase: "Pull",
      steps: [
        "Judge Judgement of the Crusader on the target (+Holy damage taken).",
        "Apply Seal of Command — keep it active at all times.",
        "Blessing of Might (baseline) on the group before pulls.",
      ],
    },
    {
      phase: "Standard rotation",
      steps: [
        "Judgement of Command on cooldown — your burst, your mana rhythm.",
        "Auto-attack and let SoC procs do the heavy lifting; re-seal instantly after each judgement.",
        "Rank-1 Consecration sparingly for multi-target packs (mana discipline).",
      ],
    },
    {
      phase: "Elites / Burst",
      steps: [
        "Hammer of Justice to stop the big cast or interrupt.",
        "Repentance as the second control or an emergency reset.",
        "Divine Protection + Holy Light when the pull goes sideways — you are your own off-healer.",
      ],
    },
  ],
  watchOuts: [
    "Seal of Command is per-swing: fast weapons generate fewer procs. Slow two-hander or nothing.",
    "Don't dump all mana into Consecration spam — Ret's mana feeds Judgement and emergency heals first.",
    "Camp buffs don't stack with matching class buffs — don't camp-buff Might if you're casting Blessing of Might.",
    "No flying in Forever — map your leveling circuit across the new zones (Hyjal, Shen'dralas, Riverglades) on foot.",
    "Unified hit/crit: old classic hit tables don't apply. Verify thresholds in the linked calculator.",
    "Threat with a two-hander is real — time your Judgement bursts around the tank's opening.",
    "Raids open December 9; the nine new dungeons and reworked drops are your gearing plan until then.",
  ],
  extras: [
    {
      label: "Core Enchants",
      items: [
        { name: "Enchant Weapon — Crusader", note: "Strength + self-healing procs on your two-hander." },
        { name: "Enchant Boots — Minor Speed", note: "Run speed is leveling speed." },
        { name: "Enchant Bracers — Greater Strength", note: "Direct damage scaling." },
        { name: "Chest — Greater Health", note: "Cheap survivability layer." },
        { name: "Legs — Rugged Armor Kit", note: "Flat armor for every upgrade." },
      ],
    },
    {
      label: "Consumables",
      items: [
        { name: "Elixir of Giants", note: "Strength for weapon scaling." },
        { name: "Elixir of the Mongoose", note: "Crit for Vengeance windows." },
        { name: "Sharpening Stones", note: "Flat weapon damage." },
        { name: "Major Mana Potions", note: "Judgement economy in raids." },
        { name: "Camp food", note: "Coordinate — don't stack with your own blessings." },
      ],
    },
    {
      label: "Leveling Quick Reference",
      items: [
        { name: "Level ~20", note: "Seal of Command (11 points) — buy a slow two-hander." },
        { name: "Level ~25", note: "16-point Forever capstone (verify effect in beta calculator)." },
        { name: "Level 30+", note: "Sanctity Aura — raid-wide holy damage." },
        { name: "Level 40+", note: "Vengeance — crit-driven damage windows." },
        { name: "Level 50", note: "Repentance — full toolkit." },
        { name: "Level 60", note: "Enchant, stock consumables, raids Dec 9." },
      ],
    },
  ],
};
