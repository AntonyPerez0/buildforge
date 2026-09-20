import { ArrowUpRight, BookOpen, FlaskConical, Skull } from "lucide-react";
import type { Build } from "@/data/types";
import { GAMES } from "@/lib/games";
import { cn, formatDate } from "@/lib/utils";
import { DifficultyDots, SectionHeading, TierBadge } from "@/components/ui-bits";
import { ProgressionTimeline } from "@/components/progression-timeline";
import { SectionNav, type SectionNavItem } from "@/components/section-nav";
import { CopyLinkButton, ForkButton } from "@/components/share-buttons";
import { PaperDoll } from "@/components/paper-doll";
import { EndgamePanel } from "@/components/endgame-panel";
import { TalentSpine } from "@/components/talent-spine";
import { FadeUp } from "@/components/motion";
import { buildHref } from "@/lib/builds";

function getSections(build: Build): SectionNavItem[] {
  const items: SectionNavItem[] = [{ id: "level-path", label: "Level path" }];
  if (build.endgame) items.push({ id: "endgame", label: "Endgame" });
  items.push(
    { id: "gear", label: "Gear" },
    { id: "stats", label: "Stats" },
    { id: "rotation", label: "Rotation" },
    { id: "watch-outs", label: "Watch-outs" },
    { id: "extras", label: "Extras" },
    { id: "sources", label: "Sources" },
  );
  return items;
}

function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-32 pt-12 sm:pt-16", className)}>
      {children}
    </section>
  );
}

