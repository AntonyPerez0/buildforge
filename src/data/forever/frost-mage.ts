import type { Build } from "@/data/types";

export const frostMage: Build = {
  id: "forever-frost-mage",
  game: "forever",
  slug: "frost-mage",
  name: "Frost Mage",
  className: "Mage",
  role: "Ranged control + AoE artillery",
  tier: "S",
  difficulty: 1,
  tagline: "Frostbolt, Shatter crits, and the best AoE leveling in Azeroth.",
  summary:
    "Frost is the mage's safety net turned weapon: perma-chilled targets, Shatter crits on frozen packs, and Blizzard-fueled AoE grinding that levels in waves. Forever changes the math in your favor — hit and crit are unified across spells, healer gear now also grants spell damage, and the new dungeons feed casters real upgrades.",
  patchLabel: "Forever Beta · Sep 2026",
  lastSynced: "2026-09-19",
  dataQuality: "authored",
  sources: [
    { site: "ClassicWoW.gg", url: "https://classicwow.gg/forever/guides/mage/frost", label: "ClassicWoW.gg Frost guide" },
    { site: "Wowhead", url: "https://www.wowhead.com/forever", label: "Wowhead Forever hub" },
    { site: "Blizzard", url: "https://worldofwarcraft.blizzard.com/en-us/news/24302093/carve-a-new-path-with-world-of-warcraft-forever", label: "Official Forever announcement" },
  ],
  meta: {
    "Best races": "Gnome (Alliance) · Undead (Horde) · Orc Mage (new in Forever)",
    "Key mechanic": "Shatter — guaranteed crits on frozen targets",
    "Weapons": "Best spell-damage one-hander + off-hand you can hold",
    "Playstyle": "Kite, freeze, delete — solo or in packs",
    "Professions": "Tailoring + Enchanting (or Herbalism/Alchemy)",
    "Forever note": "Unified hit/crit — one stat now serves spells and weapons",
  },
  skillPriority: [
    "Improved Frostbolt (damage + no loss of casting)",
    "Ice Shards + Shatter (frozen crit machine)",
    "Piercing Ice (flat Frost damage)",
    "Cold Snap + Ice Barrier (survivability engine)",
  ],
  progression: [
    {
      levels: "1–9",
      goal: "Learn the casting rhythm: nuke, chill, blink away",
      steps: [
        { name: "Frostbolt", detail: "Level 1", why: "Your bread and butter forever — trainable at 1, scales with every talent you take." },
        { name: "Arcane Intellect", detail: "Level 1", why: "Free mana pool for you and everyone around you. Cast it on the whole zone." },
        { name: "Fire Blast", detail: "As trained", why: "Instant finisher for the last 10% of every mob's health." },
        { name: "Frost Nova", detail: "As trained", why: "Freeze point-blank threats; the Shatter combo starts here." },
        { name: "Conjure Water/Food", detail: "As trained", why: "Never buy consumables you can conjure — your mana economy starts here." },
      ],
    },
    {
      levels: "10–14",
      goal: "First talent points: straight into Frostbolt",
      steps: [
        { name: "Improved Frostbolt", detail: "Ranks 1–5", why: "Reduces cast time below 3s and adds damage per rank — the talent you never regret." },
        { name: "Wand", detail: "Get one", why: "Mana-out moments are wand moments; Forever's reworked drops feed casters decent wands early." },
      ],
      milestone: "Level 10: talent points begin — one per level, 51 total at 60.",
    },
    {
      levels: "15–19",
      goal: "Crit damage on frozen targets",
      steps: [
        { name: "Ice Shards", detail: "Ranks 1–5", why: "Crits against frozen targets hit like nukes — pairs with Frostbite chill procs before you even have Shatter." },
        { name: "Frostbite", detail: "Ranks 1–3 (if available)", why: "Chill procs from your frost spells set up accidental Shatter windows." },
      ],
    },
    {
      levels: "20–24",
      goal: "Flat scaling + the AoE era begins",
      steps: [
        { name: "Piercing Ice", detail: "Ranks 1–5", why: "Direct % increase to all Frost damage — boring, permanent, excellent." },
        { name: "Blizzard", detail: "Trainer", why: "Your AoE grinding engine — chain-pull entire camps and farm in waves." },
        { name: "Evocation", detail: "Trainer", why: "60% mana back in 8 seconds — the thing that makes AoE grinding sustainable." },
      ],
      milestone: "Level ~20: Blizzard + Evocation unlock wave-grinding. XP rates double.",
    },
    {
      levels: "25–29",
      goal: "Shatter — the spec's signature",
      steps: [
        { name: "Shatter", detail: "Ranks 1–5", why: "Crit chance tripled against frozen targets — with Ice Shards banked, every Frost Nova → Frostbolt is a demolition." },
        { name: "16-point capstone", detail: "Reserved", why: "Forever's new one-point ability at 16 points into the tree — check the beta calculator for the tuned effect." },
      ],
      milestone: "Level ~25: your 16th Frost point unlocks Forever's new capstone ability.",
    },
    {
      levels: "30–34",
      goal: "Control suite and mana sustainability",
      steps: [
        { name: "Cold Snap", detail: "1 point", why: "Resets Frost Nova, Ice Barrier and Cone of Cold on demand — double-nova waves and emergency escapes." },
        { name: "Ice Barrier", detail: "1 point", why: "Absorption shield that turns 'about to die' into 'about to win'. Grab it as soon as its tier opens." },
        { name: "Improved Frost Nova", detail: "Ranks 1–2", why: "Shorter cooldown feeds the Shatter combo loop." },
      ],
    },
    {
      levels: "35–39",
      goal: "Range and depth",
      steps: [
        { name: "Arctic Reach", detail: "Ranks 1–2", why: "Longer Frostbolt/Blizzard range — kite from further, AoE from safer." },
        { name: "Permafrost", detail: "Ranks 1–3", why: "Chill duration means targets stay frozen-adjacent longer — more Shatter windows." },
        { name: "Wand upgrade", detail: "Priority", why: "Forever's reworked dungeon drops include caster upgrades — run Hall of Thanes / Drowned City for your band." },
      ],
    },
    {
      levels: "40–44",
      goal: "Deep Frost burst",
      steps: [
        { name: "Frost Channeling", detail: "If available", why: "Mana cost reduction on Frost spells — extends every Evocation cycle." },
        { name: "Winter's Chill", detail: "If raiding early", why: "Crit debuff utility for the raid — grab once the core kit is complete." },
        { name: "AoE grinding circuit", detail: "Stratholme-era camps", why: "Classic wave-grinding spots still exist; the new zones (Shen'dralas, Riverglades) add fresh camps at 40+." },
      ],
    },
    {
      levels: "45–49",
      goal: "Finish the tree, prep for 60",
      steps: [
        { name: "Remaining Frost ranks", detail: "Complete", why: "Top out Piercing Ice/Arctic Reach lines — check the beta calculator for the tuned endgame split." },
        { name: "Secondary spec thought", detail: "Arcane dip", why: "Arcane Subtlety/Improved Arcane Explosion are common filler once Frost core is done." },
      ],
    },
    {
      levels: "50–54",
      goal: "Dungeon-tier gear sweep",
      steps: [
        { name: "Spell damage gear", detail: "Priority", why: "Forever lets healing gear grant spell damage too — caster upgrades are everywhere; grab spell-power pieces from the nine new dungeons." },
        { name: "Ice Barrier ranks", detail: "As trainable", why: "Bigger absorption, longer survival in AoE packs." },
      ],
    },
    {
      levels: "55–59",
      goal: "Enchant and consumable bench",
      steps: [
        { name: "Weapon enchant", detail: "Spell power weapon buff", why: "Classic-style weapon oils/spell enchants scale your Frostbolt into the roof — verify current names/ranks in the linked guide." },
        { name: "Consumables", why: "Spell elixirs + mana potions for the dungeon circuit." },
        { name: "AoE spot list", detail: "Plan the grind", why: "Know your 50-60 AoE camps before you hit them — Frost's XP rate is planning-dependent." },
      ],
    },
    {
      levels: "60 / Raid-ready",
      goal: "Barrow Deeps (10) · Hyjal Summit (20) · Onyxia's Lair (40) — December 9",
      steps: [
        { name: "Final talents", detail: "Deep Frost core", why: "Ice Shards + Shatter + Piercing Ice + Cold Snap with Arctic Reach; verify the beta-tuned raid build in the linked calculator." },
        { name: "Hit target", detail: "Unified system", why: "Forever's unified hit/crit replaces classic spell-hit tables — check current thresholds in the linked guide." },
        { name: "Raid role", detail: "AoE + control", why: "Blizzard on adds, Nova control on packs, Arcane Intellect and food for the raid forever." },
      ],
      milestone: "Raids unlock December 9 — spend launch→December grinding dungeons and banking conjure stations' worth of supplies.",
    },
  ],
  statPriority: [
    { label: "Spell Damage (Frost)", note: "Flat Frost power scales Frostbolt, Blizzard and Cone of Cold alike." },
    { label: "Hit (unified)", note: "Forever merges spell and melee hit into one system — spell hit gear is everywhere now." },
    { label: "Crit", note: "With Shatter uptime, crits on frozen targets are your burst ceiling." },
    { label: "Intellect", note: "Mana pool = waves of AoE grinding without downtime." },
    { label: "Spirit", note: "Out-of-combat regen between pulls; secondary but real for a conjure-drinking class." },
  ],
  gear: [
    { slot: "Head", target: "Cloth with spell damage + int", affixes: ["Spell Damage", "Intellect", "Crit"] },
    { slot: "Shoulders", target: "Reworked dungeon caster drops", affixes: ["Spell Damage", "Intellect"] },
    { slot: "Chest", target: "Robe with flat spell power", affixes: ["Spell Damage", "Intellect", "Spirit"] },
    { slot: "Wrists", target: "Spell damage bracers — enchant immediately", affixes: ["Spell Damage", "Intellect"] },
    { slot: "Hands", target: "Spell damage or crit gloves", affixes: ["Spell Damage", "Crit"] },
    { slot: "Waist", target: "Any caster cloth without a downside", affixes: ["Spell Damage", "Intellect"] },
    { slot: "Legs", target: "Caster pants + armor kit", affixes: ["Spell Damage", "Intellect"] },
    { slot: "Feet", target: "Minor Speed enchant", affixes: ["Intellect", "Movement via enchant"] },
    { slot: "Weapon", target: "One-handed with off-hand — highest spell damage pair available", affixes: ["Spell Damage", "Intellect"], unique: "New-dungeon caster weapons were fully reworked — check the itemization guide for the current BiS list." },
    { slot: "Wand (Ranged)", target: "Wand with damage — wand weaving saves mana between casts", affixes: ["Damage", "Spell Damage"] },
    { slot: "Trinkets", target: "Flat spell power or on-use burst", affixes: ["Spell Power", "On-use effects"] },
    { slot: "Rings", target: "Spell damage + int", affixes: ["Spell Damage", "Intellect", "Hit"] },
    { slot: "Necklace", target: "Caster necklace with stam", affixes: ["Spell Damage", "Intellect", "Stamina"] },
  ],
  rotation: [
    {
      phase: "Pull",
      steps: [
        "Arcane Intellect on the group, always refreshed.",
        "Single target: open with Frostbolt, Fire Blast the final 10%.",
        "AoE pull: gather 4-8 mobs, Frost Nova when they close in.",
      ],
    },
    {
      phase: "Standard rotation",
      steps: [
        "Frostbolt spam — it is your damage, your chill and your Shatter setup.",
        "Frost Nova when something reaches melee range, then Frostbolt the frozen target (Shatter crit).",
        "Cold Snap to reset Nova for a second freeze window when needed.",
      ],
    },
    {
      phase: "AoE waves / Burst",
      steps: [
        "Blizzard from max range in the center of the pack; Cone of Cold when they close.",
        "Ice Barrier before every wave — absorb first, ask questions later.",
        "Evocation after the wave dies; re-conjure water on cooldown.",
      ],
    },
  ],
  watchOuts: [
    "Never stand in melee range without Nova or Barrier — Frost's safety is positional, not passive.",
    "Don't over-pull AoE waves without Ice Barrier ranks — a resist-locked Nova is a corpse timer.",
    "Forever's unified hit/crit means old spell-hit tables are wrong — check the linked calculator, not classic memory.",
    "Healing gear now grants spell damage — don't vendor a caster piece just because it says 'healing' on it.",
    "Camp buffs don't stack with matching class buffs — coordinate camp food with the raid's mage food.",
    "No flying mounts — plan AoE grind circuits on the ground, especially in the new zones.",
    "Raids open December 9 — use the runway to farm the nine new dungeons instead of rushing.",
  ],
  extras: [
    {
      label: "Core Enchants",
      items: [
        { name: "Weapon spell-power enchant/oil", note: "Classic-style weapon oils for casters — verify current ranks in the guide." },
        { name: "Enchant Boots — Minor Speed", note: "Kiting is life." },
        { name: "Enchant Bracers — Intellect", note: "Mana pool for wave grinding." },
        { name: "Chest — Greater Mana regeneration style enchants", note: "Sustain between pulls." },
      ],
    },
    {
      label: "Consumables",
      items: [
        { name: "Wizard Oil", note: "Flat spell power before bosses." },
        { name: "Elixir of Frost Power (or generic spell elixir)", note: "Frost damage scaling." },
        { name: "Major Mana Potions", note: "Burn during Blizzard waves." },
        { name: "Conjured food/water", note: "Free — always carry a full stack." },
      ],
    },
    {
      label: "Leveling Quick Reference",
      items: [
        { name: "Level ~20", note: "Blizzard + Evocation — AoE grinding unlocks." },
        { name: "Level ~25", note: "16-point Forever capstone (verify in beta calculator)." },
        { name: "Level 30+", note: "Cold Snap + Ice Barrier — control suite complete." },
        { name: "Level 40+", note: "Deep Frost — Shatter combos hit critical mass." },
        { name: "Level 60", note: "Raid-ready: Deep Frost, spell-power gear, Dec 9 raids." },
      ],
    },
  ],
};
