// @ts-nocheck 
import { useState, useEffect } from 'react'
import { getFeaturedListings, BusinessListing } from '../lib/neon'
import { Link } from 'react-router-dom'
import { BsGeoAlt, BsGlobe, BsPatchCheckFill, BsStar, BsStarFill, BsSuitHeart, BsTelephone } from 'react-icons/bs'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Pagination } from 'swiper/modules';
import 'swiper/css';

// Helper function to check if a listing has a real logo (not a placeholder)
const hasRealLogo = (listing: BusinessListing): boolean => {
  const url = listing.featured_image_url
  // Only show listings with processed logos from /companies/ folder
  return !!url && url.startsWith('/companies/')
}

export default function FeaturedListing() {
  const [listings, setListings] = useState<BusinessListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadListings = async () => {
      try {
        const data = await getFeaturedListings(50)
        // Filter to only show companies with real logos
        const listingsWithLogos = data.filter(hasRealLogo)
        setListings(listingsWithLogos)
      } catch (error) {
        console.error('Error loading featured listings:', error)
      } finally {
        setLoading(false)
      }
    }
    loadListings()
  }, [])

  if (loading) {
    return (
      <div className="row align-items-center justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="row align-items-center justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center">
          <p className="text-muted">No featured listings available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
        <div className="row align-items-center justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="owl-carousel owl-theme itemslider">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={15}
                        modules={[Autoplay,Pagination]}
                        pagination={true}
                        loop={listings.length > 1}
                        autoplay={{delay: 2000, disableOnInteraction: false,}} 
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1440: { slidesPerView: 4 },
                        }}
                    >
                    {listings.map((listing, index)=>{
                        return(
                            <SwiperSlide className="singleItem" key={listing.id}>
                                <div className="listingitem-container">
                                    <div className="singlelisting-item bg-light border-0">
                                        <div className="listing-top-item">
                                            <div className="position-absolute end-0 top-0 me-3 mt-3 z-2">
                                                <Link to={`/single-listing/${listing.id}`} className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0"/></Link>
                                            </div>
                                            <Link to={`/single-listing/${listing.id}`} className="topLink">
                                                <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                                                    <div className="d-flex align-items-center justify-content-start gap-2">
                                                        {listing.status === 'active' ? (<span className="badge badge-xs text-uppercase listOpen">Active</span>) :(<span className="badge badge-xs text-uppercase listClose">Inactive</span>)}
    
                                                        {listing.hourly_rate && <span className="badge badge-xs badge-transparent">${listing.hourly_rate}/hr</span>}
    
                                                        {listing.is_featured && 
                                                            <span className="badge badge-xs badge-transparent"><BsStar className="mb-0 me-1"/>Featured</span>
                                                        }
                                                    </div>
                                                </div>
                                                <img src={listing.featured_image_url || '/src/assets/img/list-1.jpg'} className="img-fluid" alt="Listing Image"/>
                                            </Link>
                                            <div className="opssListing position-absolute start-0 bottom-0 ms-3 mb-4 z-2">
                                                <div className="d-flex align-items-center justify-content-between gap-2">
                                                    <div className="listing-avatar">
                                                        <Link to={`/single-listing/${listing.id}`} className="avatarImg"><img src="/src/assets/img/team-1.jpg" className="img-fluid circle" alt="Avatar"/></Link>
                                                    </div>
                                                    <div className="listing-details">
                                                        <h4 className="listingTitle"><Link to={`/single-listing/${listing.id}`} className="titleLink">{listing.title}{listing.is_verified && <span className="verified"><BsPatchCheckFill className="m-0"/></span>}</Link></h4>
                                                        <div className="list-infos">
                                                            <div className="gap-3 mt-1">
                                                                <div className="list-distance text-light d-flex align-items-center"><BsGeoAlt className="mb-0 me-2"/>{listing.city && listing.state ? `${listing.city}, ${listing.state}` : 'Location not set'}</div>
                                                                <div className="list-calls text-light hide-mob mt-1 d-flex align-items-center"><BsTelephone className="mb-0 me-2"/>{listing.phone || 'Contact via listing'}</div>
                                                                {listing.website_url && (
                                                                    <a
                                                                        href={listing.website_url.startsWith('http') ? listing.website_url : `https://${listing.website_url}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="list-website text-light mt-1 d-flex align-items-center"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        <BsGlobe className="mb-0 me-2"/><span className="text-primary text-decoration-underline">{listing.website_url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="listing-footer-item border-0">
                                            <div className="d-flex align-items-center justify-content-between gap-2">
                                                <div className="catdWraps">
                                                    <div className="flex-start">
                                                        <Link to={`/single-listing/${listing.id}`} className="d-flex align-items-center justify-content-start gap-2">
                                                            <span className="text-primary"><BsPatchCheckFill /></span>
                                                            <span className="catTitle">{listing.categories?.name || 'General Services'}</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="listing-rates">
                                                    <span className="d-flex align-items-center justify-content-start gap-1 text-sm">
                                                        {[...Array(5)].map((_, i) => (
                                                            <BsStarFill key={i} className={`mb-0 ${i < Math.floor(listing.average_rating || 0) ? 'text-warning' : 'text-muted'}`}/>
                                                        ))}
                                                    </span>
                                                    <span className="text-md text-muted-2 hide-mob mt-2">({listing.review_count || 0} Reviews)</span>
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
        </div>
  )
}
