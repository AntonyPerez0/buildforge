import type { Build } from "@/data/types";

/**
 * Twisting Blades Rogue — the evergreen melee-skiller archetype.
 * Authored in-house, anchored to patch-stable mechanics; every page
 * links to Maxroll/Icy Veins for live seasonal tuning.
 */
export const twistingBladesRogue: Build = {
  id: "d4-twisting-blades-rogue",
  game: "d4",
  slug: "twisting-blades-rogue",
  name: "Twisting Blades Rogue",
  className: "Rogue",
  role: "Melee AoE skirmisher",
  tier: "A",
  difficulty: 3,
  tagline: "Dash in, stick the blades, dash out — the blades finish the job.",
  summary:
    "The classic blade skirmisher. Puncture opens wounds, Twisting Blades detonates packs, and the Bladedancer Aspect sends the blades spinning back through everything on their way out. Poison Imbuement drips over the whole screen while Shadow Step and Dash keep you untouchable. High skill ceiling, high payoff — the most fun you can have playing fast.",
  patchLabel: "Season 15 · Patch 3.2",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [
    {
      site: "Maxroll",
      url: "https://maxroll.gg/d4/build-guides",
      label: "Maxroll Rogue build guides",
    },
    {
      site: "Icy Veins",
      url: "https://www.icy-veins.com/d4/rogue/builds/",
      label: "Icy Veins Rogue builds",
    },
  ],
  meta: {
    "Core loop": "Puncture → Twisting Blades → blades return and orbit",
    "Mobility": "Shadow Step in, Dash out, never stand still",
    "Key mechanic": "Bladedancer Aspect — returning blades tear through packs",
    "Resource": "Inner Sight windows = unlimited Energy",
    "Best for": "Nightmare dungeons → Helltides → Pit pushing",
  },
  skillPriority: [
    "Twisting Blades (your entire damage)",
    "Shadow Step + Dash (mobility is survival)",
    "Poison Imbuement (the damage multiplier)",
    "Death Trap (burst window)",
  ],
  progression: [
    {
      levels: "1–2",
      goal: "Open wounds with a Basic skill while you level",
      steps: [
        { name: "Puncture", detail: "Rank 1", why: "The wound-opener — its upgrade path applies Vulnerable, which every damage number in this build stacks on." },
        { name: "Enhanced Puncture", detail: "1 pt", why: "Vulnerable comes online — your damage multiplier from level 2 onward." },
      ],
    },
    {
      levels: "3–5",
      goal: "Take Twisting Blades the moment the Core slot unlocks and never look back",
      steps: [
        { name: "Twisting Blades", detail: "Rank 1", why: "The whole build. Sticks into the first enemy and twists — the return trip is where AoE lives." },
        { name: "Enhanced Twisting Blades", detail: "1 pt", why: "Energy refund per hit — your resource engine comes online." },
        { name: "Shadow Step", detail: "Rank 1 (Agility unlocks at 5)", why: "Instant teleport-behind for escapes and repositioning — the reason this build feels untouchable." },
      ],
      milestone: "Level 3: Core skill slot unlocks — Twisting Blades becomes your only real attack for the rest of the game.",
    },
    {
      levels: "6–10",
      goal: "Maximize blade ranks and grab your second mobility button",
      steps: [
        { name: "Twisting Blades", detail: "Ranks 2–3", why: "Raw damage per level; keep it as high as your points allow." },
        { name: "Poison Trap", detail: "Rank 1 (fourth slot unlocks at 8)", why: "Free poison coverage for the pack you're about to blade through — your first taste of the imbuement layer." },
        { name: "Dash", detail: "Rank 1", why: "Second mobility button — Shadow Step for escapes, Dash for closing distance and weaving through packs." },
      ],
    },
    {
      levels: "11–15",
      goal: "Specialization + the poison engine",
      steps: [
        { name: "Poison Imbuement", detail: "Rank 1", why: "Coats your blades in poison damage — the single biggest multiplier this build has. Reapply constantly." },
        { name: "Combo Points", detail: "Specialization (unlocks at 15)", why: "Puncture stacks points, Twisting Blades spends them for bonus damage — free damage for free habits." },
        { name: "Twisting Blades", detail: "Ranks 4–5", why: "Finish maxing your Core skill before the aspect layer takes over." },
      ],
      milestone: "Level 15: Specialization unlocks — take Combo Points now; swap to Inner Sight in endgame if Energy ever feels tight.",
    },
    {
      levels: "16–25",
      goal: "Poison uptime + stealth setup",
      steps: [
        { name: "Poison Imbuement", detail: "Enhanced + ranks", why: "Longer windows and spreading poison on kills — the imbuement starts clearing packs on its own." },
        { name: "Concealment", detail: "Rank 1", why: "Stealth for disengages and clean setups — walking out of a bad pull is the difference between alive and dead." },
        { name: "Energy passives", detail: "Ranks 1–3 each", why: "Regen and cost reduction over small damage passives — an empty Energy bar is the only way this build stalls." },
      ],
    },
    {
      levels: "26–35",
      goal: "Key passive + ultimate come online",
      steps: [
        { name: "Inner Sight", detail: "Key passive", why: "Filling the meter grants an unlimited-Energy window — pop Twisting Blades without thinking about cost. Swap off Combo Points here." },
        { name: "Death Trap", detail: "Rank 1 (Ultimate unlocks at 12+, take it here)", why: "Pulls a cluster together and detonates — the burst window that opens every elite pack." },
        { name: "Enhanced Death Trap", detail: "1 pt", why: "The trap's payoff rank — tighter cooldown and nastier pull before you invest anything else." },
      ],
      milestone: "Level 30+: World Tier 3 (Nightmare) — re-gear into Legendary items with the aspects below.",
    },
    {
      levels: "36–45",
      goal: "Bladedancer comes online — the build's signature moment",
      steps: [
        { name: "Bladedancer Aspect", detail: "Put on armor", why: "Twisting Blades returns to you and orbits, dealing damage the whole trip — this is what turns a single-target core into a screen clear. Build-defining." },
        { name: "Aspect of Volatile Shadows", detail: "Utility slot", why: "Your trap skills detonate for extra AoE — verify its exact effect in the live guides before building around it." },
        { name: "Aspect of the Expectant", detail: "Ring or weapon", why: "Basic skills power up your next Core cast — Puncture feeding Twisting Blades, exactly how you already play." },
      ],
    },
    {
      levels: "46–50",
      goal: "Enter the endgame engine",
      steps: [
        { name: "Imbuement-efficiency aspect", detail: "One slot", why: "Anything that stretches Poison Imbuement charges or windows keeps your multiplier active between packs." },
        { name: "Paragon Boards", detail: "Start at 50", why: "Open the first board and path toward Dexterity + crit nodes; respec freely until 60 — it's cheap." },
      ],
      milestone: "Level 50: Paragon Board + World Tier 4 (Torment) after a gear refresh.",
    },
    {
      levels: "51–70",
      goal: "Glyphs, torment farming, build finalization",
      steps: [
        { name: "Chip Glyph", detail: "Socket first", why: "Multiplies your Vulnerable-damage nodes — Puncture keeps it active on everything." },
        { name: "Efficacy Glyph", detail: "Socket second", why: "Multiplies the poison nodes on your board — the imbuement's damage pays double." },
        { name: "Board's matching glyph", detail: "Third socket", why: "Pick the crit or Energy glyph your actual board centers on — glyph value depends on the nodes you path through, so read the board before socketing." },
        { name: "Torment dungeons", detail: "Farm loop", why: "Helltides + Nightmare dungeons + Lair bosses for Ancestral gear and glyph leveling." },
      ],
    },
    {
      levels: "70+",
      goal: "Push the Pit and refine",
      steps: [
        { name: "Grasp of Shadow", detail: "Unique gloves", why: "The Twisting Blades endgame prize — shadow clones echo your blades through packs. Verify current tuning on the linked guides before building around it." },
        { name: "Masterworking + Tempering", detail: "Craft layer", why: "Temper Twisting Blades ranks and imbuement affixes, then masterwork crit and Energy stats first." },
        { name: "Check live tuning", detail: "Every season", why: "Aspect values and glyph thresholds shift by patch — verify final numbers on Maxroll or Icy Veins." },
      ],
    },
  ],
  statPriority: [
    { label: "Dexterity", note: "Scales all your damage — the default pick everywhere." },
    { label: "Critical Strike Chance", note: "Puncture's Vulnerable and Inner Sight both reward crit frequency." },
    { label: "Critical Strike Damage", note: "Where the big numbers live once crit chance is honest." },
    { label: "Maximum Energy / Energy Cost Reduction", note: "An empty bar is the only stall this build has." },
    { label: "Attack Speed", note: "Snappier blades, faster Combo Point stacks — until Energy can't feed it." },
    { label: "Damage to Close Enemies", note: "You're always in melee — free damage on every hit." },
    { label: "Damage Reduction / Max Life", note: "Melee build — never skip the defensive layer." },
  ],
  gear: [
    {
      slot: "Helm",
      target: "Cooldown Reduction + imbuement ranks",
      affixes: ["Cooldown Reduction", "Total Armor", "Max Life", "Ranks to Poison Imbuement"],
      item: {
        name: "Hood of the Venom Coil",
        quality: "legendary",
        type: "Ancestral Legendary Helm",
        itemPower: "925 Item Power",
        armor: "616 Armor",
        stats: [
          { text: "+7.0% Cooldown Reduction" },
          { text: "+486 Total Armor" },
          { text: "+840 Maximum Life" },
          { text: "+2 Ranks to Poison Imbuement (tempered)", tone: "power" },
        ],
        source: "Helltides & Lair boss drops",
        icon: "helm",
      },
    },
    {
      slot: "Chest",
      target: "Tanky stat stick",
      affixes: ["Total Armor", "Damage Reduction", "Max Life", "Ranks to Concealment"],
      item: {
        name: "Bulwark of the Vanishing Step",
        quality: "legendary",
        type: "Ancestral Legendary Chest Armor",
        itemPower: "925 Item Power",
        armor: "1,410 Armor",
        stats: [
          { text: "+588 Total Armor" },
          { text: "+13.0% Damage Reduction" },
          { text: "+1,090 Maximum Life" },
          { text: "+2 Ranks to Concealment (tempered)", tone: "power" },
        ],
        source: "Nightmare dungeons",
        icon: "chest",
      },
    },
    {
      slot: "Gloves",
      target: "Attack-speed and crit tuning — Grasp of Shadow (unique gloves) is the Lair-boss lottery prize; re-check live guides before committing",
      affixes: ["Attack Speed", "Critical Strike Chance", "Lucky Hit Chance", "Ranks to Twisting Blades"],
      item: {
        name: "Grips of the Twisting Edge",
        quality: "legendary",
        type: "Ancestral Legendary Gloves",
        itemPower: "925 Item Power",
        armor: "446 Armor",
        stats: [
          { text: "+13.5% Attack Speed" },
          { text: "+9.0% Critical Strike Chance" },
          { text: "+21.0% Lucky Hit Chance" },
          { text: "+3 Ranks to Twisting Blades (tempered)", tone: "power" },
        ],
        source: "Nightmare dungeons",
        icon: "hands",
      },
    },
    {
      slot: "Pants",
      target: "Pure defense",
      affixes: ["Total Armor", "Damage Reduction", "Max Life"],
      item: {
        name: "Nightstrider Legguards",
        quality: "legendary",
        type: "Ancestral Legendary Pants",
        itemPower: "925 Item Power",
        armor: "878 Armor",
        stats: [
          { text: "+574 Total Armor" },
          { text: "+12.0% Damage Reduction" },
          { text: "+1,020 Maximum Life" },
        ],
        source: "Nightmare dungeons",
        icon: "legs",
      },
    },
    {
      slot: "Boots",
      target: "Movement + Energy control",
      affixes: ["Movement Speed", "Attack Speed", "Damage Reduction"],
      item: {
        name: "Striders of the Shadow Sprint",
        quality: "legendary",
        type: "Ancestral Legendary Boots",
        itemPower: "925 Item Power",
        armor: "500 Armor",
        stats: [
          { text: "+22.0% Movement Speed" },
          { text: "+10.0% Attack Speed" },
          { text: "+6.5% Damage Reduction" },
        ],
        source: "Helltides",
        icon: "feet",
      },
    },
    {
      slot: "Main Hand",
      target: "Twin daggers — the main hand carries the big crit window",
      affixes: ["Dexterity", "Critical Strike Damage", "Damage to Close Enemies", "Vulnerable Damage"],
      item: {
        name: "Fang of the Whirling Death",
        quality: "legendary",
        type: "Ancestral Legendary Dagger",
        itemPower: "925 Item Power",
        stats: [
          { text: "1,880 Damage per second" },
          { text: "+298 Dexterity" },
          { text: "+142.0% Critical Strike Damage" },
          { text: "+62.0% Vulnerable Damage" },
        ],
        source: "Nightmare dungeons",
        icon: "dagger",
      },
    },
    {
      slot: "Off-Hand",
      target: "Second dagger — the pair feeds Twisting Blades' return trip",
      affixes: ["Dexterity", "Critical Strike Damage", "Damage to Close Enemies"],
      item: {
        name: "Twin of the Whirling Death",
        quality: "legendary",
        type: "Ancestral Legendary Dagger",
        itemPower: "925 Item Power",
        stats: [
          { text: "1,765 Damage per second (dual-wield pair)" },
          { text: "+282 Dexterity" },
          { text: "+135.0% Critical Strike Damage" },
        ],
        flavor: "Two edges in, one orbit out — Bladedancer wears the return trip.",
        source: "Nightmare dungeons",
        icon: "dagger",
      },
    },
    {
      slot: "Amulet",
      target: "Skill ranks + movement",
      affixes: ["Movement Speed", "Damage", "Ranks to Twisting Blades", "Cooldown Reduction"],
      item: {
        name: "Pendant of the Silent Kill",
        quality: "legendary",
        type: "Ancestral Legendary Amulet",
        itemPower: "925 Item Power",
        stats: [
          { text: "+18.0% Movement Speed" },
          { text: "+72.0% Damage" },
          { text: "+7.5% Cooldown Reduction" },
          { text: "+3 Ranks to Twisting Blades (tempered)", tone: "power" },
        ],
        source: "Lair boss drops",
        icon: "amulet",
      },
    },
    {
      slot: "Ring 1",
      target: "Crit + poison",
      affixes: ["Critical Strike Chance", "Maximum Energy", "Vulnerable Damage", "Poison Damage"],
      item: {
        name: "Band of the Coiling Poison",
        quality: "legendary",
        type: "Ancestral Legendary Ring",
        itemPower: "925 Item Power",
        stats: [
          { text: "+10.0% Critical Strike Chance" },
          { text: "+52 Maximum Energy" },
          { text: "+62.0% Vulnerable Damage" },
          { text: "+28.0% Poison Damage" },
        ],
        source: "Nightmare dungeons",
        icon: "ring",
      },
    },
    {
      slot: "Ring 2",
      target: "Crit + Energy filler — Aspect of the Expectant on a ring is the classic pairing",
      affixes: ["Critical Strike Chance", "Maximum Energy", "Attack Speed", "Damage"],
      item: {
        name: "Loop of the Waiting Blade",
        quality: "legendary",
        type: "Ancestral Legendary Ring",
        itemPower: "925 Item Power",
        stats: [
          { text: "+9.5% Critical Strike Chance" },
          { text: "+48 Maximum Energy" },
          { text: "+18.0% Attack Speed" },
          { text: "Imprinted: Aspect of the Expectant — Basic skills empower your next Core cast", tone: "power" },
        ],
        source: "Helltides · aspect imprint",
        icon: "ring",
      },
    },
  ],
  rotation: [
    {
      phase: "Pull / Setup",
      steps: [
        "Apply Poison Imbuement before engaging — never blade into a pack with dry blades.",
        "Shadow Step or Dash in behind the pack; Concealment if you need a clean re-open.",
      ],
    },
    {
      phase: "Standard pack",
      steps: [
        "Puncture once or twice for Combo Points and Vulnerable, then Twisting Blades through the cluster.",
        "Dash out as the blades return — the Bladedancer orbit tears through everything on its way back to you.",
        "Reapply Poison Imbuement between packs; a dry imbuement is a dead multiplier.",
      ],
    },
    {
      phase: "Elites / Bosses",
      steps: [
        "Death Trap on the elite cluster — pull, stun, then blade into the pile.",
        "Build Inner Sight during the pull, then spend the unlimited-Energy window spamming Twisting Blades nonstop.",
        "Shadow Step out of danger markers, back in on cooldown — mobility IS your defense.",
      ],
    },
  ],
  watchOuts: [
    "Twisting Blades' return trip refunds Energy only if Enhanced ranks are up — spamming cores on an empty bar leaves you standing still. Weave Puncture to rebuild.",
    "Bladedancer's orbit does its best work when the blades return through a clustered pack — over-dashing past enemies strands your blades behind you. Blade INTO the pile, then reposition.",
    "Don't stack attack speed past what your Energy bar can feed — faster casts on an empty tank just idle you harder.",
    "Poison Imbuement must be reapplied — running the window dry between packs silently drops your biggest multiplier.",
    "Don't farm Torment before re-gearing into Legendary Aspects at 30+/50+ — the difficulty spike punishes blue gear, and melee rogues feel it first.",
    "Seasonal patches retune aspect values and glyph thresholds — verify final numbers in the linked live guides before you lock a Paragon path.",
  ],
  extras: [
    {
      label: "Key Legendary Aspects",
      items: [
        { name: "Bladedancer Aspect", note: "Returning blades orbit and shred — the build's signature." },
        { name: "Aspect of Volatile Shadows", note: "Trap detonation AoE — verify exact effect in live guides." },
        { name: "Aspect of the Expectant", note: "Basic skill → stronger next Core cast." },
        { name: "Imbuement-efficiency aspects", note: "Whatever your board drops that stretches Poison Imbuement charges." },
      ],
    },
    {
      label: "Paragon Glyphs",
      items: [
        { name: "Chip", note: "First socket — Vulnerable-damage nodes." },
        { name: "Efficacy", note: "Poison-node multiplier for the imbuement layer." },
        { name: "Your board's crit or Energy glyph", note: "Exact pick depends on your board pathing — read the nodes before socketing." },
      ],
    },
    {
      label: "Consumables",
      items: [
        { name: "Dexterity elixir", note: "Flat damage for the leveling push." },
        { name: "Any incense before Torment", note: "Life + sustain for Torment entries." },
        { name: "Elixirs before bosses", note: "Always run one — free XP bonus in early Torment." },
      ],
    },
  ],
};
