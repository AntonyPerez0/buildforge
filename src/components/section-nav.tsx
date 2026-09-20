"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface SectionNavItem {
  id: string;
  label: string;
}

export function SectionNav({ items }: { items: SectionNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Build sections"
      className="sticky top-14 z-40 -mx-4 mb-2 border-b border-line/70 bg-base/85 px-4 backdrop-blur-xl sm:-mx-6 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors",
              active === item.id
                ? "bg-(--accent-wash) text-(--accent-bright)"
                : "text-ink-muted hover:bg-surface hover:text-ink",
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
