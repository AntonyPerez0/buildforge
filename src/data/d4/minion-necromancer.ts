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
    },
    {
      slot: "Chest",
      target: "Tanky stat stick",
      affixes: ["Total Armor", "Damage Reduction", "Max Life", "Minion Life"],
    },
    {
      slot: "Gloves",
      target: "Attack-speed and proc tuning",
      affixes: ["Attack Speed", "Critical Strike Chance", "Lucky Hit Chance", "Ranks to Corpse Explosion"],
    },
    {
      slot: "Pants",
      target: "Pure defense",
      affixes: ["Total Armor", "Damage Reduction", "Max Life"],
    },
    {
      slot: "Boots",
      target: "Movement + sustain",
      affixes: ["Movement Speed", "Damage Reduction", "Max Life"],
    },
    {
      slot: "Weapons",
      target: "Scythe (or Wand + Focus)",
      affixes: ["Intelligence", "Critical Strike Damage", "Shadow Damage", "Damage to Close Enemies"],
      unique: "Aspect of Frenzied Dead on weapons — minion attack speed is the leveling multiplier.",
    },
    {
      slot: "Amulet",
      target: "Skill ranks + movement",
      affixes: ["Movement Speed", "Cooldown Reduction", "Damage", "Intelligence"],
    },
    {
      slot: "Rings",
      target: "Crit + shadow scaling",
      affixes: ["Critical Strike Chance", "Lucky Hit Chance", "Shadow Damage", "Damage"],
      unique: "Ring of Mendeln is the endgame target if you get one to drop — build around it only after checking live tuning.",
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
