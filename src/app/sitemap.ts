import type { MetadataRoute } from "next";
import { BUILDS, buildHref } from "@/lib/builds";

export const dynamic = "force-static";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://antonyperez0.github.io/buildforge";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.replace(/\/$/, "");
  const now = new Date();
  const routes = ["", "/d4", "/forever", "/forever/launch", "/builder", "/about", "/sync"];
  return [
    ...routes.map((r) => ({
      url: `${base}${r}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...BUILDS.map((b) => ({
      url: `${base}${buildHref(b)}`,
      lastModified: new Date(b.lastSynced),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
