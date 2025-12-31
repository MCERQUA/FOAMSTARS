#!/usr/bin/env node
/**
 * Generate placeholder images with company names
 * for companies without OG images
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

function generateImage(companyName, index) {
  const width = 1200;
  const height = 630; // Standard OG image size

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Pick color scheme based on index
  const colors = colorSchemes[index % colorSchemes.length];

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors.bg);
  gradient.addColorStop(1, colors.accent);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add subtle pattern (foam bubble effect)
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 40 + 10;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Add decorative lines
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, height - 100);
  ctx.lineTo(width - 50, height - 100);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(50, 100);
  ctx.lineTo(width - 50, 100);
  ctx.stroke();

  // Company name - wrap text if needed
  ctx.fillStyle = colors.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Calculate font size based on name length
  let fontSize = 72;
  if (companyName.length > 25) fontSize = 56;
  if (companyName.length > 35) fontSize = 48;
  if (companyName.length > 45) fontSize = 40;

  ctx.font = `bold ${fontSize}px Arial, sans-serif`;

  // Word wrap for long names
  const words = companyName.split(' ');
  const lines = [];
  let currentLine = '';
  const maxWidth = width - 120;

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

  // Draw lines
  const lineHeight = fontSize * 1.2;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, width / 2, startY + i * lineHeight);
  });

  // Add "SPRAY FOAM INSULATION" tagline
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('SPRAY FOAM INSULATION', width / 2, height - 60);

  // Add FOAMSTARS watermark
  ctx.font = '16px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillText('Listed on FOAMSTARS', width / 2, height - 30);

  return canvas.toBuffer('image/png');
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('Fetching companies without images...\n');

  const companies = await sql`
    SELECT id, business_name, featured_image_url
    FROM business_listings
    WHERE featured_image_url IS NULL
    ORDER BY business_name
  `;

  console.log(`Found ${companies.length} companies without images\n`);

  if (companies.length === 0) {
    console.log('All companies have images!');
    return;
  }

  const baseUrl = '/generated-images';

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const slug = slugify(company.business_name);
    const filename = `${slug}.png`;
    const filepath = path.join(outputDir, filename);
    const imageUrl = `${baseUrl}/${filename}`;

    process.stdout.write(`Generating: ${company.business_name}... `);

    try {
      // Generate image
      const buffer = generateImage(company.business_name, i);
      fs.writeFileSync(filepath, buffer);

      // Update database
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

  console.log(`\nGenerated images saved to: ${outputDir}`);
  console.log('Done!');
}

main().catch(console.error);
