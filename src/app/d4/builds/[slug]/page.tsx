import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BUILDS, getBuild } from "@/lib/builds";
import { BuildDetail } from "@/components/build-detail";

export function generateStaticParams() {
  return BUILDS.filter((b) => b.game === "d4").map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/d4/builds/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuild("d4", slug);
  if (!build) return {};
  return {
    title: `${build.name} — Diablo IV level path`,
    description: build.tagline,
    openGraph: { title: `${build.name} · BuildForge`, description: build.tagline },
  };
}

export default async function D4BuildPage(props: PageProps<"/d4/builds/[slug]">) {
  const { slug } = await props.params;
  const build = getBuild("d4", slug);
  if (!build) notFound();
  return <BuildDetail build={build} />;
}
