import { neon } from '@neondatabase/serverless'

// Neon serverless client for browser
// Uses the connection string from environment
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL

// Check if database is configured
export const isDatabaseConfigured = !!DATABASE_URL

// Create SQL client
const sql = DATABASE_URL ? neon(DATABASE_URL) : null

// Log warning in development if not configured
if (!isDatabaseConfigured && import.meta.env.DEV) {
  console.warn('⚠️ Database not configured. Add VITE_DATABASE_URL to .env')
}

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  image_url: string | null
  color: string | null
  display_order: number
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface BusinessListing {
  id: string
  owner_id: string
  category_id: string
  title: string
  slug: string
  business_name: string | null
  description: string | null
  email: string | null
  phone: string | null
  website_url: string | null
  address: string | null
  city: string | null
  state: string | null
  zip_code: string | null
  country: string | null
  latitude: number | null
  longitude: number | null
  featured_image_url: string | null
  gallery_images: string[]
  tags: string[]
  certifications: string[]
  years_in_business: number | null
  hourly_rate: number | null
  average_rating: number
  review_count: number
  view_count: number
  status: string
  is_verified: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  // Additional business fields
  pricing_model: string | null
  min_project_budget: number | null
  max_project_budget: number | null
  service_area_radius: number | null
  emergency_services: boolean | null
  accepts_online_booking: boolean | null
  // Joined fields
  category_name?: string
  category_slug?: string
}

export interface Profile {
  id: string
  clerk_id: string
  email: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  bio: string | null
  user_type: string
  business_name: string | null
  city: string | null
  state: string | null
  is_verified: boolean
  created_at: string
  updated_at: string
  // Additional profile fields
  address: string | null
  zip_code: string | null
  website_url: string | null
  years_experience: number | null
  hourly_rate: number | null
  min_project_budget: number | null
  service_area_radius: number | null
}

// ============================================
// PUBLIC LISTING FUNCTIONS
// ============================================

export async function getPublicListings(limit: number = 50): Promise<BusinessListing[]> {
  if (!sql) {
    console.log('Database not configured - returning empty listings')
    return []
  }

  try {
    const listings = await sql`
      SELECT
        bl.*,
        c.name as category_name,
        c.slug as category_slug
      FROM business_listings bl
      LEFT JOIN categories c ON bl.category_id = c.id
      WHERE bl.status = 'active'
      ORDER BY bl.created_at DESC
      LIMIT ${limit}
    `
    console.log(`✓ Loaded ${listings.length} listings from Neon`)
    return listings as BusinessListing[]
  } catch (error) {
    console.error('Failed to load listings:', error)
    return []
  }
}

export async function getFeaturedListings(limit: number = 6): Promise<BusinessListing[]> {
  if (!sql) return []

  try {
    const listings = await sql`
      SELECT
        bl.*,
        c.name as category_name,
        c.slug as category_slug
      FROM business_listings bl
      LEFT JOIN categories c ON bl.category_id = c.id
      WHERE bl.status = 'active' AND bl.is_featured = true
      ORDER BY bl.created_at DESC
      LIMIT ${limit}
    `
    return listings as BusinessListing[]
  } catch (error) {
    console.error('Failed to load featured listings:', error)
    return []
  }
}

export async function getListingBySlug(slug: string): Promise<BusinessListing | null> {
  if (!sql) return null

  try {
    const listings = await sql`
      SELECT
        bl.*,
        c.name as category_name,
        c.slug as category_slug
      FROM business_listings bl
      LEFT JOIN categories c ON bl.category_id = c.id
      WHERE bl.slug = ${slug} AND bl.status = 'active'
      LIMIT 1
    `
    return listings[0] as BusinessListing || null
  } catch (error) {
    console.error('Failed to load listing:', error)
    return null
  }
}

export async function getListingById(id: string): Promise<BusinessListing | null> {
  if (!sql) return null

  try {
    const listings = await sql`
      SELECT
        bl.*,
        c.name as category_name,
        c.slug as category_slug
      FROM business_listings bl
      LEFT JOIN categories c ON bl.category_id = c.id
      WHERE bl.id = ${id} AND bl.status = 'active'
      LIMIT 1
    `
    return listings[0] as BusinessListing || null
  } catch (error) {
    console.error('Failed to load listing:', error)
    return null
  }
}

