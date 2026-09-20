import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const svg = await readFile("public/icon.svg");

for (const [size, name] of [
  [512, "icon-512.png"],
  [192, "icon-192.png"],
  [180, "apple-touch-icon.png"],
]) {
  const out = await sharp(svg, { density: 300 })
    .resize(size, size)
    .png()
    .toBuffer();
  await writeFile(`public/${name}`, out);
  console.log(`public/${name} (${size}x${size})`);
}
