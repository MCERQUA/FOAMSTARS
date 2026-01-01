import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const sql = neon(process.env.VITE_DATABASE_URL);

// Map company slugs to their database slugs
const companyMappings = [
  { folder: 'advanced-roofing-and-insulation-llc', dbSlug: 'advanced-roofing-and-insulation-llc' },
  { folder: 'alabama-spray-foam-llc', dbSlug: 'alabama-spray-foam-llc' },
  { folder: 'big-dog-insulation-llc', dbSlug: 'big-dog-insulation-llc' },
  { folder: 'brazos-valley-insulators-llc', dbSlug: 'brazos-valley-insulators-llc' },
  { folder: 'edi-insulation-llc', dbSlug: 'edi-insulation-llc' },
  { folder: 'five-star-pro-foam-insulation', dbSlug: 'five-star-pro-foam-insulation' },
  { folder: 'jackson-spray-foam-insulation-llc', dbSlug: 'jackson-spray-foam-insulation-llc' },
  { folder: 'r-r-pro-spray-foam-llc', dbSlug: 'r-r-pro-spray-foam-llc' },
  { folder: 'rock-crete-foam-insulators', dbSlug: 'rock-crete-foam-insulators' },
  { folder: 'two-dogs-spray-foam-llc', dbSlug: 'two-dogs-spray-foam-llc' },
];

async function updateLogos() {
  console.log('Updating company logos in database...\n');

  for (const company of companyMappings) {
    const logoPath = `/companies/${company.folder}/logos/square.png`;

    try {
      const result = await sql`
        UPDATE business_listings
        SET featured_image_url = ${logoPath},
            updated_at = NOW()
        WHERE slug = ${company.dbSlug}
        RETURNING title, slug
      `;

      if (result.length > 0) {
        console.log(`✓ ${result[0].title} → ${logoPath}`);
      } else {
        console.log(`⚠ No match for slug: ${company.dbSlug}`);
      }
    } catch (err) {
      console.error(`✗ Error updating ${company.dbSlug}: ${err.message}`);
    }
  }

  console.log('\n✅ Done!');
}

updateLogos().catch(console.error);
