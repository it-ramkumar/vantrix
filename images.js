#!/usr/bin/env node
/* ════════════════════════════════════════════════════════════════════════════
   VANTRIX — VAN METAL PARTS IMAGE DOWNLOADER
   ────────────────────────────────────────────────────────────────────────────
   Downloads every Vantrix product image from your Shopify CDN into
       public/images/vantrix/<key>-<n>.webp

   USAGE
     1. Save this file to your Next.js project root (next to package.json)
     2. Open a terminal in that folder
     3. Run:   node images.js
     4. Wait ~15 seconds for the green check marks
     5. Refresh your browser at localhost:3000

   Re-run anytime — already-downloaded files are skipped.
   Requires Node 18+ (uses built-in fetch / stream APIs).
   ════════════════════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'vantrix');

const FILES = {
  // ───── 01 · VanTrix 12V 600Ah LiFePO4 Battery (6 images) ─────
  'battery-1': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/Untitled_design_12e40854-3a30-4041-bfb5-ef9736ebbe0f.webp?v=1776375663',
  'battery-2': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_3.webp?v=1776375663',
  'battery-3': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/4_4_8c6ee66f-5852-4852-90a9-1b79e9dcdbf6.webp?v=1776375663',
  'battery-4': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_2_27d735bb-705c-4a4e-b16a-92d279928621.webp?v=1776375663',
  'battery-5': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/3_3.webp?v=1776375663',
  'battery-6': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/IMG_4576.webp?v=1776375663',

  // ───── 02 · Automated Wind Sensor Electric Awning (5 images) ─────
  'awning-electric-1': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/Untitleddesign_4.webp?v=1776376527',
  'awning-electric-2': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_7ba19c6a-7c23-48e4-bb24-b4e3ea3bce63.webp?v=1776376541',
  'awning-electric-3': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_5953b486-cfd7-4ab7-a543-d4aba1e85f5d.webp?v=1776376541',
  'awning-electric-4': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/Untitled_design_5.webp?v=1776376541',
  'awning-electric-5': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/Untitled_design_6.webp?v=1776376541',

  // ───── 03 · Manual Side-Mounted Awning with Legs (4 images) ─────
  'awning-manual-1': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/Untitleddesign_4.png?v=1778831482',
  'awning-manual-2': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_68aae31a-8d75-4aa2-bcb8-3ef23642d818.png?v=1774044898',
  'awning-manual-3': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_6087ae40-5308-4842-b437-8ca616ea09db.png?v=1774044902',
  'awning-manual-4': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/3_52a7bebd-551e-4090-bf34-630c4ceb3cd2.png?v=1774044906',

  // ───── 04 · 3000W Pure Sine Wave Inverter/Charger (1 image) ─────
  'inverter-3000w-1': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/Untitled_design_7-Picsart-AiImageEnhancer.png?v=1778831176',

  // ───── 05 · Swivel Table Hardware Kit (8 images) ─────
  'swivel-1': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/swivel-table-hardware-kit-gmc-optimized.webp?v=1776377914',
  'swivel-2': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/4_93512759-a2b4-4f3c-ae57-9558ecf6e7af.webp?v=1776377914',
  'swivel-3': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/Untitled_design_8.webp?v=1776377914',
  'swivel-4': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/swivel-table-hardware-kit-silver.webp?v=1776377914',
  'swivel-5': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_4611bc82-1b92-48ab-9d7e-76d60d5afbf5.webp?v=1776377914',
  'swivel-6': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_ac212f0f-e4c5-4014-bce7-25cf03686936.webp?v=1776377914',
  'swivel-7': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/3_a1254bf8-cd56-40f3-86fd-57b245a0c22d.webp?v=1776377914',
  'swivel-8': 'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/4_0c2b4914-6b02-4124-9f44-2303e39c584e.webp?v=1776377914',
};

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
  'Accept': 'image/webp,image/*,*/*',
  'Referer': 'https://vanpartsoutlet.com/',
};

const G = (s) => `\x1b[32m${s}\x1b[0m`;
const R = (s) => `\x1b[31m${s}\x1b[0m`;
const Y = (s) => `\x1b[33m${s}\x1b[0m`;
const D = (s) => `\x1b[2m${s}\x1b[0m`;

async function download(key, url) {
  const ext = '.webp';
  const dest = path.join(OUT_DIR, key + ext);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) {
    console.log(`  ${Y('↺')}  ${key.padEnd(28)} ${D('skipped (already exists)')}`);
    return { ok: true, skipped: true };
  }
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await pipeline(res.body, fs.createWriteStream(dest));
    const kb = (fs.statSync(dest).size / 1024).toFixed(1);
    console.log(`  ${G('✓')}  ${key.padEnd(28)} ${D(kb + ' KB')}`);
    return { ok: true };
  } catch (err) {
    console.log(`  ${R('✗')}  ${key.padEnd(28)} ${R(err.message)}`);
    return { ok: false };
  }
}

(async () => {
  console.log(`\n  Vantrix image downloader\n  ────────────────────────────\n  Output: ${OUT_DIR}\n`);
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const entries = Object.entries(FILES);
  let done = 0, failed = 0;
  for (const [key, url] of entries) {
    const r = await download(key, url);
    if (r.ok) done++; else failed++;
  }
  console.log(`\n  ${G('Done.')} ${done}/${entries.length} downloaded · ${failed} failed.`);
  if (failed === 0) {
    console.log(`  Next: refresh your browser at localhost:3000\n`);
  } else {
    console.log(`  ${Y('Some files failed — run again to retry.')}\n`);
  }
})();