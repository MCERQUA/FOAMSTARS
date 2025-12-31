import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import 'dotenv/config'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Spray Foam Categories
const categories = [
  {
    name: 'Spray Foam Insulation',
    slug: 'spray-foam-insulation',
    description: 'Residential & commercial spray foam insulation services',
    icon: 'FaHouseChimney',
    color: '#c71f37',
    displayOrder: 1,
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'Concrete Lifting',
    slug: 'concrete-lifting',
    description: 'Polyurethane foam concrete leveling & lifting',
    icon: 'FaRoad',
    color: '#2563eb',
    displayOrder: 2,
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'Artistic & Themed Projects',
    slug: 'artistic-themed-projects',
    description: 'Movie sets, theme parks & sculptural foam',
    icon: 'FaFilm',
    color: '#7c3aed',
    displayOrder: 3,
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'Polyurethane Coatings',
    slug: 'polyurethane-coatings',
    description: 'Protective coatings & waterproofing',
    icon: 'BsDroplet',
    color: '#0891b2',
    displayOrder: 4,
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'SPF Roofing',
    slug: 'spf-roofing',
    description: 'Spray polyurethane foam roofing systems',
    icon: 'FaUmbrella',
    color: '#059669',
    displayOrder: 5,
    isActive: true,
    isFeatured: true,
  },
]

