import Link from "next/link";
import { Logo } from "@/components/logo";
import { latestSyncDate } from "@/lib/snapshots";
import { formatDate } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            The second-screen build companion for Diablo IV and World of Warcraft: Forever.
            Level-by-level paths, gear priorities and zero guessing — kept in sync with the
            guides you trust.
          </p>
          <p className="max-w-md text-xs leading-relaxed text-ink-dim">
            Not affiliated with Blizzard Entertainment. Diablo and World of Warcraft are
            trademarks of their respective owners. Build data is summarized and linked with
            attribution to Maxroll, Icy Veins, ClassicWoW.gg and Wowhead.
          </p>
          <p className="text-xs text-ink-dim">
            Meta refreshed nightly (last sync {formatDate(latestSyncDate())}) by the
            BuildForge pipeline — robots-aware, rate-limited, attributed.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Games</p>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li><Link href="/d4" className="hover:text-ink">Diablo IV — Season 15</Link></li>
            <li><Link href="/forever" className="hover:text-ink">WoW Forever — Classic+</Link></li>
            <li><Link href="/builder" className="hover:text-ink">Custom Build Forge</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Project</p>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li><Link href="/about" className="hover:text-ink">Data sources &amp; sync</Link></li>
            <li><a href="https://github.com/AntonyPerez0/buildforge" className="hover:text-ink">GitHub repository</a></li>
            <li><a href="https://github.com/AntonyPerez0/buildforge/issues" className="hover:text-ink">Report an issue</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/60 py-5 text-center text-xs text-ink-dim">
        Built for the second screen. © 2026 BuildForge · MIT licensed.
      </div>
    </footer>
  );
}
