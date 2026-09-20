import type { Build } from "@/data/types";

/**
 * Whirlwind Barbarian — the flagship evergreen D4 build.
 * Authored in-house, anchored to patch-stable mechanics; every page
 * links to Maxroll/Icy Veins for live seasonal tuning.
 */
export const whirlwindBarbarian: Build = {
  id: "d4-whirlwind-barbarian",
  game: "d4",
  slug: "whirlwind-barbarian",
  name: "Whirlwind Barbarian",
  className: "Barbarian",
  role: "Melee AoE speedfarm",
  tier: "S",
  difficulty: 2,
  tagline: "Spin to win. Take Whirlwind at level 3 and never look back.",
  summary:
    "The classic spin-to-win Barbarian. You generate Fury with shouts and Frenzy, then dump it all into an endless Whirlwind that shreds packs while you plow through campaigns, dungeons and Helltides. Forgiving, tanky, and fast — the safest first seasonal character.",
  patchLabel: "Season 15 · Patch 3.2",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [
    {
      site: "Maxroll",
      url: "https://maxroll.gg/d4/build-guides",
      label: "Maxroll Barbarian build guides",
    },
    {
      site: "Icy Veins",
      url: "https://www.icy-veins.com/d4/barbarian/builds/",
      label: "Icy Veins Barbarian builds",
    },
  ],
  meta: {
    "Core loop": "Generate Fury → dump into Whirlwind",
    "Fury engine": "Shouts + Whirlwind refunds",
    "Key mechanic": "Dust Devils from unique helms",
    "Playstyle": "Hold one button, spin forever",
    "Best for": "Campaign → Helltides → Nightmare dungeons",
  },
  skillPriority: [
    "Whirlwind (your entire damage)",
    "Rallying Cry + Challenging Shout (Fury, Fortify, survivability)",
    "War Cry (damage multiplier)",
    "Wrath of the Berserker (burst window)",
  ],
  progression: [
    {
      levels: "1–2",
      goal: "Build Fury with a Basic skill while you level",
      steps: [
        { name: "Frenzy", detail: "Rank 1", why: "Fast Fury generation with attack speed; outclasses every other Basic for this build." },
        { name: "Enhanced Frenzy", detail: "1 pt", why: "Heals you and adds Fury gain — keeps early leveling smooth." },
      ],
    },
    {
      levels: "3–5",
      goal: "Take Whirlwind the moment the Core slot unlocks and never use a Basic again",
      steps: [
        { name: "Whirlwind", detail: "Rank 1", why: "The whole build. Core skills unlock at level 3 — grab it instantly." },
        { name: "Enhanced Whirlwind", detail: "1 pt", why: "Whirlwind starts refunding Fury per enemy hit — your engine comes online." },
        { name: "Rallying Cry", detail: "Rank 1 (Defensive unlocks at 5)", why: "Fury on cast, Unstoppable and huge early survivability." },
      ],
      milestone: "Level 3: Core skill slot unlocks — Whirlwind becomes your only attack for the rest of the game.",
    },
    {
      levels: "6–10",
      goal: "Maximize Whirlwind ranks and start the shout suite",
      steps: [
        { name: "Whirlwind", detail: "Ranks 2–3", why: "Raw damage per level; keep it as high as your points allow." },
        { name: "Violent Whirlwind", detail: "1 pt", why: "The outward edge of Whirlwind applies a heavy Bleed — big damage vs packs and bosses." },
        { name: "Challenging Shout", detail: "Rank 1 (Brawling unlocks at 8)", why: "Second shout = more Fury, more Fortify, taunt-free aggro control." },
        { name: "Enhanced Challenging Shout", detail: "1 pt", why: "Fortify on hit from enemies you taunt — pairs with shouts to make you nearly unkillable while leveling." },
      ],
      milestone: "Level 5: Arsenal system unlocks — you can wield every weapon type.",
    },
    {
      levels: "11–15",
      goal: "Upgrade shouts and unlock the Arsenal Technique slot",
      steps: [
        { name: "Strategic Rallying Cry", detail: "1 pt", why: "Rallying Cry now generates Fury per second while active — sustains an endless Whirlwind." },
        { name: "Whirlwind", detail: "Ranks 4–5", why: "Finish maxing your Core skill." },
        { name: "War Cry", detail: "Rank 1", why: "Straight damage multiplier and Berserking — third shout, third multiplier." },
        { name: "Enhanced War Cry", detail: "1 pt", why: "Berserking lasts longer and you deal more while it's up." },
      ],
      milestone: "Level 15: Technique slot unlocks — equip Two-Handed Sword Expertise for a damage multiplier while still dual-wielding.",
    },
    {
      levels: "16–25",
      goal: "Layer passives and finish the shout trio",
      steps: [
        { name: "Tactical Challenging Shout", detail: "1 pt", why: "Converts shout uptime into Fortify — your second health bar." },
        { name: "Booming Voice", detail: "Ranks 1–3", why: "Bigger shout radius + duration; more Fury, more buffs, more often." },
        { name: "Raid Leader", detail: "Ranks 1–3", why: "Chance for shouts to cost no Fury/freeze cooldowns — smoother rotations." },
        { name: "Pit Fighter", detail: "Ranks 1–3", why: "Close-enemy damage and damage reduction — exactly what a spinning melee wants." },
        { name: "Imposing Presence", detail: "Ranks 1–3", why: "Max Life + crowd-control resistance for elite density." },
      ],
    },
    {
      levels: "26–35",
      goal: "Come online with core passives and your Ultimate",
      steps: [
        { name: "Wrath of the Berserker", detail: "Rank 1 (Ultimate unlocks at 12+, take it here)", why: "Huge burst window with guaranteed Berserking and Unstoppable — pop for elites and bosses." },
        { name: "Supreme Wrath of the Berserker", detail: "1 pt", why: "Crit during the window extends Berserking — the payoff rank." },
        { name: "Fury passives", detail: "Ranks 1–3 each", why: "Prioritize every passive that grants Fury, cuts Fury cost, or extends shout duration — skip damage-for-basics traps." },
        { name: "Unbridled Rage", detail: "Key passive — hold until gear supports it", why: "Doubles Whirlwind's damage AND its Fury cost. Take it when you can sustain the cost; otherwise it's a trap." },
      ],
      milestone: "Level 30+: World Tier 3 (Nightmare) — re-gear into Legendary items with the aspects below.",
    },
    {
      levels: "36–45",
      goal: "Key passive online + Legendary Aspects carry you",
      steps: [
        { name: "Unbridled Rage", detail: "Take now", why: "By this point Fury generation (shouts, Enhanced Whirlwind, affixes) sustains the doubled cost." },
        { name: "Aspect of Berserk Ripping", detail: "Put on weapon(s)", why: "Whirlwind Bleeds scale with its damage — your main pack-clearing multiplier while leveling." },
        { name: "Edgemaster's Aspect", detail: "Ring or weapon", why: "Damage scales with your current Fury — rewards the full Fury bar you now maintain." },
      ],
    },
    {
      levels: "46–50",
      goal: "Enter the endgame engine",
      steps: [
        { name: "Aspect of Disobedience", detail: "Armor slot", why: "Stacking armor while you damage enemies — solves defensive scaling into Torment." },
        { name: "Paragon Boards", detail: "Start at 50", why: "Open the first board and path toward Strength + damage nodes; respec freely until 60 — it's cheap." },
      ],
      milestone: "Level 50: Paragon Board + World Tier 4 (Torment) after a gear refresh.",
    },
    {
      levels: "51–70",
      goal: "Glyphs, torment farming, build finalization",
      steps: [
        { name: "Might Glyph", detail: "Socket first", why: "Multiplies your Strength nodes — Barbarian's best all-around glyph for this build." },
        { name: "Ire Glyph", detail: "Socket second", why: "Fury-centric nodes feed Unbridled Rage's doubled cost." },
        { name: "Territorial Glyph", detail: "Defensive pickup", why: "Close-range damage reduction for melee density." },
        { name: "Torment dungeons", detail: "Farm loop", why: "Helltides + Nightmare dungeons + Lair bosses for Ancestral gear and glyph leveling." },
      ],
    },
    {
      levels: "70+",
      goal: "Push the Pit and refine",
      steps: [
        { name: "Dust Devil engine", detail: "Unique helm", why: "Unique helms that spawn Dust Devils while Whirlwinding turn this into a screen-clearing machine — hunt them from Lair bosses." },
        { name: "Masterworking + Tempering", detail: "Craft layer", why: "Temper Whirlwind/shout affixes, then masterwork your crit and Fury stats first." },
        { name: "Check live tuning", detail: "Every season", why: "Glyph thresholds and aspect values shift by patch — verify final numbers on Maxroll or Icy Veins." },
      ],
    },
  ],
  statPriority: [
    { label: "Strength", note: "Scales all your damage — the default pick everywhere." },
    { label: "Fury per Second / Maximum Fury", note: "Feeds Unbridled Rage's doubled cost." },
    { label: "Critical Strike Damage", note: "Berserking windows make crits enormous." },
    { label: "Damage to Close Enemies", note: "Whirlwind is always close range." },
    { label: "Cooldown Reduction", note: "More shout uptime = more Fury, Fortify and damage." },
    { label: "Total Armor / Damage Reduction", note: "Melee build — never skip the defensive layer." },
  ],
  gear: [
    {
      slot: "Helm",
      target: "Cooldown Reduction + maxed shouts",
      affixes: ["Cooldown Reduction", "Total Armor", "Life", "Ranks to Challenging Shout"],
      item: {
        name: "Shout Engine Helm",
        quality: "legendary",
        type: "Ancestral Legendary Helm",
        itemPower: "925 Item Power",
        armor: "620 Armor",
        stats: [
          { text: "+8.0% Cooldown Reduction" },
          { text: "+587 Total Armor" },
          { text: "+970 Maximum Life" },
          { text: "+2 Ranks to Challenging Shout (tempered)", tone: "power" },
        ],
        source: "Helltides & Lair boss drops",
        icon: "helm",
      },
    },
    {
      slot: "Chest",
      target: "Tanky stat stick",
      affixes: ["Total Armor", "Damage Reduction", "Max Life", "Ranks to Rallying Cry"],
      item: {
        name: "Bulwark of the Endless Spin",
        quality: "legendary",
        type: "Ancestral Legendary Chest Armor",
        itemPower: "925 Item Power",
        armor: "1,412 Armor",
        stats: [
          { text: "+612 Total Armor" },
          { text: "+14.5% Damage Reduction from Close Enemies" },
          { text: "+1,420 Maximum Life" },
          { text: "+2 Ranks to Rallying Cry (tempered)", tone: "power" },
        ],
        source: "Nightmare dungeons",
        icon: "chest",
      },
    },
    {
      slot: "Gloves",
      target: "Attack-speed and crit tuning",
      affixes: ["Attack Speed", "Critical Strike Chance", "Lucky Hit Chance", "Ranks to Whirlwind"],
      item: {
        name: "Gauntlets of the Whirl",
        quality: "legendary",
        type: "Ancestral Legendary Gloves",
        itemPower: "925 Item Power",
        armor: "448 Armor",
        stats: [
          { text: "+14.0% Attack Speed" },
          { text: "+9.5% Critical Strike Chance" },
          { text: "+22.0% Lucky Hit Chance" },
          { text: "+3 Ranks to Whirlwind (tempered)", tone: "power" },
        ],
        source: "Nightmare dungeons",
        icon: "hands",
      },
    },
    {
      slot: "Pants",
      target: "Barrier generator — your second health bar",
      affixes: ["Total Armor", "Max Life"],
      item: {
        name: "Temerity",
        quality: "unique",
        type: "Ancestral Unique Pants",
        itemPower: "925 Item Power",
        armor: "918 Armor",
        stats: [
          { text: "Your healing is converted into a Barrier, up to a large share of your Maximum Life.", tone: "power" },
          { text: "+892 Total Armor" },
          { text: "+1,125 Maximum Life" },
        ],
        flavor: "Barrier uptime from potion and shout healing — fortify on top of fortify.",
        source: "World & Lair boss drops",
        icon: "legs",
      },
    },
    {
      slot: "Boots",
      target: "Movement + Fury cost control",
      affixes: ["Movement Speed", "Reduced Fury Costs", "Fury per Second"],
      item: {
        name: "Striders of the Stampede",
        quality: "legendary",
        type: "Ancestral Legendary Boots",
        itemPower: "925 Item Power",
        armor: "502 Armor",
        stats: [
          { text: "+22.0% Movement Speed" },
          { text: "+4 Fury per Second" },
          { text: "+18.0% Reduced Fury Costs" },
        ],
        source: "Helltides",
        icon: "feet",
      },
    },
    {
      slot: "Main Hand",
      target: "Slow, heavy sword — weapon damage is your spin",
      affixes: ["Strength", "Critical Strike Damage", "Damage to Close Enemies"],
      item: {
        name: "Edge of the Maelstrom",
        quality: "legendary",
        type: "Ancestral Legendary Two-Handed Sword",
        itemPower: "925 Item Power",
        stats: [
          { text: "2,840 Damage per second (slow — feeds Whirlwind)" },
          { text: "+412 Strength" },
          { text: "+165.0% Critical Strike Damage" },
          { text: "Imprinted: Aspect of Berserk Ripping — Whirlwind Bleeds for a share of its damage", tone: "power" },
        ],
        source: "Nightmare dungeons · aspect imprint",
        icon: "sword",
      },
    },
    {
      slot: "Off-Hand",
      target: "Dual-wield partner — matches the main hand",
      affixes: ["Strength", "Critical Strike Damage", "Damage to Close Enemies"],
      item: {
        name: "Twin of the Maelstrom",
        quality: "legendary",
        type: "Ancestral Legendary Two-Handed Axe",
        itemPower: "925 Item Power",
        stats: [
          { text: "2,805 Damage per second (dual-wield pair)" },
          { text: "+398 Strength" },
          { text: "+158.0% Critical Strike Damage" },
          { text: "Imprinted: Edgemaster's Aspect — damage scales with current Fury", tone: "power" },
        ],
        source: "Nightmare dungeons · aspect imprint",
        icon: "axe",
      },
    },
    {
      slot: "Amulet",
      target: "Skill ranks + movement",
      affixes: ["Movement Speed", "Damage", "Cooldown Reduction", "Fury Cost Reduction"],
      item: {
        name: "Pendant of the Warlord",
        quality: "legendary",
        type: "Ancestral Legendary Amulet",
        itemPower: "925 Item Power",
        stats: [
          { text: "+18.0% Movement Speed" },
          { text: "+77.5% Damage" },
          { text: "+12.1% Cooldown Reduction" },
          { text: "+3 Ranks to War Cry (tempered)", tone: "power" },
        ],
        source: "Lair boss drops",
        icon: "amulet",
      },
    },
    {
      slot: "Ring 1",
      target: "The Fury-crit engine",
      affixes: ["Critical Strike Chance", "Maximum Fury"],
      item: {
        name: "Ring of Red Furor",
        quality: "unique",
        type: "Ancestral Unique Ring",
        itemPower: "925 Item Power",
        stats: [
          { text: "Spending Fury above 50 grants a massive burst of bonus Critical Strike Damage.", tone: "power" },
          { text: "+11.5% Critical Strike Chance" },
          { text: "+45 Maximum Fury" },
        ],
        flavor: "The ring the whole build orbits — every spin keeps you above the threshold.",
        source: "Lair boss drops",
        icon: "ring",
      },
    },
    {
      slot: "Ring 2",
      target: "Resource + crit filler",
      affixes: ["Critical Strike Chance", "Fury Generation", "Maximum Fury", "Damage"],
      item: {
        name: "Loop of the Living Fury",
        quality: "legendary",
        type: "Ancestral Legendary Ring",
        itemPower: "925 Item Power",
        stats: [
          { text: "+10.5% Critical Strike Chance" },
          { text: "+32% Fury Generation" },
          { text: "+38 Maximum Fury" },
          { text: "+84.0% Damage" },
        ],
        source: "Nightmare dungeons",
        icon: "ring",
      },
    },
  ],
  rotation: [
    {
      phase: "Pull / Setup",
      steps: [
        "Cast Rallying Cry before engaging — Fury per second starts immediately.",
        "Challenging Shout into the pack for Fortify and Fury on hit.",
      ],
    },
    {
      phase: "Standard pack",
      steps: [
        "Hold Whirlwind. Spin through the pack, touching the outer edge to spread Violent Bleeds.",
        "Re-cast shouts on cooldown; never stop Whirlwind.",
      ],
    },
    {
      phase: "Elites / Bosses",
      steps: [
        "Pop War Cry + Wrath of the Berserker together for the Berserking window.",
        "Stand in the boss with full Fury — Edgemaster's scales with your current Fury bar.",
        "Keep shouts cycling; your defense IS your shout uptime.",
      ],
    },
  ],
  watchOuts: [
    "Don't take Unbridled Rage early — doubling Whirlwind's cost before your Fury engine is built bricks your damage.",
    "Whirlwind scales off weapon damage — keep every weapon upgraded at the blacksmith or your spin loses teeth.",
    "Never swap the Technique slot off Two-Handed Sword Expertise — the multiplier requires the two-hander equipped even while dual-wielding.",
    "Don't farm Torment before re-gearing into Legendary Aspects at 30+/50+ — the difficulty spike punishes blue gear.",
    "Shout uptime is your defense. If you feel squishy, it's almost always a cooldown problem, not an armor problem.",
    "Fortify scaling: shouts only work if you recast — the Fortify bar decays; treat shouts as maintenance, not panic buttons.",
  ],
  extras: [
    {
      label: "Key Legendary Aspects",
      items: [
        { name: "Aspect of Berserk Ripping", note: "Whirlwind Bleed multiplier — leveling core." },
        { name: "Edgemaster's Aspect (Oldstones)", note: "Damage per current Fury." },
        { name: "Aspect of Disobedience (Desecrated Crypt)", note: "Stacking armor while attacking." },
        { name: "Aspect of Might", note: "Damage reduction while using Basic skills — helps the Frenzy opener." },
        { name: "Windlasher Aspect", note: "Whirlwind damage ramp while channeling." },
        { name: "Bul-Kathos Aspect", note: "Whirlwind duration extension for smoother spins." },
      ],
    },
    {
      label: "Paragon Glyphs",
      items: [
        { name: "Might", note: "First socket — Strength node multiplier." },
        { name: "Ire", note: "Fury scaling for Unbridled Rage." },
        { name: "Territorial", note: "Melee defense." },
        { name: "Amplify", note: "Bleed/Vulnerable scaling once boards are online." },
      ],
    },
    {
      label: "Consumables",
      items: [
        { name: "Iron Barb Elixir", note: "Strength for leveling pushes." },
        { name: "Second Wind Incense", note: "Life + sustain for Torment entries." },
        { name: "Elixirs before bosses", note: "Always run an elixir — free XP bonus in early Torment." },
      ],
    },
  ],
};
