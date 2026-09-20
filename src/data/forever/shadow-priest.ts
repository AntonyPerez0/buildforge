import type { Build } from "@/data/types";

export const shadowPriest: Build = {
  id: "forever-shadow-priest",
  game: "forever",
  slug: "shadow-priest",
  name: "Shadow Priest",
  className: "Priest",
  role: "Shadow DPS caster with unkillable sustain",
  tier: "A",
  difficulty: 2,
  tagline: "Shadow Word: Pain, Mind Flay, and mana that refills itself on every kill.",
  summary:
    "Shadow Priest turns leveling into a closed loop: DoTs on everything, Mind Flay to finish, Spirit Tap to refill. You almost never stop to drink, and in raids your Vampiric Embrace heals the party while you deal damage. Forever's unified hit/crit system means spell gearing just got simpler — one hit stat, every spell benefits.",
  patchLabel: "Forever Beta · Sep 2026",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [
    { site: "ClassicWoW.gg", url: "https://classicwow.gg/forever/guides/priest/shadow", label: "ClassicWoW.gg Shadow guide" },
    { site: "Wowhead", url: "https://www.wowhead.com/forever", label: "Wowhead Forever hub" },
    { site: "Blizzard", url: "https://worldofwarcraft.blizzard.com/en-us/news/24302093/carve-a-new-path-with-world-of-warcraft-forever", label: "Official Forever announcement" },
  ],
  meta: {
    "Best races": "Dwarf (Fear Ward) · Undead (WoTF) · Gnome Priest (new in Forever)",
    "Key mechanic": "Spirit Tap — kills restore mana mid-fight",
    "Weapons": "Two-handed staff until raid tier, then staff or dagger/off-hand",
    "Playstyle": "DoT, drain, wand — never stop to drink",
    "Professions": "Tailoring + Enchanting",
    "Raid note": "Vampiric Embrace converts your damage into party healing",
  },
  skillPriority: [
    "Spirit Tap (the engine — take it first)",
    "Shadow Word: Pain + Mind Blast ranks",
    "Shadow Weaving + Darkness (deep shadow scaling)",
    "Shadowform at 31 points (the spec's identity)",
  ],
  progression: [
    {
      levels: "1–9",
      goal: "Discipline of the wand: DoT, nuke, wand between regens",
      steps: [
        { name: "Lesser Heal / Heal", detail: "As trained", why: "Self-sustain — priest leveling is about never dying, and Spirit Tap will make downtime vanish soon." },
        { name: "Shadow Word: Pain", detail: "As trained", why: "Your first DoT — cast it on cooldown on everything." },
        { name: "Mind Blast", detail: "As trained", why: "Shadow burst on cooldown; keep ranks current at the trainer." },
        { name: "Power Word: Fortitude", detail: "As trained", why: "Baseline stamina buff for the entire zone — Forever removed talented buff costs, so cast it on everyone." },
      ],
    },
    {
      levels: "10–14",
      goal: "First talent points: go straight for Spirit Tap",
      steps: [
        { name: "Spirit Tap", detail: "Ranks 1–5", why: "15% chance on kill to double your spirit regen for 15s — the reason Shadow Priest levels without drinking. First five points, no debate." },
        { name: "Wand", detail: "Get one", why: "Wand weaving between Mind Flay ticks is the spec's mana rhythm; Forever's reworked dungeon drops feed casters early wands." },
      ],
      milestone: "Level 10: talent points begin — one per level, 51 total at 60.",
    },
    {
      levels: "15–19",
      goal: "Shadow damage stacking",
      steps: [
        { name: "Shadow Weaving", detail: "Ranks 1–5", why: "Shadow damage debuff stacking on targets — feeds every later shadow button." },
        { name: "Improved Shadow Word: Pain", detail: "Ranks 1–2", why: "Longer DoT duration — fewer recasts, more wand time." },
        { name: "Mind Flay", detail: "Trainer", why: "The channel that defines the spec — slows targets and drains health bars." },
      ],
    },
    {
      levels: "20–24",
      goal: "Burst and control",
      steps: [
        { name: "Mind Blast ranks", detail: "As trained", why: "Keep the nuke current — it's your finisher between Flays." },
        { name: "Shadow Focus", detail: "Ranks 1–3 (if available)", why: "Hit for shadow spells — with Forever's unified hit system this serves everything." },
        { name: "Psychic Scream", detail: "Trainer", why: "Fear on demand — your panic button and dungeon crowd control." },
      ],
    },
    {
      levels: "25–29",
      goal: "16-point capstone milestone",
      steps: [
        { name: "Improved Psychic Scream / Blackout", detail: "Filler ranks", why: "Bank utility while pushing toward 16 points — check the beta calculator for tuned picks." },
        { name: "16-point capstone", detail: "Reserved", why: "Forever adds a new one-point ability at 16 points into a tree — check its effect in the beta talent calculator." },
      ],
      milestone: "Level ~25: your 16th Shadow point unlocks Forever's new capstone ability.",
    },
    {
      levels: "30–34",
      goal: "Vampiric Embrace and deeper shadow",
      steps: [
        { name: "Vampiric Embrace", detail: "1 point", why: "A share of your shadow damage heals the party — the raid-value talent that keeps Shadow in every roster." },
        { name: "Improved Vampiric Embrace", detail: "Ranks 1–2 (if available)", why: "Scales the healing conversion." },
        { name: "Darkness", detail: "Ranks 1–5 (start)", why: "Flat shadow damage percent — the deep-tree scaling line." },
      ],
    },
    {
      levels: "35–39",
      goal: "Reach for Shadowform",
      steps: [
        { name: "Darkness", detail: "Complete ranks", why: "Finish the flat multiplier before the capstone talent." },
        { name: "Shadow Reach", detail: "Ranks 1–2 (if available)", why: "Longer range = more Mind Flay uptime while kiting." },
        { name: "Wand upgrade", detail: "Priority", why: "Forever's reworked dungeons (Hall of Thanes, Drowned City…) drop caster upgrades — keep the wand current." },
      ],
    },
    {
      levels: "40–44",
      goal: "SHADOWFORM. The spec transforms.",
      steps: [
        { name: "Shadowform", detail: "31-point talent", why: "15% shadow damage bonus and reduced pushback for 15% less physical armor — the visual and mechanical identity of the build. Once you're in, you never leave." },
        { name: "Mental Strength", detail: "Ranks 1–5 (start)", why: "Flat max mana — feeds longer channels and Mind Blast spam." },
      ],
      milestone: "Level ~40: Shadowform online. Your damage graph jumps and so does your presence in dungeons.",
    },
    {
      levels: "45–49",
      goal: "Top out and tune",
      steps: [
        { name: "Mental Strength", detail: "Complete ranks", why: "Mana pool = channel uptime = damage." },
        { name: "Silence", detail: "If available", why: "Shadow talent interrupt — real dungeon utility; verify its tier in the beta calculator." },
        { name: "Dungeon circuit", detail: "New + classic dungeons", why: "The nine new dungeons plus classic staples are the gear pipeline — cloth spell-damage pieces everywhere." },
      ],
    },
    {
      levels: "50–54",
      goal: "Raid-shaping picks",
      steps: [
        { name: "Shadow Power / crit line", detail: "Deep ranks", why: "Crit scaling for Mind Blast — check the beta calculator for the tuned raid split." },
        { name: "Inner Fire ranks", detail: "As trained", why: "In Shadowform you take more physical damage — keep Inner Fire armor up at all times." },
      ],
    },
    {
      levels: "55–59",
      goal: "Enchant the kit",
      steps: [
        { name: "Weapon enchant", detail: "Spell power", why: "Classic-style weapon oil/spell enchant — verify current ranks in the linked guide." },
        { name: "Armor enchants", detail: "Stamina + mana regen", why: "Uptime is everything; dead priests deal zero shadow damage." },
        { name: "Consumables bench", detail: "Elixirs + oils", why: "Shadow power elixirs + mana potions for the dungeon circuit." },
      ],
    },
    {
      levels: "60 / Raid-ready",
      goal: "Barrow Deeps (10) · Hyjal Summit (20) · Onyxia's Lair (40) — December 9",
      steps: [
        { name: "Final talents", detail: "31+ Shadowform core", why: "Shadowform + Darkness + Vampiric Embrace; verify the beta-tuned raid split in the linked calculator." },
        { name: "Hit target", detail: "Unified system", why: "Forever merges spell and melee hit — check current thresholds in the linked guide, not classic tables." },
        { name: "Raid role", detail: "Damage + healing conversion", why: "Vampiric Embrace is real raid healing; Shadow Priests slot into any roster forever." },
      ],
      milestone: "Raids unlock December 9 — the launch window is your dungeon-gearing runway.",
    },
  ],
  endgame: [
    {
      phase: "Launch → raid prep · Nov 4 → Dec 9",
      goal: "Level, gear and stock the raid bench",
      steps: [
        { name: "Wand farming", detail: "Priority one", why: "Wand weaving is the spec's mana rhythm — farm the reworked dungeons until the ranged slot is current before anything else." },
        { name: "Dungeon circuit", detail: "Shadow cloth", why: "The nine new dungeons plus classics carry spell-damage cloth — run your band, then the 60s for the full kit." },
        { name: "Enchant bench", detail: "Spell power + Minor Speed", why: "Caster oil on the staff, Minor Speed boots, intellect bracers — verify current enchant ranks in the linked guide before applying." },
        { name: "Consumable bank", detail: "Pre-raid stockpile", why: "Shadow-damage elixirs, mana potions for burn phases and a camp buff that doesn't clash with a class buff — Spirit Tap handles the rest." },
      ],
      milestone: "Raids unlock December 9 — the launch→December window is your wand-and-cloth gearing runway.",
    },
    {
      phase: "Raid tier · Dec 9 →",
      goal: "Barrow Deeps (10) → Hyjal Summit (20) → Onyxia's Lair (40)",
      steps: [
        { name: "Barrow Deeps", detail: "10-player", why: "The entry tier — Vampiric Embrace healing covers a small roster's margins; DoT everything, Flay the priority." },
        { name: "Hyjal Summit", detail: "20-player", why: "The mid tier — multi-target SW:P uptime plus VE conversion is a second healer's worth of output on add waves." },
        { name: "Onyxia's Lair", detail: "40-player", why: "The classic 40 — Shadow Weaving stacks deepen every shadow dealer's damage; mind your position, Shadowform traded armor away." },
        { name: "Raid-night kit", detail: "Per pull", why: "Elixirs, oils, mana potions and a coordinated camp buff — in classic-style raids, consumables are a DPS stat." },
      ],
    },
    {
      phase: "Min-maxing",
      goal: "Squeeze the caster levers Forever keeps alive",
      steps: [
        { name: "Staff chase", detail: "Raid-era", why: "Staff of Dominance carries Shadow into raids; the late swap to a dagger + off-hand is a raid-drop decision — compare options with the linked guides." },
        { name: "Wand final form", detail: "Keep current", why: "Your mana engine has a slot of its own — raid wands from the linked guides are worth more than most sidegrades." },
        { name: "Healer-gear sweep", detail: "Forever bonus", why: "Healer gear now grants spell damage — cloth marked 'healing' is real Shadow throughput; don't vendor it." },
        { name: "Unified hit check", detail: "Per patch", why: "Forever merges spell and melee hit — verify current thresholds in the linked calculator instead of classic spell-hit tables." },
      ],
    },
  ],
  specGates: [{ gate: "16", label: "Forever capstone — new one-point ability (verify in beta calculator)" }, { gate: "31", label: "Shadowform — the spec identity" }],
  statPriority: [
    { label: "Shadow Spell Damage", note: "Scales SW:P ticks, Mind Blast and Mind Flay alike." },
    { label: "Hit (unified)", note: "Forever merges spell and melee hit — one stat now serves everything." },
    { label: "Intellect", note: "Mana pool for channels; also feeds crit with Holy specialization off-talents." },
    { label: "Spirit", note: "Spirit Tap multiplies spirit regen — the stat that never lets you stop." },
    { label: "Stamina", note: "Shadowform trades armor; padding keeps the loop alive." },
  ],
  gear: [
    {
      slot: "Head",
      target: "Cloth with shadow/spell damage + intellect",
      affixes: ["Spell Damage", "Intellect", "Spirit"],
      item: {
        name: "Circlet of the Empty Mind",
        quality: "epic",
        type: "Epic Cloth Helm",
        armor: "62 Armor",
        stats: [
          { text: "+33 Shadow Spell Damage" },
          { text: "+18 Intellect" },
          { text: "+12 Spirit" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "helm",
      },
    },
    {
      slot: "Neck",
      target: "Caster necklace with stamina",
      affixes: ["Spell Damage", "Intellect"],
      item: {
        name: "Pendant of Whispering Shadows",
        quality: "epic",
        type: "Epic Necklace",
        stats: [
          { text: "+22 Spell Damage" },
          { text: "+11 Intellect" },
          { text: "+9 Stamina" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "amulet",
      },
    },
    {
      slot: "Shoulders",
      target: "Reworked dungeon caster drops",
      affixes: ["Spell Damage", "Intellect"],
      item: {
        name: "Mantle of Grieving Dusk",
        quality: "epic",
        type: "Epic Cloth Shoulders",
        armor: "57 Armor",
        stats: [
          { text: "+19 Shadow Spell Damage" },
          { text: "+14 Intellect" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "shoulders",
      },
    },
    {
      slot: "Back",
      target: "Cloak with spell damage or stamina",
      affixes: ["Spell Damage", "Stamina"],
      item: {
        name: "Shroud of the Last Rite",
        quality: "rare",
        type: "Rare Cloak",
        armor: "38 Armor",
        stats: [
          { text: "+11 Spell Damage" },
          { text: "+8 Stamina" },
        ],
        source: "Dungeon drops",
        icon: "offhand",
      },
    },
    {
      slot: "Chest",
      target: "Robe with flat spell power",
      affixes: ["Spell Damage", "Intellect", "Spirit"],
      item: {
        name: "Robe of the Unspoken Litany",
        quality: "epic",
        type: "Epic Cloth Robe",
        armor: "83 Armor",
        stats: [
          { text: "+31 Spell Damage" },
          { text: "+20 Intellect" },
          { text: "+14 Spirit" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "chest",
      },
    },
    {
      slot: "Wrists",
      target: "Spell damage bracers — enchant on arrival",
      affixes: ["Spell Damage", "Intellect"],
      item: {
        name: "Bindings of Quiet Prayer",
        quality: "rare",
        type: "Rare Cloth Bracers",
        armor: "36 Armor",
        stats: [
          { text: "+12 Spell Damage" },
          { text: "+7 Intellect" },
        ],
        source: "Dungeon drops",
        icon: "wrist",
      },
    },
    {
      slot: "Hands",
      target: "Spell damage or spell-crit gloves",
      affixes: ["Spell Damage", "Crit"],
      item: {
        name: "Handwraps of Recurring Night",
        quality: "epic",
        type: "Epic Cloth Gloves",
        armor: "45 Armor",
        stats: [
          { text: "+20 Shadow Spell Damage" },
          { text: "+13 Intellect" },
          { text: "+1% Spell Critical Strike" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "hands",
      },
    },
    {
      slot: "Waist",
      target: "Any caster cloth without a downside",
      affixes: ["Spell Damage", "Intellect"],
      item: {
        name: "Sash of Recited Sorrow",
        quality: "rare",
        type: "Rare Cloth Belt",
        armor: "41 Armor",
        stats: [
          { text: "+15 Spell Damage" },
          { text: "+10 Intellect" },
        ],
        source: "Dungeon drops",
        icon: "belt",
      },
    },
    {
      slot: "Legs",
      target: "Caster pants + armor kit",
      affixes: ["Spell Damage", "Intellect", "Spirit"],
      item: {
        name: "Legwraps of Hollow Vigil",
        quality: "epic",
        type: "Epic Cloth Pants",
        armor: "70 Armor",
        stats: [
          { text: "+29 Spell Damage" },
          { text: "+17 Intellect" },
          { text: "+12 Spirit" },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "legs",
      },
    },
    {
      slot: "Feet",
      target: "Minor Speed enchant is non-negotiable",
      affixes: ["Intellect", "Movement via enchant"],
      item: {
        name: "Treads of Silent Passage",
        quality: "rare",
        type: "Rare Cloth Boots",
        armor: "47 Armor",
        stats: [
          { text: "+13 Spell Damage" },
          { text: "+9 Stamina" },
        ],
        source: "Dungeon drops",
        icon: "feet",
      },
    },
    {
      slot: "Ring 1",
      target: "Spell damage + intellect",
      affixes: ["Spell Damage", "Intellect", "Hit"],
      item: {
        name: "Band of the Dusk Scholar",
        quality: "epic",
        type: "Epic Ring",
        stats: [
          { text: "+14 Spell Damage" },
          { text: "+1% Hit Chance" },
        ],
        source: "Onyxia attunement questline",
        icon: "ring",
      },
    },
    {
      slot: "Ring 2",
      target: "Caster ring with stamina",
      affixes: ["Spell Damage", "Intellect"],
      item: {
        name: "Loop of Gathered Prayers",
        quality: "rare",
        type: "Rare Ring",
        stats: [
          { text: "+11 Spell Damage" },
          { text: "+8 Intellect" },
        ],
        source: "Dungeon drops",
        icon: "ring",
      },
    },
    {
      slot: "Trinket 1",
      target: "Uptime trinket — sustain feeds Spirit Tap",
      affixes: ["Mana regen", "On-use effects"],
      item: {
        name: "Hand of Justice",
        quality: "rare",
        type: "Rare Trinket",
        stats: [
          { text: "Equip: Chance to strike with an additional attack after a melee swing.", tone: "power" },
          { text: "Wand-weaving synergy — extra swings trigger while you regen.", tone: "flavor" },
        ],
        source: "Blackrock Depths · Emperor Dagran Thaurissan",
        icon: "trinket",
      },
    },
    {
      slot: "Trinket 2",
      target: "Crit or flat-damage trinket",
      affixes: ["Crit", "Spell Damage"],
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
      target: "Two-handed staff with shadow damage",
      affixes: ["Spell Damage", "Intellect"],
      item: {
        name: "Staff of Dominance",
        quality: "epic",
        type: "Epic Two-Handed Staff",
        stats: [
          { text: "+56 Spell Damage" },
          { text: "+20 Intellect" },
          { text: "+15 Spirit" },
        ],
        flavor: "The Molten Core caster staff — carries Shadow Priests straight into raids.",
        source: "Molten Core",
        icon: "staff",
      },
    },
    {
      slot: "Off-Hand",
      target: "Empty while the staff is two-handed — dagger + off-hand is the late swap",
      affixes: [],
    },
    {
      slot: "Ranged",
      target: "Wand — the spec's mana rhythm lives and dies on it",
      affixes: ["Damage", "Spell Damage"],
      item: {
        name: "Runed Wand of the Vigil",
        quality: "rare",
        type: "Rare Wand",
        stats: [
          { text: "Wand weaving between Mind Flay channels is the mana engine." },
        ],
        source: "New-dungeon drops — verify itemization guide",
        icon: "wand",
      },
    },
  ],
  rotation: [
    {
      phase: "Pull",
      steps: [
        "Power Word: Fortitude on the group, always refreshed.",
        "Open with Shadow Word: Pain so it ticks while you cast.",
        "Psychic Scream if the pack overshoots the tank.",
      ],
    },
    {
      phase: "Standard rotation",
      steps: [
        "Mind Blast on cooldown — your shadow burst.",
        "Mind Flay to finish the gap; it slows too.",
        "Wand between regen windows — Spirit Tap converts kills into mana.",
      ],
    },
    {
      phase: "Burst / Multi-target",
      steps: [
        "SW:P every target, then channel Mind Flay the marked kill.",
        "Vampiric Embrace before big pulls — your damage becomes party healing.",
        "Inner Fire always up: Shadowform traded armor for damage; buy it back.",
      ],
    },
  ],
  watchOuts: [
    "Don't skip Spirit Tap — the entire no-downtime fantasy collapses without it.",
    "Shadowform reduces your armor: Inner Fire uptime and stamina stop you from being one-shot by pack aggros.",
    "Forever's unified hit/crit means old spell-hit tables are wrong — use the linked calculator.",
    "Healer gear now grants spell damage — don't vendor a caster piece because it says 'healing'.",
    "Camp buffs don't stack with matching class buffs — coordinate camp food with the raid's priest food.",
    "Wand weaving is the mana rhythm — a fresh wand is worth more than a sidegrade trinket while leveling.",
    "Raids unlock December 9 — the nine new dungeons are your gearing plan until then.",
  ],
  extras: [
    {
      label: "Core Enchants",
      items: [
        { name: "Weapon spell-power enchant/oil", note: "Classic-style caster oils — verify current ranks in the guide." },
        { name: "Enchant Boots — Minor Speed", note: "Kiting room between Mind Flay channels." },
        { name: "Enchant Bracers — Intellect", note: "Mana pool for long packs." },
        { name: "Chest — mana-regen style enchants", note: "Spirit Tap amplifies everything regen-related." },
      ],
    },
    {
      label: "Consumables",
      items: [
        { name: "Shadow Power Elixir style elixirs", note: "Shadow damage scaling — verify current ranks." },
        { name: "Wizard Oil", note: "Flat spell power before bosses." },
        { name: "Major Mana Potions", note: "Burn during raid pulls; Spirit Tap handles the rest." },
        { name: "Conjured food/water", note: "Ask a mage — you'll rarely need it, that's the point." },
      ],
    },
    {
      label: "Leveling Quick Reference",
      items: [
        { name: "Level 10–14", note: "Spirit Tap 5/5 — the no-downtime engine." },
        { name: "Level ~25", note: "16-point Forever capstone (verify in beta calculator)." },
        { name: "Level 30+", note: "Vampiric Embrace — party-wide healing conversion." },
        { name: "Level ~40", note: "Shadowform — the spec's identity." },
        { name: "Level 60", note: "Enchant, stock consumables, raids Dec 9." },
      ],
    },
  ],
};