export function BuildDetail({ build }: { build: Build }) {
  const game = GAMES[build.game];

  return (
    <div data-game={build.game} className="world-bg noise">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-line bg-[radial-gradient(80%_100%_at_50%_0%,var(--accent-glow),transparent_70%)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <FadeUp>
            <nav className="flex items-center gap-2 text-xs text-ink-dim" aria-label="Breadcrumb">
              <a href={game.href} className="hover:text-ink">
                {game.label}
              </a>
              <span>/</span>
              <span className="text-ink-muted">Builds</span>
              <span>/</span>
              <span className="text-ink">{build.name}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <TierBadge tier={build.tier} />
                  <span className="accent-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                    {build.className}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-dim">
                    Difficulty <DifficultyDots level={build.difficulty} />
                  </span>
                  <span className="text-xs text-ink-dim">{build.patchLabel}</span>
                </div>
                <h1
                  className={cn(
                    "mt-4 text-4xl font-bold tracking-wide text-ink sm:text-5xl",
                    game.displayClass,
                  )}
                >
                  {build.name}
                </h1>
                <p className="mt-3 text-base text-(--accent-bright)">{build.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{build.summary}</p>
              </div>

              <div className="flex flex-col items-start gap-3 sm:items-end">
                <div className="flex flex-wrap gap-2">
                  <ForkButton buildId={build.id} />
                  <CopyLinkButton path={buildHref(build)} />
                </div>
                <p className="text-[11px] text-ink-dim">
                  Updated {formatDate(build.lastSynced)} · {build.dataQuality === "authored" ? "In-house authored" : "Synced snapshot"}
                </p>
              </div>
            </div>

            {/* Quick facts */}
            {build.meta ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {Object.entries(build.meta).map(([k, v]) => (
                  <span
                    key={k}
                    className="rounded-lg border border-line bg-surface px-3 py-2 text-xs"
                  >
                    <span className="font-semibold text-(--accent-bright)">{k}</span>{" "}
                    <span className="text-ink-muted">{v}</span>
                  </span>
                ))}
              </div>
            ) : null}
          </FadeUp>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionNav items={getSections(build)} />

        {/* ─── Level path ───────────────────────────────────── */}
        <Section id="level-path">
          <FadeUp>
            <SectionHeading
              eyebrow="Zero guessing"
              title="The level path"
              sub="Every band is a range of levels. Take the steps in order as you reach the levels — each one says why it beats the alternative."
            />
          </FadeUp>
          {build.skillPriority ? (
            <FadeUp className="mt-6">
              <div className="panel flex flex-wrap items-center gap-2 p-4">
                <FlaskConical className="h-4 w-4 shrink-0 text-(--accent-bright)" />
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Priority:</span>
                {build.skillPriority.map((s, i) => (
                  <span key={s} className="rounded-md border border-line bg-surface-raised px-2.5 py-1 text-xs text-ink">
                    <span className="font-mono text-ink-dim">{i + 1}.</span> {s}
                  </span>
                ))}
              </div>
            </FadeUp>
          ) : null}

          {/* ─── Talent spine (Forever) ─────────────────────── */}
          {build.game === "forever" && build.specGates ? (
            <FadeUp className="mt-6">
              <TalentSpine build={build} />
            </FadeUp>
          ) : null}

          <div className="mt-10">
            <ProgressionTimeline buildId={build.id} bands={build.progression} />
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
              eyebrow="Character screen"
              title="Gear priorities"
              sub="Hover or tap any slot for the full item card — target item, stat lines and what to look for. Below the doll: the plain-text checklist."
            />
          </FadeUp>
          <FadeUp className="mt-8">
            <PaperDoll build={build} />
          </FadeUp>
          <FadeUp className="mt-6">
            <div className="panel divide-y divide-line/70">
              {build.gear.map((g) => (
                <div key={g.slot} className="flex flex-col gap-1.5 p-4 sm:flex-row sm:items-baseline sm:gap-4">
                  <p className="w-28 shrink-0 text-sm font-semibold text-(--accent-bright)">{g.slot}</p>
                  <div className="min-w-0">
                    <p className="text-sm text-ink">{g.target}</p>
                    {g.item ? (
                      <p className="mt-0.5 text-xs text-ink-dim">
                        {g.item.quality === "unique" ? "Unique" : g.item.quality === "legendary" ? "Legendary" : g.item.quality === "epic" ? "Epic" : g.item.quality === "rare" ? "Rare" : "Item"}
                        {" · "}
                        {g.item.source ?? g.item.type}
                      </p>
                    ) : null}
                    {g.affixes && g.affixes.length > 0 ? (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {g.affixes.map((a) => (
                          <span key={a} className="rounded border border-line bg-surface px-2 py-0.5 text-xs text-ink-muted">
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
        </Section>

        {/* ─── Stats ────────────────────────────────────────── */}
        <Section id="stats">
          <FadeUp>
            <SectionHeading
              eyebrow="Stat weights"
              title="What to chase on every item"
            />
          </FadeUp>
          <FadeUp className="mt-8">
            <ol className="grid gap-3 md:grid-cols-2">
              {build.statPriority.map((s, i) => (
                <li key={s.label} className="panel flex items-start gap-4 p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-(--accent-border) bg-(--accent-wash) font-mono text-sm font-bold text-(--accent-bright)">
                    {i + 1}
                  </span>
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
              title="Rotation priorities"
              sub="Follow top to bottom — earlier steps take precedence over later ones."
            />
          </FadeUp>
          <FadeUp className="mt-8">
            <div className="grid gap-4 md:grid-cols-3">
              {build.rotation.map((phase) => (
                <div key={phase.phase} className="panel p-5">
                  <p className="eyebrow text-(--accent-bright)">{phase.phase}</p>
                  <ol className="mt-4 space-y-3">
                    {phase.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink-muted">
                        <span className="mt-0.5 font-mono text-[11px] font-bold text-(--accent-bright)">{i + 1}</span>
                        {step}
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
                <li key={i} className="panel flex items-start gap-3 border-(--accent-border)/50 p-4">
                  <Skull className="mt-0.5 h-4 w-4 shrink-0 text-(--accent-bright)" />
                  <p className="text-[13px] leading-relaxed text-ink-muted">{w}</p>
                </li>
              ))}
            </ul>
          </FadeUp>
        </Section>

        {/* ─── Extras ───────────────────────────────────────── */}
        {build.extras ? (
          <Section id="extras">
            <FadeUp>
              <SectionHeading eyebrow="Loadout layers" title="Aspects, glyphs, enchants & more" />
            </FadeUp>
            <FadeUp className="mt-8">
              <div className="grid gap-4 md:grid-cols-2">
                {build.extras.map((group) => (
                  <div key={group.label} className="panel p-5">
                    <p className="eyebrow text-(--accent-bright)">{group.label}</p>
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
              sub="BuildForge summarizes; the guides own the content. Values shift with every patch — these are the live sources to verify against."
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
                    <BookOpen className="h-4 w-4 text-(--accent-bright)" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{src.site}</p>
                      <p className="text-xs text-ink-dim">{src.label ?? "Full guide"}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-ink-dim transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent-bright)" />
                </a>
              ))}
            </div>
          </FadeUp>
          <FadeUp className="mt-6">
            <p className="text-xs leading-relaxed text-ink-dim">
              This page is a second-screen companion, not a replacement for the source guides.
              Seasonal patches rebalance values — check the linked guides for exact numbers
              before committing respec gold.
            </p>
          </FadeUp>
        </Section>
      </div>
    </div>
  );
}
