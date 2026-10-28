import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFileSync, mkdirSync } from "fs";

// Ensure public folder exists
mkdirSync("public", { recursive: true });

console.log("→ Reading src/assets/images/icon.webp ...");

// Render source webp to a 256×256 png buffer
const pngBuffer = await sharp("src/assets/images/icon.webp")
  .resize(256, 256, {
    fit: "contain",
    background: { r: 20, g: 37, b: 34, alpha: 1 }, // emerald bg
  })
  .png()
  .toBuffer();

// Build the .ico from that png
const icoBuffer = await pngToIco(pngBuffer);
writeFileSync("public/favicon.ico", icoBuffer);
console.log("✓ public/favicon.ico");

// Also emit PNG sizes for high-DPI tabs + iOS
await sharp(pngBuffer).resize(32, 32).toFile("public/favicon-32x32.png");
console.log("✓ public/favicon-32x32.png");

await sharp(pngBuffer).resize(16, 16).toFile("public/favicon-16x16.png");
console.log("✓ public/favicon-16x16.png");

await sharp(pngBuffer).resize(180, 180).toFile("public/apple-touch-icon.png");
console.log("✓ public/apple-touch-icon.png");

console.log("\n✅ Favicons generated in /public");