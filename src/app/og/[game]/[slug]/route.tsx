import { ImageResponse } from "next/og";
import type { GameId } from "@/data/types";
import { BUILDS, getBuild } from "@/lib/builds";
import { GAMES } from "@/lib/games";
import { headlineTier } from "@/lib/tiers";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { game: "neutral", slug: "site" },
    { game: "d4", slug: "hub" },
    { game: "forever", slug: "hub" },
    ...BUILDS.map((b) => ({ game: b.game, slug: b.slug })),
  ];
}

const TIER_COLORS: Record<string, string> = {
  S: "#ffc24b",
  A: "#6ecf8e",
  B: "#7fa8e0",
  C: "#9a98a0",
  D: "#7c7a82",
};

const GAME_ACCENTS: Record<string, { glow: string; chipBg: string; chipText: string }> = {
  d4: { glow: "rgba(212,32,46,0.28)", chipBg: "rgba(212,32,46,0.14)", chipText: "#ef4652" },
  forever: { glow: "rgba(228,181,74,0.22)", chipBg: "rgba(228,181,74,0.12)", chipText: "#e4b54a" },
  neutral: { glow: "rgba(139,135,244,0.24)", chipBg: "rgba(139,135,244,0.12)", chipText: "#a5a1ff" },
};

interface CardProps {
  accent: string;
  chipBg: string;
  chipText: string;
  chipLabel: string;
  tier?: string;
  /** "BuildForge rating" when no Maxroll / Icy Veins list ranks the build. */
  tierCaption?: string;
  title: string;
  subtitle: string;
  tagline?: string;
}

function Card({ accent, chipBg, chipText, chipLabel, tier, tierCaption, title, subtitle, tagline }: CardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 56,
        backgroundColor: "#0a0a0e",
        backgroundImage: `radial-gradient(circle 700px at 18% -10%, ${accent}, rgba(10,10,14,0) 70%)`,
        color: "#edebe7",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "1px solid #34343f",
              backgroundColor: "#14141b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Inline anvil mark (same path as the site logo) — no emoji, so the
                build never fetches glyphs from a CDN. */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 15h9l2 3H5l-2-3Zm11 3h6l1-2h-5l-2 2Zm-2-3 4.5-7.5L15 5l-5 7 2 3Z"
                stroke={chipText}
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Build<span style={{ color: "#6f6d78", fontWeight: 600 }}>Forge</span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            padding: "8px 18px",
            borderRadius: 999,
            border: `1px solid ${chipText}55`,
            backgroundColor: chipBg,
            color: chipText,
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "0.08em",
          }}
        >
          {chipLabel}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {tier ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                border: `1px solid ${TIER_COLORS[tier] ?? "#9a98a0"}66`,
                backgroundColor: `${TIER_COLORS[tier] ?? "#9a98a0"}1c`,
                color: TIER_COLORS[tier] ?? "#9a98a0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 800,
              }}
            >
              {tier}
            </div>
              {tierCaption ? (
                <span style={{ fontSize: 13, color: "#8b8994", letterSpacing: "0.04em" }}>{tierCaption}</span>
              ) : null}
            </div>
          ) : null}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              {title}
            </span>
            <span style={{ fontSize: 24, color: "#a3a1ab" }}>{subtitle}</span>
          </div>
        </div>
        {tagline ? (
          <span style={{ fontSize: 26, color: "#8b8994", maxWidth: 900, lineHeight: 1.35 }}>
            {tagline}
          </span>
        ) : null}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 20, color: "#6f6d78" }}>
          Level-by-level paths · gear priorities · zero guessing
        </span>
        <span style={{ fontSize: 20, color: "#6f6d78" }}>antonyperez0.github.io/buildforge</span>
      </div>
    </div>
  );
}

async function render(params: { game: string; slug: string }): Promise<ImageResponse> {
  const game = (params.game === "d4" || params.game === "forever" ? params.game : "neutral") as
    | GameId
    | "neutral";
  const accent = GAME_ACCENTS[game] ?? GAME_ACCENTS.neutral;

  if (params.slug === "site") {
    return new ImageResponse(
      (
        <Card
          accent={accent.glow}
          chipBg={accent.chipBg}
          chipText={accent.chipText}
          chipLabel="TWO WORLDS · ZERO GUESSING"
          title="Diablo IV + WoW Forever"
          subtitle="The second-screen build companion — D4 Season 15 & Blizzard's Classic+"
          tagline="Level-by-level build paths, in-game character screens with item tooltips, and a custom build forge."
        />
      ),
      { width: 1200, height: 630 },
    );
  }

  if (params.slug === "hub") {
    const config = GAMES[game as GameId];
    return new ImageResponse(
      (
        <Card
          accent={accent.glow}
          chipBg={accent.chipBg}
          chipText={accent.chipText}
          chipLabel={config.statusChip.toUpperCase()}
          title={config.label.toUpperCase()}
          subtitle={config.description.slice(0, 90) + "…"}
        />
      ),
      { width: 1200, height: 630 },
    );
  }

  const build = getBuild(game as GameId, params.slug);
  if (!build) {
    return new ImageResponse(
      (
        <Card
          accent={accent.glow}
          chipBg={accent.chipBg}
          chipText={accent.chipText}
          chipLabel="BUILDFORGE"
          title="Build not found"
          subtitle="Pick a world and forge on"
        />
      ),
      { width: 1200, height: 630 },
    );
  }

  return new ImageResponse(
    (
      <Card
        accent={accent.glow}
        chipBg={accent.chipBg}
        chipText={accent.chipText}
        chipLabel={`${GAMES[build.game].label} · ${build.patchLabel}`.toUpperCase()}
        tier={headlineTier(build).tier}
        tierCaption={headlineTier(build).fromSource ? undefined : "BuildForge rating"}
        title={build.name}
        subtitle={`${build.className} · ${build.role}`}
        tagline={build.tagline}
      />
    ),
    { width: 1200, height: 630 },
  );
}

export async function GET(_request: Request, context: { params: Promise<{ game: string; slug: string }> }) {
  const { game, slug } = await context.params;
  return render({ game, slug });
}