export async function getListingsByState(state: string, limit: number = 50): Promise<BusinessListing[]> {
  if (!sql) return []

  try {
    const listings = await sql`
      SELECT
        bl.*,
        c.name as category_name,
        c.slug as category_slug
      FROM business_listings bl
      LEFT JOIN categories c ON bl.category_id = c.id
      WHERE bl.status = 'active' AND UPPER(bl.state) = UPPER(${state})
      ORDER BY bl.created_at DESC
      LIMIT ${limit}
    `
    return listings as BusinessListing[]
  } catch (error) {
    console.error('Failed to load listings by state:', error)
    return []
  }
}

export async function getListingsByCategory(categorySlug: string, limit: number = 50): Promise<BusinessListing[]> {
  if (!sql) return []

  try {
    const listings = await sql`
      SELECT
        bl.*,
        c.name as category_name,
        c.slug as category_slug
      FROM business_listings bl
      LEFT JOIN categories c ON bl.category_id = c.id
      WHERE bl.status = 'active' AND c.slug = ${categorySlug}
      ORDER BY bl.created_at DESC
      LIMIT ${limit}
    `
    return listings as BusinessListing[]
  } catch (error) {
    console.error('Failed to load listings by category:', error)
    return []
  }
}

export async function searchListings(query: string, state?: string, limit: number = 50): Promise<BusinessListing[]> {
  if (!sql) return []

  try {
    let listings
    if (state) {
      listings = await sql`
        SELECT
          bl.*,
          c.name as category_name,
          c.slug as category_slug
        FROM business_listings bl
        LEFT JOIN categories c ON bl.category_id = c.id
        WHERE bl.status = 'active'
          AND UPPER(bl.state) = UPPER(${state})
          AND (
            bl.title ILIKE ${'%' + query + '%'}
            OR bl.business_name ILIKE ${'%' + query + '%'}
            OR bl.description ILIKE ${'%' + query + '%'}
            OR bl.city ILIKE ${'%' + query + '%'}
          )
        ORDER BY bl.created_at DESC
        LIMIT ${limit}
      `
    } else {
      listings = await sql`
        SELECT
          bl.*,
          c.name as category_name,
          c.slug as category_slug
        FROM business_listings bl
        LEFT JOIN categories c ON bl.category_id = c.id
        WHERE bl.status = 'active'
          AND (
            bl.title ILIKE ${'%' + query + '%'}
            OR bl.business_name ILIKE ${'%' + query + '%'}
            OR bl.description ILIKE ${'%' + query + '%'}
            OR bl.city ILIKE ${'%' + query + '%'}
            OR bl.state ILIKE ${'%' + query + '%'}
          )
        ORDER BY bl.created_at DESC
        LIMIT ${limit}
      `
    }
    return listings as BusinessListing[]
  } catch (error) {
    console.error('Failed to search listings:', error)
    return []
  }
}

// ============================================
// CATEGORY FUNCTIONS
// ============================================

export async function getCategories(): Promise<Category[]> {
  if (!sql) return []

  try {
    const categories = await sql`
      SELECT * FROM categories
      WHERE is_active = true
      ORDER BY display_order ASC
    `
    return categories as Category[]
  } catch (error) {
    console.error('Failed to load categories:', error)
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!sql) return null

  try {
    const categories = await sql`
      SELECT * FROM categories
      WHERE slug = ${slug} AND is_active = true
      LIMIT 1
    `
    return categories[0] as Category || null
  } catch (error) {
    console.error('Failed to load category:', error)
    return null
  }
}

// ============================================
// STATS FUNCTIONS
// ============================================

export async function getCategoryStats(): Promise<{ slug: string; name: string; count: number }[]> {
  if (!sql) return []

  try {
    const stats = await sql`
      SELECT
        c.slug,
        c.name,
        COUNT(bl.id)::int as count
      FROM categories c
      LEFT JOIN business_listings bl ON c.id = bl.category_id AND bl.status = 'active'
      WHERE c.is_active = true
      GROUP BY c.id, c.slug, c.name
      ORDER BY c.display_order ASC
    `
    return stats as { slug: string; name: string; count: number }[]
  } catch (error) {
    console.error('Failed to load category stats:', error)
    return []
  }
}

