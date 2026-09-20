"use client";

import { GateDiagram } from "./gate-diagram";
import type { Build } from "@/data/types";

/**
 * Computed from the level path: talent points start at level 10 (1 per level),
 * so a fully committed main tree reaches each gate at a known level —
 * 11 pts at 20, 16 pts at 25 (Forever capstone), 21 pts at 30, 31 pts at 40.
 * No invented tree layouts: this is arithmetic + the build's own milestones.
 */
export function TalentSpine({ build }: { build: Build }) {
  if (build.game !== "forever") return null;
  return <GateDiagram build={build} />;
}
