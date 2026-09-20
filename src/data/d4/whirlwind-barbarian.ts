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
      unique: "Dust Devil helms (Lair boss drops) turn Whirlwind into a Dust Devil generator — build-defining at endgame.",
    },
    {
      slot: "Chest",
      target: "Tanky stat stick",
      affixes: ["Total Armor", "Damage Reduction", "Max Life", "Ranks to Rallying Cry"],
    },
    {
      slot: "Gloves",
      target: "Attack-speed and crit tuning",
      affixes: ["Attack Speed", "Critical Strike Chance", "Lucky Hit Chance", "Ranks to Whirlwind"],
    },
    {
      slot: "Pants",
      target: "Pure defense",
      affixes: ["Total Armor", "Damage Reduction from Close Enemies", "Max Life"],
    },
    {
      slot: "Boots",
      target: "Movement + Fury cost control",
      affixes: ["Movement Speed", "Reduced Fury Costs", "Fury per Second"],
    },
    {
      slot: "Weapons",
      target: "Dual-wield + Two-Handed Sword for the Technique slot",
      affixes: ["Strength", "Critical Strike Damage", "Damage to Close Enemies", "Vulnerable Damage"],
      unique: "Put Aspect of Berserk Ripping / Edgemaster's on weapons.",
    },
    {
      slot: "Amulet",
      target: "Skill ranks + movement",
      affixes: ["Movement Speed", "Damage", "Cooldown Reduction", "Fury Cost Reduction"],
    },
    {
      slot: "Rings",
      target: "Resource + crit",
      affixes: ["Critical Strike Chance", "Fury Generation", "Maximum Fury", "Damage"],
      unique: "Edgemaster's Aspect on one ring is the classic pairing.",
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
