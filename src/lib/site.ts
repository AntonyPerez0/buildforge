export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://antonyperez0.github.io/buildforge";

/** Absolute URL for a build-time generated OG image under /og. */
export function ogImage(game: string, slug: string): string {
  return `${SITE_URL}/og/${game}/${slug}.png`;
}
