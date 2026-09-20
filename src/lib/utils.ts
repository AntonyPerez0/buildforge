import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Prefix asset paths with the GitHub Pages basePath when present. */
export function withBase(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const TIER_STYLES: Record<string, string> = {
  S: "text-tier-s border-tier-s/40 bg-tier-s/10",
  A: "text-tier-a border-tier-a/40 bg-tier-a/10",
  B: "text-tier-b border-tier-b/40 bg-tier-b/10",
  C: "text-tier-c border-tier-c/40 bg-tier-c/10",
};
