import type { Build } from "@/data/types";

export const combatRogue: Build = {
  id: "forever-combat-rogue",
  game: "forever",
  slug: "combat-rogue",
  name: "Combat Rogue",
  className: "Rogue",
  role: "Dual-wield sword melee DPS",
  tier: "A",
  difficulty: 2,
  tagline: "Sinister Strike spam, Blade Flurry cleaves, Adrenaline Rush burnouts.",
  summary:
    "Combat is the leveling spec that never runs out of gas: energy-efficient Sinister Strikes, finisher refunds, and burst cooldowns that turn every pack into a blur. It's the classic PvE rogue with Forever's unified hit/crit system smoothing your white swings into reliable damage.",
  patchLabel: "Forever Beta · Sep 2026",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [
    { site: "ClassicWoW.gg", url: "https://classicwow.gg/forever/guides/rogue/combat", label: "ClassicWoW.gg Combat guide" },
    { site: "Wowhead", url: "https://www.wowhead.com/forever", label: "Wowhead Forever hub" },
    { site: "Blizzard", url: "https://worldofwarcraft.blizzard.com/en-us/news/24302093/carve-a-new-path-with-world-of-warcraft-forever", label: "Official Forever announcement" },
  ],
  meta: {
    "Best races": "Human (Alliance) · Troll (Horde — Berserking)",
    "Key mechanic": "Energy efficiency + finisher refunds",
    "Weapons": "Dual-wield swords, slow main hand",
    "Playstyle": "Sustain melee with burst windows",
    "Professions": "Engineering + Mining (or Herbalism for gold)",
    "Raid note": "Raids unlock Dec 9 — Barrow Deeps / Hyjal Summit / Onyxia",
  },
  skillPriority: [
    "Improved Sinister Strike (energy costs decide everything)",
    "Ruthlessness + Relentless Strikes (finisher economy)",
    "Blade Flurry (cleave + attack speed)",
    "Adrenaline Rush at 31 (the burn button)",
  ],
  progression: [
    {
      levels: "1–9",
      goal: "Stealth, Sinister Strike, and not dying",
      steps: [
        { name: "Stealth", detail: "Level 1", why: "Pick your fights, skip the packs you don't want — the rogue leveling superpower." },
        { name: "Sinister Strike", detail: "Level 1", why: "Your main combo-point generator for the rest of the game." },
        { name: "Eviscerate", detail: "As trained", why: "Your finisher — spend 5 combo points, watch things die." },
        { name: "Backstab? Not yet", detail: "—", why: "Combat swords builds skip Backstab entirely — position-free damage wins for leveling." },
      ],
    },
    {
      levels: "10–14",
      goal: "Open Combat with energy efficiency",
      steps: [
        { name: "Improved Sinister Strike", detail: "Ranks 1–2", why: "Cuts the energy cost of your main generator — more strikes per bar, forever." },
        { name: "Improved Eviscerate", detail: "Ranks 1–3", why: "Direct finisher damage — every fifth button press hits harder." },
      ],
      milestone: "Level 10: talent points begin — one per level, 51 total at 60.",
    },
    {
      levels: "15–19",
      goal: "Finisher economy",
      steps: [
        { name: "Ruthlessness", detail: "Ranks 1–3", why: "20% chance per finisher to add a free combo point — chains into nonstop Eviscerate." },
        { name: "Relentless Strikes", detail: "1 point", why: "Finishers refund energy — the single most efficient point in the tree." },
      ],
    },
    {
      levels: "20–24",
      goal: "Hit consistency and weapon skill",
      steps: [
        { name: "Precision", detail: "Ranks 1–5", why: "Melee hit chance — misses are the silent DPS killer for dual-wielders." },
        { name: "Dual Wield", detail: "Trainer at 20", why: "Second weapon swings = more combo points, more procs, more everything." },
        { name: "Garrote/Ambush skip", detail: "—", why: "Combat swords doesn't need openers — Sinister Strike from stealth or range is fine." },
      ],
    },
    {
      levels: "25–29",
      goal: "16-point capstone + weapon mastery",
      steps: [
        { name: "Dual Wield Specialization", detail: "Ranks 1–5 (start)", why: "Off-hand damage ramps from trash-tier to real — this is where dual-wield damage doubles." },
        { name: "16-point capstone", detail: "Reserved", why: "Forever's new one-point ability at 16 Combat points — verify its tuned effect in the beta calculator." },
      ],
      milestone: "Level ~25: your 16th Combat point unlocks Forever's new capstone ability.",
    },
    {
      levels: "30–34",
      goal: "Blade Flurry — the cleave identity",
      steps: [
        { name: "Blade Flurry", detail: "1 point", why: "20% attack speed for 15s AND your swings hit a second target — pack-clearing and burst in one button." },
        { name: "Riposte", detail: "1 point", why: "Free high-damage strike whenever your dodge procs — dungeon tank-save and energy-cheap damage." },
        { name: "Weapon switch", detail: "Slow main hand", why: "Sinister Strike scales off weapon damage — a slow sword with a big range hits harder per energy spent." },
      ],
    },
    {
      levels: "35–39",
      goal: "Finish Dual Wield, stack damage",
      steps: [
        { name: "Dual Wield Specialization", detail: "Complete ranks", why: "Finish the off-hand scaling you started at 25." },
        { name: "Malice", detail: "Ranks 1–5 (Assassination dip)", why: "Crit chance — feeds everything; the classic point-dump once Combat core is set." },
        { name: "Dungeon circuit", detail: "New + classic dungeons", why: "Hall of Thanes, Ruins of Lordaeron and reworked classic drops feed sword upgrades every few levels." },
      ],
    },
    {
      levels: "40–44",
      goal: "ADRENALINE RUSH",
      steps: [
        { name: "Adrenaline Rush", detail: "31-point talent", why: "Double energy regeneration for 15 seconds — burst phases, execute windows, escape hatches. The spec's heartbeat." },
        { name: "Weapon Expertise era", detail: "40s upgrades", why: "Forever reduced weapon-skill per item, but boss-level glances still matter — keep your swords' skill current." },
      ],
      milestone: "Level 40: Adrenaline Rush online. Burst on cooldown, bank energy between pulls.",
    },
    {
      levels: "45–49",
      goal: "Depth and survivability",
      steps: [
        { name: "Vitality", detail: "If available", why: "Flat stamina/attack power — straightforward raiding stats." },
        { name: "Improved Sprint", detail: "Ranks 1–2", why: "Escapes, tag races, and travel QoL while leveling." },
        { name: "Endurance runs", detail: "Dungeon loops", why: "The nine new dungeons are the gearing funnel — verify drops with the itemization guide." },
      ],
    },
    {
      levels: "50–54",
      goal: "Raid build shaping",
      steps: [
        { name: "Combat Potency-era picks", detail: "Deep ranks", why: "Anything that converts off-hand swings into energy or damage — check the beta calculator for the tuned deep build." },
        { name: "Enchant sweep", detail: "Begin", why: "Start applying your endgame enchants as gear stabilizes — don't waste them on soon-replaced items." },
      ],
    },
    {
      levels: "55–59",
      goal: "Consumable bench + final tune",
      steps: [
        { name: "Weapon buffs", detail: "Sharpening stones + oils", why: "Flat weapon damage; cheap and constant." },
        { name: "Elixirs", detail: "Agility first", why: "Agility = crit + attack power for rogues — the best all-around flask substitute." },
        { name: "Lockpicking/quests", detail: "Optional", why: "Pickpocket gold and lockboxes fund your consumables bench." },
      ],
    },
    {
      levels: "60 / Raid-ready",
      goal: "Barrow Deeps (10) · Hyjal Summit (20) · Onyxia's Lair (40) — December 9",
      steps: [
        { name: "Final talents", detail: "31+ Combat", why: "Adrenaline Rush core with Blade Flurry/Precision maxed; verify the beta-tuned split in the linked calculator." },
        { name: "Hit target", detail: "Unified hit/crit", why: "Forever unifies hit across melee and spells — check current thresholds in the linked guide, not classic tables." },
        { name: "Raid kit", detail: "Consumables + enchants", why: "Crusader or damage enchants on both swords, agility elixirs, stones, camp buff that doesn't clash with raid buffs." },
      ],
      milestone: "Raids unlock December 9 — the launch window is your gear and consumable runway.",
    },
  ],
  statPriority: [
    { label: "Attack Power / Agility", note: "Agility gives crit AND attack power — rogue's double-duty stat." },
    { label: "Hit (unified)", note: "Dual-wield misses are brutal; Forever's unified hit makes it one easy stat." },
    { label: "Crit", note: "Feeds burst windows and finisher tempo." },
    { label: "Weapon Skill", note: "Less per item in Forever but still trims boss-level glances." },
    { label: "Stamina", note: "Uptime is damage; dead rogues do zero." },
  ],
  gear: [
    {
      slot: "Head",
      target: "Leather with agility/hit — Nightslayer Cover when raids open",
      affixes: ["Agility", "Hit", "Stamina"],
      item: {
        name: "Nightslayer Cover",
        quality: "epic",
        type: "Epic Leather Helm",
        armor: "332 Armor",
        stats: [
          { text: "+25 Agility" },
          { text: "+17 Stamina" },
          { text: "+1% Hit Chance" },
        ],
        source: "Molten Core · Nightslayer",
        icon: "helm",
      },
    },
    {
      slot: "Neck",
      target: "Agility with stamina",
      affixes: ["Agility", "Stamina", "Hit"],
      item: {
        name: "Pendant of the Silent Lunge",
        quality: "rare",
        type: "Rare Necklace",
        stats: [
          { text: "+12 Agility" },
          { text: "+6 Stamina" },
          { text: "+1% Hit Chance" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "amulet",
      },
    },
    {
      slot: "Shoulders",
      target: "Reworked dungeon drops — agility leather",
      affixes: ["Agility", "Attack Power"],
      item: {
        name: "Hardened Leather Mantle",
        quality: "rare",
        type: "Rare Leather Shoulders",
        armor: "218 Armor",
        stats: [
          { text: "+14 Agility" },
          { text: "+8 Stamina" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "shoulders",
      },
    },
    {
      slot: "Back",
      target: "Agility cloak — enchant it on arrival",
      affixes: ["Agility", "Stamina"],
      item: {
        name: "Duskweaver's Cloak",
        quality: "rare",
        type: "Rare Cloak",
        armor: "52 Armor",
        stats: [
          { text: "+8 Agility" },
          { text: "+5 Stamina" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "offhand",
      },
    },
    {
      slot: "Chest",
      target: "Agility stat-stick — Nightslayer Chestpiece when raids open",
      affixes: ["Agility", "Stamina", "Crit"],
      item: {
        name: "Nightslayer Chestpiece",
        quality: "epic",
        type: "Epic Leather Chest",
        armor: "456 Armor",
        stats: [
          { text: "+28 Agility" },
          { text: "+20 Stamina" },
        ],
        source: "Molten Core · Nightslayer",
        icon: "chest",
      },
    },
    {
      slot: "Wrists",
      target: "Cheap agility upgrades — enchant on arrival",
      affixes: ["Agility", "Stamina"],
      item: {
        name: "Reinforced Leather Bracers",
        quality: "rare",
        type: "Rare Leather Bracers",
        armor: "176 Armor",
        stats: [
          { text: "+11 Agility" },
          { text: "+7 Stamina" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "wrist",
      },
    },
    {
      slot: "Hands",
      target: "Hit or crit gloves — Nightslayer Gloves carry both",
      affixes: ["Hit", "Crit", "Agility"],
      item: {
        name: "Nightslayer Gloves",
        quality: "epic",
        type: "Epic Leather Gloves",
        armor: "268 Armor",
        stats: [
          { text: "+20 Agility" },
          { text: "+14 Stamina" },
          { text: "+1% Critical Strike chance" },
        ],
        source: "Molten Core · Nightslayer",
        icon: "hands",
      },
    },
    {
      slot: "Waist",
      target: "Any clean agility leather",
      affixes: ["Agility", "Stamina"],
      item: {
        name: "Nightslayer Belt",
        quality: "epic",
        type: "Epic Leather Belt",
        armor: "240 Armor",
        stats: [
          { text: "+17 Agility" },
          { text: "+13 Stamina" },
        ],
        source: "Molten Core · Nightslayer",
        icon: "belt",
      },
    },
    {
      slot: "Legs",
      target: "Armor-kit immediately",
      affixes: ["Agility", "Stamina"],
      item: {
        name: "Swift Leather Legguards",
        quality: "rare",
        type: "Rare Leather Legs",
        armor: "312 Armor",
        stats: [
          { text: "+19 Agility" },
          { text: "+12 Stamina" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "legs",
      },
    },
    {
      slot: "Feet",
      target: "Minor Speed enchant — non-negotiable",
      affixes: ["Stamina", "Movement via enchant"],
      item: {
        name: "Nightslayer Boots",
        quality: "epic",
        type: "Epic Leather Boots",
        armor: "276 Armor",
        stats: [
          { text: "+18 Agility" },
          { text: "+13 Stamina" },
        ],
        source: "Molten Core · Nightslayer",
        icon: "feet",
      },
    },
    {
      slot: "Ring 1",
      target: "Strength ring — attack power still scales every Sinister Strike",
      affixes: ["Agility", "Hit", "Crit"],
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
      slot: "Ring 2",
      target: "Agility + hit pairing",
      affixes: ["Agility", "Hit", "Crit"],
      item: {
        name: "Rogue's Ring of Agility",
        quality: "rare",
        type: "Rare Ring",
        stats: [
          { text: "+11 Agility" },
          { text: "+6 Stamina" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "ring",
      },
    },
    {
      slot: "Trinket 1",
      target: "The extra-attack proc — dual-wielders live on it",
      affixes: ["On-use / proc effects"],
      item: {
        name: "Hand of Justice",
        quality: "rare",
        type: "Rare Trinket",
        stats: [
          { text: "Equip: Chance to strike with an additional attack after a melee swing.", tone: "power" },
        ],
        flavor: "More swings = more combo points = more Eviscerates. Simple math.",
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
        flavor: "Crit feeds burst windows and finisher tempo.",
        source: "Upper Blackrock Spire · questline",
        icon: "trinket",
      },
    },
    {
      slot: "Main Hand",
      target: "Slow high-damage sword — Sinister Strike uses main-hand damage, so the slow upgrade is always the biggest jump; Crusader here",
      affixes: ["Slow main hand", "Crusader on main"],
      item: {
        name: "Krol Blade",
        quality: "rare",
        type: "Rare One-Handed Sword",
        stats: [
          { text: "Slow, heavy damage range — feeds Sinister Strike and Eviscerate tempo" },
          { text: "+15 Agility" },
        ],
        flavor: "The famous Blackrock Depths sword — a rogue's first real main-hand prize.",
        source: "Blackrock Depths",
        icon: "sword",
      },
    },
    {
      slot: "Off-Hand",
      target: "Fast sword for off-hand swings and procs — damage enchant here, Crusader stays main-hand",
      affixes: ["Fast off-hand"],
      item: {
        name: "Mirah's Song",
        quality: "rare",
        type: "Rare One-Handed Sword",
        stats: [
          { text: "Fast swing timer — feeds off-hand damage and Blade Flurry cleaves" },
          { text: "+9 Agility" },
        ],
        flavor: "A song in the off-hand — pairs with any slow main-hand sword.",
        source: "Blackrock Depths",
        icon: "sword",
      },
    },
    {
      slot: "Ranged",
      target: "Throwing weapon with stats",
      affixes: ["Agility", "Hit"],
      item: {
        name: "Balanced Throwing Dagger",
        quality: "rare",
        type: "Rare Throwing Dagger",
        stats: [
          { text: "+7 Agility" },
          { text: "+1% Hit Chance" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "dagger",
      },
    },
  ],
  rotation: [
    {
      phase: "Pull",
      steps: [
        "Stealth approach; open with Sinister Strike (or cheap Cheap Shot for control).",
        "Blade Flurry when the pack has two or more targets.",
      ],
    },
    {
      phase: "Standard rotation",
      steps: [
        "Sinister Strike to 5 combo points — always keep energy above ~20 for reactions.",
        "Eviscerate at 5 — with Ruthlessness/Relentless Strikes the loop feeds itself.",
        "Riposte whenever your dodge procs — free damage, no energy cost.",
      ],
    },
    {
      phase: "Burst / Execute",
      steps: [
        "Adrenaline Rush on hard packs or burn windows — spam Sinister Strike with the doubled regen.",
        "Eviscerate finisher as the target drops below 20%.",
        "Vanilla-style threat awareness: let the tank build 2-3 seconds before unloading bursts.",
      ],
    },
  ],
  watchOuts: [
    "Don't spend energy below ~20 — leaves you no room for Riposte or an emergency Evasion.",
    "Slow main hand, fast off-hand. A fast main-hand sword murders your Sinister Strike efficiency.",
    "Forever unified hit/crit: old rogue hit tables (17% dual-wield era math) don't apply — use the linked calculator.",
    "Weapon skill is weaker per item now but still reduces glances on bosses — keep swords current.",
    "Camp buffs don't stack with matching class buffs — don't overlap your camp food with raid-elixir equivalents.",
    "No flying mounts — blade-flurry sprint routes and zone planning matter for the dungeon circuit.",
    "Raids open December 9 — no rush; the nine new dungeons gear you on the way.",
  ],
  extras: [
    {
      label: "Core Enchants",
      items: [
        { name: "Enchant Weapon — Crusader", note: "Main hand; strength + healing procs." },
        { name: "Off-hand damage enchant", note: "Flat damage on the fast sword." },
        { name: "Enchant Boots — Minor Speed", note: "Positioning speed is survival." },
        { name: "Enchant Gloves — Greater Agility", note: "Crit + attack power." },
        { name: "Legs — Rugged Armor Kit", note: "Flat armor per upgrade." },
      ],
    },
    {
      label: "Consumables",
      items: [
        { name: "Elixir of the Mongoose", note: "Agility — crit and attack power in one." },
        { name: "Elixir of Giants", note: "Strength alternative for attack power." },
        { name: "Sharpening Stones", note: "Flat weapon damage, constant." },
        { name: "Thistle Tea", note: "Instant energy — burst windows on demand." },
        { name: "Camp food", note: "Coordinate with raid buffs (no stacking)." },
      ],
    },
    {
      label: "Leveling Quick Reference",
      items: [
        { name: "Level 20", note: "Dual Wield from trainer — buy two swords." },
        { name: "Level ~25", note: "16-point Forever capstone (verify in beta calculator)." },
        { name: "Level 30+", note: "Blade Flurry + Riposte — cleave identity online." },
        { name: "Level 40", note: "Adrenaline Rush — burst on cooldown." },
        { name: "Level 60", note: "51 points: 31+ Combat, enchants, consumables for Dec 9." },
      ],
    },
  ],
};