export async function getStateStats(): Promise<{ state: string; count: number }[]> {
  if (!sql) return []

  try {
    const stats = await sql`
      SELECT
        state,
        COUNT(*)::int as count
      FROM business_listings
      WHERE status = 'active' AND state IS NOT NULL
      GROUP BY state
      ORDER BY count DESC
    `
    return stats as { state: string; count: number }[]
  } catch (error) {
    console.error('Failed to load state stats:', error)
    return []
  }
}

// ============================================
// INCREMENT VIEW COUNT
// ============================================

export async function incrementViewCount(listingId: string): Promise<void> {
  if (!sql) return

  try {
    await sql`
      UPDATE business_listings
      SET view_count = view_count + 1
      WHERE id = ${listingId}
    `
  } catch (error) {
    console.error('Failed to increment view count:', error)
  }
}

// ============================================
// ADDITIONAL TYPE DEFINITIONS
// ============================================

export interface Booking {
  id: string
  booking_reference: string
  listing_id: string
  customer_id: string
  contractor_id: string
  title: string
  description: string | null
  project_type: string | null
  scheduled_date: string
  scheduled_start_time: string | null
  scheduled_end_time: string | null
  estimated_duration_hours: number | null
  service_address: string
  service_city: string
  service_state: string
  service_zip_code: string | null
  access_instructions: string | null
  estimated_cost: number | null
  quoted_price: number | null
  final_price: number | null
  deposit_amount: number | null
  deposit_paid: boolean
  payment_method: string | null
  status: string
  urgency_level: string | null
  customer_notes: string | null
  contractor_notes: string | null
  admin_notes: string | null
  special_requirements: string | null
  materials_needed: string[]
  tools_needed: string[]
  work_photos: string[]
  completion_notes: string | null
  work_completed_at: string | null
  warranty_period_months: number | null
  warranty_expires_at: string | null
  cancelled_at: string | null
  cancelled_by: string | null
  cancellation_reason: string | null
  review_requested: boolean
  review_submitted: boolean
  source: string | null
  created_at: string
  updated_at: string
  // Joined fields
  listing_title?: string
  listing_business_name?: string
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  contractor_name?: string
  contractor_email?: string
  contractor_phone?: string
  contractor_business_name?: string
}

export interface BookingMessage {
  id: string
  booking_id: string
  sender_id: string
  message: string
  message_type: string
  attachment_url: string | null
  is_read: boolean
  read_at: string | null
  created_at: string
  // Joined fields
  sender_name?: string
  sender_avatar?: string
  // Nested sender object for component compatibility
  sender?: {
    full_name: string | null
    avatar_url: string | null
  }
}

