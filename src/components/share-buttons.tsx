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
      className="btn"
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
      className="btn btn-primary"
    >
      <GitFork className="h-4 w-4" />
      Fork in Builder
    </a>
  );
}
