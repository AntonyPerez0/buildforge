import type { GameId, MetaSnapshot, SourceName, Tier } from "@/data/types";
import rawSnapshots from "@/data/synced/meta-snapshots.json";

interface RawSnapshot {
  id: string;
  game: GameId;
  className: string;
  buildName: string;
  tier?: Tier | null;
  summary: string;
  sources: { site: SourceName; url: string; label?: string }[];
  fetchedAt: string;
}

const data = rawSnapshots as { fetchedAt?: string; snapshots: RawSnapshot[] };

export const SNAPSHOTS: MetaSnapshot[] = data.snapshots.map((s) => ({
  id: s.id,
  game: s.game,
  className: s.className,
  buildName: s.buildName,
  tier: s.tier ?? null,
  summary: s.summary,
  sources: s.sources,
  fetchedAt: s.fetchedAt,
}));

/** Most recent sync date across all snapshots — shown in the UI as the pipeline freshness stamp. */
export function latestSyncDate(): string {
  return SNAPSHOTS.reduce(
    (latest, s) => (s.fetchedAt > latest ? s.fetchedAt : latest),
    data.fetchedAt ?? SNAPSHOTS[0]?.fetchedAt ?? "",
  );
}

export function getSnapshotsFor(game: GameId): MetaSnapshot[] {
  return SNAPSHOTS.filter((s) => s.game === game);
}