export interface Review {
  id: string
  listing_id: string
  reviewer_id: string
  booking_id: string | null
  title: string | null
  content: string
  rating: number
  images: string[]
  quality_rating: number | null
  communication_rating: number | null
  timeliness_rating: number | null
  value_rating: number | null
  owner_response: string | null
  owner_response_date: string | null
  helpful_votes: number
  reported_count: number
  status: string
  is_verified: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

// ============================================
// PROFILE FUNCTIONS (Authenticated)
// ============================================

export async function getProfileById(userId: string): Promise<Profile | null> {
  if (!sql) return null

  try {
    const profiles = await sql`
      SELECT * FROM profiles WHERE id = ${userId} LIMIT 1
    `
    return profiles[0] as Profile || null
  } catch (error) {
    console.error('Failed to load profile:', error)
    return null
  }
}

export async function getProfileByClerkId(clerkId: string): Promise<Profile | null> {
  if (!sql) return null

  try {
    const profiles = await sql`
      SELECT * FROM profiles WHERE clerk_id = ${clerkId} LIMIT 1
    `
    return profiles[0] as Profile || null
  } catch (error) {
    console.error('Failed to load profile:', error)
    return null
  }
}

export async function createProfile(profile: Partial<Profile>): Promise<Profile | null> {
  if (!sql) return null

  try {
    const result = await sql`
      INSERT INTO profiles (
        id, clerk_id, email, full_name, phone, avatar_url, bio,
        user_type, business_name, city, state, is_verified,
        created_at, updated_at
      )
      VALUES (
        ${profile.id || crypto.randomUUID()},
        ${profile.clerk_id || ''},
        ${profile.email || ''},
        ${profile.full_name || null},
        ${profile.phone || null},
        ${profile.avatar_url || null},
        ${profile.bio || null},
        ${profile.user_type || 'customer'},
        ${profile.business_name || null},
        ${profile.city || null},
        ${profile.state || null},
        ${profile.is_verified || false},
        NOW(),
        NOW()
      )
      RETURNING *
    `
    return result[0] as Profile
  } catch (error) {
    console.error('Failed to create profile:', error)
    return null
  }
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
  if (!sql) return null

  try {
    // Build dynamic update - only update provided fields
    const result = await sql`
      UPDATE profiles
      SET
        full_name = COALESCE(${updates.full_name}, full_name),
        phone = COALESCE(${updates.phone}, phone),
        avatar_url = COALESCE(${updates.avatar_url}, avatar_url),
        bio = COALESCE(${updates.bio}, bio),
        user_type = COALESCE(${updates.user_type}, user_type),
        business_name = COALESCE(${updates.business_name}, business_name),
        city = COALESCE(${updates.city}, city),
        state = COALESCE(${updates.state}, state),
        updated_at = NOW()
      WHERE id = ${userId}
      RETURNING *
    `
    return result[0] as Profile || null
  } catch (error) {
    console.error('Failed to update profile:', error)
    return null
  }
}

// ============================================
// USER LISTINGS FUNCTIONS (Authenticated)
// ============================================

export async function getUserListings(userId: string): Promise<BusinessListing[]> {
  if (!sql) return []

  try {
    const listings = await sql`
      SELECT
        bl.*,
        c.name as category_name,
        c.slug as category_slug
      FROM business_listings bl
      LEFT JOIN categories c ON bl.category_id = c.id
      WHERE bl.owner_id = ${userId}
      ORDER BY bl.created_at DESC
    `
    return listings as BusinessListing[]
  } catch (error) {
    console.error('Failed to load user listings:', error)
    return []
  }
}

export async function createListing(listing: Partial<BusinessListing>): Promise<BusinessListing | null> {
  if (!sql) return null

  try {
    // Generate slug from title
    const slug = listing.title
      ? listing.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : `listing-${Date.now()}`

    const result = await sql`
      INSERT INTO business_listings (
        id, owner_id, category_id, title, slug, business_name, description,
        email, phone, website_url, address, city, state, zip_code, country,
        latitude, longitude, featured_image_url, gallery_images, tags,
        certifications, years_in_business, hourly_rate, average_rating,
        review_count, view_count, status, is_verified, is_featured,
        created_at, updated_at
      )
      VALUES (
        ${listing.id || crypto.randomUUID()},
        ${listing.owner_id},
        ${listing.category_id},
        ${listing.title},
        ${slug},
        ${listing.business_name || null},
        ${listing.description || null},
        ${listing.email || null},
        ${listing.phone || null},
        ${listing.website_url || null},
        ${listing.address || null},
        ${listing.city || null},
        ${listing.state || null},
        ${listing.zip_code || null},
        ${listing.country || 'USA'},
        ${listing.latitude || null},
        ${listing.longitude || null},
        ${listing.featured_image_url || null},
        ${listing.gallery_images || []},
        ${listing.tags || []},
        ${listing.certifications || []},
        ${listing.years_in_business || null},
        ${listing.hourly_rate || null},
        0,
        0,
        0,
        'pending',
        false,
        false,
        NOW(),
        NOW()
      )
      RETURNING *
    `
    return result[0] as BusinessListing
  } catch (error) {
    console.error('Failed to create listing:', error)
    return null
  }
}

export async function updateListing(listingId: string, updates: Partial<BusinessListing>): Promise<BusinessListing | null> {
  if (!sql) return null

  try {
    const result = await sql`
      UPDATE business_listings
      SET
        title = COALESCE(${updates.title}, title),
        business_name = COALESCE(${updates.business_name}, business_name),
        description = COALESCE(${updates.description}, description),
        email = COALESCE(${updates.email}, email),
        phone = COALESCE(${updates.phone}, phone),
        website_url = COALESCE(${updates.website_url}, website_url),
        address = COALESCE(${updates.address}, address),
        city = COALESCE(${updates.city}, city),
        state = COALESCE(${updates.state}, state),
        zip_code = COALESCE(${updates.zip_code}, zip_code),
        featured_image_url = COALESCE(${updates.featured_image_url}, featured_image_url),
        gallery_images = COALESCE(${updates.gallery_images}, gallery_images),
        tags = COALESCE(${updates.tags}, tags),
        certifications = COALESCE(${updates.certifications}, certifications),
        years_in_business = COALESCE(${updates.years_in_business}, years_in_business),
        hourly_rate = COALESCE(${updates.hourly_rate}, hourly_rate),
        updated_at = NOW()
      WHERE id = ${listingId}
      RETURNING *
    `
    return result[0] as BusinessListing || null
  } catch (error) {
    console.error('Failed to update listing:', error)
    return null
  }
}

export async function deleteListing(listingId: string): Promise<boolean> {
  if (!sql) return false

  try {
    await sql`DELETE FROM business_listings WHERE id = ${listingId}`
    return true
  } catch (error) {
    console.error('Failed to delete listing:', error)
    return false
  }
}

// ============================================
// BOOKINGS FUNCTIONS (Authenticated)
// ============================================

export async function getUserBookings(userId: string, userType: 'contractor' | 'customer'): Promise<Booking[]> {
  if (!sql) return []

  try {
    // Use separate queries for contractor vs customer to avoid dynamic column names
    const bookings = userType === 'contractor'
      ? await sql`
          SELECT
            b.*,
            bl.title as listing_title,
            bl.business_name as listing_business_name,
            cust.full_name as customer_name,
            cust.email as customer_email,
            cust.phone as customer_phone,
            cont.full_name as contractor_name,
            cont.email as contractor_email,
            cont.phone as contractor_phone,
            cont.business_name as contractor_business_name
          FROM bookings b
          LEFT JOIN business_listings bl ON b.listing_id = bl.id
          LEFT JOIN profiles cust ON b.customer_id = cust.id
          LEFT JOIN profiles cont ON b.contractor_id = cont.id
          WHERE b.contractor_id = ${userId}
          ORDER BY b.created_at DESC
        `
      : await sql`
          SELECT
            b.*,
            bl.title as listing_title,
            bl.business_name as listing_business_name,
            cust.full_name as customer_name,
            cust.email as customer_email,
            cust.phone as customer_phone,
            cont.full_name as contractor_name,
            cont.email as contractor_email,
            cont.phone as contractor_phone,
            cont.business_name as contractor_business_name
          FROM bookings b
          LEFT JOIN business_listings bl ON b.listing_id = bl.id
          LEFT JOIN profiles cust ON b.customer_id = cust.id
          LEFT JOIN profiles cont ON b.contractor_id = cont.id
          WHERE b.customer_id = ${userId}
          ORDER BY b.created_at DESC
        `
    return bookings as Booking[]
  } catch (error) {
    console.error('Failed to load bookings:', error)
    return []
  }
}

export async function updateBookingStatus(bookingId: string, status: string, notes?: string): Promise<Booking | null> {
  if (!sql) return null

  try {
    const result = await sql`
      UPDATE bookings
      SET
        status = ${status},
        contractor_notes = COALESCE(${notes}, contractor_notes),
        updated_at = NOW()
      WHERE id = ${bookingId}
      RETURNING *
    `
    return result[0] as Booking || null
  } catch (error) {
    console.error('Failed to update booking status:', error)
    return null
  }
}

// ============================================
// MESSAGES FUNCTIONS (Authenticated)
// ============================================

export async function getBookingMessages(bookingId: string): Promise<BookingMessage[]> {
  if (!sql) return []

  try {
    const messages = await sql`
      SELECT
        bm.*,
        p.full_name as sender_name,
        p.avatar_url as sender_avatar
      FROM booking_messages bm
      LEFT JOIN profiles p ON bm.sender_id = p.id
      WHERE bm.booking_id = ${bookingId}
      ORDER BY bm.created_at ASC
    `
    return messages as BookingMessage[]
  } catch (error) {
    console.error('Failed to load messages:', error)
    return []
  }
}

export async function sendMessage(
  bookingId: string,
  senderId: string,
  message: string,
  messageType: string = 'text'
): Promise<BookingMessage | null> {
  if (!sql) return null

  try {
    const result = await sql`
      INSERT INTO booking_messages (
        id, booking_id, sender_id, message, message_type, is_read, created_at
      )
      VALUES (
        ${crypto.randomUUID()},
        ${bookingId},
        ${senderId},
        ${message},
        ${messageType},
        false,
        NOW()
      )
      RETURNING *
    `
    return result[0] as BookingMessage
  } catch (error) {
    console.error('Failed to send message:', error)
    return null
  }
}

export async function markMessagesAsRead(bookingId: string, userId: string): Promise<void> {
  if (!sql) return

  try {
    await sql`
      UPDATE booking_messages
      SET is_read = true, read_at = NOW()
      WHERE booking_id = ${bookingId} AND sender_id != ${userId}
    `
  } catch (error) {
    console.error('Failed to mark messages as read:', error)
  }
}

// ============================================
// DASHBOARD STATS FUNCTIONS (Authenticated)
// ============================================

export interface DashboardStats {
  activeListings: number
  totalListings: number
  totalBookings: number
  pendingBookings: number
}

export async function getUserDashboardStats(userId: string): Promise<DashboardStats> {
  if (!sql) {
    return { activeListings: 0, totalListings: 0, totalBookings: 0, pendingBookings: 0 }
  }

  try {
    // Get listings stats
    const listingStats = await sql`
      SELECT
        COUNT(*)::int as total,
        COUNT(*) FILTER (WHERE status = 'active')::int as active
      FROM business_listings
      WHERE owner_id = ${userId}
    `

    // Get bookings stats
    const bookingStats = await sql`
      SELECT
        COUNT(*)::int as total,
        COUNT(*) FILTER (WHERE status = 'pending')::int as pending
      FROM bookings
      WHERE contractor_id = ${userId}
    `

    return {
      activeListings: listingStats[0]?.active || 0,
      totalListings: listingStats[0]?.total || 0,
      totalBookings: bookingStats[0]?.total || 0,
      pendingBookings: bookingStats[0]?.pending || 0,
    }
  } catch (error) {
    console.error('Failed to load dashboard stats:', error)
    return { activeListings: 0, totalListings: 0, totalBookings: 0, pendingBookings: 0 }
  }
}

// ============================================
// RECENT ACTIVITIES FUNCTIONS (Authenticated)
// ============================================

export interface Activity {
  type: string
  message: string
  status: string
  date: string
  icon: string
}

export async function getUserRecentActivities(userId: string): Promise<Activity[]> {
  if (!sql) return []

  try {
    const activities: Activity[] = []

    // Get recent bookings
    const recentBookings = await sql`
      SELECT
        b.id, b.status, b.created_at,
        p.full_name as customer_name,
        bl.title as listing_title
      FROM bookings b
      LEFT JOIN profiles p ON b.customer_id = p.id
      LEFT JOIN business_listings bl ON b.listing_id = bl.id
      WHERE b.contractor_id = ${userId}
      ORDER BY b.created_at DESC
      LIMIT 3
    `

    for (const booking of recentBookings) {
      activities.push({
        type: 'booking',
        message: `New booking from ${booking.customer_name || 'Customer'} for ${booking.listing_title || 'your service'}`,
        status: booking.status,
        date: booking.created_at,
        icon: 'booking'
      })
    }

    // Get recent listing updates
    const recentListings = await sql`
      SELECT id, title, status, updated_at
      FROM business_listings
      WHERE owner_id = ${userId}
      ORDER BY updated_at DESC
      LIMIT 2
    `

    for (const listing of recentListings) {
      if (listing.status === 'active') {
        activities.push({
          type: 'listing_approved',
          message: `Your listing "${listing.title}" is now live!`,
          status: 'approved',
          date: listing.updated_at,
          icon: 'approval'
        })
      }
    }

    // Sort by date and return top 5
    return activities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)

  } catch (error) {
    console.error('Failed to load recent activities:', error)
    return []
  }
}

export async function getUserRecentMessages(userId: string): Promise<BookingMessage[]> {
  if (!sql) return []

  try {
    // Get booking IDs for this user
    const userBookings = await sql`
      SELECT id FROM bookings
      WHERE contractor_id = ${userId} OR customer_id = ${userId}
    `

    if (!userBookings || userBookings.length === 0) {
      return []
    }

    const bookingIds = userBookings.map((b: any) => b.id)

    // Get recent messages from these bookings (excluding user's own messages)
    const messages = await sql`
      SELECT
        bm.*,
        p.full_name as sender_name,
        p.avatar_url as sender_avatar
      FROM booking_messages bm
      LEFT JOIN profiles p ON bm.sender_id = p.id
      WHERE bm.booking_id = ANY(${bookingIds}::uuid[])
        AND bm.sender_id != ${userId}
      ORDER BY bm.created_at DESC
      LIMIT 3
    `

    return messages as BookingMessage[]
  } catch (error) {
    console.error('Failed to load recent messages:', error)
    return []
  }
}
