import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div data-game="neutral" className="world-bg noise">
      <div className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 text-center">
        <div className="space-y-5">
          <Compass className="mx-auto h-8 w-8 text-(--accent-bright)" />
          <h1 className="text-4xl font-bold tracking-tight text-ink">Lost in the dark</h1>
          <p className="text-sm leading-relaxed text-ink-muted">
            That page doesn&apos;t exist — maybe the build was renamed, or the meta shifted and
            took it with it. Pick a world below and forge on.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/d4"
              className="rounded-lg border border-d4/40 bg-d4/10 px-4 py-2 text-sm font-semibold text-d4-bright hover:bg-d4/20"
            >
              Diablo IV
            </Link>
            <Link
              href="/forever"
              className="rounded-lg border border-forever/40 bg-forever/10 px-4 py-2 text-sm font-semibold text-forever-bright hover:bg-forever/20"
            >
              WoW Forever
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
