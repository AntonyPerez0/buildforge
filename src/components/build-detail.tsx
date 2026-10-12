import Link from "next/link";
import { AlertTriangle, ArrowUpRight, BookOpen, FlaskConical, Hourglass, Info, Skull } from "lucide-react";
import type { Build } from "@/data/types";
import { GAMES } from "@/lib/games";
import { FOREVER_DATES, FOREVER_IN_BETA, FOREVER_LAUNCH_LEVEL_CAP, FOREVER_LEVEL_CAP } from "@/lib/forever";
import { buildTiers, getTierList, headlineTier } from "@/lib/tiers";
import { cn, formatDate } from "@/lib/utils";
import { D4Ornament, DifficultyDots, SectionHeading, SourceTierPills, TierBadge } from "@/components/ui-bits";
import { ProgressionTimeline } from "@/components/progression-timeline";
import { SectionNav, type SectionNavItem } from "@/components/section-nav";
import { CopyLinkButton, ForkButton } from "@/components/share-buttons";
import { PaperDoll } from "@/components/paper-doll";
import { EndgamePanel } from "@/components/endgame-panel";
import { TalentSpine } from "@/components/talent-spine";
import { TalentLevelTable } from "@/components/talent-level-table";
import { FadeUp } from "@/components/motion";
import { buildHref } from "@/lib/builds";
import { classColor } from "@/lib/class-colors";

function getSections(build: Build): SectionNavItem[] {
  const isD4 = build.game === "d4";
  const items: SectionNavItem[] = [{ id: "level-path", label: isD4 ? "Level path" : "Quest log" }];
  if (build.endgame) items.push({ id: "endgame", label: "Endgame" });
  items.push(
    { id: "gear", label: isD4 ? "Equipment" : "Character" },
    { id: "stats", label: "Stats" },
    { id: "rotation", label: isD4 ? "Rotation" : "Action bar" },
    { id: "watch-outs", label: "Watch-outs" },
  );
  if (build.extras) items.push({ id: "extras", label: "Extras" });
  items.push({ id: "sources", label: "Sources" });
  return items;
}

function Section({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("scroll-mt-32 pt-12 sm:pt-16", className)}>
      {children}
    </section>
  );
}

