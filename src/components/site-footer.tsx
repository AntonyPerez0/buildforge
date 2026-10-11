import Link from "next/link";
import { Logo } from "@/components/logo";
import { latestSyncDate } from "@/lib/snapshots";
import { formatDate } from "@/lib/utils";

const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Diablo IV",
    links: [
      { label: "Build paths", href: "/d4#builds" },
      { label: "Season 15 tier list", href: "/d4#tier-list" },
      { label: "Live guide index", href: "/d4#guides" },
    ],
  },
  {
    title: "WoW Forever",
    links: [
      { label: "Build paths", href: "/forever#builds" },
      { label: "Launch hub", href: "/forever/launch" },
      { label: "Classic+ briefing", href: "/forever" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Custom Build Forge", href: "/builder" },
      { label: "Data sources", href: "/about" },
      { label: "Nightly sync report", href: "/sync" },
      { label: "GitHub", href: "https://github.com/AntonyPerez0/buildforge", external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer data-game="neutral" className="mt-24 border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-5">
        <div className="space-y-4 md:col-span-2">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            The second-screen build companion for Diablo IV and World of Warcraft: Forever. Level-by-level paths,
            gear priorities and tiers traced to Maxroll and Icy Veins.
          </p>
          <p className="text-xs text-ink-dim">
            Last sync {formatDate(latestSyncDate())} · robots-aware, rate-limited, attributed.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-3 text-ink-dim">{col.title}</p>
            <ul className="space-y-2 text-sm text-ink-muted">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="hover:text-ink">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs leading-relaxed text-ink-dim sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            Fan-made and not affiliated with or endorsed by Blizzard Entertainment, Maxroll or Icy Veins. Diablo and
            World of Warcraft are trademarks of Blizzard Entertainment, Inc. Interface styling is original CSS and
            SVG — no game assets.
          </p>
          <p className="shrink-0">© 2026 BuildForge · MIT</p>
        </div>
      </div>
    </footer>
  );
}
