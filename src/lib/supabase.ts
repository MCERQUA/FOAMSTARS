import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Flag to check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Log warning in development if Supabase is not configured
if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn('⚠️ Supabase environment variables not configured. Running in demo mode with mock data.')
}

// Create a mock client for when Supabase is not configured
const createMockClient = () => {
  const mockAuth = {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => { throw new Error('Supabase not configured') },
    signInWithOAuth: async () => { throw new Error('Supabase not configured') },
    signUp: async () => { throw new Error('Supabase not configured') },
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async () => { throw new Error('Supabase not configured') },
    updateUser: async () => { throw new Error('Supabase not configured') },
  }

  const mockFrom = () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        order: () => ({ limit: async () => ({ data: [], error: null }) }),
      }),
      order: () => ({ limit: async () => ({ data: [], error: null }) }),
    }),
    insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
    update: () => ({ eq: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }) }),
    delete: () => ({ eq: async () => ({ error: null }) }),
  })

  return {
    auth: mockAuth,
    from: mockFrom,
    storage: {
      from: () => ({
        upload: async () => ({ error: new Error('Supabase not configured') }),
        remove: async () => ({ error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
  } as unknown as SupabaseClient<Database>
}

// Create real client only if configured, otherwise use mock
export const supabase: SupabaseClient<Database> = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-client-info': 'directory-site@1.0.0',
    },
  },
  db: {
    schema: 'public',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})
  : createMockClient()

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type BusinessListing = Database['public']['Tables']['business_listings']['Row']
export type BusinessListingInsert = Database['public']['Tables']['business_listings']['Insert']
export type BusinessListingUpdate = Database['public']['Tables']['business_listings']['Update']

export type Category = Database['public']['Tables']['categories']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']

// Auth helper functions
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const getCurrentProfile = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return profile
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  if (error) throw error
  return data
}

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

export const signUpWithEmail = async (email: string, password: string, fullName: string, userType: 'contractor' | 'customer' = 'customer') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        user_type: userType
      }
    }
  })
  if (error) throw error
  return data
}

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`
  })
  if (error) throw error
  return data
}

export const updatePassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password
  })
  if (error) throw error
  return data
}

// Business Listings Functions
export const getUserListings = async () => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('business_listings')
    .select(`
      *,
      categories (
        name,
        icon
      )
    `)
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const createListing = async (listing: BusinessListingInsert) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('business_listings')
    .insert({
      ...listing,
      owner_id: user.id
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateListing = async (id: string, updates: BusinessListingUpdate) => {
  const { data, error } = await supabase
    .from('business_listings')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteListing = async (id: string) => {
  const { error } = await supabase
    .from('business_listings')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) throw error
  return data
}

// Bookings Functions
export const getUserBookings = async (userType: 'contractor' | 'customer') => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const column = userType === 'contractor' ? 'contractor_id' : 'customer_id'
  
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      business_listings (
        title,
        business_name
      ),
      customer:customer_id (
        full_name,
        email,
        phone
      ),
      contractor:contractor_id (
        full_name,
        email,
        phone,
        business_name
      )
    `)
    .eq(column, user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const updateBookingStatus = async (id: string, status: string, notes?: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({
      status,
      contractor_notes: notes,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Messages Functions
export const getBookingMessages = async (bookingId: string) => {
  const { data, error } = await supabase
    .from('booking_messages')
    .select(`
      *,
      sender:sender_id (
        full_name,
        avatar_url
      )
    `)
    .eq('booking_id', bookingId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export const sendMessage = async (bookingId: string, message: string, messageType: string = 'text') => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('booking_messages')
    .insert({
      booking_id: bookingId,
      sender_id: user.id,
      message,
      message_type: messageType
    })
    .select(`
      *,
      sender:sender_id (
        full_name,
        avatar_url
      )
    `)
    .single()

  if (error) throw error
  return data
}

export const markMessagesAsRead = async (bookingId: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('booking_messages')
    .update({
      is_read: true,
      read_at: new Date().toISOString()
    })
    .eq('booking_id', bookingId)
    .neq('sender_id', user.id)

  if (error) throw error
}

// Avatar Upload Functions
export const uploadAvatar = async (file: File) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  // Create unique filename with user folder structure for RLS policies
  const fileExt = file.name.split('.').pop()
  const fileName = `avatar-${Date.now()}.${fileExt}`
  const filePath = `${user.id}/${fileName}` // This format matches RLS policy expectations

  // Upload file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true // Allow overwriting existing avatars
    })

  if (uploadError) throw uploadError

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  if (!urlData?.publicUrl) throw new Error('Failed to get avatar URL')

  // Update profile with new avatar URL
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: urlData.publicUrl })
    .eq('id', user.id)

  if (updateError) throw updateError

  return urlData.publicUrl
}

export const deleteAvatar = async (avatarUrl: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  // Extract file path from URL - handle both old and new path formats
  const urlParts = avatarUrl.split('/')
  const fileName = urlParts[urlParts.length - 1]
  
  // Check if this is an old format (user-id-timestamp.ext) or new format (user-id/avatar-timestamp.ext)
  let filePath: string
  if (fileName.startsWith(user.id + '-')) {
    // Old format: file was stored in root with user ID prefix
    filePath = fileName
  } else {
    // New format: file is stored in user folder
    filePath = `${user.id}/${fileName}`
  }

  // Delete from storage
  const { error: deleteError } = await supabase.storage
    .from('avatars')
    .remove([filePath])

  if (deleteError) throw deleteError

  // Update profile to remove avatar URL
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: null })
    .eq('id', user.id)

  if (updateError) throw updateError
}

