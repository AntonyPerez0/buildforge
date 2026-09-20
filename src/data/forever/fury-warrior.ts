import type { Build } from "@/data/types";

export const furyWarrior: Build = {
  id: "forever-fury-warrior",
  game: "forever",
  slug: "fury-warrior",
  name: "Fury Warrior",
  className: "Warrior",
  role: "Dual-wield melee DPS",
  tier: "S",
  difficulty: 1,
  tagline: "Two weapons, one Bloodthirst, zero downtime. The classic PvE breadwinner.",
  summary:
    "Fury Warrior is the PvP-of-all-trades melee DPS of WoW Forever: dual-wielding nonsense that sustains threat-safe damage with Bloodthirst and Whirlwind while tanking incidental hits without blinking. Leveling is smooth, gear demands are simple, and the spec slots into every raid size Forever offers.",
  patchLabel: "Forever Beta · Sep 2026",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [
    { site: "ClassicWoW.gg", url: "https://classicwow.gg/forever/guides/warrior/fury", label: "ClassicWoW.gg Fury guide" },
    { site: "Wowhead", url: "https://www.wowhead.com/forever", label: "Wowhead Forever hub" },
    { site: "Blizzard", url: "https://worldofwarcraft.blizzard.com/en-us/news/24302093/carve-a-new-path-with-world-of-warcraft-forever", label: "Official Forever announcement" },
  ],
  meta: {
    "Best races": "Orc (Horde) · Human (Alliance)",
    "Key mechanic": "Bloodthirst heals off your Attack Power",
    "Weapons": "Dual-wield slow swords/axes at 20+",
    "Playstyle": "Rage-hungry melee with Execute finishers",
    "Professions": "Blacksmithing + Engineering",
    "Raid note": "Forever baseline: Kings/Might are automatic — no points wasted",
  },
  skillPriority: [
    "Cruelty (crit scaling feeds every hit)",
    "Flurry (attack speed doubles your rage income)",
    "Bloodthirst at 40 (spec-defining, self-healing)",
    "Whirlwind + Berserker Stance at 30",
  ],
  progression: [
    {
      levels: "1–9",
      goal: "Learn the class: Charge in, Heroic Strike, Sunder to keep yourself sane",
      steps: [
        { name: "Charge", detail: "Level 1", why: "Free rage to open every fight — build the habit now." },
        { name: "Battle Shout", detail: "Rank as trained", why: "Party-wide attack power aura; Forever makes Kings/Might baseline, but your own shout is still yours to maintain." },
        { name: "Rend + Heroic Strike", detail: "As trained", why: "Rend for bleed targets that dodge, Heroic Strike as your rage dump on single targets." },
        { name: "Sunder Armor", detail: "As trained", why: "Cheap damage amplifier against elites and dungeon bosses." },
      ],
    },
    {
      levels: "10–14",
      goal: "First talent points: commit to Fury immediately",
      steps: [
        { name: "Cruelty", detail: "Ranks 1–5", why: "Melee crit chance is the engine of every Fury number — first five points, no debate." },
      ],
      milestone: "Level 10: Talent points begin. Every level from here grants one point (51 total at 60).",
    },
    {
      levels: "15–19",
      goal: "Feed the rage economy",
      steps: [
        { name: "Unbridled Wrath", detail: "Ranks 1–5", why: "Chance to generate extra rage per swing — keeps Heroic Strike and cleave pressure online while soloing." },
        { name: "Hamstring", detail: "Rank 1", why: "Trainer ability that saves quests and corpses alike." },
      ],
    },
    {
      levels: "20–24",
      goal: "Dual Wield unlocks — switch your entire combat model",
      steps: [
        { name: "Dual Wield", detail: "Trainer at 20", why: "Two weapons = more swings = more rage from Unbridled Wrath. Buy two fast swords/axes." },
        { name: "Dual Wield Specialization", detail: "Ranks 1–5", why: "Off-hand damage is otherwise crippled — this makes the second weapon real." },
        { name: "Execute", detail: "Trainer", why: "Your finisher below 20% target health; spam it on cooldown." },
      ],
    },
    {
      levels: "25–29",
      goal: "Hit the Forever 16-point capstone milestone",
      steps: [
        { name: "Booming Voice", detail: "Ranks 1–5", why: "Longer, wider Battle Shout — party-wide attack power uptime while leveling with groups." },
        { name: "16-point capstone", detail: "Reserved", why: "Forever adds a brand-new one-point ability at 16 points into a tree. Check the exact effect in the beta talent calculator — values are still tuning." },
      ],
      milestone: "Level ~25: your 16th talent point unlocks the new Forever capstone ability in your main tree.",
    },
    {
      levels: "30–34",
      goal: "Whirlwind day. The spec clicks here.",
      steps: [
        { name: "Berserker Stance", detail: "Level 30 quest", why: "Unlocks your true stance — more crit, instant rage conversion from damage taken." },
        { name: "Whirlwind", detail: "Trainer at 30", why: "Fury's cleave core: off both weapons, hits everything nearby, feeds Flurry." },
        { name: "Flurry", detail: "Ranks 1–5", why: "Crits grant massive attack speed — with Cruelty banked, Flurry is near-permanent uptime." },
      ],
      milestone: "Level 30: Berserker Stance + Whirlwind from the trainer. Fury stops being a Basic-skill class forever.",
    },
    {
      levels: "35–39",
      goal: "Fill toward Bloodthirst",
      steps: [
        { name: "Improved Berserker Rage", detail: "Ranks 1–3", why: "Berserker Rage refunds rage instead of costing it — smooths every engage." },
        { name: "Death Wish", detail: "Ranks 1–5 (or bank for 31)", why: "Burst window for hard pulls; many players hold points to hit 31 faster — both are correct." },
      ],
    },
    {
      levels: "40–44",
      goal: "BLOODTHIRST. The spec-defining ability arrives.",
      steps: [
        { name: "Bloodthirst", detail: "31-point talent", why: "Attack-power-scaling strike that heals you for a % of AP — Fury's damage, sustain and identity in one button. Spam it on cooldown from here on." },
        { name: "Weapon upgrade", detail: "Priority", why: "Bloodthirst scales with weapon damage ranges — a slow, high-damage main hand is your biggest single upgrade at 40+." },
      ],
      milestone: "Level 40: with 31 Fury points banked, Bloodthirst is live. Your damage graph triples.",
    },
    {
      levels: "45–49",
      goal: "Top out the tree while leveling",
      steps: [
        { name: "Fury depth", detail: "Finish ranks", why: "Max Bloodthirst-adjacent talents and Enrage — after crits, Enrage's damage windows chain beautifully with Flurry." },
        { name: "Group play", detail: "Dungeon loop", why: "Forever's reworked dungeon drops (Hall of Thanes, Ruins of Lordaeron, City of Dalaran…) are your gear pipeline — run them constantly." },
      ],
    },
    {
      levels: "50–54",
      goal: "Second tree investment + classic Azeroth sweep",
      steps: [
        { name: "Arms dip", detail: "5–10 points", why: "After core Fury, points spill into Arms for weapon mastery/crit hybrids — check the beta calculator for the tuned pick." },
        { name: "Uldaman / Maraudon era", detail: "Dungeon circuit", why: "Classic dungeons still exist alongside the new nine; blue weapon upgrades here carry you to 60." },
      ],
    },
    {
      levels: "55–59",
      goal: "Raid-prep power spikes",
      steps: [
        { name: "Enchant sweep", detail: "Weapon", why: "Crusader on your main hand — the classic healing-on-proc enchant that also adds strength scaling to every swing." },
        { name: "Bracer/boots enchants", detail: "Stamina + speed", why: "Minor Speed on boots and stamina on bracers make the last grind stretch painless." },
      ],
    },
    {
      levels: "60 / Raid-ready",
      goal: "Barrow Deeps (10) · Hyjal Summit (20) · Onyxia's Lair (40) — December 9",
      steps: [
        { name: "Full 31+/20", detail: "Finalize talents", why: "Bloodthirst core with Arms sub-tree; verify the beta-tuned split in the linked calculator before lock-in." },
        { name: "Hit target", detail: "Unified system", why: "Forever merges hit and crit across melee and spells — old hit-cap tables are dead. Check current values in the linked guide, not classic-era posts." },
        { name: "Consumables", detail: "Elixir of Giants, food, stones", why: "Strength elixirs + sharpening stones + a camp buff (that doesn't clash with a class buff) is the launch-night kit." },
      ],
      milestone: "Raids unlock December 9 — use launch→December to level alts, gear through the nine new dungeons and bank consumables.",
    },
  ],
  statPriority: [
    { label: "Attack Power / Strength", note: "Bloodthirst scales directly off AP — the single best stat on paper." },
    { label: "Hit (unified)", note: "Forever merges melee and spell hit into one system; gear hit once and everything benefits." },
    { label: "Critical Strike (unified)", note: "Feeds Flurry — effectively permanent attack-speed uptime." },
    { label: "Weapon Skill", note: "Weaker per item in Forever, but still smooths glances against boss-level mobs." },
    { label: "Stamina", note: "You're in melee — survivability is DPS time." },
  ],
  gear: [
    {
      slot: "Head",
      target: "Epic plate with strength — Lionheart is the crafted king",
      affixes: ["Strength", "Hit", "Stamina"],
      item: {
        name: "Lionheart Helm",
        quality: "epic",
        type: "Epic Plate Helm",
        armor: "420 Armor",
        stats: [
          { text: "+18 Strength" },
          { text: "+1% Hit Chance" },
          { text: "+1% Critical Strike" },
        ],
        flavor: "The crafted helm melee BiS lists orbit — bring the materials and a Blacksmith friend.",
        source: "Crafted · Blacksmithing 300",
        icon: "helm",
      },
    },
    {
      slot: "Neck",
      target: "Strength + stamina epic from the attunement lines",
      affixes: ["Strength", "Stamina", "Hit"],
      item: {
        name: "Mark of Fordragon",
        quality: "epic",
        type: "Epic Necklace",
        stats: [
          { text: "+13 Stamina" },
          { text: "+10 Strength" },
          { text: "+1% Defense-tuned bonuses for melee uptime" },
        ],
        source: "Quest reward · Onyxia attunement era",
        icon: "amulet",
      },
    },
    {
      slot: "Shoulders",
      target: "Tier 1 strength plate",
      affixes: ["Strength", "Attack Power", "Stamina"],
      item: {
        name: "Pauldrons of Might",
        quality: "epic",
        type: "Epic Plate Shoulders",
        armor: "487 Armor",
        stats: [
          { text: "+27 Strength" },
          { text: "+17 Stamina" },
        ],
        source: "Molten Core · Battlegear of Might",
        icon: "shoulders",
      },
    },
    {
      slot: "Back",
      target: "The raid-ticket cloak — craft it before Onyxia",
      affixes: ["Strength", "Stamina"],
      item: {
        name: "Onyxia Scale Cloak",
        quality: "epic",
        type: "Epic Cloak",
        armor: "54 Armor",
        stats: [
          { text: "+9 Strength" },
          { text: "+9 Stamina" },
          { text: "Crafted from Onyxia Scales", tone: "power" },
        ],
        source: "Crafted · Dragonscale Leatherworking",
        icon: "offhand",
      },
    },
    {
      slot: "Chest",
      target: "Tier 1 chest or the famous Savage Gladiator Chain while leveling",
      affixes: ["Strength", "Stamina", "Crit"],
      item: {
        name: "Breastplate of Might",
        quality: "epic",
        type: "Epic Plate Chest",
        armor: "649 Armor",
        stats: [
          { text: "+31 Strength" },
          { text: "+29 Stamina" },
        ],
        source: "Molten Core · Battlegear of Might",
        icon: "chest",
      },
    },
    {
      slot: "Wrists",
      target: "Strength plate, enchant immediately",
      affixes: ["Strength", "Stamina"],
      item: {
        name: "Wristguards of Stability",
        quality: "epic",
        type: "Epic Plate Bracers",
        armor: "365 Armor",
        stats: [
          { text: "+20 Strength" },
          { text: "+13 Stamina" },
        ],
        source: "Molten Core · Battlegear of Might",
        icon: "wrist",
      },
    },
    {
      slot: "Hands",
      target: "Hit or crit pieces; T1 gauntlets are the goal",
      affixes: ["Hit", "Crit", "Strength"],
      item: {
        name: "Gauntlets of Might",
        quality: "epic",
        type: "Epic Plate Gloves",
        armor: "447 Armor",
        stats: [
          { text: "+23 Strength" },
          { text: "+16 Stamina" },
        ],
        source: "Molten Core · Battlegear of Might",
        icon: "hands",
      },
    },
    {
      slot: "Waist",
      target: "Any clean strength plate without a downside",
      affixes: ["Strength", "Stamina"],
      item: {
        name: "Belt of Might",
        quality: "epic",
        type: "Epic Plate Belt",
        armor: "406 Armor",
        stats: [
          { text: "+20 Strength" },
          { text: "+20 Stamina" },
        ],
        source: "Molten Core · Battlegear of Might",
        icon: "belt",
      },
    },
    {
      slot: "Legs",
      target: "Armor-kit these early; T1 legs at 60",
      affixes: ["Strength", "Stamina"],
      item: {
        name: "Legplates of Might",
        quality: "epic",
        type: "Epic Plate Legs",
        armor: "568 Armor",
        stats: [
          { text: "+28 Strength" },
          { text: "+25 Stamina" },
        ],
        source: "Molten Core · Battlegear of Might",
        icon: "legs",
      },
    },
    {
      slot: "Feet",
      target: "Boots with Minor Speed enchant — non-negotiable",
      affixes: ["Stamina", "Movement via enchant"],
      item: {
        name: "Boots of Might",
        quality: "epic",
        type: "Epic Plate Boots",
        armor: "447 Armor",
        stats: [
          { text: "+21 Strength" },
          { text: "+18 Stamina" },
        ],
        source: "Molten Core · Battlegear of Might",
        icon: "feet",
      },
    },
    {
      slot: "Ring 1",
      target: "The hit ring from the attunement questline",
      affixes: ["Hit", "Strength"],
      item: {
        name: "Master Dragonslayer's Ring",
        quality: "epic",
        type: "Epic Ring",
        stats: [
          { text: "+1% Hit Chance" },
          { text: "+12 Strength" },
        ],
        source: "Onyxia attunement questline",
        icon: "ring",
      },
    },
    {
      slot: "Ring 2",
      target: "Strength + crit pairing",
      affixes: ["Strength", "Crit"],
      item: {
        name: "Myrmidon's Signet",
        quality: "rare",
        type: "Rare Ring",
        stats: [
          { text: "+10 Strength" },
          { text: "+7 Stamina" },
        ],
        source: "Blackrock Depths",
        icon: "ring",
      },
    },
    {
      slot: "Trinket 1",
      target: "The extra-attack proc — Fury's signature trinket",
      affixes: ["On-use / proc damage"],
      item: {
        name: "Hand of Justice",
        quality: "rare",
        type: "Rare Trinket",
        stats: [
          { text: "Equip: Chance to strike with an additional attack after a melee swing.", tone: "power" },
        ],
        flavor: "Two swings become three. Bloodthirst windows become swings of their own.",
        source: "Blackrock Depths · Emperor Dagran Thaurissan",
        icon: "trinket",
      },
    },
    {
      slot: "Trinket 2",
      target: "Crit trinket from Upper Blackrock Spire",
      affixes: ["Crit"],
      item: {
        name: "Blackhand's Breadth",
        quality: "rare",
        type: "Rare Trinket",
        stats: [
          { text: "Equip: +2% Critical Strike chance.", tone: "power" },
        ],
        source: "Upper Blackrock Spire · questline",
        icon: "trinket",
      },
    },
    {
      slot: "Main Hand",
      target: "Slow, heavy axe — Bloodthirst scales off its damage range",
      affixes: ["Slow speed", "High max damage", "Crusader enchant"],
      item: {
        name: "Deathbringer",
        quality: "epic",
        type: "Epic One-Handed Axe",
        stats: [
          { text: "Slow, massive damage range — Bloodthirst's favorite food" },
          { text: "+Strength / +Attack Power stat lines" },
        ],
        flavor: "The Molten Core melee classic — pair it with Crusader and swing.",
        source: "Molten Core",
        icon: "axe",
      },
    },
    {
      slot: "Off-Hand",
      target: "Fast sword for off-hand swings and procs",
      affixes: ["Fast speed", "Crusader on main only"],
      item: {
        name: "Vis'kag the Bloodletter",
        quality: "epic",
        type: "Epic One-Handed Sword",
        stats: [
          { text: "Fast swing timer — feeds off-hand damage and Hand of Justice procs" },
          { text: "+Strength stat lines" },
        ],
        source: "Molten Core",
        icon: "sword",
      },
    },
    {
      slot: "Ranged",
      target: "Stat-stick crossbow for the ranged slot",
      affixes: ["Hit", "Crit", "Stamina"],
      item: {
        name: "Crossbow of Smiting",
        quality: "epic",
        type: "Epic Crossbow",
        stats: [
          { text: "+Stamina and hit-flavored stat lines — pure stat stick for melee" },
        ],
        source: "Molten Core",
        icon: "gun",
      },
    },
  ],
  rotation: [
    {
      phase: "Pull",
      steps: [
        "Charge in — free rage, instant range.",
        "Berserker Rage before big packs (it refunds rage in Forever tuning).",
        "Battle Shout for the group, always maintained.",
      ],
    },
    {
      phase: "Standard rotation",
      steps: [
        "Bloodthirst on cooldown — it is your damage, your healing and your priority.",
        "Whirlwind whenever two or more targets are in range.",
        "Heroic Strike as the rage dump between Bloodthirst windows.",
        "Sunder Armor early on elites and bosses — it pays for itself.",
      ],
    },
    {
      phase: "Execute / Burst",
      steps: [
        "Target below 20%: spam Execute, stop spending rage elsewhere.",
        "Death Wish (if talented) + Bloodthirst stacking for burst checks.",
        "Re-apply Battle Shout — its uptime is free raid damage.",
      ],
    },
  ],
  watchOuts: [
    "Camp buffs don't stack with matching class buffs — coordinate at camp so your food buff isn't overriding (or overridden by) a shout or blessing.",
    "No flying mounts in Forever — plan routes on the ground and budget travel time between dungeons.",
    "Forever's unified hit/crit system means every old classic hit-cap table is wrong. Use the linked calculator, not muscle memory.",
    "Weapon skill matters less per item now, but glancing blows still hurt Bloodthirst — don't completely ignore it.",
    "Threat is classic-style: your tank's Sunder count is your permission slip to open up. Loose aggro = dead DPS.",
    "Ruleset choice (Normal/PvP/RP) is per-character and permanent — pick before you invest in the character.",
    "Raids don't open until December 9 — there is no reason to rush 60; nine new dungeons are the gearing funnel.",
  ],
  extras: [
    {
      label: "Core Enchants",
      items: [
        { name: "Enchant Weapon — Crusader", note: "Main hand; strength + heal procs while leveling and raiding." },
        { name: "Enchant Boots — Minor Speed", note: "Permanent 8% run speed; worth every copper." },
        { name: "Enchant Bracers — Superior Stamina", note: "Cheap survivability for melee uptime." },
        { name: "Enchant Gloves — Greater Strength", note: "Straight into your scaling." },
        { name: "Legs — Rugged Armor Kit", note: "Flat armor; reapply as you upgrade." },
      ],
    },
    {
      label: "Consumables",
      items: [
        { name: "Elixir of Giants", note: "Strength — scales Bloodthirst directly." },
        { name: "Elixir of the Mongoose", note: "Agility for crit/Flurry chaining." },
        { name: "Sharpening Stones", note: "Weapon damage; cheap and constant." },
        { name: "Scrolls of Strength", note: "Pre-raid filler buffs." },
        { name: "Camp food", note: "Stack it with a buff class you AREN'T running (camps don't stack with matching class buffs)." },
      ],
    },
    {
      label: "Leveling Quick Reference",
      items: [
        { name: "Level 20", note: "Dual Wield from trainer — buy two fast weapons." },
        { name: "Level ~25", note: "16th talent point → Forever capstone (verify in beta calculator)." },
        { name: "Level 30", note: "Berserker Stance + Whirlwind." },
        { name: "Level 40", note: "Bloodthirst — swap to slow main-hand weapon." },
        { name: "Level 60", note: "51 points: finalize 31+/Arms hybrid, enchant, stock consumables for Dec 9." },
      ],
    },
  ],
};
