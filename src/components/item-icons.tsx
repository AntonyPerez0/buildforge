import type { SVGProps } from "react";

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export const ITEM_ICONS = {
  helm: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M5.5 14.5a6.5 6.5 0 0 1 13 0V20h-13v-5.5z" />
        <path d="M8.5 14.5h7" />
        <path d="M7 20v-2.5M17 20v-2.5" />
        <path d="M12 5V3.5" opacity="0.6" />
      </g>
    </Svg>
  ),
  shoulders: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M3 14c0-2.6 1.8-4.5 5-4.5l2.2 1-.8 6.5H6C4 17 3 16 3 14z" />
        <path d="M21 14c0-2.6-1.8-4.5-5-4.5l-2.2 1 .8 6.5H18c2 0 3-1 3-3z" />
        <path d="M9.5 19.5h5" opacity="0.6" />
      </g>
    </Svg>
  ),
  chest: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M7.5 3.5h9L15 8.5v7.5a3 3 0 0 1-6 0V8.5L7.5 3.5z" />
        <path d="M12 6.5v12" opacity="0.7" />
        <path d="M9 3.5l3 2 3-2" opacity="0.6" />
      </g>
    </Svg>
  ),
  hands: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M7 5h10v6.5h2v3.5h-2V20H7v-5H5v-3.5h2V5z" />
        <path d="M10 8.5h4M10 11h4" opacity="0.6" />
      </g>
    </Svg>
  ),
  wrist: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M7 4h10v16H7z" />
        <path d="M7 9.5h10M7 14.5h10" opacity="0.7" />
        <path d="M9.5 4v16" opacity="0.4" />
      </g>
    </Svg>
  ),
  belt: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M3 10h18v4.5H3z" />
        <path d="M10 8.5h4.5v7H10z" />
        <path d="M12 10.5v0.5" opacity="0.7" />
      </g>
    </Svg>
  ),
  legs: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M7 3.5h4l-.8 8v9H6.8v-9L7 3.5z" />
        <path d="M13 3.5h4l-.8 8v9h-3.4v-9l.2-8z" />
        <path d="M8.5 14h1M14.5 14h1" opacity="0.5" />
      </g>
    </Svg>
  ),
  feet: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M8 3.5h5.5v8.5h3.5c1.2 0 2 1 2 2.2V19H8V3.5z" />
        <path d="M8 15.5h11" opacity="0.6" />
      </g>
    </Svg>
  ),
  amulet: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M6.5 3.5c0 5 2.4 8 5.5 8s5.5-3 5.5-8" />
        <path d="M12 11.5l3.2 3-3.2 5.5-3.2-5.5 3.2-3z" />
        <path d="M12 14l1.2 1-1.2 2-1.2-2 1.2-1z" fill="currentColor" stroke="none" opacity="0.8" />
      </g>
    </Svg>
  ),
  ring: () => (
    <Svg>
      <g {...strokeProps}>
        <circle cx="12" cy="15" r="5.2" />
        <path d="M10 5.5l2-2.5 2 2.5-2 2.5-2-2.5z" />
        <path d="M12 8v1.8" opacity="0.6" />
      </g>
    </Svg>
  ),
  trinket: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
        <circle cx="12" cy="12" r="2.6" opacity="0.8" />
        <path d="M12 9.4v-1.4M12 16v-1.4M9.4 12H8M16 12h-1.4" opacity="0.6" />
      </g>
    </Svg>
  ),
  sword: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M12 2.5l2 2-1 11h-2l-1-11 2-2z" />
        <path d="M8 15.5h8" />
        <path d="M12 15.5V19" />
        <circle cx="12" cy="20.5" r="1.2" opacity="0.8" />
      </g>
    </Svg>
  ),
  axe: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M12.5 4v17" />
        <path d="M12.5 4.5C7.5 5.5 4.5 7.5 4.5 9.8s3 4.2 8 5.2V4.5z" />
        <path d="M12.5 6.5c1.8.4 3 .9 3.8 1.6" opacity="0.5" />
      </g>
    </Svg>
  ),
  mace: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M12 12.5V21" />
        <circle cx="12" cy="8" r="4" />
        <path d="M12 2.5v1.6M18 8h-1.6M6 8h1.6M16.5 3.5L15.4 4.6M7.5 3.5l1.1 1.1M16.5 12.5l-1.1-1.1M7.5 12.5l1.1-1.1" />
      </g>
    </Svg>
  ),
  dagger: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M12 3l1.6 1.6-.9 8.4h-1.4l-.9-8.4L12 3z" />
        <path d="M9.5 13h5" />
        <path d="M12 13v5.5" />
        <path d="M10.6 20h2.8" />
      </g>
    </Svg>
  ),
  staff: () => (
    <Svg>
      <g {...strokeProps}>
        <circle cx="12" cy="6.5" r="3" />
        <path d="M12 9.5V21.5" />
        <path d="M9 8.5c-1.5 1.2-1.5 2.8-.3 4.2" opacity="0.6" />
        <path d="M15 8.5c1.5 1.2 1.5 2.8.3 4.2" opacity="0.6" />
      </g>
    </Svg>
  ),
  scythe: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M14 3.5V21" />
        <path d="M14 3.5c-6.5 0-10 3-11 6.5 4.5-2.2 8-2.4 11-1.2V3.5z" />
        <path d="M14 3.5l2 .8" opacity="0.6" />
      </g>
    </Svg>
  ),
  wand: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M13.5 9L5.5 21" />
        <path d="M14.5 2.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" fill="currentColor" stroke="none" opacity="0.85" />
        <path d="M17.5 11.5l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5.5-1z" fill="currentColor" stroke="none" opacity="0.6" />
      </g>
    </Svg>
  ),
  gun: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M3 10.5h12l2-2h4v3.5h-2l-2 2h-3.5l-2 3.5h-3l2-3.5H3v-3.5z" />
        <path d="M6 10.5v-1.5" opacity="0.6" />
      </g>
    </Svg>
  ),
  offhand: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M5.5 4.5h8.5a3 3 0 0 1 3 3v12H8.5a3 3 0 0 1-3-3v-12z" />
        <path d="M14 4.5V19" opacity="0.7" />
        <path d="M8 9h3.5M8 12h3.5" opacity="0.5" />
      </g>
    </Svg>
  ),
  relic: () => (
    <Svg>
      <g {...strokeProps}>
        <path d="M6 3.5h12v13.5l-6 3.5-6-3.5V3.5z" />
        <path d="M12 8l2.5 2.5L12 13l-2.5-2.5L12 8z" fill="currentColor" stroke="none" opacity="0.8" />
        <path d="M8.5 3.5V6M15.5 3.5V6" opacity="0.5" />
      </g>
    </Svg>
  ),
} as const;

export type ItemIconKeyInternal = keyof typeof ITEM_ICONS;

export function CharacterSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 104" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sil-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.13)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.03)" />
        </linearGradient>
      </defs>
      <g fill="url(#sil-body)" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M32 6a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" />
        <path d="M32 22c-9 0-15 3-16 7l2 6h28l2-6c-1-4-7-7-16-7z" />
        <path d="M14 34c-4 2-6 6-6 11l4 2 4-6" opacity="0.8" />
        <path d="M50 34c4 2 6 6 6 11l-4 2-4-6" opacity="0.8" />
        <path d="M20 36h24l-2 26h-20l-2-26z" />
        <path d="M24 64h6l-1.5 16h-3L24 64z" />
        <path d="M34 64h6l-1.5 16h-3L34 64z" />
      </g>
    </svg>
  );
}
