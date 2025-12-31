#!/usr/bin/env node
/**
 * Generate SQUARE (1:1) placeholder images with company names
 * Better for card layouts that use square containers
 */

import { neon } from '@neondatabase/serverless';
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable required');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

// Create output directory
const outputDir = path.join(__dirname, '../public/generated-images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Color palette - spray foam themed
const colorSchemes = [
  { bg: '#1a365d', accent: '#3182ce', text: '#ffffff' }, // Blue
  { bg: '#234e52', accent: '#38b2ac', text: '#ffffff' }, // Teal
  { bg: '#744210', accent: '#ed8936', text: '#ffffff' }, // Orange
  { bg: '#553c9a', accent: '#9f7aea', text: '#ffffff' }, // Purple
  { bg: '#276749', accent: '#48bb78', text: '#ffffff' }, // Green
  { bg: '#9c4221', accent: '#ed8936', text: '#ffffff' }, // Rust
  { bg: '#2d3748', accent: '#a0aec0', text: '#ffffff' }, // Gray
  { bg: '#742a2a', accent: '#fc8181', text: '#ffffff' }, // Red
];

function generateSquareImage(companyName, index) {
  const size = 800; // Square image

  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Pick color scheme based on index
  const colors = colorSchemes[index % colorSchemes.length];

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colors.bg);
  gradient.addColorStop(1, colors.accent);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Add subtle pattern (foam bubble effect)
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 50 + 15;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Company name - wrap text for square format
  ctx.fillStyle = colors.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Calculate font size based on name length
  let fontSize = 52;
  if (companyName.length > 20) fontSize = 44;
  if (companyName.length > 30) fontSize = 38;
  if (companyName.length > 40) fontSize = 32;

  ctx.font = `bold ${fontSize}px Arial, sans-serif`;

  // Word wrap for square format
  const words = companyName.split(' ');
  const lines = [];
  let currentLine = '';
  const maxWidth = size - 80;

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);

  // Draw lines centered vertically
  const lineHeight = fontSize * 1.3;
  const totalHeight = lines.length * lineHeight;
  const startY = (size / 2) - (totalHeight / 2) + (lineHeight / 2);

  lines.forEach((line, i) => {
    ctx.fillText(line, size / 2, startY + i * lineHeight);
  });

  // Add "SPRAY FOAM" tagline at bottom
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText('SPRAY FOAM INSULATION', size / 2, size - 50);

  // Add subtle border
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, size - 40, size - 40);

  return canvas.toBuffer('image/png');
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('Fetching companies that need square images...\n');

  // Get companies that have generated placeholder images (not external URLs)
  const companies = await sql`
    SELECT id, business_name, featured_image_url
    FROM business_listings
    WHERE featured_image_url LIKE '/generated-images/%'
       OR featured_image_url IS NULL
    ORDER BY business_name
  `;

  console.log(`Found ${companies.length} companies to update\n`);

  if (companies.length === 0) {
    console.log('No companies need square images!');
    return;
  }

  const baseUrl = '/generated-images';

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const slug = slugify(company.business_name);
    const filename = `${slug}-square.png`;
    const filepath = path.join(outputDir, filename);
    const imageUrl = `${baseUrl}/${filename}`;

    process.stdout.write(`Generating square: ${company.business_name}... `);

    try {
      // Generate square image
      const buffer = generateSquareImage(company.business_name, i);
      fs.writeFileSync(filepath, buffer);

      // Update database with square image
      await sql`
        UPDATE business_listings
        SET featured_image_url = ${imageUrl}
        WHERE id = ${company.id}
      `;

      console.log('✓');
    } catch (error) {
      console.log(`✗ Error: ${error.message}`);
    }
  }

  console.log(`\nSquare images saved to: ${outputDir}`);
  console.log('Done!');
}

main().catch(console.error);
