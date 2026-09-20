import { readdir, rename } from "node:fs/promises";
import path from "node:path";

/**
 * Post-build: the /og route handlers export PNGs without file extensions
 * (out/og/d4/whirlwind-barbarian). Static hosts pick the content-type from the
 * extension, so rename every OG file to add ".png" — the metadata URLs already
 * point at the ".png" variant.
 */
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (!entry.name.endsWith(".png")) {
      await rename(full, `${full}.png`);
      console.log(`og: ${full} → ${full}.png`);
    }
  }
}

try {
  await walk("out/og");
  console.log("OG images finalized.");
} catch {
  console.log("No OG directory found — skipping.");
}
