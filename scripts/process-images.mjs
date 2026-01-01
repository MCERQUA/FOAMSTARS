#!/usr/bin/env node
/**
 * FOAMSTARS Image Processing Script
 *
 * Processes images from public/_inbox/{company-slug}/ folders
 * and outputs optimized versions to public/companies/{company-slug}/
 *
 * Usage: node scripts/process-images.mjs [company-slug]
 *        node scripts/process-images.mjs --all
 *
 * QUALITY SETTINGS (preserves clarity, no blur):
 * - PNG: Lossless compression (no quality loss)
 * - JPEG: 90% quality (high quality, minimal artifacts)
 * - WebP: 90% quality (excellent quality-to-size ratio)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const INBOX_DIR = path.join(ROOT, 'public', '_inbox');
const OUTPUT_DIR = path.join(ROOT, 'public', 'companies');

// Image format configurations
const LOGO_FORMATS = {
  'square': { width: 400, height: 400, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } },
  'wide': { width: 800, height: 400, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } },
  'thumb': { width: 100, height: 100, fit: 'cover' },
};

const GALLERY_FORMATS = {
  'thumb': { width: 300, height: 200, fit: 'cover' },
  'medium': { width: 800, height: 600, fit: 'inside' },
  'large': { width: 1600, height: 1200, fit: 'inside' },
};

// Quality settings - HIGH QUALITY, NO BLUR
const QUALITY = {
  jpeg: 90,  // High quality JPEG
  webp: 90,  // High quality WebP
  png: 9,    // Max PNG compression (lossless)
};

async function loadSharp() {
  try {
    const sharp = await import('sharp');
    return sharp.default;
  } catch (e) {
    console.error('❌ sharp not installed. Run: npm install sharp');
    process.exit(1);
  }
}

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff', '.bmp'].includes(ext);
}

function isLogoFile(filename) {
  const name = filename.toLowerCase();
  return name.includes('logo') || name.startsWith('logo');
}

async function processLogo(sharp, inputPath, outputDir, baseName) {
  console.log(`  📐 Processing logo: ${baseName}`);

  const logoDir = path.join(outputDir, 'logos');
  fs.mkdirSync(logoDir, { recursive: true });

  // Copy original
  const ext = path.extname(inputPath);
  fs.copyFileSync(inputPath, path.join(logoDir, `original${ext}`));
  console.log(`    ✓ original${ext}`);

  // Generate formats
  for (const [formatName, options] of Object.entries(LOGO_FORMATS)) {
    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      // Resize with high-quality settings
      let processed = image.resize({
        width: options.width,
        height: options.height,
        fit: options.fit,
        background: options.background || { r: 255, g: 255, b: 255, alpha: 0 },
        kernel: 'lanczos3', // High-quality downscaling
      });

      // Output PNG (lossless)
      await processed
        .clone()
        .png({ compressionLevel: QUALITY.png, adaptiveFiltering: true })
        .toFile(path.join(logoDir, `${formatName}.png`));
      console.log(`    ✓ ${formatName}.png`);

      // Output WebP (high quality)
      await processed
        .clone()
        .webp({ quality: QUALITY.webp, effort: 6 })
        .toFile(path.join(logoDir, `${formatName}.webp`));
      console.log(`    ✓ ${formatName}.webp`);

    } catch (err) {
      console.error(`    ❌ Failed ${formatName}: ${err.message}`);
    }
  }
}

async function processGalleryImage(sharp, inputPath, outputDir, baseName) {
  console.log(`  🖼️  Processing gallery image: ${baseName}`);

  const galleryDir = path.join(outputDir, 'gallery');
  fs.mkdirSync(galleryDir, { recursive: true });

  // Copy original
  const ext = path.extname(inputPath);
  fs.copyFileSync(inputPath, path.join(galleryDir, `original-${baseName}${ext}`));
  console.log(`    ✓ original-${baseName}${ext}`);

  // Generate formats
  for (const [formatName, options] of Object.entries(GALLERY_FORMATS)) {
    try {
      const image = sharp(inputPath);

      let processed = image.resize({
        width: options.width,
        height: options.height,
        fit: options.fit,
        withoutEnlargement: true, // Never upscale
        kernel: 'lanczos3',
      });

      // Output JPEG (high quality)
      await processed
        .clone()
        .jpeg({ quality: QUALITY.jpeg, mozjpeg: true })
        .toFile(path.join(galleryDir, `${formatName}-${baseName}.jpg`));
      console.log(`    ✓ ${formatName}-${baseName}.jpg`);

      // Output WebP (high quality)
      await processed
        .clone()
        .webp({ quality: QUALITY.webp, effort: 6 })
        .toFile(path.join(galleryDir, `${formatName}-${baseName}.webp`));
      console.log(`    ✓ ${formatName}-${baseName}.webp`);

    } catch (err) {
      console.error(`    ❌ Failed ${formatName}: ${err.message}`);
    }
  }
}

async function processCompany(sharp, companySlug) {
  const inboxPath = path.join(INBOX_DIR, companySlug);
  const outputPath = path.join(OUTPUT_DIR, companySlug);

  if (!fs.existsSync(inboxPath)) {
    console.error(`❌ Inbox folder not found: ${inboxPath}`);
    return false;
  }

  console.log(`\n📁 Processing: ${companySlug}`);

  // Create output directory
  fs.mkdirSync(outputPath, { recursive: true });

  // Get all image files
  const files = fs.readdirSync(inboxPath).filter(isImageFile);

  if (files.length === 0) {
    console.log('  ⚠️  No images found in inbox');
    return false;
  }

  for (const file of files) {
    const inputPath = path.join(inboxPath, file);
    const baseName = path.basename(file, path.extname(file));

    if (isLogoFile(file)) {
      await processLogo(sharp, inputPath, outputPath, baseName);
    } else {
      await processGalleryImage(sharp, inputPath, outputPath, baseName);
    }
  }

  console.log(`  ✅ Done! Output: public/companies/${companySlug}/`);
  return true;
}

async function processAll(sharp) {
  if (!fs.existsSync(INBOX_DIR)) {
    console.error(`❌ Inbox directory not found: ${INBOX_DIR}`);
    return;
  }

  const companies = fs.readdirSync(INBOX_DIR)
    .filter(f => fs.statSync(path.join(INBOX_DIR, f)).isDirectory());

  if (companies.length === 0) {
    console.log('📭 No companies found in inbox');
    return;
  }

  console.log(`\n🏭 Processing ${companies.length} companies...\n`);

  for (const company of companies) {
    await processCompany(sharp, company);
  }

  console.log('\n✅ All companies processed!');
}

async function main() {
  const sharp = await loadSharp();
  const args = process.argv.slice(2);

  console.log('═══════════════════════════════════════════');
  console.log('  FOAMSTARS Image Processor');
  console.log('  Quality: 90% (High quality, no blur)');
  console.log('═══════════════════════════════════════════');

  if (args.length === 0 || args[0] === '--all') {
    await processAll(sharp);
  } else {
    await processCompany(sharp, args[0]);
  }
}

main().catch(console.error);
