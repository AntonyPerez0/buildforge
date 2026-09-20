const KEY = "buildforge.favorites.v1";
export const FAVORITES_EVENT = "buildforge:favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string): string[] {
  const next = getFavorites().includes(id)
    ? getFavorites().filter((f) => f !== id)
    : [...getFavorites(), id];
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  } catch {
    /* storage blocked — favorites are a progressive enhancement */
  }
  return next;
}
