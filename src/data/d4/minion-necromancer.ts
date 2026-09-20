import type { Build } from "@/data/types";

/**
 * Minion Necromancer — the evergreen summoner archetype.
 * Authored in-house, anchored to patch-stable mechanics; every page
 * links to Maxroll/Icy Veins for live seasonal tuning.
 */
export const minionNecromancer: Build = {
  id: "d4-minion-necromancer",
  game: "d4",
  slug: "minion-necromancer",
  name: "Minion Necromancer",
  className: "Necromancer",
  role: "Summoner AoE command",
  tier: "S",
  difficulty: 2,
  tagline: "Raise the line, manage the corpses, command from the back.",
  summary:
    "The classic summoner. A skeleton front line holds packs while Shadow mages pour in shadow damage and Corpse Explosion turns every kill into more bombs. The Golem gets sacrificed for flat damage, Shadowblight burns anything your shadows touch, and your actual job is corpse economy — never running dry, never running out of minions.",
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
    "Core loop": "Corpses in → Corpse Explosions out",
    "Squad": "Skirmisher warriors + Shadow mages, Golem sacrificed",
    "Key mechanic": "Shadowblight detonates everything shadow-touched",
    "Playstyle": "Command from the back, manage the corpse economy",
    "Best for": "Hands-off Campaign → Helltides → Nightmare dungeons",
  },
  skillPriority: [
    "Corpse Explosion (your AoE engine)",
    "Corpse Tendrils (pull, stun, corpse gathering)",
    "Blight (shadow damage between explosions)",
    "Army of the Dead (burst window)",
  ],
  progression: [
    {
      levels: "1–2",
      goal: "Start the corpse economy while your warriors fight for free",
      steps: [
        { name: "Decompose", detail: "Rank 1", why: "The corpse-maker — your Basic skill exists to leave bodies for everything else in this build." },
        { name: "Enhanced Decompose", detail: "1 pt", why: "More reliable corpse output — the ammo factory comes online." },
        { name: "Skeleton Warriors", detail: "Book of the Dead", why: "They fight alongside you from the first level and their damage is free — let them hold the line while you set up." },
      ],
    },
    {
      levels: "3–5",
      goal: "Core slot online — start the shadow engine, corpse layering right behind",
      steps: [
        { name: "Blight", detail: "Rank 1 (Core unlocks at 3)", why: "Shadow damage over a pool — it starts the shadow theme that Shadowblight will pay off later." },
        { name: "Corpse Explosion", detail: "Rank 1", why: "Grab it as soon as its slot opens — every corpse becomes a bomb and every bomb leaves more corpses." },
        { name: "Corpse Tendrils", detail: "Rank 1 (third slot at 5)", why: "Pulls the pack into a pile and stuns it — gathering is half your AoE, the other half is detonating what gathered." },
      ],
      milestone: "Level 3: Core skill slot unlocks — Blight now, with the corpse skills layered in immediately after.",
    },
    {
      levels: "6–10",
      goal: "Rank the corpse skills and pick your warrior flavor",
      steps: [
        { name: "Corpse Explosion", detail: "Ranks 2–3", why: "More explosions per corpse — this is your pack-clear speed." },
        { name: "Corpse Tendrils", detail: "Enhanced + ranks", why: "Stronger pull and stun means tighter piles means bigger explosion chains." },
        { name: "Book of the Dead — Warriors: Skirmishers", detail: "Upgrade", why: "Ranged spears with Bleed keep packs honest while you channel and cast from the back." },
      ],
      milestone: "Book of the Dead: Skirmisher warriors — your front line now does damage instead of just standing there.",
    },
    {
      levels: "11–15",
      goal: "Mages join the squad; complete the Golem unlock",
      steps: [
        { name: "Book of the Dead — Mages: Shadow", detail: "Upgrade", why: "Shadow mages stack shadow damage on everything — the exact fuel Shadowblight will burn later." },
        { name: "Blight", detail: "Ranks 2–3", why: "Your between-explosions damage and another shadow trigger for the key passive." },
        { name: "Golem", detail: "Complete the unlock quest", why: "Take the Golem quest when it appears — even if you'll sacrifice it later, its body carries you through the teens." },
      ],
      milestone: "Level 15: the fourth skill slot opens — keep layering corpse and shadow skills, nothing here is a trap.",
    },
    {
      levels: "16–25",
      goal: "Passive engine: essence, damage bursts, sacrifice scaling",
      steps: [
        { name: "Grim Harvest", detail: "Ranks 1–3", why: "Essence from every consumed corpse — your casting fuel scales with your explosions." },
        { name: "Fueled by Death", detail: "Ranks 1–3", why: "Damage burst after each corpse consumed — chains explosions into snowballs." },
        { name: "Sacrificial", detail: "Ranks 1–3", why: "Crit scaling per sacrificed minion type — it's the reason the Golem is about to leave the party." },
        { name: "Corpse Explosion", detail: "Ranks 4–5", why: "Finish maxing your AoE engine before Torment." },
      ],
    },
    {
      levels: "26–35",
      goal: "Key passive + ultimate + the Golem's pink slip",
      steps: [
        { name: "Shadowblight", detail: "Key passive", why: "Shadow damage accumulates and periodically detonates — with mages and Blight stacking shadow constantly, it becomes a furnace." },
        { name: "Army of the Dead", detail: "Rank 1 (Ultimate unlocks at 12+, take it here)", why: "A wave of shadow explosions — the biggest Shadowblight trigger you own. Pop for elites and boss packs." },
        { name: "Book of the Dead — Golem: Sacrifice", detail: "Sacrifice", why: "The sacrifice bonus is straight damage, and Sacrificial pays you crit for it. Your skeleton line holds fine without a golem." },
      ],
      milestone: "Level 30+: World Tier 3 (Nightmare) — re-gear into Legendary items with the aspects below.",
    },
    {
      levels: "36–45",
      goal: "Legendary Aspects turn the squad into an army",
      steps: [
        { name: "Aspect of Frenzied Dead", detail: "Weapon(s)", why: "Minion attack speed — every skeleton and mage hits faster, which means more shadow triggers per second." },
        { name: "Aspect of Ultimate Shadow", detail: "Utility slot", why: "Shadow skills spawn additional shadow bursts — more Shadowblight fuel, more pack clear. Verify its exact effect in the live guides." },
        { name: "Minion-damage aspect", detail: "Armor slot", why: "Any aspect raising minion damage or attack speed is a straight upgrade — they're common drops and all help." },
      ],
    },
    {
      levels: "46–50",
      goal: "Enter the endgame engine",
      steps: [
        { name: "Aspect of Requiem-style minion scaling", detail: "Keep farming aspects", why: "Stack minion damage and attack speed until the squad out-DPSes you — that's when this build is done. Name varies by season; check the linked guides." },
        { name: "Paragon Boards", detail: "Start at 50", why: "Open the first board and path toward Intelligence + minion nodes; respec freely until 60 — it's cheap." },
      ],
      milestone: "Level 50: Paragon Board + World Tier 4 (Torment) after a gear refresh.",
    },
    {
      levels: "51–70",
      goal: "Glyphs, torment farming, build finalization",
      steps: [
        { name: "Deadraiser Glyph", detail: "Socket first", why: "The minion-scaling glyph every summon board wants — corpse consumption powers up the squad." },
        { name: "Board's shadow glyph", detail: "Socket second", why: "Pick the shadow-damage glyph on your actual board — glyph value depends on the nodes you path through, so read the board before socketing." },
        { name: "Minion Life tempering", detail: "Craft layer", why: "Torment AoE deletes skeletons — Minion Life and attack speed tempering keep the front line standing." },
        { name: "Torment dungeons", detail: "Farm loop", why: "Helltides + Nightmare dungeons + Lair bosses for Ancestral gear and glyph leveling." },
      ],
    },
    {
      levels: "70+",
      goal: "Push the Pit and refine",
      steps: [
        { name: "Ring of Mendeln", detail: "Unique ring", why: "The minion build's endgame prize — your squad detonates on its own triggers. Verify current tuning on the linked guides before building around it." },
        { name: "Masterworking + Tempering", detail: "Craft layer", why: "Temper minion damage/life and Corpse Explosion affixes, then masterwork crit and cooldown stats first." },
        { name: "Check live tuning", detail: "Every season", why: "Minion scaling, aspect values and glyph thresholds shift by patch — verify final numbers on Maxroll or Icy Veins." },
      ],
    },
  ],
  endgame: [
    {
      phase: "Torment entry · 50–60",
      goal: "Survive World Tier 4 and rebuild the squad on Ancestral gear",
      steps: [
        { name: "Ancestral re-gear", detail: "First week", why: "Replace leveling legendaries with Ancestral pieces from Helltides and Lair bosses — Minion Damage, Minion Attack Speed and Minion Life outrank your own offense everywhere they fit." },
        { name: "Deadraiser Glyph", detail: "Socket + level", why: "First glyph to level — corpse consumption powers the squad, and no build makes corpses faster than yours." },
        { name: "Aspect refresh", detail: "Max rolls", why: "Re-imprint Frenzied Dead and the shadow-burst aspects at their highest rolls on Ancestral gear — minion attack speed feeds Shadowblight triggers per second." },
        { name: "Book of the Dead audit", detail: "Sacrifice check", why: "Re-confirm the loadout after every big gear swap: Skirmisher warriors, Shadow mages, Golem sacrificed — re-gear can flip which sacrifice bonus pays best." },
      ],
      milestone: "Glyph bonus thresholds are reached by pathing Paragon boards toward the glyph socket — route Deadraiser through minion nodes before spending points.",
    },
    {
      phase: "Farming loop · 60–70",
      goal: "Glyph XP, squad tempering and the Mendeln hunt",
      steps: [
        { name: "Nightmare dungeons", detail: "Tier ladder", why: "Primary glyph XP and Ancestral stream — run the highest tier you clear fast; the squad clears density, so pack-heavy dungeons pay best." },
        { name: "Lair boss rotation", detail: "Summon mats from Whispers", why: "Boss loot tables are your unique hunt — Ring of Mendeln is the build-defining prize; verify its live tuning before building around it." },
        { name: "Tempering", detail: "Minion lines", why: "Temper Minion Damage, Minion Attack Speed and Minion Life onto every applicable slot before masterworking — Torment AoE deletes skeletons otherwise." },
        { name: "Helltides", detail: "Chests + mats", why: "Fastest rare-material and leveling gear farm — run them between dungeon keys." },
      ],
    },
    {
      phase: "The Pit push · 70+",
      goal: "Climb tiers and finish the craft layer",
      steps: [
        { name: "Masterworking", detail: "Minion + cooldown first", why: "Masterwork minion damage and cooldown stats before raw main-stat — the squad is your DPS and Tendrils is your tempo." },
        { name: "Pit climbing", detail: "Comfortable +3 tiers", why: "Push tiers you clear reliably; the upgrade drops and leaderboard thresholds reward consistency." },
        { name: "Glyph ranks", detail: "15 → 21+", why: "Every major glyph threshold changes board scaling — keep glyph XP running even during pushes." },
      ],
      milestone: "Torment difficulty tiers and Pit rewards shift with patches — verify current thresholds on Maxroll or Icy Veins before spending gold.",
    },
    {
      phase: "Long-term refinement",
      goal: "Uniques, sacrifice tuning and seasonal resets",
      steps: [
        { name: "Unique hunt list", detail: "Build-defining pieces", why: "Ring of Mendeln detonates the squad on its own triggers — the ceiling pick; run the specific Lair bosses that drop it and re-optimize the Book of the Dead around it once it lands." },
        { name: "Book of the Dead re-optimization", detail: "Each season", why: "Sacrifice bonuses and minion upgrades get retuned — re-read every warrior, mage and Golem entry before locking a Paragon path." },
        { name: "Seasonal reroll", detail: "Each season", why: "Level paths stay evergreen; re-check minion scaling and glyph thresholds against the live guides each season." },
      ],
    },
  ],
  statPriority: [
    { label: "Intelligence", note: "Scales your damage and minion power — the default pick everywhere." },
    { label: "Minion Damage", note: "The affix that makes the squad an army — take it every slot it fits." },
    { label: "Minion Attack Speed", note: "Tempering target — faster minions trigger Shadowblight more often." },
    { label: "Cooldown Reduction", note: "Corpse Tendrils and Army of the Dead uptime." },
    { label: "Lucky Hit Chance", note: "Feeds proc ranks and corpse-adjacent effects." },
    { label: "Shadow Damage", note: "Blight, mages, Army of the Dead and Shadowblight all share the element." },
    { label: "Damage Reduction / Max Life", note: "If the skeleton line falls, you're next — never skip the defensive layer." },
  ],
  gear: [
    {
      slot: "Helm",
      target: "Cooldown Reduction + skill ranks",
      affixes: ["Cooldown Reduction", "Total Armor", "Max Life", "Ranks to Corpse Tendrils"],
      item: {
        name: "Visage of the Grave Command",
        quality: "legendary",
        type: "Ancestral Legendary Helm",
        itemPower: "925 Item Power",
        armor: "618 Armor",
        stats: [
          { text: "+7.5% Cooldown Reduction" },
          { text: "+542 Total Armor" },
          { text: "+980 Maximum Life" },
          { text: "+2 Ranks to Corpse Tendrils (tempered)", tone: "power" },
        ],
        source: "Helltides & Lair boss drops",
        icon: "helm",
      },
    },
    {
      slot: "Chest",
      target: "Tanky stat stick with a minion-life bump",
      affixes: ["Total Armor", "Damage Reduction", "Max Life", "Minion Life"],
      item: {
        name: "Carapace of the Silent Legion",
        quality: "legendary",
        type: "Ancestral Legendary Chest Armor",
        itemPower: "925 Item Power",
        armor: "1,416 Armor",
        stats: [
          { text: "+604 Total Armor" },
          { text: "+13.5% Damage Reduction" },
          { text: "+1,360 Maximum Life" },
          { text: "+15.0% Minion Life (tempered)", tone: "power" },
        ],
        source: "Nightmare dungeons",
        icon: "chest",
      },
    },
    {
      slot: "Gloves",
      target: "Attack-speed and proc tuning",
      affixes: ["Attack Speed", "Critical Strike Chance", "Lucky Hit Chance", "Ranks to Corpse Explosion"],
      item: {
        name: "Gravebinder Gauntlets",
        quality: "legendary",
        type: "Ancestral Legendary Gloves",
        itemPower: "925 Item Power",
        armor: "452 Armor",
        stats: [
          { text: "+12.0% Attack Speed" },
          { text: "+8.5% Critical Strike Chance" },
          { text: "+18.0% Lucky Hit Chance" },
          { text: "+3 Ranks to Corpse Explosion (tempered)", tone: "power" },
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
        name: "Boneshroud Greaves",
        quality: "legendary",
        type: "Ancestral Legendary Pants",
        itemPower: "925 Item Power",
        armor: "902 Armor",
        stats: [
          { text: "+586 Total Armor" },
          { text: "+12.5% Damage Reduction" },
          { text: "+1,150 Maximum Life" },
        ],
        flavor: "The front line is expendable — you are not.",
        source: "Nightmare dungeons",
        icon: "legs",
      },
    },
    {
      slot: "Boots",
      target: "Movement + sustain",
      affixes: ["Movement Speed", "Damage Reduction", "Max Life"],
      item: {
        name: "Treads of the Pale Procession",
        quality: "legendary",
        type: "Ancestral Legendary Boots",
        itemPower: "925 Item Power",
        armor: "506 Armor",
        stats: [
          { text: "+22.0% Movement Speed" },
          { text: "+6.0% Damage Reduction" },
          { text: "+780 Maximum Life" },
        ],
        flavor: "Walk at the pace of your army — the dead keep up.",
        source: "Helltides",
        icon: "feet",
      },
    },
    {
      slot: "Main Hand",
      target: "Two-handed scythe — Aspect of Frenzied Dead is the leveling multiplier; wand + focus only for a hybrid caster variant",
      affixes: ["Intelligence", "Critical Strike Damage", "Shadow Damage", "Damage to Close Enemies"],
      item: {
        name: "Harvest of the Hollow King",
        quality: "legendary",
        type: "Ancestral Legendary Two-Handed Scythe",
        itemPower: "925 Item Power",
        stats: [
          { text: "2,735 Damage per second (two-handed)" },
          { text: "+341 Intelligence" },
          { text: "+118.0% Critical Strike Damage" },
          { text: "Imprinted: Aspect of Frenzied Dead — minion attack speed", tone: "power" },
        ],
        source: "Nightmare dungeons · aspect imprint",
        icon: "scythe",
      },
    },
    {
      slot: "Off-Hand",
      target: "Two-handed scythe occupies both hands — this slot stays empty; grab a wand + focus only for a hybrid caster variant",
    },
    {
      slot: "Amulet",
      target: "Skill ranks + movement",
      affixes: ["Movement Speed", "Cooldown Reduction", "Damage", "Intelligence"],
      item: {
        name: "Pendant of the Pale Court",
        quality: "legendary",
        type: "Ancestral Legendary Amulet",
        itemPower: "925 Item Power",
        stats: [
          { text: "+18.0% Movement Speed" },
          { text: "+8.8% Cooldown Reduction" },
          { text: "+64.0% Damage" },
          { text: "+2 Ranks to Blight (tempered)", tone: "power" },
        ],
        source: "Lair boss drops",
        icon: "amulet",
      },
    },
    {
      slot: "Ring 1",
      target: "Crit + shadow scaling — Ring of Mendeln is the endgame lottery target; verify live tuning before building around it",
      affixes: ["Critical Strike Chance", "Lucky Hit Chance", "Shadow Damage"],
      item: {
        name: "Signet of the Shadow Choir",
        quality: "legendary",
        type: "Ancestral Legendary Ring",
        itemPower: "925 Item Power",
        stats: [
          { text: "+9.5% Critical Strike Chance" },
          { text: "+16.0% Lucky Hit Chance" },
          { text: "+32.0% Shadow Damage" },
        ],
        source: "Nightmare dungeons",
        icon: "ring",
      },
    },
    {
      slot: "Ring 2",
      target: "Minion-scaling filler",
      affixes: ["Critical Strike Chance", "Shadow Damage", "Damage", "Minion Damage"],
      item: {
        name: "Loop of the Corpselight",
        quality: "legendary",
        type: "Ancestral Legendary Ring",
        itemPower: "925 Item Power",
        stats: [
          { text: "+9.0% Critical Strike Chance" },
          { text: "+28.0% Shadow Damage" },
          { text: "+78.0% Damage" },
          { text: "+22.0% Minion Damage" },
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
        "Lead with Corpse Tendrils — the pull-and-stun gathers the pack into a corpse piñata.",
        "Decompose anything that didn't cluster — start manufacturing ammo before you spend it.",
      ],
    },
    {
      phase: "Standard pack",
      steps: [
        "Corpse Explosion into the pile — every detonation leaves more corpses, so chain them until the screen clears.",
        "Blight between explosions to keep shadow stacking (and Shadowblight) ticking.",
        "Re-cast Tendrils on cooldown — gathering is the build's real cooldown management.",
      ],
    },
    {
      phase: "Elites / Bosses",
      steps: [
        "Pop Army of the Dead — the shadow storm chains through everything nearby and floods Shadowblight.",
        "Keep Blight and Tendrils cycling on the boss; your minions do the single-target work.",
        "Your job is corpse management, not melee heroics — stay behind the skeleton line.",
      ],
    },
  ],
  watchOuts: [
    "Corpse Explosion eats your ammo — spamming it dry starves Tendrils and leaves you with nothing to detonate. Alternate the casts; don't hold one button.",
    "Sacrifice passives count minion TYPES, not individual bodies — sacrifice the Golem only. Bleeding out your warriors and mages for a few crit points leaves you with no front line.",
    "Shadowblight detonates on a cadence, not on command — build burst expectations around Army of the Dead, and let Shadowblight be the furnace under it.",
    "Torment AoE deletes skeletons fast — Minion Life/attack-speed tempering is not optional once the front line starts evaporating.",
    "Don't farm Torment before re-gearing into Legendary Aspects at 30+/50+ — the difficulty spike punishes blue gear and naked minions.",
    "Minion scaling and aspect values shift every season — verify final numbers in the linked live guides before you lock a Paragon path.",
  ],
  extras: [
    {
      label: "Key Legendary Aspects",
      items: [
        { name: "Aspect of Frenzied Dead", note: "Minion attack speed — the leveling core." },
        { name: "Aspect of Ultimate Shadow", note: "Shadow bursts off your shadow skills — Shadowblight fuel." },
        { name: "Minion-damage aspects", note: "Any drop raising minion damage/attack speed — stack them all." },
        { name: "Corpse-generation aspects", note: "Whatever your board drops that makes or preserves corpses — ammo economy wins games." },
      ],
    },
    {
      label: "Paragon Glyphs",
      items: [
        { name: "Deadraiser", note: "First socket — corpse consumption empowers the squad." },
        { name: "Your board's shadow glyph", note: "Exact pick depends on your board pathing — read the nodes before socketing." },
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
