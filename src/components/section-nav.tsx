"use client";

import { useEffect, useState } from "react";

export interface SectionNavItem {
  id: string;
  label: string;
}

/** Sticky in-page tabs — D4 menu tabs or WoW CharacterFrame tabs, by [data-game]. */
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
    <nav aria-label="Page sections" className="tabbar-shell sticky top-14 z-40 -mx-4 mb-2 px-4 sm:-mx-6 sm:px-6">
      <div className="tabbar mx-auto max-w-6xl py-2">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="tab" aria-current={active === item.id ? "true" : undefined}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
