"use client";

import { useState } from "react";
import { Check, Copy, GitFork } from "lucide-react";
import { withBase } from "@/lib/utils";

export function CopyLinkButton({ path, label = "Copy link" }: { path: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}${withBase(path)}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-(--accent-border) hover:text-ink"
    >
      {copied ? <Check className="h-4 w-4 text-(--accent-bright)" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function ForkButton({ buildId }: { buildId: string }) {
  return (
    <a
      href={`${withBase("/builder")}?fork=${encodeURIComponent(buildId)}`}
      className="inline-flex items-center gap-2 rounded-lg bg-(--accent) px-4 py-2 text-sm font-semibold text-base shadow-[0_0_24px_-8px_var(--accent)] transition-transform hover:scale-[1.03]"
    >
      <GitFork className="h-4 w-4" />
      Fork in Builder
    </a>
  );
}