// Dashboard Statistics Functions
export const getUserDashboardStats = async () => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  try {
    // Get user's listings count
    const { count: activeListings } = await supabase
      .from('business_listings')
      .select('id', { count: 'exact' })
      .eq('owner_id', user.id)
      .eq('status', 'active')

    // Get total listings count (all statuses)
    const { count: totalListings } = await supabase
      .from('business_listings')
      .select('id', { count: 'exact' })
      .eq('owner_id', user.id)

    // Get bookings count
    const { count: totalBookings } = await supabase
      .from('bookings')
      .select('id', { count: 'exact' })
      .eq('contractor_id', user.id)

    // Get pending bookings count
    const { count: pendingBookings } = await supabase
      .from('bookings')
      .select('id', { count: 'exact' })
      .eq('contractor_id', user.id)
      .eq('status', 'pending')

    return {
      activeListings: activeListings || 0,
      totalListings: totalListings || 0,
      totalBookings: totalBookings || 0,
      pendingBookings: pendingBookings || 0,
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error fetching dashboard stats:', error)
    } else {
      console.error('Dashboard stats loading failed')
    }
    return {
      activeListings: 0,
      totalListings: 0,
      totalBookings: 0,
      pendingBookings: 0,
    }
  }
}

// Recent Activities Functions
export const getUserRecentActivities = async () => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  try {
    const activities: any[] = []

    // Get recent bookings
    const { data: recentBookings } = await supabase
      .from('bookings')
      .select(`
        id,
        status,
        created_at,
        customer:profiles!customer_id (full_name),
        business_listings (title)
      `)
      .eq('contractor_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3)

    if (recentBookings) {
      recentBookings.forEach(booking => {
        activities.push({
          type: 'booking',
          message: `New booking from ${booking.customer?.full_name || 'Customer'} for ${booking.business_listings?.title || 'your service'}`,
          status: booking.status,
          date: booking.created_at,
          icon: 'booking'
        })
      })
    }

    // Get recent listing status changes (simulated)
    const { data: recentListings } = await supabase
      .from('business_listings')
      .select('id, title, status, created_at, updated_at')
      .eq('owner_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(2)

    if (recentListings) {
      recentListings.forEach(listing => {
        if (listing.status === 'active') {
          activities.push({
            type: 'listing_approved',
            message: `Your listing "${listing.title}" is now live!`,
            status: 'approved',
            date: listing.updated_at,
            icon: 'approval'
          })
        }
      })
    }

    // Sort all activities by date
    return activities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)

  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error fetching recent activities:', error)
    } else {
      console.error('Recent activities loading failed')
    }
    return []
  }
}

// Get Recent Messages for Dashboard Preview
export const getUserRecentMessages = async () => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  try {
    // First get user's bookings, then get messages from those bookings
    const { data: userBookings } = await supabase
      .from('bookings')
      .select('id')
      .or(`contractor_id.eq.${user.id},customer_id.eq.${user.id}`)

    if (!userBookings || userBookings.length === 0) {
      return []
    }

    const bookingIds = userBookings.map(booking => booking.id)

    // Get recent messages from user's bookings
    const { data: messages } = await supabase
      .from('booking_messages')
      .select(`
        id,
        message,
        created_at,
        sender:profiles!sender_id (full_name)
      `)
      .in('booking_id', bookingIds)
      .neq('sender_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3)

    return messages || []
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error fetching recent messages:', error)
    } else {
      console.error('Recent messages loading failed')
    }
    return []
  }
}

// Public Listings Functions (for website display)
export const getPublicListings = async (limit: number = 50) => {
  // Return empty array if Supabase is not configured (demo mode)
  if (!isSupabaseConfigured) {
    console.log('Supabase not configured - returning empty listings (demo mode)')
    return []
  }

  try {
    console.log('Loading contractor listings from Supabase...')

    // Try direct REST API call to bypass potential Supabase client timeout issues
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/business_listings?status=eq.active&order=created_at.desc&limit=${limit}&select=*`, {
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log(`Successfully loaded ${data?.length || 0} contractor listings via REST API`)
      return data || []
    } catch (fetchError) {
      console.warn('Direct REST API failed, trying Supabase client:', fetchError)

      // Fallback to Supabase client
      const { data, error } = await supabase
        .from('business_listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Supabase client query failed:', error)
        throw new Error(`Database query failed: ${error.message}`)
      }

      console.log(`Successfully loaded ${data?.length || 0} contractor listings via Supabase client`)
      return data || []
    }
  } catch (error) {
    console.error('Failed to load contractor listings:', error)
    throw error
  }
}

export const getFeaturedListings = async (limit: number = 6) => {
  const { data, error } = await supabase
    .from('business_listings')
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq('status', 'active')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export const getListingsByCategory = async (categoryId: string, limit: number = 20) => {
  const { data, error } = await supabase
    .from('business_listings')
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq('status', 'active')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export const searchListings = async (query: string, city?: string, limit: number = 20) => {
  let queryBuilder = supabase
    .from('business_listings')
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq('status', 'active')

  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%,business_name.ilike.%${query}%`)
  }

  if (city) {
    queryBuilder = queryBuilder.ilike('city', `%${city}%`)
  }

  const { data, error } = await queryBuilder
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export const getListingById = async (id: string) => {
  const { data, error } = await supabase
    .from('business_listings')
    .select(`
      *,
      categories (
        name,
        slug
      ),
      profiles (
        full_name,
        avatar_url,
        phone
      )
    `)
    .eq('id', id)
    .eq('status', 'active')
    .single()

  if (error) throw error
  return data
}