export function BuildDetail({ build }: { build: Build }) {
  const game = GAMES[build.game];
  const isD4 = build.game === "d4";
  const tiers = buildTiers(build);
  const headline = headlineTier(build);
  const foreverTierList = getTierList("icyveins-forever-hub");

  return (
    <div data-game={build.game} className="world-bg noise">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className={isD4 ? "d4-hero" : "wowui-banner"}>
        {isD4 ? <div className="d4-embers" aria-hidden /> : null}
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <FadeUp>
            <nav
              className={cn("flex flex-wrap items-center gap-2 text-xs", isD4 ? "d4-season !text-[10px]" : "wowui-gold-label !text-[11px]")}
              aria-label="Breadcrumb"
            >
              <Link href={game.href} className="hover:underline">
                {game.label}
              </Link>
              <span aria-hidden>/</span>
              <Link href={`${game.href}#builds`} className="hover:underline">
                Build paths
              </Link>
              <span aria-hidden>/</span>
              <span className="opacity-80">{build.name}</span>
            </nav>

            <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
              <div className="min-w-0">
                <p
                  className={cn("text-xs font-semibold tracking-[0.2em] uppercase", isD4 && "d4-season !text-[11px]")}
                  style={isD4 ? undefined : { color: classColor(build.className), textShadow: "1px 1px 0 #000" }}
                >
                  {build.className} · {build.role}
                </p>
                <h1
                  className={cn(
                    "mt-3 text-4xl sm:text-5xl",
                    isD4 ? "d4-title" : "wowui-title display-forever font-bold tracking-wide",
                  )}
                >
                  {build.name}
                </h1>
                {isD4 ? <D4Ornament className="mt-4" /> : null}
                <p className={cn("mt-4 text-base", isD4 ? "text-[#e0b48a]" : "text-[#ffd100]")}>{build.tagline}</p>
                <p className={cn("mt-3 max-w-2xl text-sm leading-relaxed", isD4 ? "text-ink-muted" : "wowui-sub")}>
                  {build.summary}
                </p>
              </div>

              {/* Character card */}
              <div className={cn("p-5", isD4 ? "d4-frame" : "wow-frame")}>
                <div className="relative flex items-center gap-3">
                  <TierBadge tier={headline.tier} size="lg" />
                  <div className="min-w-0">
                    <p className={cn("text-sm", isD4 ? "font-[family-name:var(--font-cinzel)] font-bold tracking-[0.12em] text-[#efe4d0] uppercase" : "text-[#ffd100]")}>
                      {headline.fromSource ? `Tier ${headline.tier}` : `Rated ${headline.tier}`}
                    </p>
                    <p className="text-xs text-ink-dim">{headline.basis}</p>
                  </div>
                </div>
                <div className="relative mt-4 space-y-2">
                  {tiers.length > 0 ? (
                    <SourceTierPills tiers={tiers} />
                  ) : isD4 ? (
                    <SourceTierPills tiers={[]} emptyLabel="Not on S15 tier lists" />
                  ) : (
                    <a
                      href={foreverTierList?.url ?? "https://www.icy-veins.com/wow-forever/tier-list-hub"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="src-tier"
                      data-tier="none"
                    >
                      <span className="src-tier-site">Icy Veins tier lists</span>
                      <span className="src-tier-letter">
                        {foreverTierList?.status === "coming-soon" ? "Soon" : "Not ranked"}
                      </span>
                    </a>
                  )}
                </div>
                <dl className="relative mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <dt className="text-ink-dim">Difficulty</dt>
                  <dd className="flex justify-end">
                    <DifficultyDots level={build.difficulty} />
                  </dd>
                  <dt className="text-ink-dim">Patch</dt>
                  <dd className="text-right text-ink-muted">{build.patchLabel}</dd>
                  <dt className="text-ink-dim">Path updated</dt>
                  <dd className="text-right text-ink-muted">{formatDate(build.lastSynced)}</dd>
                  <dt className="text-ink-dim">Level bands</dt>
                  <dd className="text-right text-ink-muted">{build.progression.length}</dd>
                </dl>
                <div className="relative mt-5 grid gap-2 [&>*]:w-full">
                  <ForkButton buildId={build.id} />
                  <CopyLinkButton path={buildHref(build)} />
                </div>
              </div>
            </div>

            {build.meta ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {Object.entries(build.meta).map(([k, v]) => (
                  <span key={k} className="kv">
                    <span className="kv-key">{k}</span> <span className="kv-val">{v}</span>
                  </span>
                ))}
              </div>
            ) : null}
          </FadeUp>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {!isD4 && FOREVER_IN_BETA ? (
          <FadeUp className="pt-6">
            <div className="panel flex items-start gap-3 p-4">
              <Hourglass className="mt-0.5 h-4 w-4 shrink-0 text-(--accent-bright)" />
              <p className="text-[13px] leading-relaxed text-ink">
                <span className="font-semibold text-(--accent-bright)">The Forever beta caps at level {FOREVER_LEVEL_CAP}</span>{" "}
                <span className="text-ink-muted">
                  (beta ends {FOREVER_DATES.betaEnds}). This path is trimmed to what&apos;s reachable now; the full
                  level 1–{FOREVER_LAUNCH_LEVEL_CAP} track, endgame chapters and raid prep return at launch on{" "}
                  {FOREVER_DATES.launch}.{" "}
                  {headline.fromSource
                    ? `Its tier comes from the ${headline.basis} tier list.`
                    : foreverTierList?.status === "coming-soon"
                      ? `The ${headline.tier} rating is BuildForge's own — Icy Veins' Forever tier lists are marked Coming Soon and Maxroll doesn't cover Forever.`
                      : `The ${headline.tier} rating is BuildForge's own — no Icy Veins Forever tier list ranks this spec yet.`}
                </span>
              </p>
            </div>
          </FadeUp>
        ) : null}
        {isD4 && tiers.length === 0 ? (
          <FadeUp className="pt-6">
            <div className="panel flex items-start gap-3 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-(--accent-bright)" />
              <p className="text-[13px] leading-relaxed text-ink-muted">
                <span className="font-semibold text-ink">Off the Season 15 lists.</span> Neither Maxroll nor Icy Veins
                ranks this build this season, so the {headline.tier} shown is BuildForge&apos;s rating for a
                leveling-friendly archetype. For the current meta, see the{" "}
                <Link href="/d4#tier-list" className="font-semibold text-(--accent-bright) hover:underline">
                  Season 15 tier list
                </Link>
                .
              </p>
            </div>
          </FadeUp>
        ) : null}

        <SectionNav items={getSections(build)} />

        {/* ─── Level path ───────────────────────────────────── */}
        <Section id="level-path">
          <FadeUp>
            <SectionHeading
              eyebrow={isD4 ? "Zero guessing" : "Quest log"}
              title={isD4 ? "The level path" : "Leveling objectives"}
              sub={
                isD4
                  ? "Every band is a range of levels. Take the steps in order as you reach them — each one says why it beats the alternative."
                  : "Each entry is a level band, written like a quest: objectives in order, each with the reason it beats the alternative."
              }
            />
          </FadeUp>
          {build.skillPriority ? (
            <FadeUp className="mt-6">
              <div className="panel flex flex-wrap items-center gap-2 p-4">
                <FlaskConical className="h-4 w-4 shrink-0 text-(--accent-bright)" />
                <span className="text-xs font-semibold tracking-wider text-ink-muted uppercase">Priority:</span>
                {build.skillPriority.map((s, i) => (
                  <span key={s} className="kv">
                    <span className="font-mono text-ink-dim">{i + 1}.</span> <span className="text-ink">{s}</span>
                  </span>
                ))}
              </div>
            </FadeUp>
          ) : null}

          {build.game === "forever" && build.specGates ? (
            <FadeUp className="mt-6">
              <TalentSpine build={build} />
            </FadeUp>
          ) : null}
          {build.game === "forever" && build.talentRuns?.length ? (
            <FadeUp className="mt-4">
              <TalentLevelTable build={build} />
            </FadeUp>
          ) : null}

          <div className="mt-10">
            <ProgressionTimeline buildId={build.id} bands={build.progression} game={build.game} />
          </div>
        </Section>

        {/* ─── Endgame ──────────────────────────────────────── */}
        {build.endgame ? (
          <Section id="endgame">
            <FadeUp>
              <SectionHeading
                eyebrow="Beyond the cap"
                title="Endgame chapters"
                sub="The game after the level path — the loop where most hours go. Same checkable flow as the level path."
              />
            </FadeUp>
            <div className="mt-8">
              <EndgamePanel buildId={build.id} phases={build.endgame} />
            </div>
          </Section>
        ) : null}

        {/* ─── Gear ─────────────────────────────────────────── */}
        <Section id="gear">
          <FadeUp>
            <SectionHeading
              eyebrow={isD4 ? "Equipment" : "Character info"}
              title="Gear priorities"
              sub={
                isD4
                  ? "Hover or tap any slot for the full item card. Below the doll: the plain-text checklist."
                  : "Hover or tap any slot for its tooltip. The list beside the character frame covers every slot in plain text."
              }
            />
          </FadeUp>
          <div className={cn("mt-8", !isD4 && "grid grid-cols-1 items-start gap-6 lg:grid-cols-[404px_minmax(0,1fr)]")}>
            <FadeUp className={cn(!isD4 && "flex min-w-0 flex-col items-center lg:items-start")}>
              <PaperDoll build={build} />
              {!isD4 ? (
                <p className="mt-4 max-w-[404px] text-[11px] leading-relaxed text-ink-dim">
                  Forever reworked every loot table, so items marked Classic-era reference are stat benchmarks, not
                  Forever drop locations — the linked Icy Veins guide tracks real drops.
                </p>
              ) : null}
            </FadeUp>
            <FadeUp className={cn(isD4 && "mt-6")}>
              <div className="panel">
                {build.gear.map((g, i) => (
                  <div
                    key={`${g.slot}-${i}`}
                    className="flex flex-col gap-1.5 border-b border-line/70 p-4 last:border-0 sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <p className="display w-28 shrink-0 text-sm font-semibold text-(--accent-bright)">{g.slot}</p>
                    <div className="min-w-0">
                      <p className="text-sm text-ink">{g.target}</p>
                      {g.item ? (
                        <p className="mt-0.5 text-xs text-ink-dim">
                          {g.item.name}
                          {" · "}
                          {g.item.source ?? g.item.type}
                        </p>
                      ) : null}
                      {g.affixes && g.affixes.length > 0 ? (
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {g.affixes.map((a) => (
                            <span key={a} className="kv !px-2 !py-0.5 text-ink-muted">
                              {a}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </Section>

        {/* ─── Stats ────────────────────────────────────────── */}
        <Section id="stats">
          <FadeUp>
            <SectionHeading eyebrow="Stat weights" title="What to chase on every item" />
          </FadeUp>
          <FadeUp className="mt-8">
            <ol className="grid gap-3 md:grid-cols-2">
              {build.statPriority.map((s, i) => (
                <li key={`${s.label}-${i}`} className="panel flex items-start gap-4 p-4">
                  <span className="num">{i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{s.label}</p>
                    {s.note ? <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{s.note}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </FadeUp>
        </Section>

        {/* ─── Rotation ─────────────────────────────────────── */}
        <Section id="rotation">
          <FadeUp>
            <SectionHeading
              eyebrow="Button order"
              title={isD4 ? "Rotation priorities" : "Your action bar"}
              sub="Follow top to bottom — earlier steps take precedence over later ones."
            />
          </FadeUp>
          <FadeUp className="mt-8">
            <div className="grid gap-4 md:grid-cols-3">
              {build.rotation.map((phase, p) => (
                <div key={`${phase.phase}-${p}`} className="panel p-5">
                  <p className="display text-sm font-semibold tracking-wide text-(--accent-bright)">{phase.phase}</p>
                  <ol className="mt-4 space-y-3">
                    {phase.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] leading-relaxed text-ink-muted">
                        {isD4 ? (
                          <span className="num num-sm mt-0.5">{i + 1}</span>
                        ) : (
                          <span className="wow-action" data-key={i + 1} aria-hidden>
                            {step.trim().charAt(0).toUpperCase()}
                          </span>
                        )}
                        <span className={cn(!isD4 && "pt-1.5")}>
                          <span className="sr-only">Step {i + 1}: </span>
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </FadeUp>
        </Section>

        {/* ─── Watch-outs ───────────────────────────────────── */}
        <Section id="watch-outs">
          <FadeUp>
            <SectionHeading
              eyebrow="Zero guessing"
              title="Watch-outs"
              sub="The mistakes that cost levels, kills and raid slots — flagged before you make them."
            />
          </FadeUp>
          <FadeUp className="mt-8">
            <ul className="grid gap-3 md:grid-cols-2">
              {build.watchOuts.map((w, i) => (
                <li key={i} className={cn("flex items-start gap-3 p-4", isD4 ? "panel" : "wow-dialog")}>
                  {isD4 ? (
                    <Skull className="mt-0.5 h-4 w-4 shrink-0 text-(--accent-bright)" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd100]" />
                  )}
                  <p className={cn("text-[13px] leading-relaxed", isD4 ? "text-ink-muted" : "text-white")}>{w}</p>
                </li>
              ))}
            </ul>
          </FadeUp>
        </Section>

        {/* ─── Extras ───────────────────────────────────────── */}
        {build.extras ? (
          <Section id="extras">
            <FadeUp>
              <SectionHeading
                eyebrow="Loadout layers"
                title={isD4 ? "Aspects, runes & more" : "Enchants, consumables & more"}
              />
            </FadeUp>
            <FadeUp className="mt-8">
              <div className="grid gap-4 md:grid-cols-2">
                {build.extras.map((group) => (
                  <div key={group.label} className="panel p-5">
                    <p className="display text-sm font-semibold tracking-wide text-(--accent-bright)">{group.label}</p>
                    <ul className="mt-4 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item.name} className="flex items-start justify-between gap-3 text-sm">
                          <span className="font-medium text-ink">{item.name}</span>
                          {item.note ? (
                            <span className="text-right text-xs leading-relaxed text-ink-dim">{item.note}</span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </FadeUp>
          </Section>
        ) : null}

        {/* ─── Sources ──────────────────────────────────────── */}
        <Section id="sources" className="pb-24">
          <FadeUp>
            <SectionHeading
              eyebrow="Verify & go deeper"
              title="Sources & attribution"
              sub="BuildForge summarizes; the guides own the content. Values shift every patch — these are the live sources to verify against."
            />
          </FadeUp>
          <FadeUp className="mt-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {build.sources.map((src) => (
                <a
                  key={`${src.site}-${src.url}`}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel panel-hover group flex items-center justify-between gap-3 p-4"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 shrink-0 text-(--accent-bright)" />
                    <div>
                      <p className="display text-sm font-semibold text-ink">{src.site}</p>
                      <p className="text-xs text-ink-dim">{src.label ?? "Full guide"}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-dim transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent-bright)" />
                </a>
              ))}
            </div>
          </FadeUp>
          <FadeUp className="mt-6">
            <p className="text-xs leading-relaxed text-ink-dim">
              This page is a second-screen companion, not a replacement for the source guides. Tiers come from the
              Maxroll and Icy Veins tier lists, checked nightly — see the{" "}
              <Link href="/sync" className="text-(--accent-bright) hover:underline">
                sync report
              </Link>{" "}
              for when each list was last read.
            </p>
          </FadeUp>
        </Section>
      </div>
    </div>
  );
}
