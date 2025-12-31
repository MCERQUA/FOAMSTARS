#!/usr/bin/env node
/**
 * Fetch Open Graph images from company websites
 * and update the database with image URLs
 */

import { neon } from '@neondatabase/serverless';
import https from 'https';
import http from 'http';
import { URL } from 'url';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable required');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

// Fetch HTML from URL with timeout and redirect handling
async function fetchHTML(urlString, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      reject(new Error('Too many redirects'));
      return;
    }

    const url = new URL(urlString);
    const protocol = url.protocol === 'https:' ? https : http;

    const req = protocol.get(urlString, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FOAMSTARSBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
      }
    }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, urlString).href;
        }
        fetchHTML(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Extract og:image from HTML
function extractOgImage(html, baseUrl) {
  // Try og:image first
  const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
                  html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);

  if (ogMatch) {
    let imageUrl = ogMatch[1];
    // Handle relative URLs
    if (!imageUrl.startsWith('http')) {
      imageUrl = new URL(imageUrl, baseUrl).href;
    }
    return imageUrl;
  }

  // Try twitter:image as fallback
  const twitterMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
                       html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);

  if (twitterMatch) {
    let imageUrl = twitterMatch[1];
    if (!imageUrl.startsWith('http')) {
      imageUrl = new URL(imageUrl, baseUrl).href;
    }
    return imageUrl;
  }

  return null;
}

async function main() {
  console.log('Fetching companies from database...\n');

  const companies = await sql`
    SELECT id, business_name, website_url, featured_image_url
    FROM business_listings
    WHERE website_url IS NOT NULL
    ORDER BY business_name
  `;

  console.log(`Found ${companies.length} companies with websites\n`);

  const results = [];

  for (const company of companies) {
    process.stdout.write(`${company.business_name}... `);

    try {
      const html = await fetchHTML(company.website_url);
      const ogImage = extractOgImage(html, company.website_url);

      if (ogImage) {
        console.log(`✓ Found: ${ogImage.substring(0, 60)}...`);
        results.push({
          id: company.id,
          business_name: company.business_name,
          og_image: ogImage,
          status: 'found'
        });
      } else {
        console.log('✗ No og:image found');
        results.push({
          id: company.id,
          business_name: company.business_name,
          og_image: null,
          status: 'no_image'
        });
      }
    } catch (error) {
      console.log(`✗ Error: ${error.message}`);
      results.push({
        id: company.id,
        business_name: company.business_name,
        og_image: null,
        status: 'error',
        error: error.message
      });
    }

    // Small delay to be polite
    await new Promise(r => setTimeout(r, 500));
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));

  const found = results.filter(r => r.status === 'found');
  const noImage = results.filter(r => r.status === 'no_image');
  const errors = results.filter(r => r.status === 'error');

  console.log(`Found images: ${found.length}`);
  console.log(`No og:image: ${noImage.length}`);
  console.log(`Errors: ${errors.length}`);

  // Ask to update database
  if (found.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('UPDATING DATABASE');
    console.log('='.repeat(60));

    for (const result of found) {
      try {
        await sql`
          UPDATE business_listings
          SET featured_image_url = ${result.og_image}
          WHERE id = ${result.id}
        `;
        console.log(`✓ Updated: ${result.business_name}`);
      } catch (error) {
        console.log(`✗ Failed to update ${result.business_name}: ${error.message}`);
      }
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
