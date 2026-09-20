import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://antonyperez0.github.io/buildforge";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.replace(/\/$/, "")}/sitemap.xml`,
  };
}
