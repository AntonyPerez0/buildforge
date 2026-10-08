import type { ReactNode } from "react";

/**
 * WoW Classic-style section header: small gold GameFontNormal eyebrow
 * (with the 1px black offset shadow), Marcellus gold title, cream subtitle.
 */
export function WowHeading({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <p className="wowui-gold-label">{eyebrow}</p>
      <h2 className="wowui-title mt-2 text-3xl sm:text-4xl">{title}</h2>
      {sub ? <p className="wowui-sub mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">{sub}</p> : null}
      {children}
    </div>
  );
}
