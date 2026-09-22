import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BUILDS, getBuild } from "@/lib/builds";
import { applyBetaCap } from "@/lib/forever";
import { ogImage } from "@/lib/site";
import { BuildDetail } from "@/components/build-detail";

export function generateStaticParams() {
  return BUILDS.filter((b) => b.game === "forever").map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/forever/builds/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuild("forever", slug);
  if (!build) return {};
  return {
    title: `${build.name} — WoW Forever level path`,
    description: build.tagline,
    openGraph: {
      title: `${build.name} · BuildForge`,
      description: build.tagline,
      images: [{ url: ogImage("forever", build.slug), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${build.name} · BuildForge`,
      description: build.tagline,
      images: [ogImage("forever", build.slug)],
    },
  };
}

export default async function ForeverBuildPage(props: PageProps<"/forever/builds/[slug]">) {
  const { slug } = await props.params;
  const build = getBuild("forever", slug);
  if (!build) notFound();
  return <BuildDetail build={applyBetaCap(build)} />;
}
