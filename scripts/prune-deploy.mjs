/**
 * Post-build deploy slimming.
 *
 * Vite copies all of public/ into dist/ verbatim, which includes the heavy
 * full-resolution source images (public/images/*.png|jpg, ~0.5 GB). Nothing at
 * runtime references them — every <img>/background goes through the optimized
 * /images/opt/ derivatives — so they are dead weight in the deployed bundle.
 *
 * This removes the top-level raster originals from dist/images while keeping
 * dist/images/opt/ (the assets actually served) and the referenced PDFs.
 * It only ever touches the throwaway build output, never the repo sources.
 *
 * Runs automatically as the last step of `npm run build`.
 */
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST_IMAGES = path.join(ROOT, "dist", "images");

const fmt = (b) => (b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(2)} MB`);

async function main() {
  if (!existsSync(DIST_IMAGES)) {
    console.log("prune-deploy: no dist/images (nothing to prune)");
    return;
  }
  let removed = 0;
  let freed = 0;
  for (const entry of await fs.readdir(DIST_IMAGES, { withFileTypes: true })) {
    // Keep the optimized derivatives and anything that isn't a raster original.
    if (entry.isDirectory()) continue; // opt/ and any other folders
    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue; // keep PDFs, etc.
    // Keep the hero banner/mobile images — they're referenced directly from /images/.
    if (/^(banner|mobile)\d*\.jpe?g$/i.test(entry.name)) continue;
    const p = path.join(DIST_IMAGES, entry.name);
    freed += (await fs.stat(p)).size;
    await fs.rm(p);
    removed += 1;
  }
  console.log(`prune-deploy: removed ${removed} unreferenced original image(s) from dist (${fmt(freed)} freed). Optimized /images/opt/ kept.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
