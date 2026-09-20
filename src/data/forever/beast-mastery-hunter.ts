import type { Build } from "@/data/types";

export const beastMasteryHunter: Build = {
  id: "forever-beast-mastery-hunter",
  game: "forever",
  slug: "beast-mastery-hunter",
  name: "Beast Mastery Hunter",
  className: "Hunter",
  role: "Pet-driven ranged DPS — the solo leveling king",
  tier: "S",
  difficulty: 1,
  tagline: "Your pet tanks, your bow kills, and you level in a straight line.",
  summary:
    "BM Hunter is the spec that made everyone love hunters: the pet holds threat while you plink from range, and Bestial Wrath turns the pair into a raid boss for fifteen seconds. Forever makes it even better — the new Human Hunter combo joins the roster and unified hit/crit means your ranged gearing got simpler.",
  patchLabel: "Forever Beta · Sep 2026",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [
    { site: "ClassicWoW.gg", url: "https://classicwow.gg/forever/guides/hunter/beast-mastery", label: "ClassicWoW.gg Beast Mastery guide" },
    { site: "Wowhead", url: "https://www.wowhead.com/forever", label: "Wowhead Forever hub" },
    { site: "Blizzard", url: "https://worldofwarcraft.blizzard.com/en-us/news/24302093/carve-a-new-path-with-world-of-warcraft-forever", label: "Official Forever announcement" },
  ],
  meta: {
    "Best races": "Dwarf (Alliance) · Orc (Horde) · Human Hunter (new in Forever)",
    "Key mechanic": "Pet tanks, you shoot — Bestial Wrath for burst",
    "Weapons": "Slow high-damage ranged weapon + stat-stick melee",
    "Pet pick": "Fast-attack cat (Broken Tooth is the famous one)",
    "Professions": "Dragonscale Leatherworking or Engineering",
    "Raid note": "Pet is 100% free raid damage — keep it fed and alive",
  },
  skillPriority: [
    "Improved Aspect of the Hawk (ranged attack speed engine)",
    "Endurance Training + Thick Hide (pet and you live more)",
    "Intimidation at 21 (stun + pet threat)",
    "Bestial Wrath at 31 (the burn button)",
  ],
  progression: [
    {
      levels: "1–9",
      goal: "Learn the rhythm: pet pulls, you shoot, nothing touches you",
      steps: [
        { name: "Raptor Strike / Wing Clip", detail: "As trained", why: "Melee bridge until the pet has full threat — clip and back off." },
        { name: "Serpent Sting", detail: "As trained", why: "Damage-over-time opener; ticks while you auto-attack." },
        { name: "Concussive Shot", detail: "As trained", why: "Kite tool — slows runners and gives the pet time to catch up." },
        { name: "Growl", detail: "Pet skill", why: "Train Growl immediately — your pet's threat is your safety net all the way to 60." },
      ],
    },
    {
      levels: "10–14",
      goal: "First talent points: BM durability first",
      steps: [
        { name: "Endurance Training", detail: "Ranks 1–3", why: "More health for you AND the pet — the classic first BM investment." },
        { name: "Improved Aspect of the Hawk", detail: "Ranks 1–5 (start)", why: "Proc-based attack speed on your ranged — the passive damage engine." },
      ],
      milestone: "Level 10: talent points begin — one per level, 51 total at 60. Hunter pets unlock talent training in this window too.",
    },
    {
      levels: "15–19",
      goal: "Pet power spike",
      steps: [
        { name: "Improved Aspect of the Hawk", detail: "Complete ranks", why: "Finish the attack-speed proc — near-permanent uptime with a drawn bow." },
        { name: "Thick Hide", detail: "Ranks 1–3", why: "Pet armor — less healer attention, more uptime." },
        { name: "Mend Pet", detail: "Trainer", why: "Out-of-combat pet healing; the reason BM never stops moving forward." },
      ],
    },
    {
      levels: "20–24",
      goal: "Burst utility and the 30-yard game",
      steps: [
        { name: "Aspect of the Cheetah", detail: "Trainer at 20", why: "Travel and tag-race speed; remember it dazes on hit — off before combat." },
        { name: "Bestial Swiftness", detail: "Ranks 1–2 (if available)", why: "Permanent pet movement speed — chase-proof leveling." },
        { name: "Feign Death", detail: "Trainer", why: "Drop threat instantly — dungeons and crowd-control resets forever." },
      ],
    },
    {
      levels: "25–29",
      goal: "16-point capstone milestone",
      steps: [
        { name: "Endurance Training", detail: "Complete ranks", why: "Finish the health line while pushing toward the capstone." },
        { name: "16-point capstone", detail: "Reserved", why: "Forever adds a brand-new one-point ability at 16 points into a tree — check the beta talent calculator for the tuned effect." },
      ],
      milestone: "Level ~25: your 16th BM point unlocks Forever's new capstone ability.",
    },
    {
      levels: "30–34",
      goal: "INTIMIDATION. Pet becomes a stunbot.",
      steps: [
        { name: "Intimidation", detail: "21-point talent", why: "Pet stuns on command — interrupts casters, saves healers, opens boss-length windows." },
        { name: "Ferocity", detail: "Ranks 1–5 (pet-line filler)", why: "Pet damage and crit — free DPS that scales with every gear upgrade you get." },
        { name: "Multi-Shot", detail: "Trainer", why: "Three-target burst — the AoE button alongside the pet's growl-cycle." },
      ],
    },
    {
      levels: "35–39",
      goal: "Pet resilience + your offense",
      steps: [
        { name: "Unleashed Fury", detail: "Ranks 1–5 (start)", why: "Flat pet damage percent — BM's deep scaling begins." },
        { name: "Aimed Shot", detail: "Dip into Marksmanship", why: "The heavy opener; many BM hunters take the MM dip for it — check the beta calculator for the split." },
        { name: "Feed Pet management", detail: "Discipline", why: "Keep food stocked; a happy pet deals meaningfully more damage." },
      ],
    },
    {
      levels: "40–44",
      goal: "BESTIAL WRATH. Fifteen seconds of raid boss.",
      steps: [
        { name: "Bestial Wrath", detail: "31-point talent", why: "Pet goes beast-mode: massive damage bonus and immunity to fear/stun effects — the spec's defining burst for elites and bosses." },
        { name: "Mail armor transition", detail: "Trainer at 40", why: "Hunters gain mail — swap leather for mail pieces as they drop." },
        { name: "Pet check", detail: "Fast cat", why: "A fast-attack pet (the famous Broken Tooth archetype) maximizes proc-driven damage — verify current pet metas in the linked guide." },
      ],
      milestone: "Level ~40: Bestial Wrath online. Elite quests and dungeon bosses melt.",
    },
    {
      levels: "45–49",
      goal: "Deep BM depth",
      steps: [
        { name: "Unleashed Fury", detail: "Complete ranks", why: "Finish the pet multiplier — it's the spec's biggest damage line." },
        { name: "Aspect mastery", detail: "Filler ranks", why: "Improved Cheetah/Monkey quality-of-life — check the beta calculator for tuned filler." },
        { name: "Dungeon circuit", detail: "New + classic dungeons", why: "The nine new dungeons plus classic staples — mail and ranged upgrades flow constantly." },
      ],
    },
    {
      levels: "50–54",
      goal: "Raid talent shaping",
      steps: [
        { name: "The Beast Within era picks", detail: "Deep BM ranks", why: "Anything that extends or amplifies Bestial Wrath — verify tuned picks in the linked calculator." },
        { name: "Trueshot Aura", detail: "MM dip (if raiding)", why: "Party-wide attack power aura — the hunter utility every melee group wants." },
      ],
    },
    {
      levels: "55–59",
      goal: "Enchant everything",
      steps: [
        { name: "Ranged weapon enchant", detail: "Scope", why: "Scopes on the bow/gun — the classic hunter enchanter purchase." },
        { name: "Armor enchants", detail: "Agility + stamina", why: "Agility is ranged attack power and crit — hunter's double stat." },
        { name: "Pet food stockpile", detail: "Discipline", why: "Arrive at 60 with stacks of pet food — your damage has a mouth." },
      ],
    },
    {
      levels: "60 / Raid-ready",
      goal: "Barrow Deeps (10) · Hyjal Summit (20) · Onyxia's Lair (40) — December 9",
      steps: [
        { name: "Final talents", detail: "31+ BM core", why: "Bestial Wrath core with Unleashed Fury; verify the beta-tuned raid split in the linked calculator." },
        { name: "Hit target", detail: "Unified system", why: "Forever merges ranged and spell hit — old hunter hit tables are dead; use the linked calculator." },
        { name: "Raid role", detail: "Sustained ranged DPS + utility", why: "Trueshot Aura, Misdirection-era threat play, and a pet that's 100% bonus damage — bring it all." },
      ],
      milestone: "Raids unlock December 9 — use launch→December to farm dungeons and bank pet consumables.",
    },
  ],
  endgame: [
    {
      phase: "Launch → raid prep · Nov 4 → Dec 9",
      goal: "Level, gear and stock the raid bench — pet included",
      steps: [
        { name: "Pet training", detail: "Max ranks", why: "Growl and the attack skills trained to max before December — the pet is 100% free raid damage only if it's actually trained." },
        { name: "Pet food stock", detail: "Bank stacks", why: "Feed Pet is a DPS cooldown — arrive at 60 with full stacks of pet food banked for raid nights, not bought at the last minute." },
        { name: "Dungeon circuit", detail: "Mail + ranged", why: "The nine new dungeons plus classics feed agility mail and the slow bow/gun chase — the ranged slot is the whole build." },
        { name: "Enchant bench", detail: "Scopes + agility", why: "Scopes on the ranged weapon (the classic engineer purchase), agility bracers and Minor Speed boots — applied before the first raid night." },
        { name: "Consumable bank", detail: "Pre-raid stockpile", why: "Elixirs of the Mongoose, agility scrolls and a camp buff that doesn't clash with a class buff." },
      ],
      milestone: "Raids unlock December 9 — the launch→December window is your mail, ranged-weapon and pet-food runway.",
    },
    {
      phase: "Raid tier · Dec 9 →",
      goal: "Barrow Deeps (10) → Hyjal Summit (20) → Onyxia's Lair (40)",
      steps: [
        { name: "Barrow Deeps", detail: "10-player", why: "The entry tier — a BM pair (you + pet) is two bodies of sustained DPS in a small roster; keep Growl off tanked targets." },
        { name: "Hyjal Summit", detail: "20-player", why: "The mid tier — pet uptime through add waves and Trueshot Aura for the melee group are your slot-earners." },
        { name: "Onyxia's Lair", detail: "40-player", why: "The classic 40 — deep rosters punish dead pets: Feign Death discipline, Mend Pet between phases, Bestial Wrath saved for the burn windows." },
        { name: "Raid-night kit", detail: "Per pull", why: "Elixirs, pet food every cooldown and a coordinated camp buff — in classic-style raids, consumables are a DPS stat (and your pet eats too)." },
      ],
    },
    {
      phase: "Min-maxing",
      goal: "Squeeze the classic levers Forever keeps alive",
      steps: [
        { name: "Ranged chase", detail: "Rhok'delar era", why: "The Ancient Petrified Leaf questline out of Molten Core ends in the legendary bow — the single biggest upgrade in the hunter's tree." },
        { name: "Devilsaur set", detail: "Crafted crit", why: "Gauntlets + leggings from Un'Goro hides hold two BiS crit slots — worth every hide while the leatherworkers supply." },
        { name: "Weapon skill top-ups", detail: "Weaker but real", why: "Forever cut weapon-skill per item, but boss-level glances still tax the melee stat-stick and wing-clip moments — keep it current." },
        { name: "Unified hit check", detail: "Per patch", why: "Forever merges ranged and spell hit — old hunter hit-cap tables are dead; verify current thresholds in the linked calculator." },
      ],
    },
  ],
  specGates: [{ gate: "16", label: "Forever capstone — new one-point ability (verify in beta calculator)" }, { gate: "21", label: "Intimidation — the pet stun" }, { gate: "31", label: "Bestial Wrath — the burn window" }],
  statPriority: [
    { label: "Agility", note: "Ranged attack power + crit — the hunter's double-duty stat." },
    { label: "Ranged Attack Power", note: "Scales every shot; mail tiers carry it." },
    { label: "Hit (unified)", note: "Forever merges ranged and spell hit — one stat, every benefit." },
    { label: "Crit", note: "Feeds you and the pet's Ferocity procs." },
    { label: "Stamina", note: "Feign Death exists, but dead hunters feed nobody." },
  ],
  gear: [
    {
      slot: "Head",
      target: "Mail with agility — T0/T1 dungeon-raid pipeline",
      affixes: ["Agility", "Stamina", "Hit"],
      item: {
        name: "Giantstalker's Helmet",
        quality: "epic",
        type: "Epic Mail Helm",
        armor: "384 Armor",
        stats: [
          { text: "+26 Agility" },
          { text: "+19 Stamina" },
          { text: "+1% Hit Chance" },
        ],
        source: "Molten Core · Giantstalker Battlegear",
        icon: "helm",
      },
    },
    {
      slot: "Neck",
      target: "Agility necklace",
      affixes: ["Agility", "Stamina"],
      item: {
        name: "Mark of Fordragon",
        quality: "epic",
        type: "Epic Necklace",
        stats: [
          { text: "+13 Stamina" },
          { text: "+10 Strength" },
          { text: "Melee-flavored — swap for an agility neck as drops allow", tone: "flavor" },
        ],
        source: "Quest reward · Onyxia attunement era",
        icon: "amulet",
      },
    },
    {
      slot: "Shoulders",
      target: "T1 mail shoulders",
      affixes: ["Agility", "Attack Power"],
      item: {
        name: "Giantstalker's Pauldrons",
        quality: "epic",
        type: "Epic Mail Shoulders",
        armor: "344 Armor",
        stats: [
          { text: "+21 Agility" },
          { text: "+13 Stamina" },
        ],
        source: "Molten Core · Giantstalker Battlegear",
        icon: "shoulders",
      },
    },
    {
      slot: "Back",
      target: "The raid-ticket cloak",
      affixes: ["Agility", "Stamina"],
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
      target: "T0-to-T1 mail chest pipeline",
      affixes: ["Agility", "Stamina", "Crit"],
      item: {
        name: "Giantstalker's Breastplate",
        quality: "epic",
        type: "Epic Mail Chest",
        armor: "460 Armor",
        stats: [
          { text: "+28 Agility" },
          { text: "+21 Stamina" },
        ],
        source: "Molten Core · Giantstalker Battlegear",
        icon: "chest",
      },
    },
    {
      slot: "Wrists",
      target: "Cheap agility mail — enchant immediately",
      affixes: ["Agility", "Stamina"],
      item: {
        name: "Giantstalker's Bracers",
        quality: "epic",
        type: "Epic Mail Bracers",
        armor: "166 Armor",
        stats: [
          { text: "+15 Agility" },
          { text: "+9 Stamina" },
        ],
        source: "Molten Core · Giantstalker Battlegear",
        icon: "wrist",
      },
    },
    {
      slot: "Hands",
      target: "Devilsaur gauntlets are the famous crit pick",
      affixes: ["Crit", "Agility"],
      item: {
        name: "Devilsaur Gauntlets",
        quality: "rare",
        type: "Rare Leather Gloves",
        armor: "110 Armor",
        stats: [
          { text: "+2% Critical Strike chance", tone: "power" },
          { text: "+9 Stamina" },
        ],
        flavor: "The world-drop leather crit king — hunters wear leather into raids and nobody blinks.",
        source: "Crafted · Un'Goro Devilsaur hides",
        icon: "hands",
      },
    },
    {
      slot: "Waist",
      target: "Any clean agility mail",
      affixes: ["Agility", "Stamina"],
      item: {
        name: "Beaststalker's Belt",
        quality: "rare",
        type: "Rare Mail Belt",
        armor: "184 Armor",
        stats: [
          { text: "+17 Agility" },
          { text: "+10 Stamina" },
        ],
        source: "Dungeon set · Blackrock Depths line",
        icon: "belt",
      },
    },
    {
      slot: "Legs",
      target: "Devilsaur leggings — the famous crit pants",
      affixes: ["Crit", "Agility"],
      item: {
        name: "Devilsaur Leggings",
        quality: "rare",
        type: "Rare Leather Legs",
        armor: "140 Armor",
        stats: [
          { text: "+2% Critical Strike chance", tone: "power" },
          { text: "+12 Stamina" },
        ],
        flavor: "Paired with the gauntlets: the two-piece crit machine that carries hunters to raids.",
        source: "Crafted · Un'Goro Devilsaur hides",
        icon: "legs",
      },
    },
    {
      slot: "Feet",
      target: "Minor Speed enchant — you're kiting forever",
      affixes: ["Agility", "Movement via enchant"],
      item: {
        name: "Beaststalker's Boots",
        quality: "rare",
        type: "Rare Mail Boots",
        armor: "218 Armor",
        stats: [
          { text: "+16 Agility" },
          { text: "+9 Stamina" },
        ],
        source: "Dungeon set · Scholomance/Stratholme line",
        icon: "feet",
      },
    },
    {
      slot: "Ring 1",
      target: "The hit ring from the attunement questline",
      affixes: ["Hit", "Agility"],
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
      target: "Agility + crit pairing",
      affixes: ["Agility", "Crit"],
      item: {
        name: "Myrmidon's Signet",
        quality: "rare",
        type: "Rare Ring",
        stats: [
          { text: "+10 Strength" },
          { text: "+7 Stamina" },
          { text: "Melee-flavored filler until an agility ring drops", tone: "flavor" },
        ],
        source: "Blackrock Depths",
        icon: "ring",
      },
    },
    {
      slot: "Trinket 1",
      target: "The extra-attack proc — hunters love it too",
      affixes: ["On-use / proc damage"],
      item: {
        name: "Hand of Justice",
        quality: "rare",
        type: "Rare Trinket",
        stats: [
          { text: "Equip: Chance to strike with an additional attack after a melee swing.", tone: "power" },
          { text: "Ranged swaps and melee weaving make this sing.", tone: "flavor" },
        ],
        source: "Blackrock Depths · Emperor Dagran Thaurissan",
        icon: "trinket",
      },
    },
    {
      slot: "Trinket 2",
      target: "Crit trinket from UBRS",
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
      target: "Stat-stick one-hander — your real weapon is on your back",
      affixes: ["Agility", "Stats"],
      item: {
        name: "Stat-stick One-Hander",
        quality: "rare",
        type: "Rare One-Handed Sword",
        stats: [
          { text: "+Agility and pure stat lines — melee damage is incidental" },
        ],
        flavor: "The famous hunter tradition: the melee slot exists for stats only.",
        source: "New-dungeon drops — verify itemization guide",
        icon: "sword",
      },
    },
    {
      slot: "Off-Hand",
      target: "Empty — hunters carry a stat-stick and a ranged weapon",
      affixes: [],
    },
    {
      slot: "Ranged",
      target: "Slow, heavy bow or gun — ranged attack speed + damage is your damage",
      affixes: ["Slow speed", "High max damage", "Scope enchant"],
      item: {
        name: "Rhok'delar, Longbow of the Ancient Keepers",
        quality: "legendary",
        type: "Legendary Bow",
        stats: [
          { text: "Slow, massive damage range — the aspirational hunter weapon" },
          { text: "+Attack Power and stat lines from its quest reward stats" },
        ],
        flavor: "The Molten Core legendary — earned through the Ancient Petrified Leaf questline, carried forever.",
        source: "Molten Core · questline reward",
        icon: "bow",
      },
    },
  ],
  rotation: [
    {
      phase: "Pull",
      steps: [
        "Send the pet first — Growl holds threat while you set up.",
        "Serpent Sting as the opener; let it tick.",
        "Concussive Shot runners before they reach the next camp.",
      ],
    },
    {
      phase: "Standard rotation",
      steps: [
        "Auto-attack rhythm with Aspect of the Hawk up; weave Aimed Shot when it's trained.",
        "Multi-Shot when two or more targets are up.",
        "Raptor Strike only if something reaches melee — then Wing Clip and step back.",
      ],
    },
    {
      phase: "Burst / Elites",
      steps: [
        "Intimidation the elite or the dangerous caster.",
        "Bestial Wrath + Rapid Fire stacking for the burn window.",
        "Feign Death if the table turns — reset, mend, re-engage.",
      ],
    },
  ],
  watchOuts: [
    "Aspect of the Cheetah dazes you on hit — kill it before combat or eat stunlocks.",
    "Feed the pet: a hungry pet deals meaningfully less and growls less — food is a DPS stat.",
    "Forever's unified hit/crit means old hunter hit-cap tables are wrong — use the linked calculator.",
    "Threat is classic-style: Feign Death is your reset button, not a license to pull off the tank.",
    "Camp buffs don't stack with matching class buffs — coordinate camp food with the raid's hunter food.",
    "No flying mounts — plan pet-unfriendly paths (gank-heavy routes, elite camps) around the new zones.",
    "Raids unlock December 9 — the nine new dungeons are your mail pipeline until then.",
  ],
  extras: [
    {
      label: "Core Enchants",
      items: [
        { name: "Weapon scopes", note: "The classic ranged enchant — buy from engineers." },
        { name: "Enchant Boots — Minor Speed", note: "Kiting is life." },
        { name: "Enchant Bracers — Greater Agility? verify rank", note: "Agility = attack power + crit." },
        { name: "Legs/Gloves — armor kits", note: "Flat armor between upgrades." },
      ],
    },
    {
      label: "Consumables",
      items: [
        { name: "Elixir of the Mongoose", note: "Crit + agility for the whole kit." },
        { name: "Elixir of Giants", note: "Strength scales melee/attack power lines." },
        { name: "Pet food stacks", note: "Feed Pet is a DPS cooldown; never run dry." },
        { name: "Scrolls of Agility", note: "Cheap leveling buffs." },
      ],
    },
    {
      label: "Leveling Quick Reference",
      items: [
        { name: "Level 20", note: "Aspect of the Cheetah — travel unlocked." },
        { name: "Level ~25", note: "16-point Forever capstone (verify in beta calculator)." },
        { name: "Level ~30", note: "Intimidation — pet stun on demand." },
        { name: "Level ~40", note: "Bestial Wrath + mail armor." },
        { name: "Level 60", note: "Rhok'delar questline, scopes, pet food banked — raids Dec 9." },
      ],
    },
  ],
};
