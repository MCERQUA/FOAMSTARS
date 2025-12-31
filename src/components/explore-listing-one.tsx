import { useEffect, useState } from 'react'
import { getPublicListings, BusinessListing } from '../lib/neon'
import { Link } from 'react-router-dom'
import { BsEyeFill, BsGeoAlt, BsPatchCheckFill, BsShareFill, BsStar, BsSuitHeart, BsTelephone } from 'react-icons/bs'

export default function ExploreListingOne() {
    const [listings, setListings] = useState<BusinessListing[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadListings = async () => {
            try {
                const data = await getPublicListings(6)
                setListings(data)
            } catch (error) {
                console.error('Error loading explore listings:', error)
            } finally {
                setLoading(false)
            }
        }
        loadListings()
    }, [])

    useEffect(() => {
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, [listings]); // Re-run when listings change

  if (loading) {
    return (
      <div className="row align-items-center justify-content-center g-4">
        <div className="col-xl-12 text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading explore listings...</p>
        </div>
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="row align-items-center justify-content-center g-4">
        <div className="col-xl-12 text-center py-5">
          <p className="text-muted">No listings available to explore at the moment.</p>
        </div>
      </div>
    )
  }

  return (
        <div className="row align-items-center justify-content-center g-4">
            {listings.map((listing)=>{
                return(
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12" key={listing.id}>
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
                                    <img src={listing.featured_image_url || '/src/assets/img/list-1.jpg'} className="img-fluid" alt="Listing Image"/>
                                </Link>
                                <div className="position-absolute end-0 bottom-0 me-3 mb-3 z-2">
                                    <Link to={`/contractor/${listing.id}`} className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0"/></Link>
                                </div>
                            </div>
                            <div className="listing-middle-item">
                                <div className="listing-avatar">
                                    <Link to={`/contractor/${listing.id}`} className="avatarImg"><img src="/src/assets/img/team-1.jpg" className="img-fluid circle" alt="Avatar"/></Link>
                                </div>
                                <div className="listing-details">
                                    <h4 className="listingTitle"><Link to={`/contractor/${listing.id}`} className="titleLink">{listing.title}{listing.is_verified && <span className="verified"><BsPatchCheckFill className="m-0"/></span>}</Link></h4>
                                    <p>{listing.description || 'Professional contractor services'}</p>
                                </div>
                                <div className="listing-info-details">
                                    <div className="d-flex align-items-center justify-content-start gap-4">
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
                </div>

                )
            })}
                
        </div>
  )
}