// Spray Foam Companies (from CSV research)
const companies = [
  { businessName: 'Alabama Spray Foam LLC', address: '7901 Woodside Dr E', city: 'Mobile', state: 'AL', zipCode: '36695', phone: '251-654-7963', websiteUrl: 'https://alabamasprayfoam.com', email: 'contact@alabamasprayfoam.com', services: 'Spray Foam Insulation' },
  { businessName: 'A to Z Insulation LLC', address: 'N2698 County Road E', city: 'Waupaca', state: 'WI', zipCode: '54981', phone: '715-258-8200', websiteUrl: 'https://atozinsulationllc.com', email: 'info@atozinsulationllc.com', services: 'Insulation Services' },
  { businessName: 'EDI Insulation LLC', address: '9091 85th Ave N', city: 'Brooklyn Park', state: 'MN', zipCode: '55445', phone: '763-424-0010', websiteUrl: 'https://ediinsulation.com', email: 'info@ediinsulation.com', services: 'Insulation Services' },
  { businessName: 'Pearsons Spray Foam Insulation LLC', address: 'W5761 State Road 23', city: 'Montello', state: 'WI', zipCode: '53949', phone: '920-250-4521', websiteUrl: 'https://pearsonsinsulation.com', email: 'pearsonsinsulation@gmail.com', services: 'Spray Foam Insulation' },
  { businessName: 'Top Notch Insulating Inc', address: '11861 34th St SW', city: 'Dickinson', state: 'ND', zipCode: '58601', phone: '701-483-5024', websiteUrl: 'https://topnotchinsulating.com', email: 'travis@topnotchinsulating.com', services: 'Insulation Services' },
  { businessName: 'R&R Pro Spray Foam LLC', address: '1002 Plateau Ave', city: 'Lakeland', state: 'FL', zipCode: '33815', phone: '863-808-3121', websiteUrl: 'https://rrprosprayfoam.com', email: 'info@rrprosprayfoam.com', services: 'Spray Foam Insulation' },
  { businessName: 'Home Sweet Foam Insulation LLC', address: '15315 Court Amber Trl', city: 'Cypress', state: 'TX', zipCode: '77433', phone: '832-224-2337', websiteUrl: 'https://homesweetfoam.com', email: 'info@homesweetfoam.com', services: 'Spray Foam Insulation' },
  { businessName: 'M3 Insulation LLC', address: '400 E 3rd St', city: 'Rochester', state: 'MI', zipCode: '48307', phone: '248-773-5512', websiteUrl: 'https://m3insulation.com', email: 'info@m3insulation.com', services: 'Insulation Services' },
  { businessName: 'Jackson Spray Foam Insulation LLC', address: '15 Lasalle Cove', city: 'Jackson', state: 'TN', zipCode: '38305', phone: '731-217-4383', websiteUrl: 'https://jacksonsprayfoam.com', email: 'sales@jacksonsprayfoam.com', services: 'Spray Foam Insulation' },
  { businessName: 'Big Dog Insulation LLC', address: '7650 E Division St', city: 'Evansville', state: 'IN', zipCode: '47715', phone: '812-760-6331', websiteUrl: 'https://bigdoginsulation.com', email: 'austin@bigdoginsulation.com', services: 'Insulation Services' },
  { businessName: 'Spray Tex Insulation LLC', address: '411 N Star Rd', city: 'Canton', state: 'TX', zipCode: '75103', phone: '903-220-4318', websiteUrl: 'https://spraytexinsulation.com', email: 'chris@spraytexinsulation.com', services: 'Spray Foam Insulation' },
  { businessName: 'Advanced Roofing and Insulation LLC', address: '9608 S Kent Rd', city: 'Yoder', state: 'KS', zipCode: '67585', phone: '620-899-3165', websiteUrl: 'https://advancedroofingandinsulation.com', email: 'advancedroofingandinsulation@gmail.com', services: 'Spray Foam Insulation & SPF Roofing' },
  { businessName: 'The Right R Value LLC', address: '1113 US Route 5', city: 'West Burke', state: 'VT', zipCode: '05871', phone: '802-535-4420', websiteUrl: 'https://therightrvalue.com', email: 'rightrvalue@gmail.com', services: 'Insulation Services' },
  { businessName: 'Castle Foam LLC', address: '2286 Gathering Way', city: 'Prattville', state: 'AL', zipCode: '36066', phone: '334-450-1305', websiteUrl: 'https://castlefoam.com', email: 'jarrod@castlefoam.com', services: 'Spray Foam Insulation' },
  { businessName: 'Brazos Valley Insulators LLC', address: '301 Duke St Suite A', city: 'Navasota', state: 'TX', zipCode: '77868', phone: '936-727-7122', websiteUrl: 'https://brazosvalley-insulators.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: "M&J's Spray Foam Insulation Solutions", address: '85 North 400 West', city: 'Winamac', state: 'IN', zipCode: '46996', phone: '574-242-0463', websiteUrl: 'https://mandjssprayfoam.com', email: 'mandjssprayfoam@gmail.com', services: 'Spray Foam Insulation' },
  { businessName: 'Insul-Maxx Spray Foam & Coatings LLC', address: '127 Cedar Point Dr', city: 'Mooresville', state: 'NC', zipCode: '28117', phone: '704-360-9270', websiteUrl: 'https://insulmaxxspf.com', email: '', services: 'Spray Foam Insulation & Coatings' },
  { businessName: 'Acer Foam Insulation LLC', address: '9448 Date Rd', city: 'Baroda', state: 'MI', zipCode: '49101', phone: '231-923-6737', websiteUrl: 'https://acerinsulation.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Texas Foam Insulators', address: '111 N Holland St', city: 'Willis', state: 'TX', zipCode: '77378', phone: '281-849-3626', websiteUrl: 'https://texasfoaminsulators.com', email: 'sales@texasfoaminsulators.com', services: 'Spray Foam Insulation' },
  { businessName: 'Frontier Foam Insulation', address: '13344 Hwy 75 North', city: 'Willis', state: 'TX', zipCode: '77378', phone: '936-228-5060', websiteUrl: '', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Five Star Foam', address: '4112 W 15th St Ste 207', city: 'Plano', state: 'TX', zipCode: '75093', phone: '', websiteUrl: 'https://fivestarfoam.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Five Star Pro Foam Insulation', address: '1709 Hazelwood Dr SE', city: 'Marietta', state: 'GA', zipCode: '30067', phone: '770-820-2704', websiteUrl: 'https://fsprofoam.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Rock-Crete Foam Insulators', address: '28555 Pleasant Grove Rd', city: 'North Zulch', state: 'TX', zipCode: '77872', phone: '979-229-3493', websiteUrl: 'https://rock-crete.com', email: 'info@rock-cretefoam.com', services: 'Spray Foam Insulation & Roofing' },
  { businessName: 'Allstate Spray Foam Insulation', address: '125 W Oak View Dr', city: 'Visalia', state: 'CA', zipCode: '93291', phone: '559-648-8508', websiteUrl: 'https://allstatesprayfoam.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Two Dogs Spray Foam LLC', address: '5291 Kiger Rd', city: 'Rougemont', state: 'NC', zipCode: '27572', phone: '919-884-9987', websiteUrl: 'https://twodogssprayfoam.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Evolution Sprayfoam LLC', address: '', city: 'Trenton', state: 'MO', zipCode: '', phone: '660-635-0147', websiteUrl: 'https://evolutionsprayfoam.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Epic Spray Foam LLC', address: '7181 Vaughn Rd', city: 'Canton', state: 'GA', zipCode: '30115', phone: '833-362-6489', websiteUrl: 'https://epicsprayfoam.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Foam It Insulation', address: '', city: 'Binghamton', state: 'NY', zipCode: '', phone: '607-821-0519', websiteUrl: 'https://foamitinsulation.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Spray Foam NW LLC', address: '310 Broadway Ave', city: 'South Bend', state: 'WA', zipCode: '98586', phone: '360-942-7847', websiteUrl: 'https://sprayfoamnorthwest.com', email: '', services: 'Spray Foam Insulation & Roofing' },
  { businessName: "JT's Spray Foam Solutions LLC", address: '950 Sugar Lake Road', city: 'Pittsboro', state: 'NC', zipCode: '27312', phone: '919-368-0642', websiteUrl: 'https://jtssprayfoamsolutions.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Foamaholics LLC', address: '', city: 'Prattville', state: 'AL', zipCode: '36066', phone: '', websiteUrl: 'https://foamaholicsllc.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: "Kirby's Spray Foam Insulation Inc", address: '', city: 'Kelly', state: 'LA', zipCode: '71441', phone: '318-680-7402', websiteUrl: 'https://kirbyssprayfoaminsulation.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Midwest Spray Foam', address: '', city: 'Midland', state: 'MI', zipCode: '', phone: '989-891-7235', websiteUrl: 'https://midwestsprayfoaminsulation.com', email: 'MIDWESTSFI@GMAIL.COM', services: 'Spray Foam Insulation' },
  { businessName: 'North Mississippi Spray Foam LLC', address: '', city: 'Grenada', state: 'MS', zipCode: '38901', phone: '662-699-9867', websiteUrl: 'https://northmsfoam.com', email: '', services: 'Spray Foam Insulation & Roofing' },
  { businessName: '3A Foam Specialists LLC', address: '102 Maple Street', city: 'Paradise', state: 'TX', zipCode: '76073', phone: '817-771-8086', websiteUrl: 'https://3afoam.com', email: '', services: 'Spray Foam Insulation & Roofing' },
  { businessName: 'Insutech LLC', address: '', city: 'Melbourne', state: 'FL', zipCode: '32940', phone: '305-877-0013', websiteUrl: '', email: '', services: 'Insulation Services' },
  { businessName: 'Super Seal Spray Foam', address: '', city: '', state: 'NY', zipCode: '', phone: '', websiteUrl: 'https://superseal-sprayfoam.com', email: '', services: 'Spray Foam Insulation' },
  { businessName: 'Mountain States Sprayfoam', address: '', city: 'Northwest Montana', state: 'MT', zipCode: '', phone: '', websiteUrl: 'https://insulatemontana.com', email: '', services: 'Spray Foam Insulation' },
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.bookingStatusHistory.deleteMany()
  await prisma.bookingMessage.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.reviewVote.deleteMany()
  await prisma.review.deleteMany()
  await prisma.businessListing.deleteMany()
  await prisma.category.deleteMany()
  await prisma.profile.deleteMany()

  // Create categories
  console.log('📁 Creating categories...')
  const createdCategories: Record<string, string> = {}
  for (const category of categories) {
    const created = await prisma.category.create({
      data: category,
    })
    createdCategories[category.slug] = created.id
    console.log(`  ✓ ${category.name}`)
  }

  // Create a system admin profile to own the seeded listings
  console.log('👤 Creating system admin profile...')
  const adminProfile = await prisma.profile.create({
    data: {
      clerkId: 'system-admin',
      email: 'admin@foamstars.com',
      fullName: 'FOAMSTARS Admin',
      userType: 'contractor',
      isVerified: true,
    },
  })
  console.log(`  ✓ Admin profile created`)

  // Create business listings
  console.log('🏢 Creating business listings...')
  const defaultCategoryId = createdCategories['spray-foam-insulation']

  for (const company of companies) {
    // Determine category based on services
    let categoryId = defaultCategoryId
    if (company.services.toLowerCase().includes('roofing')) {
      categoryId = createdCategories['spf-roofing']
    } else if (company.services.toLowerCase().includes('coating')) {
      categoryId = createdCategories['polyurethane-coatings']
    }

    await prisma.businessListing.create({
      data: {
        ownerId: adminProfile.id,
        categoryId: categoryId,
        title: company.businessName,
        slug: slugify(company.businessName),
        businessName: company.businessName,
        description: `Professional ${company.services.toLowerCase()} services in ${company.city}, ${company.state}. Contact us for a free estimate.`,
        address: company.address || null,
        city: company.city || null,
        state: company.state,
        zipCode: company.zipCode || null,
        phone: company.phone || null,
        email: company.email || null,
        websiteUrl: company.websiteUrl || null,
        status: 'active',
        isVerified: true,
        tags: company.services.split(' & ').map(s => s.trim()),
      },
    })
    console.log(`  ✓ ${company.businessName}`)
  }

  console.log('')
  console.log('✅ Seed completed!')
  console.log(`   - ${categories.length} categories`)
  console.log(`   - ${companies.length} business listings`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
