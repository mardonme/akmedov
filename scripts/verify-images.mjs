/**
 * Verifies the optimized image wiring end-to-end:
 *  1. every image referenced through <OptImage> resolves to real opt/ files
 *     (WebP + fallback, single or per-width) — i.e. no 404s in the browser;
 *  2. each derivative preserves the source aspect ratio (no distortion);
 *  3. the CSS background derivatives exist and keep native tile dimensions;
 *  4. no raw <img src="/images/..."> or url(/images/...) bypasses optimization.
 *
 * Run with:  node scripts/verify-images.mjs
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = path.join(ROOT, "public", "images");
const OPT = path.join(IMAGES, "opt");

const load = async (p) => import(pathToFileURL(path.join(ROOT, p)).href);

// Mirror OptImage.jsx derivation exactly.
const parseSrc = (src) => {
  const file = src.replace(/^.*\/images\//, "");
  const dot = file.lastIndexOf(".");
  const name = file.slice(0, dot);
  const ext = file.slice(dot + 1).toLowerCase();
  return { name, fallbackExt: ext === "jpeg" || ext === "jpg" ? "jpg" : "png" };
};
const expectedFiles = ({ src, widths }) => {
  const { name, fallbackExt } = parseSrc(src);
  const base = `opt/${name}`;
  const out = [];
  if (Array.isArray(widths) && widths.length) {
    for (const w of widths) out.push(`${base}-${w}.${fallbackExt}`, `${base}-${w}.${fallbackExt}.webp`);
  } else {
    out.push(`${base}.${fallbackExt}`, `${base}.${fallbackExt}.webp`);
  }
  return out;
};

const errors = [];
const ratioOf = async (p) => { const m = await sharp(p).metadata(); return m.width / m.height; };

async function checkRef(ref) {
  const origPath = path.join(IMAGES, ref.src.replace(/^.*\/images\//, ""));
  if (!existsSync(origPath)) { errors.push(`source missing: ${ref.src}`); return; }
  const origRatio = await ratioOf(origPath);
  for (const rel of expectedFiles(ref)) {
    const abs = path.join(IMAGES, rel);
    if (!existsSync(abs)) { errors.push(`MISSING derivative: ${rel}  (for ${ref.src})`); continue; }
    const r = await ratioOf(abs);
    if (Math.abs(r - origRatio) / origRatio > 0.02)
      errors.push(`aspect drift on ${rel}: ${r.toFixed(3)} vs source ${origRatio.toFixed(3)}`);
  }
}

async function main() {
  const { catalogSections } = await load("src/constants/products.js");
  const { brands } = await load("src/constants/brands.js");
  const { partners } = await load("src/constants/partners.js");

  const refs = [];
  for (const s of catalogSections) for (const g of s.groups) for (const it of g.items) refs.push({ src: it.img });
  // Hero banner/mobile images are served directly from /images/ (not optimized),
  // so they're intentionally excluded from the opt/ derivative checks.
  for (const b of brands) refs.push({ src: b.img });
  for (const p of partners) refs.push({ src: p.img });
  refs.push({ src: "/images/choco.png", widths: [1400, 1024, 640] });
  refs.push({ src: "/images/abouthed.jpg", widths: [853, 600] });
  refs.push({ src: "/images/krizymaxabout.jpg", widths: [853, 600] });
  refs.push({ src: "/images/logo.png" });

  for (const ref of refs) await checkRef(ref);

  // CSS background: derivatives exist and keep native dimensions (it tiles).
  for (const f of ["opt/home_bg.png", "opt/home_bg.png.webp"]) {
    if (!existsSync(path.join(IMAGES, f))) errors.push(`MISSING background derivative: ${f}`);
  }
  const bgOrig = await sharp(path.join(IMAGES, "home_bg.png")).metadata();
  const bgOpt = await sharp(path.join(OPT, "home_bg.png")).metadata();
  if (bgOrig.width !== bgOpt.width || bgOrig.height !== bgOpt.height)
    errors.push(`home_bg resized ${bgOpt.width}x${bgOpt.height} (must stay native ${bgOrig.width}x${bgOrig.height} — it tiles)`);

  // favicon referenced by index.html
  if (!existsSync(path.join(OPT, "logo-256.png"))) errors.push("MISSING favicon: opt/logo-256.png");

  // No raw refs bypassing optimization (outside opt/ and the build scripts).
  const srcFiles = [];
  const walk = async (d) => {
    for (const e of await fs.readdir(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (/\.(jsx?|css|scss|html)$/.test(e.name)) srcFiles.push(p);
    }
  };
  await walk(path.join(ROOT, "src"));
  srcFiles.push(path.join(ROOT, "index.html"));
  for (const f of srcFiles) {
    const txt = await fs.readFile(f, "utf8");
    const rawImg = txt.match(/<img\s[^>]*src=["'`]\/images\//g);
    if (rawImg) errors.push(`raw <img src="/images/..."> in ${path.relative(ROOT, f)} (should use OptImage)`);
    const rawUrl = txt.match(/url\(\/images\/(?!opt\/)/g);
    if (rawUrl) errors.push(`raw url(/images/...) not pointing to opt/ in ${path.relative(ROOT, f)}`);
  }

  console.log(`Checked ${refs.length} referenced images.`);
  if (errors.length) {
    console.error(`\n✗ ${errors.length} problem(s):`);
    for (const e of errors) console.error("  - " + e);
    process.exit(1);
  }
  console.log("✓ All derivatives present, aspect ratios preserved, no raw refs. PASS.");
}
main().catch((e) => { console.error(e); process.exit(1); });
