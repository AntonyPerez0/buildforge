import type { Build } from "@/data/types";

export const boneSpearNecromancer: Build = {
  id: "d4-bone-spear-necromancer",
  game: "d4",
  slug: "bone-spear-necromancer",
  name: "Bone Spear Necromancer",
  className: "Necromancer",
  role: "Ranged precision caster",
  tier: "S",
  difficulty: 2,
  tagline: "One spear through the whole pack — precision casting with a graveyard on retainer.",
  summary:
    "The classic bone-caster. You feed Essence with Decompose, thread Bone Spear through every pack so the shattering shards finish what the spear started, and layer Corpse Explosion on the leftovers. Bone Prison holds elites exactly where your aim points, and pure range does the rest of your defense for you.",
  patchLabel: "Season 15 · Patch 3.2",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [
    {
      site: "Maxroll",
      url: "https://maxroll.gg/d4/build-guides",
      label: "Maxroll Necromancer build guides",
    },
    {
      site: "Icy Veins",
      url: "https://www.icy-veins.com/d4/necromancer/builds/",
      label: "Icy Veins Necromancer builds",
    },
  ],
  meta: {
    "Core loop": "Feed Essence → thread Bone Spear through the pack",
    "Essence engine": "Decompose + regen affixes keep the bar full",
    "Key mechanic": "The spear shatters into shards on impact",
    "Playstyle": "Aim, fire, let the shards sweep the leftovers",
    "Best for": "Campaign → Helltides → Nightmare dungeons",
  },
  skillPriority: [
    "Bone Spear (your entire damage)",
    "Decompose (Essence generation)",
    "Corpse Explosion (free AoE off the leftovers)",
    "Bone Prison + Bone Storm (control and burst window)",
  ],
  progression: [
    {
      levels: "1–2",
      goal: "Build the Essence habit before the Core slot opens",
      steps: [
        { name: "Decompose", detail: "Rank 1", why: "The patient Basic — taint the ground, deal damage, and it pays you Essence while it ticks. Essence is the whole currency of this build." },
        { name: "Enhanced Decompose", detail: "1 pt", why: "More Essence per enemy hit — keeps early Core ranks from stalling." },
      ],
    },
    {
      levels: "3–5",
      goal: "Take Bone Spear the moment the Core slot unlocks and never look back",
      steps: [
        { name: "Bone Spear", detail: "Rank 1", why: "The whole build. Core skills unlock at level 3 — grab it instantly." },
        { name: "Enhanced Bone Spear", detail: "1 pt", why: "Stronger shards and cheaper Essence — the engine comes online immediately." },
        { name: "Bone Prison", detail: "Rank 1 (Defensive unlocks at 5)", why: "Roots the thing you just speared — free aim assist while you level." },
      ],
      milestone: "Level 3: Core skill slot unlocks — Bone Spear becomes your only real attack for the rest of the game.",
    },
    {
      levels: "6–10",
      goal: "Rank Bone Spear and turn corpses into ammunition",
      steps: [
        { name: "Bone Spear", detail: "Ranks 2–3", why: "More damage per cast and fatter shards — keep it maxed as points allow." },
        { name: "Corpse Explosion", detail: "Rank 1", why: "Turns every kill your spear made into free AoE — the build's second engine costs nothing but a corpse." },
        { name: "Enhanced Corpse Explosion", detail: "1 pt", why: "Bigger blasts for the same corpse — smooths the loop before regen gear exists." },
      ],
    },
    {
      levels: "11–15",
      goal: "Finish Bone Spear ranks and pick up the Ultimate window",
      steps: [
        { name: "Bone Spear", detail: "Ranks 4–5", why: "Finish maxing your Core skill — every rank is real pack-clear speed." },
        { name: "Bone Storm", detail: "Rank 1 (Ultimate unlocks at 12+)", why: "Orbiting bone spirits shred anything that closes in — panic button and boss burst in one." },
        { name: "Bone Prison", detail: "Enhanced rank", why: "Shorter cooldown on the root — elites stay in your line of fire longer." },
      ],
    },
    {
      levels: "16–25",
      goal: "Layer Essence passives and scale the corpse engine",
      steps: [
        { name: "Corpse Explosion", detail: "Ranks 2–3", why: "The AoE layer scales hard with ranks — this is what makes Helltides trivial." },
        { name: "Essence passives", detail: "Ranks 1–3 each", why: "Every point of max Essence and regen feeds both your casts and the key passive threshold — prioritize resource over small damage passives." },
        { name: "Control passives", detail: "Ranks 1–3", why: "Longer roots and cheaper casts — control you can actually feel in elite density." },
      ],
    },
    {
      levels: "26–35",
      goal: "Ultimate window + the Essence key passive come online",
      steps: [
        { name: "Bone Storm", detail: "Supreme rank", why: "The payoff rank — the storm lasts long enough to be a real damage window against elites and bosses." },
        { name: "Key passive", detail: "The Essence-scaling pick", why: "The Essence-scaling key passive — verify the current pick in the linked guide; hold it until Essence regen sustains its cost, or it's a trap." },
        { name: "Damage passives", detail: "Ranks 1–3 each", why: "Fill remaining points with whatever multiplies Bone Spear and Corpse Explosion this patch — verify the live picks on Maxroll or Icy Veins before locking." },
      ],
      milestone: "Level 30+: World Tier 3 (Nightmare) — re-gear into Legendary items with the aspects below.",
    },
    {
      levels: "36–45",
      goal: "Legendary Aspects carry the build into endgame shape",
      steps: [
        { name: "Aspect of Disobedience", detail: "Armor slot", why: "Stacking armor while you deal damage — solves the squishy-caster problem that kills most Necromancers in Nightmare." },
        { name: "Edgemaster's Aspect", detail: "Weapon slot", why: "Damage scales with your current Essence — rewards the full bar you now maintain." },
        { name: "Splintering Aspect", detail: "Ring or armor", why: "The classic Bone Spear shard pickup — verify the current tuning in the linked guide before imprinting." },
      ],
    },
    {
      levels: "46–50",
      goal: "Enter the endgame engine",
      steps: [
        { name: "Corpse-scaling aspect", detail: "One slot", why: "A Corpse Explosion multiplier turns every leftover into a second damage engine — several compete each patch, verify the current pick in the linked guide." },
        { name: "Paragon Boards", detail: "Start at 50", why: "Open the first board and path toward Intelligence + bone nodes; respec freely until 60 — it's cheap." },
      ],
      milestone: "Level 50: Paragon Board + World Tier 4 (Torment) after a gear refresh.",
    },
    {
      levels: "51–70",
      goal: "Glyphs, torment farming, build finalization",
      steps: [
        { name: "The board's bone glyph", detail: "Socket first", why: "Multiplies your bone nodes — pick the bone-damage glyph your board centers on; verify the exact pick in the linked guide." },
        { name: "A Vulnerable or crit glyph", detail: "Socket second", why: "Bone Prison roots and Vulnerable rolls keep this paying constantly." },
        { name: "Your board's essence or defense glyph", detail: "Third socket", why: "Glyph value depends on the nodes you path through — read the board before socketing." },
        { name: "Torment dungeons", detail: "Farm loop", why: "Helltides + Nightmare dungeons + Lair bosses for Ancestral gear and glyph leveling." },
      ],
    },
    {
      levels: "70+",
      goal: "Push the Pit and refine",
      steps: [
        { name: "The Pit", detail: "Push tiers", why: "The endgame climb — higher tiers drop better masterworking rolls and glyph XP; push as far as your spear carries you." },
        { name: "Masterworking + Tempering", detail: "Craft layer", why: "Temper Bone Spear/Corpse Explosion affixes, then masterwork crit and Essence stats first." },
        { name: "Check live tuning", detail: "Every season", why: "Aspect values, shard behavior and glyph thresholds shift by patch — verify final numbers on Maxroll or Icy Veins." },
      ],
    },
  ],
  endgame: [
    {
      phase: "Torment entry · 50–60",
      goal: "Survive World Tier 4 and thread the spear through Ancestral gear",
      steps: [
        { name: "Ancestral re-gear", detail: "First week", why: "Replace leveling legendaries with Ancestral pieces from Helltides and Lair bosses — Maximum Essence and Cooldown Reduction first; the cast ceiling IS the damage ceiling." },
        { name: "Glyphs", detail: "The board's bone glyph first, a Vulnerable glyph second", why: "The bone glyph multiplies the nodes your boards route through — verify the exact pick in the linked guide before socketing; Bone Prison roots keep a Vulnerable glyph paying on every cast." },
        { name: "Aspect refresh", detail: "Max rolls", why: "Re-imprint Edgemaster's, Disobedience and the shard-splitting aspect at their highest rolls on Ancestral gear — shard behavior gets retuned often, so verify current tuning before imprinting." },
        { name: "Pierce discipline", detail: "Line up the cast", why: "At Torment density every spear should thread multiple bodies before shattering — if shards feel weak, it's positioning, not gear." },
      ],
      milestone: "Glyph bonus thresholds are reached by pathing Paragon boards toward the glyph socket — route the bone glyph through bone and Essence nodes before spending points.",
    },
    {
      phase: "Farming loop · 60–70",
      goal: "Glyph XP, Essence economy and uniques",
      steps: [
        { name: "Nightmare dungeons", detail: "Tier ladder", why: "Primary glyph XP and Ancestral stream — run the highest tier you clear fast; corridor maps line up the pierce better than open arenas." },
        { name: "Lair boss rotation", detail: "Summon mats from Whispers", why: "Boss loot tables are your unique hunt — the class's build-defining uniques live here; verify the current targets before spending summons." },
        { name: "Tempering", detail: "Bone Spear + Essence", why: "Temper Bone Spear ranks and Essence affixes onto every applicable slot before masterworking — the bar feeds every cast." },
        { name: "Helltides", detail: "Chests + mats", why: "Fastest rare-material and leveling gear farm — run them between dungeon keys." },
      ],
    },
    {
      phase: "The Pit push · 70+",
      goal: "Climb tiers and finish the craft layer",
      steps: [
        { name: "Masterworking", detail: "Crit + Essence first", why: "Masterwork Critical Strike Chance and Maximum Essence before raw main-stat — shards and lucky-hit effects scale off crit frequency, and Edgemaster's keys off the full bar." },
        { name: "Pit climbing", detail: "Comfortable +3 tiers", why: "Push tiers you clear reliably; the upgrade drops and leaderboard thresholds reward consistency." },
        { name: "Glyph ranks", detail: "15 → 21+", why: "Every major glyph threshold changes board scaling — keep glyph XP running even during pushes." },
      ],
      milestone: "Torment difficulty tiers and Pit rewards shift with patches — verify current thresholds on Maxroll or Icy Veins before spending gold.",
    },
    {
      phase: "Long-term refinement",
      goal: "Uniques, shard tuning and seasonal resets",
      steps: [
        { name: "Unique hunt list", detail: "Build-defining pieces", why: "Hunt the class's build-defining uniques from Lair bosses — the exact list rotates by patch, so verify the current targets on Maxroll or Icy Veins before committing summons." },
        { name: "Bone-spirit synergy", detail: "Hedge the pickup", why: "Bone Storm's orbiting spirits and shard-interaction bonuses rotate by patch — verify the current bone-spirit/bone-shard synergy lines in the linked guide before committing Paragon points." },
        { name: "Seasonal reroll", detail: "Each season", why: "Level paths stay evergreen; re-check shard behavior, aspect values and glyph thresholds against the live guides each season." },
      ],
    },
  ],
  statPriority: [
    { label: "Intelligence", note: "Scales all your damage — the default pick everywhere." },
    { label: "Maximum Essence / Essence Regeneration", note: "Feeds the casts AND the key passive threshold — never trade it away." },
    { label: "Critical Strike Chance", note: "Shards and lucky-hit effects all scale off crit frequency." },
    { label: "Critical Strike Damage", note: "Edgemaster's windows make crits enormous." },
    { label: "Cooldown Reduction", note: "Bone Prison and Bone Storm uptime is your control layer." },
    { label: "Damage Reduction / Total Armor", note: "The caster's tax — Disobedience plus affixes keeps you upright." },
  ],
  gear: [
    {
      slot: "Helm",
      target: "Cooldown Reduction + Bone Spear ranks",
      affixes: ["Cooldown Reduction", "Total Armor", "Life", "Ranks to Bone Spear"],
      item: {
        name: "Crown of the Splintered Vault",
        quality: "legendary",
        type: "Ancestral Legendary Helm",
        itemPower: "925 Item Power",
        armor: "604 Armor",
        stats: [
          { text: "+7.8% Cooldown Reduction" },
          { text: "+585 Total Armor" },
          { text: "+940 Maximum Life" },
          { text: "+2 Ranks to Bone Spear (tempered)", tone: "power" },
        ],
        source: "Helltides & Lair boss drops",
        icon: "helm",
      },
    },
    {
      slot: "Chest",
      target: "Tanky stat stick",
      affixes: ["Total Armor", "Damage Reduction", "Max Life", "Ranks to Corpse Explosion"],
      item: {
        name: "Cuirass of the Silent Ossuary",
        quality: "legendary",
        type: "Ancestral Legendary Chest Armor",
        itemPower: "925 Item Power",
        armor: "1,404 Armor",
        stats: [
          { text: "+588 Total Armor" },
          { text: "+13.5% Damage Reduction" },
          { text: "+1,260 Maximum Life" },
          { text: "+2 Ranks to Corpse Explosion (tempered)", tone: "power" },
        ],
        source: "Nightmare dungeons",
        icon: "chest",
      },
    },
    {
      slot: "Gloves",
      target: "Attack-speed and crit tuning",
      affixes: ["Attack Speed", "Critical Strike Chance", "Lucky Hit Chance", "Ranks to Bone Spear"],
      item: {
        name: "Grips of the Gravewarden",
        quality: "legendary",
        type: "Ancestral Legendary Gloves",
        itemPower: "925 Item Power",
        armor: "428 Armor",
        stats: [
          { text: "+13.5% Attack Speed" },
          { text: "+9.0% Critical Strike Chance" },
          { text: "+20.0% Lucky Hit Chance" },
          { text: "+3 Ranks to Bone Spear (tempered)", tone: "power" },
        ],
        source: "Nightmare dungeons",
        icon: "hands",
      },
    },
    {
      slot: "Pants",
      target: "Pure defense",
      affixes: ["Total Armor", "Damage Reduction", "Max Life", "Ranks to Bone Prison"],
      item: {
        name: "Legguards of the Hollow Choir",
        quality: "legendary",
        type: "Ancestral Legendary Pants",
        itemPower: "925 Item Power",
        armor: "872 Armor",
        stats: [
          { text: "+571 Total Armor" },
          { text: "+11.5% Damage Reduction" },
          { text: "+1,105 Maximum Life" },
          { text: "+2 Ranks to Bone Prison (tempered)", tone: "power" },
        ],
        source: "Nightmare dungeons",
        icon: "legs",
      },
    },
    {
      slot: "Boots",
      target: "Movement + Essence sustain",
      affixes: ["Movement Speed", "Maximum Essence", "Damage Reduction from Distant Enemies"],
      item: {
        name: "Striders of the Hollow March",
        quality: "legendary",
        type: "Ancestral Legendary Boots",
        itemPower: "925 Item Power",
        armor: "494 Armor",
        stats: [
          { text: "+21.5% Movement Speed" },
          { text: "+6.5% Damage Reduction from Distant Enemies" },
          { text: "+22 Maximum Essence" },
        ],
        source: "Helltides",
        icon: "feet",
      },
    },
    {
      slot: "Main Hand",
      target: "Two-Handed Scythe — the biggest weapon-damage pool a spear that scales off it can ask for",
      affixes: ["Intelligence", "Critical Strike Damage", "Damage to Distant Enemies"],
      item: {
        name: "Spine of the Bone Cathedral",
        quality: "legendary",
        type: "Ancestral Legendary Two-Handed Scythe",
        itemPower: "925 Item Power",
        stats: [
          { text: "2,912 Damage per second (slow — heavy hits feed every cast)" },
          { text: "+401 Intelligence" },
          { text: "+160.0% Critical Strike Damage" },
          { text: "Imprinted: Edgemaster's Aspect — damage scales with your current Essence", tone: "power" },
        ],
        source: "Nightmare dungeons · aspect imprint",
        icon: "scythe",
      },
    },
    {
      slot: "Off-Hand",
      target: "Empty — the build swings a two-handed scythe, so this slot stays open; that's the trade for the bigger weapon pool (two-handers carry extra aspect slots — verify the current rules in the linked guide)",
    },
    {
      slot: "Amulet",
      target: "Skill ranks + movement",
      affixes: ["Movement Speed", "Damage", "Cooldown Reduction", "Ranks to Bone Spear"],
      item: {
        name: "Pendant of the Marrow Chorus",
        quality: "legendary",
        type: "Ancestral Legendary Amulet",
        itemPower: "925 Item Power",
        stats: [
          { text: "+18.0% Movement Speed" },
          { text: "+74.5% Damage" },
          { text: "+11.8% Cooldown Reduction" },
          { text: "+3 Ranks to Bone Spear (tempered)", tone: "power" },
        ],
        source: "Lair boss drops",
        icon: "amulet",
      },
    },
    {
      slot: "Ring 1",
      target: "The crit-Essence engine",
      affixes: ["Critical Strike Chance", "Maximum Essence", "Damage to Vulnerable Enemies"],
      item: {
        name: "Loop of the Split Dawn",
        quality: "legendary",
        type: "Ancestral Legendary Ring",
        itemPower: "925 Item Power",
        stats: [
          { text: "+10.5% Critical Strike Chance" },
          { text: "+34 Maximum Essence" },
          { text: "+31.0% Damage to Vulnerable Enemies" },
        ],
        source: "Nightmare dungeons",
        icon: "ring",
      },
    },
    {
      slot: "Ring 2",
      target: "Resource + attack-speed filler",
      affixes: ["Critical Strike Chance", "Maximum Essence", "Attack Speed", "Damage"],
      item: {
        name: "Band of the Whispering Marrow",
        quality: "legendary",
        type: "Ancestral Legendary Ring",
        itemPower: "925 Item Power",
        stats: [
          { text: "+9.5% Critical Strike Chance" },
          { text: "+38 Maximum Essence" },
          { text: "+14.0% Attack Speed" },
          { text: "+79.0% Damage" },
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
        "Drop Decompose on the ground where the pack is heading — Essence starts ticking before the first cast.",
        "Bone Prison the elite or the ranged pack so they hold still for the spear line.",
      ],
    },
    {
      phase: "Standard pack",
      steps: [
        "Thread Bone Spear THROUGH the pack — the spear breaks on the first target and the shards spray everything behind it.",
        "Corpse Explosion the leftovers as they fall; corpses are free AoE, don't walk past them.",
        "Recast Decompose whenever the Essence bar dips — never let the bar stall.",
      ],
    },
    {
      phase: "Elites / Bosses",
      steps: [
        "Bone Storm + Bone Prison the target, then unload Bone Spear point-blank — every shard still lands on the single body.",
        "Keep Decompose ticking at the boss's feet — Essence regen is your cast ceiling.",
        "Root, don't run — range and Bone Prison are your defense layer, reposition between casts only.",
      ],
    },
  ],
  watchOuts: [
    "Bone Spear's shards are half the damage — aim the spear THROUGH the pack so the shatter sprays the stragglers; firing at the edge of a group wastes the split.",
    "Corpse Explosion needs corpses on the ground — spear first, explode second; detonating into an empty field does nothing.",
    "Don't take the Essence key passive early — it keys off a resource you can't sustain yet; verify the current pick in the linked guide before locking it.",
    "Upgrade the scythe at the blacksmith every few levels — bone damage scales off weapon damage and a rusty two-hander drops the whole loop.",
    "Bone Prison is your defense. Rooted enemies can't shoot you — if you feel squishy, it's usually a positioning problem, not an armor problem.",
    "Don't farm Torment before re-gearing into Legendary Aspects at 30+/50+ — the difficulty spike punishes blue gear.",
    "Seasonal patches retune aspect values, shard behavior and glyph thresholds — verify final numbers in the linked live guides before you lock a Paragon path.",
  ],
  extras: [
    {
      label: "Key Legendary Aspects",
      items: [
        { name: "Aspect of Disobedience (Desecrated Crypt)", note: "Stacking armor while attacking — the caster's best friend." },
        { name: "Edgemaster's Aspect", note: "Damage per current Essence — the two-hander's big multiplier." },
        { name: "Splintering Aspect", note: "The classic Bone Spear shard pickup — verify the current tuning." },
        { name: "A Corpse-Explosion scaling aspect", note: "Several compete each patch — verify the current pick in the linked guide." },
        { name: "An Essence-regen aspect", note: "Rotates by patch; read the linked guide before imprinting." },
      ],
    },
    {
      label: "Paragon Glyphs",
      items: [
        { name: "The board's bone glyph", note: "Socket the glyph that multiplies your bone nodes — verify the exact pick in the linked guide." },
        { name: "A Vulnerable or crit glyph", note: "Pairs with Bone Prison roots and Vulnerable rolls." },
        { name: "Your board's essence or defense glyph", note: "Depends on pathing — read the nodes before socketing." },
      ],
    },
    {
      label: "Consumables",
      items: [
        { name: "Intelligence elixir", note: "Flat damage for the leveling push." },
        { name: "Any incense before Torment", note: "Life + sustain for Torment entries." },
        { name: "Elixirs before bosses", note: "Always run one — free XP bonus in early Torment." },
      ],
    },
  ],
};
