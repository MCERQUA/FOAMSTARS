#!/usr/bin/env node
/**
 * Dynamic Sitemap Generator for FOAMSTARS
 *
 * This script generates a sitemap.xml that includes:
 * - Static pages (home, about, contact, etc.)
 * - All state landing pages (/contractors/texas, /contractors/florida, etc.)
 * - All contractor profile pages from the database
 *
 * Run: node scripts/generate-sitemap.mjs
 * Or automatically during build via package.json
 */

import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get directory path
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// US States for state landing pages
const US_STATES = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado',
  'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho',
  'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana',
  'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota',
  'mississippi', 'missouri', 'montana', 'nebraska', 'nevada',
  'new-hampshire', 'new-jersey', 'new-mexico', 'new-york',
  'north-carolina', 'north-dakota', 'ohio', 'oklahoma', 'oregon',
  'pennsylvania', 'rhode-island', 'south-carolina', 'south-dakota',
  'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington',
  'west-virginia', 'wisconsin', 'wyoming'
]

const BASE_URL = 'https://foamstars.netlify.app'
const TODAY = new Date().toISOString().split('T')[0]

// Static pages with their priorities and change frequencies
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/contractors/list', priority: '0.9', changefreq: 'daily' },
  { path: '/contractors/map', priority: '0.8', changefreq: 'daily' },
  { path: '/about-us', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.6', changefreq: 'monthly' },
  { path: '/help-center', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
]

async function fetchContractors() {
  const DATABASE_URL = process.env.VITE_DATABASE_URL || process.env.DATABASE_URL

  if (!DATABASE_URL) {
    console.log('⚠️  No database URL found, skipping contractor URLs')
    return []
  }

  try {
    // Dynamic import for neon
    const { neon } = await import('@neondatabase/serverless')
    const sql = neon(DATABASE_URL)

    const contractors = await sql`
      SELECT id, slug, updated_at
      FROM business_listings
      WHERE status = 'active'
      ORDER BY updated_at DESC
    `

    console.log(`✓ Found ${contractors.length} contractors in database`)
    return contractors
  } catch (error) {
    console.error('Error fetching contractors:', error.message)
    return []
  }
}

function generateSitemap(contractors) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
`

  // Add static pages
  for (const page of STATIC_PAGES) {
    xml += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  }

  // Add state landing pages
  xml += `
  <!-- State Landing Pages -->
`
  for (const state of US_STATES) {
    xml += `  <url>
    <loc>${BASE_URL}/contractors/${state}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
  }

  // Add contractor profile pages
  if (contractors.length > 0) {
    xml += `
  <!-- Contractor Profile Pages -->
`
    for (const contractor of contractors) {
      const lastmod = contractor.updated_at
        ? new Date(contractor.updated_at).toISOString().split('T')[0]
        : TODAY

      xml += `  <url>
    <loc>${BASE_URL}/contractor/${contractor.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`
    }
  }

  xml += `</urlset>
`

  return xml
}

async function main() {
  console.log('🗺️  Generating sitemap...')

  // Fetch contractors from database
  const contractors = await fetchContractors()

  // Generate sitemap XML
  const sitemap = generateSitemap(contractors)

  // Write to public directory
  const outputPath = join(__dirname, '..', 'public', 'sitemap.xml')
  writeFileSync(outputPath, sitemap)

  console.log(`✓ Sitemap generated with:`)
  console.log(`  - ${STATIC_PAGES.length} static pages`)
  console.log(`  - ${US_STATES.length} state landing pages`)
  console.log(`  - ${contractors.length} contractor profiles`)
  console.log(`  → ${outputPath}`)
}

main().catch(console.error)
