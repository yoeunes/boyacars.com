#!/usr/bin/env node

/**
 * Blog Image Optimization Script
 *
 * Processes images in assets/images/blog/originals/ and generates:
 * - Thumbnails (400px width) for blog list cards
 * - Full-size images (1280px width) for article heroes
 * - WebP and JPG formats for each size
 *
 * Output goes to assets/images/blog/optimized/
 */

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

const CONFIG = {
  inputDir: join(ROOT_DIR, 'assets/images/blog/originals'),
  outputDir: join(ROOT_DIR, 'assets/images/blog/optimized'),
  sizes: {
    thumb: { width: 400, quality: { webp: 80, jpg: 80 } },
    full: { width: 1280, quality: { webp: 85, jpg: 85 } },
    mobile: { width: 800, quality: { webp: 80, jpg: 80 } }
  },
  supportedExtensions: ['.jpg', '.jpeg', '.png', '.webp']
};

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function getImageFiles(dir) {
  try {
    const files = await readdir(dir);
    return files.filter(file =>
      CONFIG.supportedExtensions.includes(extname(file).toLowerCase())
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`\nInput directory not found: ${dir}`);
      console.error('Please create the directory and add source images.');
      process.exit(1);
    }
    throw err;
  }
}

async function processImage(inputPath, outputDir, filename) {
  const nameWithoutExt = basename(filename, extname(filename));
  const results = [];

  for (const [sizeName, sizeConfig] of Object.entries(CONFIG.sizes)) {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Only resize if image is larger than target
    const resizedImage = metadata.width > sizeConfig.width
      ? image.resize(sizeConfig.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
      : image;

    // Generate WebP
    const webpPath = join(outputDir, `${nameWithoutExt}-${sizeName}.webp`);
    await resizedImage
      .clone()
      .webp({ quality: sizeConfig.quality.webp })
      .toFile(webpPath);

    const webpStats = await stat(webpPath);
    results.push({ path: webpPath, size: webpStats.size });

    // Generate JPG
    const jpgPath = join(outputDir, `${nameWithoutExt}-${sizeName}.jpg`);
    await resizedImage
      .clone()
      .jpeg({ quality: sizeConfig.quality.jpg, mozjpeg: true })
      .toFile(jpgPath);

    const jpgStats = await stat(jpgPath);
    results.push({ path: jpgPath, size: jpgStats.size });
  }

  return results;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function main() {
  console.log('Blog Image Optimization\n');
  console.log(`Input:  ${CONFIG.inputDir}`);
  console.log(`Output: ${CONFIG.outputDir}\n`);

  await ensureDir(CONFIG.outputDir);

  const files = await getImageFiles(CONFIG.inputDir);

  if (files.length === 0) {
    console.log('No images found to process.');
    return;
  }

  console.log(`Found ${files.length} images to process\n`);

  let totalInputSize = 0;
  let totalOutputSize = 0;

  for (const file of files) {
    const inputPath = join(CONFIG.inputDir, file);
    const inputStats = await stat(inputPath);
    totalInputSize += inputStats.size;

    console.log(`Processing: ${file} (${formatBytes(inputStats.size)})`);

    try {
      const results = await processImage(inputPath, CONFIG.outputDir, file);

      for (const result of results) {
        totalOutputSize += result.size;
        const relativePath = basename(result.path);
        console.log(`  -> ${relativePath} (${formatBytes(result.size)})`);
      }
    } catch (err) {
      console.error(`  Error processing ${file}: ${err.message}`);
    }
  }

  console.log('\n---');
  console.log(`Total input:  ${formatBytes(totalInputSize)}`);
  console.log(`Total output: ${formatBytes(totalOutputSize)}`);
  console.log(`Reduction:    ${((1 - totalOutputSize / totalInputSize) * 100).toFixed(1)}%`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
