import type { Build } from "@/data/types";

/**
 * Chain Lightning Sorcerer — the evergreen lightning-caster archetype.
 * Authored in-house, anchored to patch-stable mechanics; every page
 * links to Maxroll/Icy Veins for live seasonal tuning.
 */
export const chainLightningSorcerer: Build = {
  id: "d4-chain-lightning-sorcerer",
  game: "d4",
  slug: "chain-lightning-sorcerer",
  name: "Chain Lightning Sorcerer",
  className: "Sorcerer",
  role: "Ranged AoE caster",
  tier: "S",
  difficulty: 3,
  tagline: "Cast forever, blink on cooldown, let the sparks do the killing.",
  summary:
    "The classic chain-caster. You keep the mana bar fed, spam Chain Lightning into every pack, and let Crackling Energy detonate wherever the bolts land. Teleport keeps you alive while the enchantment slot fires a second Chain Lightning for you — a screen full of lightning with almost zero downtime.",
  patchLabel: "Season 15 · Patch 3.2",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [
    {
      site: "Maxroll",
      url: "https://maxroll.gg/d4/build-guides",
      label: "Maxroll Sorcerer build guides",
    },
    {
      site: "Icy Veins",
      url: "https://www.icy-veins.com/d4/sorcerer/builds/",
      label: "Icy Veins Sorcerer builds",
    },
  ],
  meta: {
    "Core loop": "Cast Chain Lightning → Crackling Energy detonates",
    "Mana engine": "Spark + mana regen feed endless casts",
    "Key mechanic": "Enchantment slot fires a second Chain Lightning",
    "Playstyle": "Stand back, cast forever, blink out of danger",
    "Best for": "Campaign → Helltides → Nightmare dungeons",
  },
  skillPriority: [
    "Chain Lightning (your entire damage)",
    "Teleport (mobility + survival, one button)",
    "Frost Nova (panic freeze + pack control)",
    "Unstable Currents (burst window)",
  ],
  progression: [
    {
      levels: "1–2",
      goal: "Build the mana habit before the Core slot opens",
      steps: [
        { name: "Spark", detail: "Rank 1", why: "The mana-feeding Basic — every bolt pays you back resource, which is the whole currency of this build." },
        { name: "Enhanced Spark", detail: "1 pt", why: "More mana per hit — start the loop early so Core ranks never stall." },
      ],
    },
    {
      levels: "3–5",
      goal: "Take Chain Lightning the moment the Core slot unlocks and never look back",
      steps: [
        { name: "Chain Lightning", detail: "Rank 1", why: "The whole build. Bounces multiply your cast into a pack-wide clear." },
        { name: "Enhanced Chain Lightning", detail: "1 pt", why: "Lucky hits start spawning Crackling Energy — the first link in the detonation loop." },
        { name: "Teleport", detail: "Rank 1 (Defensive unlocks at 5)", why: "Your only survival tool that matters — instant reposition and you're gone before hits land." },
      ],
      milestone: "Level 3: Core skill slot unlocks — Chain Lightning becomes your only real attack for the rest of the game.",
    },
    {
      levels: "6–10",
      goal: "Rank Chain Lightning, harden Teleport, add the freeze button",
      steps: [
        { name: "Chain Lightning", detail: "Ranks 2–3", why: "More bolts, more bounces, more Crackling Energy — keep it maxed as points allow." },
        { name: "Shimmering Teleport", detail: "1 pt", why: "Damage reduction wrapped around every blink — Teleport becomes a defensive cooldown, not just travel." },
        { name: "Frost Nova", detail: "Rank 1", why: "Instant crowd control when a pack closes in — the freeze also sets up clean Chain Lightning bounces." },
      ],
    },
    {
      levels: "11–15",
      goal: "Unlock the enchantment slot — the build's second engine",
      steps: [
        { name: "Chain Lightning Enchantment", detail: "Slot at 15", why: "The enchant effect fires Chain Lightning alongside your casts, effectively doubling your bolts. This is the endgame loop." },
        { name: "Teleport", detail: "Ranks 2–3", why: "Lower cooldown = more blinks = more damage-reduction windows." },
        { name: "Frost Nova", detail: "Enhanced rank", why: "Tighter cooldown on the panic button before Torment difficulty starts punishing." },
      ],
      milestone: "Level 15: Enchantment slot unlocks — slot Chain Lightning and your cast count doubles.",
    },
    {
      levels: "16–25",
      goal: "Layer barriers and mobility while Chain Lightning finishes maxing",
      steps: [
        { name: "Chain Lightning", detail: "Ranks 4–5", why: "Finish maxing your Core skill — every rank is real pack-clear speed." },
        { name: "Ice Armor", detail: "Rank 1", why: "A persistent barrier over your mana bar — barrier uptime later feeds damage multipliers, so start the habit now." },
        { name: "Blaze", detail: "Rank 1", why: "A burning trail behind you plus speed while it runs — pair with Teleport for free screen-to-screen movement." },
      ],
    },
    {
      levels: "26–35",
      goal: "Ultimate window + crit key passive come online",
      steps: [
        { name: "Unstable Currents", detail: "Rank 1 (Ultimate unlocks at 12+, take it here)", why: "During the window your casts echo additional casts — pop it for elites, boss packs and Helltide events." },
        { name: "Elementalist", detail: "Key passive", why: "A healthy mana bar turns into guaranteed crits against wounded enemies — take it once your mana regen holds up, not before." },
        { name: "Mana passives", detail: "Ranks 1–3 each", why: "Every point of regen and max mana feeds both the enchant casts and the key passive threshold — prioritize resource over small damage passives." },
      ],
      milestone: "Level 30+: World Tier 3 (Nightmare) — re-gear into Legendary items with the aspects below.",
    },
    {
      levels: "36–45",
      goal: "Legendary Aspects carry the build into endgame shape",
      steps: [
        { name: "Aspect of Disobedience", detail: "Armor slot", why: "Stacking armor while you deal damage — solves the squishy-caster problem that kills most Sorcerers in Nightmare." },
        { name: "Aspect of the Unstable Currents", detail: "Utility slot", why: "Supercharges the Unstable Currents window — your burst becomes a storm instead of a gust." },
        { name: "Aspect of Recharging", detail: "Ring or armor", why: "Cooldown skills shave each other's cooldowns — Teleport and Frost Nova start cycling constantly." },
      ],
    },
    {
      levels: "46–50",
      goal: "Enter the endgame engine",
      steps: [
        { name: "Barrier-damage aspect", detail: "One slot", why: "Ice Armor's barrier becomes a damage multiplier — the payoff for the uptime habit you built at 16–25." },
        { name: "Paragon Boards", detail: "Start at 50", why: "Open the first board and path toward Intelligence + crit nodes; respec freely until 60 — it's cheap." },
      ],
      milestone: "Level 50: Paragon Board + World Tier 4 (Torment) after a gear refresh.",
    },
    {
      levels: "51–70",
      goal: "Glyphs, torment farming, build finalization",
      steps: [
        { name: "Control Glyph", detail: "Socket first", why: "Damage against crowd-controlled enemies — Frost Nova + your board's CC nodes make this pay constantly." },
        { name: "Charged Glyph", detail: "Socket second", why: "Multiplies the lightning nodes on your board — the pure-damage pickup." },
        { name: "Board's matching glyph", detail: "Third socket", why: "Pick the mana or crit glyph your actual board centers on — glyph value depends on the nodes you path through, so read the board before socketing." },
        { name: "Torment dungeons", detail: "Farm loop", why: "Helltides + Nightmare dungeons + Lair bosses for Ancestral gear and glyph leveling." },
      ],
    },
    {
      levels: "70+",
      goal: "Push the Pit and refine",
      steps: [
        { name: "The Oculus", detail: "Unique staff", why: "Warps Teleport into an even stronger dodge tool — a Lair-boss lottery prize that, if it drops, frees up how you play the whole build. Verify current tuning on the linked guides." },
        { name: "Tal Rasha's Iridescent Loop", detail: "Unique ring", why: "Pays out when you rotate damage types — a natural fit once a second element shares your rotation." },
        { name: "Masterworking + Tempering", detail: "Craft layer", why: "Temper Chain Lightning/Teleport affixes, then masterwork mana and crit stats first." },
        { name: "Check live tuning", detail: "Every season", why: "Enchant effects, aspect values and glyph thresholds shift by patch — verify final numbers on Maxroll or Icy Veins." },
      ],
    },
  ],
  statPriority: [
    { label: "Maximum Mana / Mana Regeneration", note: "Feeds the enchant casts AND the key passive threshold — never trade it away." },
    { label: "Cooldown Reduction", note: "Teleport uptime is your entire defense layer." },
    { label: "Critical Strike Chance", note: "Crackling Energy and lucky-hit effects all scale off crit frequency." },
    { label: "Critical Strike Damage", note: "Elementalist windows make crits enormous." },
    { label: "Attack Speed", note: "Faster casts = more Crackling Energy — until mana runs dry." },
    { label: "Damage Reduction / Total Armor", note: "The caster's tax — Disobedience plus affixes keeps you upright." },
  ],
  gear: [
    {
      slot: "Helm",
      target: "Cooldown Reduction + skill ranks",
      affixes: ["Cooldown Reduction", "Maximum Mana", "Total Armor", "Ranks to Chain Lightning"],
      item: {
        name: "Mana Engine Helm",
        quality: "legendary",
        type: "Ancestral Legendary Helm",
        itemPower: "925 Item Power",
        armor: "612 Armor",
        stats: [
          { text: "+7.5% Cooldown Reduction" },
          { text: "+68 Maximum Mana" },
          { text: "+540 Total Armor" },
          { text: "+2 Ranks to Chain Lightning (tempered)", tone: "power" },
        ],
        source: "Helltides & Lair boss drops",
        icon: "helm",
      },
    },
    {
      slot: "Chest",
      target: "Tanky stat stick",
      affixes: ["Total Armor", "Damage Reduction", "Max Life", "Ranks to Frost Nova"],
      item: {
        name: "Bulwark of the Endless Circuit",
        quality: "legendary",
        type: "Ancestral Legendary Chest Armor",
        itemPower: "925 Item Power",
        armor: "1,408 Armor",
        stats: [
          { text: "+598 Total Armor" },
          { text: "+13.0% Damage Reduction" },
          { text: "+1,240 Maximum Life" },
          { text: "+2 Ranks to Frost Nova (tempered)", tone: "power" },
        ],
        source: "Nightmare dungeons",
        icon: "chest",
      },
    },
    {
      slot: "Gloves",
      target: "Attack-speed and crit tuning — the famous cold gauntlets",
      affixes: ["Attack Speed", "Critical Strike Chance", "Lucky Hit Chance", "Ranks to Chain Lightning"],
      item: {
        name: "Frostburn",
        quality: "unique",
        type: "Ancestral Unique Gloves",
        itemPower: "925 Item Power",
        armor: "396 Armor",
        stats: [
          { text: "Your Cold damage has a chance to extend chills into full freezes.", tone: "power" },
          { text: "+8.5% Attack Speed" },
          { text: "+9.0% Critical Strike Chance" },
          { text: "+18.0% Lucky Hit Chance" },
        ],
        flavor: "Cold that lingers — pairs with Frost Nova and every chill you trail.",
        source: "World & Lair boss drops",
        icon: "hands",
      },
    },
    {
      slot: "Pants",
      target: "Pure defense",
      affixes: ["Total Armor", "Damage Reduction", "Max Life"],
      item: {
        name: "Legguards of the Static Wall",
        quality: "legendary",
        type: "Ancestral Legendary Pants",
        itemPower: "925 Item Power",
        armor: "886 Armor",
        stats: [
          { text: "+592 Total Armor" },
          { text: "+12.5% Damage Reduction" },
          { text: "+1,180 Maximum Life" },
          { text: "+2 Ranks to Ice Armor (tempered)", tone: "power" },
        ],
        source: "Nightmare dungeons",
        icon: "legs",
      },
    },
    {
      slot: "Boots",
      target: "Movement + mana cost control",
      affixes: ["Movement Speed", "Mana Cost Reduction", "Attack Speed"],
      item: {
        name: "Striders of the Swift Current",
        quality: "legendary",
        type: "Ancestral Legendary Boots",
        itemPower: "925 Item Power",
        armor: "498 Armor",
        stats: [
          { text: "+22.0% Movement Speed" },
          { text: "+12.0% Mana Cost Reduction" },
          { text: "+9.0% Attack Speed" },
        ],
        source: "Helltides",
        icon: "feet",
      },
    },
    {
      slot: "Main Hand",
      target: "Wand with crit + Intelligence — The Oculus staff stays the Lair-boss lottery prize; re-check live guides before committing",
      affixes: ["Intelligence", "Critical Strike Damage", "Critical Strike Chance", "Damage to Close Enemies"],
      item: {
        name: "Bolt of the Fractured Sky",
        quality: "legendary",
        type: "Ancestral Legendary Wand",
        itemPower: "925 Item Power",
        stats: [
          { text: "1,412 Damage per second" },
          { text: "+386 Intelligence" },
          { text: "+128.0% Critical Strike Damage" },
          { text: "Imprinted: Aspect of Recharging — cooldown skills shave each other's cooldowns", tone: "power" },
        ],
        source: "Nightmare dungeons · aspect imprint",
        icon: "wand",
      },
    },
    {
      slot: "Off-Hand",
      target: "Focus for mana + lucky-hit procs",
      affixes: ["Intelligence", "Cooldown Reduction", "Maximum Mana"],
      item: {
        name: "Lens of the Living Spark",
        quality: "legendary",
        type: "Ancestral Legendary Focus",
        itemPower: "925 Item Power",
        stats: [
          { text: "+9.2% Cooldown Reduction" },
          { text: "+44 Maximum Mana" },
          { text: "+14.0% Lucky Hit Chance" },
          { text: "Imprinted: Storm Swell Aspect — bonus damage while barriered", tone: "power" },
        ],
        source: "Nightmare dungeons · aspect imprint",
        icon: "offhand",
      },
    },
    {
      slot: "Amulet",
      target: "Skill ranks + movement",
      affixes: ["Movement Speed", "Cooldown Reduction", "Damage", "Ranks to Chain Lightning"],
      item: {
        name: "Pendant of the Unbroken Arc",
        quality: "legendary",
        type: "Ancestral Legendary Amulet",
        itemPower: "925 Item Power",
        stats: [
          { text: "+18.0% Movement Speed" },
          { text: "+9.2% Cooldown Reduction" },
          { text: "+72.0% Damage" },
          { text: "+3 Ranks to Chain Lightning (tempered)", tone: "power" },
        ],
        source: "Lair boss drops",
        icon: "amulet",
      },
    },
    {
      slot: "Ring 1",
      target: "Resource + crit — Tal Rasha's Iridescent Loop once a second element shares the rotation",
      affixes: ["Critical Strike Chance", "Maximum Mana", "Damage to Crowd-Controlled Enemies"],
      item: {
        name: "Loop of the Deep Reserves",
        quality: "legendary",
        type: "Ancestral Legendary Ring",
        itemPower: "925 Item Power",
        stats: [
          { text: "+10.5% Critical Strike Chance" },
          { text: "+48 Maximum Mana" },
          { text: "+26.0% Damage to Crowd-Controlled Enemies" },
        ],
        source: "Nightmare dungeons",
        icon: "ring",
      },
    },
    {
      slot: "Ring 2",
      target: "Crit + attack-speed filler",
      affixes: ["Critical Strike Chance", "Maximum Mana", "Attack Speed", "Damage"],
      item: {
        name: "Band of the Crackling Echo",
        quality: "legendary",
        type: "Ancestral Legendary Ring",
        itemPower: "925 Item Power",
        stats: [
          { text: "+9.5% Critical Strike Chance" },
          { text: "+36 Maximum Mana" },
          { text: "+18.0% Attack Speed" },
          { text: "+78.0% Damage" },
        ],
        source: "Helltides",
        icon: "ring",
      },
    },
  ],
  rotation: [
    {
      phase: "Pull / Setup",
      steps: [
        "Ice Armor before engaging — barrier uptime feeds your damage multipliers, so start it early.",
        "Blink through the pack with Teleport to line up Chain Lightning bounces before the first cast lands.",
      ],
    },
    {
      phase: "Standard pack",
      steps: [
        "Hold Chain Lightning into the densest enemy — the bounces clear the rest.",
        "Walk toward spawned Crackling Energy — it detonates on contact; ignoring it is free damage wasted.",
        "Re-cast Teleport on cooldown even when safe — the damage-reduction window is the real value.",
      ],
    },
    {
      phase: "Elites / Bosses",
      steps: [
        "Pop Unstable Currents — every cast now echoes a second cast, doubling the lightning on the target.",
        "Chain Lightning from mid-range so bounces still hit summons or add packs.",
        "Frost Nova the moment anything closes distance — frozen enemies eat full-duration Chain Lightning.",
      ],
    },
  ],
  watchOuts: [
    "Don't slot the Chain Lightning enchantment before your mana regen keeps up — enchant casts drink the same bar you're already emptying, and a starved loop does no damage.",
    "Elementalist keys off a full mana bar — taking it early means you're almost never above the threshold, and the key passive does nothing.",
    "Teleport is defense, not just travel. If you feel squishy, it's almost always a Teleport-cooldown problem, not an armor problem.",
    "Don't overcap attack speed while your mana bar runs dry — faster casts on an empty tank just make you whiff faster.",
    "Don't farm Torment before re-gearing into Legendary Aspects at 30+/50+ — the difficulty spike punishes blue gear.",
    "Seasonal patches retune enchant effects, aspect values and glyph thresholds — verify final numbers in the linked live guides before you lock a Paragon path.",
  ],
  extras: [
    {
      label: "Key Legendary Aspects",
      items: [
        { name: "Aspect of Disobedience (Desecrated Crypt)", note: "Stacking armor while attacking — the caster's best friend." },
        { name: "Aspect of the Unstable Currents", note: "Turns your ultimate window into a full storm." },
        { name: "Aspect of Recharging", note: "Cooldown skills feed each other's cooldowns." },
        { name: "Storm Swell Aspect", note: "Bonus damage while barriered — pairs with Ice Armor uptime." },
        { name: "Conceited Aspect", note: "Second barrier-damage multiplier — stack with Storm Swell if the board allows." },
        { name: "Aspect of Control", note: "Damage to frozen/stunned enemies — Frost Nova synergy." },
      ],
    },
    {
      label: "Paragon Glyphs",
      items: [
        { name: "Control", note: "First socket — crowd-controlled damage." },
        { name: "Charged", note: "Lightning-node multiplier." },
        { name: "Your board's mana or crit glyph", note: "Exact pick depends on your board pathing — read the nodes before socketing." },
      ],
    },
    {
      label: "Consumables",
      items: [
        { name: "Intelligence elixir", note: "Flat damage for the leveling push." },
        { name: "Any incense before Torment", note: "Life + resource sustain for Torment entries." },
        { name: "Elixirs before bosses", note: "Always run one — free XP bonus in early Torment." },
      ],
    },
  ],
};
