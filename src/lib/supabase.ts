// Re-export Neon database functions for components that expect Supabase-like interface
// This file provides a bridge to the Neon database

export {
    getListingById,
    getPublicListings,
    getFeaturedListings,
    getListingsByState,
    getListingsByCategory,
    searchListings,
    type BusinessListing,
    type Category,
    type Review,
} from './neon'
