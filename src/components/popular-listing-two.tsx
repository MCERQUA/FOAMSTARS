// @ts-nocheck 
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getPublicListings, BusinessListing } from '../lib/supabase'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Pagination } from 'swiper/modules';
import 'swiper/css';
import { BsEyeFill, BsGeoAlt, BsPatchCheckFill, BsShareFill, BsStar, BsSuitHeart, BsTelephone } from 'react-icons/bs';

// Import fallback images
import defaultListingImg from '../assets/img/list-1.jpg'
import defaultAvatarImg from '../assets/img/team-1.jpg'

// Mock data as fallback
const mockListings = [
  {
    id: 'mock-1',
    title: 'Elite Home Renovations',
    description: 'Professional home renovation and remodeling services',
    status: 'active',
    hourly_rate: 85,
    is_featured: true,
    is_verified: true,
    featured_image_url: null,
    owner_avatar_url: null,
    phone: '(555) 123-4567',
    city: 'San Francisco',
    state: 'CA',
    review_count: 24,
    average_rating: 4.8,
    categories: { name: 'General Contractors' }
  },
  {
    id: 'mock-2',
    title: 'ProPlumb Solutions',
    description: 'Expert plumbing services for residential and commercial',
    status: 'active',
    hourly_rate: 95,
    is_featured: false,
    is_verified: true,
    featured_image_url: null,
    owner_avatar_url: null,
    phone: '(555) 987-6543',
    city: 'Los Angeles',
    state: 'CA',
    review_count: 18,
    average_rating: 4.9,
    categories: { name: 'Plumbing' }
  },
  {
    id: 'mock-3',
    title: 'Precision Electrical',
    description: 'Licensed electricians for all your electrical needs',
    status: 'active',
    hourly_rate: 75,
    is_featured: true,
    is_verified: true,
    featured_image_url: null,
    owner_avatar_url: null,
    phone: '(555) 456-7890',
    city: 'San Diego',
    state: 'CA',
    review_count: 32,
    average_rating: 4.7,
    categories: { name: 'Electrical' }
  }
]

export default function PopularListingTwo() {
  const [listings, setListings] = useState<BusinessListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadListings = async () => {
      try {
        console.log('Loading popular listings for homepage...')
        
        // Add a race condition with timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 30000)
        })
        
        const data = await Promise.race([
          getPublicListings(6),
          timeoutPromise
        ])
        
        console.log('Popular listings loaded:', data)
        setListings(data || [])
        setError(null)
      } catch (error) {
        console.error('Error loading popular listings:', error)
        console.log('Error details:', error instanceof Error ? error.message : 'Unknown error')
        console.log('Using mock data as fallback...')
        console.log('Mock data:', mockListings)
        setListings(mockListings as BusinessListing[])
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    loadListings()
  }, [])

  if (loading) {
    return (
      <div className="row align-items-center justify-content-center">
        <div className="col-xl-12 text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading contractors...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="row align-items-center justify-content-center">
        <div className="col-xl-12 text-center py-5">
          <p className="text-danger">{error}</p>
          <button 
            className="btn btn-primary btn-sm mt-2" 
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  console.log('Current state:', { loading, listingsCount: listings.length, error })
  
  if (!loading && listings.length === 0) {
    return (
      <div className="row align-items-center justify-content-center">
        <div className="col-xl-8 text-center py-5">
          <div className="empty-state-box p-5 rounded-4">
            <h4 className="mb-3">No Spray Foam Companies Listed Yet</h4>
            <p className="text-light opacity-75 mb-0">Check back soon or be the first to list your company!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="row align-items-center justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <Swiper
                    slidesPerView={4}
                    spaceBetween={15}
                    modules={[Autoplay,Pagination]}
                    pagination={true}
                    loop={true}
                    autoplay={{delay: 2000, disableOnInteraction: false,}}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1440: { slidesPerView: 4 },
                    }}
                >
                {listings.map((listing, index)=>{
                    console.log('Rendering listing:', index, listing.title)
                    return(
                        <SwiperSlide className="singleItem" key={listing.id}>
                            <div className="listingitem-container">
                                <div className="singlelisting-item">
                                    <div className="listing-top-item">
                                        <Link to={`/contractor/${listing.id}`} className="topLink">
                                            <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                                                <div className="d-flex align-items-center justify-content-start gap-2">
                                                    {listing.status === 'active' ? (<span className="badge badge-xs text-uppercase listOpen">Active</span>) :(<span className="badge badge-xs text-uppercase listClose">Inactive</span>)}

                                                    {listing.hourly_rate && <span className="badge badge-xs badge-transparent">${listing.hourly_rate}/hr</span>}

                                                    {listing.is_featured && 
                                                        <span className="badge badge-xs badge-transparent"><BsStar className="mb-0 me-1"/>Featured</span>
                                                    }
                                                </div>
                                            </div>
                                            <img src={listing.featured_image_url || defaultListingImg} className="img-fluid" alt="Listing Image"/>
                                        </Link>
                                        <div className="position-absolute end-0 bottom-0 me-3 mb-3 z-2">
                                            <Link to={`/contractor/${listing.id}`} className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0"/></Link>
                                        </div>
                                    </div>
                                    <div className="listing-middle-item">
                                        <div className="listing-avatar">
                                            <Link to={`/contractor/${listing.id}`} className="avatarImg"><img src={listing.owner_avatar_url || defaultAvatarImg} className="img-fluid circle" alt="Avatar"/></Link>
                                        </div>
                                        <div className="listing-details">
                                            <h4 className="listingTitle"><Link to={`/contractor/${listing.id}`} className="titleLink">{listing.title}{listing.is_verified && <span className="verified"><BsPatchCheckFill className="m-0"/></span>}</Link></h4>
                                            <p>{listing.description || 'Professional contractor services'}</p>
                                        </div>
                                        <div className="listing-info-details">
                                            <div className="d-flex align-items-center justify-content-start gap-2">
                                                <div className="list-calls"><BsTelephone className="mb-0 me-2"/>{listing.phone || 'Contact via listing'}</div>
                                                <div className="list-distance"><BsGeoAlt className="mb-0 me-2"/>{listing.city && listing.state ? `${listing.city}, ${listing.state}` : 'Location not set'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="listing-footer-item">
                                        <div className="d-flex align-items-center justify-content-between gap-2">
                                            <div className="catdWraps">
                                                <div className="flex-start">
                                                    <Link to={`/contractor/${listing.id}`} className="d-flex align-items-center justify-content-start gap-2">
                                                        <span className="catIcon text-primary"><BsPatchCheckFill /></span>
                                                        <span className="catTitle">{(listing as any).categories?.name || 'General Services'}</span>
                                                    </Link>
                                                </div>
                                                <div className="flex-end">
                                                    {listing.review_count && listing.review_count > 0 && (
                                                        <span className="text-warning"><BsStar className="me-1"/>{listing.average_rating || '0'}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="listing-shares">
                                                <div className="d-flex align-items-center justify-content-start gap-2">
                                                    <Link to={`/contractor/${listing.id}`} className="smallLinks" data-bs-toggle="tooltip" data-bs-title="View Listing"><BsEyeFill className="m-0"/></Link>
                                                    <Link to={`/contractor/${listing.id}`} className="smallLinks" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0"></BsSuitHeart></Link>
                                                    <Link to={`/contractor/${listing.id}`} className="smallLinks" data-bs-toggle="tooltip" data-bs-title="Share Listing"><BsShareFill className="m-0"/></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper> 
        </div>
    </div>
  )
}
