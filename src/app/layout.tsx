import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, Marcellus } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { MotionProvider } from "@/components/motion-provider";
import { buildSearchIndex } from "@/lib/search-index";
import { ogImage } from "@/lib/site";
import { withBase } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://antonyperez0.github.io/buildforge";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BuildForge — Zero-guessing build companions for Diablo IV & WoW Forever",
    template: "%s · BuildForge",
  },
  description:
    "The second-screen companion for Diablo IV Season 15 and World of Warcraft: Forever (Classic+). Level-by-level build paths, gear priorities, rotations and zero guessing — synced with Maxroll, Icy Veins and ClassicWoW.gg.",
  keywords: [
    "Diablo 4 builds",
    "WoW Forever builds",
    "Classic+",
    "Season 15",
    "leveling guide",
    "build companion",
    "maxroll",
    "icy veins",
  ],
  openGraph: {
    type: "website",
    siteName: "BuildForge",
    title: "BuildForge — Zero-guessing build companions",
    description:
      "Level-by-level paths for Diablo IV and WoW Forever. Every skill, talent and gear priority at the exact level you need it.",
    images: [{ url: ogImage("neutral", "site"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildForge",
    description: "Zero-guessing build companions for Diablo IV & WoW Forever.",
    images: [ogImage("neutral", "site")],
  },
  manifest: withBase("/manifest.webmanifest"),
  icons: {
    icon: [{ url: withBase("/icon.svg"), type: "image/svg+xml" }, { url: withBase("/icon-192.png"), sizes: "192x192", type: "image/png" }],
    apple: [{ url: withBase("/apple-touch-icon.png"), sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const searchIndex = buildSearchIndex();
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} ${marcellus.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-(--accent) focus:px-4 focus:py-2 focus:font-semibold focus:text-base"
        >
          Skip to content
        </a>
        <SiteHeader searchIndex={searchIndex} />
        <main id="main" className="flex-1">
          <MotionProvider>{children}</MotionProvider>
        </main>
        <SiteFooter />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
