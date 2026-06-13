/**
 * Image optimization pipeline.
 *
 * Reads the original full-resolution images from public/images and writes
 * resized, WebP-first derivatives into public/images/opt/. The site code
 * references the opt/ versions through the <OptImage> component (and CSS
 * image-set() for the page background), so the browser only ever downloads
 * the small optimized assets — the heavy originals stay out of the runtime.
 *
 * Run with:  npm run optimize:images
 *
 * Sizing rule: every target width gives ~2x the maximum CSS display width the
 * image is ever rendered at (measured from the SCSS cascade), so it stays
 * crisp on retina screens without shipping multi-megapixel photos. Nothing is
 * ever upscaled (withoutEnlargement).
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public", "images");
const OUT_DIR = path.join(SRC_DIR, "opt");

const WEBP = { quality: 80, effort: 6 };
const WEBP_LOGO = { quality: 88, effort: 6 }; // line-art logo: a touch higher
const JPEG = { quality: 80, mozjpeg: true };
const JPEG_HERO = { quality: 82, mozjpeg: true };
const PNG = { quality: 90, compressionLevel: 9, palette: true };

// kind:"fixed"  -> one derivative, longest side fits `box`
// kind:"responsive" -> one derivative per width in `widths` (srcset)
const products = [
  "Kreasy", "Kreasy2", "Kreasy4", "Kreasy5", "Kreasy6", "Kreasy7",
  "1", "2", "3", "rojki",
  "Bombey1", "Bombey2", "Bombey3", "Bombey4", "Bombey5",
  "eskimo1", "eskimo2", "eskimo3", "eskimo4", "eskimo5", "eskimo6", "eskimo7",
  "ves1", "ves2", "ves3", "ves4", "ves5", "ves6",
  "Сыробушки", "Сыробушки1", "Сыробушки2", "Сыробушки3", "Сыробушки4", "Сыробушки5",
  "Sirokoff1", "Sirokoff2", "Sirokoff3", "Sirokoff4",
  "SirokM", "SirokM1", "SirokM2", "SirokM3", "SirokM4", "SirokM5",
].map((n) => ({ name: n, ext: "png", kind: "fixed", box: 720 }));

const SPEC = [
  ...products,

  // NOTE: the hero banner/mobile images are intentionally NOT optimized here —
  // they are served straight from /images/ so they can be swapped by file.

  // Home — chocolate hero (below the fold, stacks full-width <1100px)
  { name: "choco", ext: "png", kind: "responsive", widths: [1400, 1024, 640] },

  // Full-page CSS background, tiled at intrinsic size (no background-size), so
  // we MUST keep native dimensions — only recompress. box>maxdim => no resize.
  { name: "home_bg", ext: "png", kind: "fixed", box: 4000 },

  // Brand wordmark — reused in Loader splash (664px), header, carousel, favicon.
  { name: "logo", ext: "png", kind: "fixed", box: 1400, webp: WEBP_LOGO, favicon: 256 },

  // About page hero (eager / LCP) + mission image
  { name: "abouthed", ext: "jpg", kind: "responsive", widths: [853, 600], jpeg: JPEG_HERO },
  { name: "krizymaxabout", ext: "jpg", kind: "responsive", widths: [853, 600] },

  // About — brand grid logos (~260px cells)
  { name: "kreasymaxabout", ext: "jpg", kind: "fixed", box: 560 },
  { name: "СЫТЫЙ_ДОМ", ext: "jpg", kind: "fixed", box: 560 },
  { name: "Bombey", ext: "jpg", kind: "fixed", box: 560 },

  // Partner logos (~178px cells)
  ...["part", "part1", "part2", "part3"].map((n) => ({ name: n, ext: "png", kind: "fixed", box: 400 })),
  { name: "part.jpg", ext: "jpg", kind: "fixed", box: 400, file: "part.jpg" },
];

const fmt = (b) => (b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(2)} MB`);

async function bytes(p) {
  try { return (await fs.stat(p)).size; } catch { return 0; }
}

async function encode(pipeline, item, outPath) {
  const ext = (item.outExt || item.ext).toLowerCase();
  if (outPath.endsWith(".webp")) {
    // Flat/illustrative PNGs (logos, partner marks) can be smaller as lossless
    // WebP than lossy; photos are smaller lossy. Encode both, keep the smaller
    // so the WebP <source> is never heavier than the fallback.
    const [lossy, lossless] = await Promise.all([
      pipeline.clone().webp(item.webp || WEBP).toBuffer(),
      pipeline.clone().webp({ lossless: true, effort: 6 }).toBuffer(),
    ]);
    return fs.writeFile(outPath, lossless.length < lossy.length ? lossless : lossy);
  }
  if (ext === "jpg" || ext === "jpeg") return pipeline.jpeg(item.jpeg || JPEG).toFile(outPath);
  return pipeline.png(item.png || PNG).toFile(outPath);
}

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const report = [];
  let totalOrig = 0, totalWebp = 0, totalFallback = 0;

  for (const item of SPEC) {
    const fallbackExt = (item.outExt || item.ext).toLowerCase();
    const srcFile = item.file || `${item.name}.${item.ext}`;
    const srcPath = path.join(SRC_DIR, srcFile);
    if (!existsSync(srcPath)) { console.warn(`! missing source: ${srcFile}`); continue; }

    const baseName = item.file ? item.file.replace(/\.[^.]+$/, "") : item.name;
    const meta = await sharp(srcPath).metadata();
    const origBytes = await bytes(srcPath);
    totalOrig += origBytes;

    const widths = item.kind === "responsive"
      ? item.widths
      : [Math.min(item.box, Math.max(meta.width, meta.height))];

    let webpBytes = 0, fallbackBytes = 0;
    for (const w of widths) {
      const suffix = item.kind === "responsive" ? `-${w}` : "";
      const resize = item.kind === "responsive"
        ? { width: w, withoutEnlargement: true }
        : { width: item.box, height: item.box, fit: "inside", withoutEnlargement: true };

      // Derivative names keep the original extension so that two different
      // sources sharing a stem (e.g. part.png vs part.jpg) never collide.
      const fbOut = path.join(OUT_DIR, `${baseName}${suffix}.${fallbackExt}`);
      const webpOut = `${fbOut}.webp`;
      await encode(sharp(srcPath).resize(resize), item, webpOut);
      await encode(sharp(srcPath).resize(resize), item, fbOut);
      webpBytes += await bytes(webpOut);
      fallbackBytes += await bytes(fbOut);
    }

    // Small square-ish favicon variant for the wordmark.
    if (item.favicon) {
      const fav = path.join(OUT_DIR, `${baseName}-${item.favicon}`);
      await sharp(srcPath).resize({ width: item.favicon, withoutEnlargement: true }).png(PNG).toFile(`${fav}.png`);
      await sharp(srcPath).resize({ width: item.favicon, withoutEnlargement: true }).webp(WEBP_LOGO).toFile(`${fav}.webp`);
    }

    totalWebp += webpBytes;
    totalFallback += fallbackBytes;
    report.push({
      file: srcFile, original: origBytes, webp: webpBytes, fallback: fallbackBytes,
      from: `${meta.width}x${meta.height}`, widths: widths.join(","),
    });
    console.log(`✓ ${srcFile.padEnd(22)} ${fmt(origBytes).padStart(9)} → webp ${fmt(webpBytes).padStart(8)}  (-${(100 - (webpBytes / origBytes) * 100).toFixed(1)}%)`);
  }

  report.sort((a, b) => b.original - a.original);
  await fs.writeFile(path.join(OUT_DIR, "manifest.json"),
    JSON.stringify({ generatedFrom: "scripts/optimize-images.mjs", totalOrig, totalWebp, totalFallback, images: report }, null, 2));

  console.log("\n──────────────────────────────────────────────");
  console.log(`Images optimized : ${report.length}`);
  console.log(`Originals total  : ${fmt(totalOrig)}`);
  console.log(`WebP total       : ${fmt(totalWebp)}  (${(100 - (totalWebp / totalOrig) * 100).toFixed(1)}% smaller — what modern browsers download)`);
  console.log(`Fallback total   : ${fmt(totalFallback)}  (resized PNG/JPEG for the few browsers without WebP)`);
  console.log("──────────────────────────────────────────────");
}

run().catch((e) => { console.error(e); process.exit(1); });
