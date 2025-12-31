import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import FilterTwo from '../../../components/filter-two'
import NavbarDark from '../../../components/navbar/navbar-dark'
import Map from '../../../components/map'

import { getPublicListings, BusinessListing } from '../../../lib/neon'
import { listData } from '../../../data/data'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { BsGeoAlt, BsPatchCheckFill, BsStar, BsSuitHeart, BsTelephone } from 'react-icons/bs'
import { IconType } from 'react-icons'

// Import fallback images
import defaultListingImg from '../../../assets/img/list-1.jpg'
import defaultAvatarImg from '../../../assets/img/team-1.jpg'

interface ListData{
    id: number;
    image: string;
    user: string;
    status: string;
    featured: boolean;
    title: string;
    desc: string;
    call: string;
    loction: string;
    tag: string;
    tagIcon: IconType;
    tagIconStyle: string;
    review: string;
    rating: string;
    ratingRate: string;
    instantBooking: boolean;
}

export default function HalfMap1() {
  const [listings, setListings] = useState<BusinessListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadListings = async () => {
      try {
        console.log('Loading public listings...')
        
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        })
        
        const data = await Promise.race([
          getPublicListings(20),
          timeoutPromise
        ]) as BusinessListing[]
        
        console.log('Public listings loaded:', data?.length || 0, 'items')
        setListings(data || [])
      } catch (error) {
        console.error('Error loading public listings:', error)
        // Fallback to mock data
        console.log('Using mock data as fallback...')
        setListings([])
      } finally {
        setLoading(false)
      }
    }

    loadListings()
  }, [])

  return (
    <>
        <NavbarDark/>

            <div className="map-banner-wrap half-map">
				<div className="map-left-box">
					<div className="map-home flt-wrap">
						<Map/>
					</div>
				</div>
				<div className="map-content-wrap">
					<FilterTwo/>
					<div className="map-content-list bg-light py-4">
						<div className="row align-items-center justify-content-between mb-4">
							<div className="col-xl- 5 col-lg-5 col-md-5 col-sm-6 col-6">
								<div className="totalListingshow">
									<h6 className="fw-medium mb-0">
                    {loading ? 'Loading...' : `${listings.length || listData.length} Listings Found`}
                  </h6>
								</div>
							</div>
							
							<div className="col-xl- 5 col-lg-5 col-md-5 col-sm-6 col-6">
								<div className="text-end">
									<div className="dropdown d-inline-flex p-0">
										<Link to="#" className="py-2 px-3 dropdown-toggle toogleDrops bg-white" id="shortfilter" data-bs-toggle="dropdown" aria-expanded="false">
											Short Listings
										</Link>
										<div className="dropdown-menu border shadow-sm">
											<ul className="card rounded-0 p-0">
												<li><Link to="#" className="dropdown-item">Default Order</Link></li>
												<li><Link to="#" className="dropdown-item">Highest Rated</Link></li>
												<li><Link to="#" className="active dropdown-item">Most Reviewed</Link></li>
												<li><Link to="#" className="dropdown-item">Newest Listings</Link></li>
												<li><Link to="#" className="dropdown-item">Oldest Listings</Link></li>
												<li><Link to="#" className="dropdown-item">Featured Listings</Link></li>
												<li><Link to="#" className="dropdown-item">Most Viewed</Link></li>
												<li><Link to="#" className="dropdown-item">Short By A To Z</Link></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					
						<div className="row align-items-center justify-content-center g-xl-4 g-3">
							
              {loading ? (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading contractor listings...</p>
                </div>
              ) : (listings.length > 0 ? listings : listData).slice(0,8).map((item: BusinessListing | ListData) => {
                const isRealListing = 'owner_id' in item
                const listing = item as BusinessListing
                const mockItem = item as ListData
                
                return (
                  <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12" key={isRealListing ? listing.id : mockItem.id}>
                    <div className="listingitem-container">
                      <div className="singlelisting-item">
                        <div className="listing-top-item">
                          <Link to={isRealListing ? `/contractor/${listing.id}` : `/single-listing-01/${mockItem.id}`} className="topLink">
                            <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                              <div className="d-flex align-items-center justify-content-start gap-2">
                                {isRealListing ? (
                                  <>
                                    {listing.status === 'active' ? (
                                      <span className="badge badge-xs text-uppercase listOpen">Active</span>
                                    ) : (
                                      <span className="badge badge-xs text-uppercase listClose">Inactive</span>
                                    )}
                                    {listing.hourly_rate && (
                                      <span className="badge badge-xs badge-transparent">${listing.hourly_rate}/hr</span>
                                    )}
                                    {listing.is_featured && (
                                      <span className="badge badge-xs badge-transparent d-flex align-items-center">
                                        <BsStar className="mb-0 me-1"/>Featured
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {mockItem.status === 'open' ? (
                                      <span className="badge badge-xs text-uppercase listOpen">Open</span>
                                    ) : (
                                      <span className="badge badge-xs text-uppercase listClose">Closed</span>
                                    )}
                                    <span className="badge badge-xs badge-transparent">$$$</span>
                                    {mockItem.featured && (
                                      <span className="badge badge-xs badge-transparent d-flex align-items-center">
                                        <BsStar className="mb-0 me-1"/>Featured
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                            <img 
                              src={isRealListing ? (listing.featured_image_url || defaultListingImg) : mockItem.image} 
                              className="img-fluid" 
                              alt="Listing Image"
                            />
                          </Link>
                          <div className="position-absolute end-0 bottom-0 me-3 mb-3 z-2">
                            <Link 
                              to={isRealListing ? `/contractor/${listing.id}` : `/single-listing-01/${mockItem.id}`} 
                              className="bookmarkList" 
                              data-bs-toggle="tooltip" 
                              data-bs-title="Save Listing"
                            >
                              <BsSuitHeart className="m-0"/>
                            </Link>
                          </div>
                        </div>
                        <div className="listing-middle-item">
                          <div className="listing-avatar">
                            <Link 
                              to={isRealListing ? `/contractor/${listing.id}` : `/single-listing-01/${mockItem.id}`} 
                              className="avatarImg"
                            >
                              <img 
                                src={isRealListing ? defaultAvatarImg : mockItem.user} 
                                className="img-fluid circle" 
                                alt="Avatar"
                              />
                            </Link>
                          </div>
                          <div className="listing-details">
                            <h4 className="listingTitle">
                              <Link 
                                to={isRealListing ? `/contractor/${listing.id}` : `/single-listing-01/${mockItem.id}`} 
                                className="titleLink"
                              >
                                {isRealListing ? listing.title : mockItem.title}
                                {isRealListing && listing.is_verified && (
                                  <span className="verified"><BsPatchCheckFill className="m-0"/></span>
                                )}
                                {!isRealListing && (
                                  <span className="verified"><BsPatchCheckFill className="m-0"/></span>
                                )}
                              </Link>
                            </h4>
                            <p>{isRealListing ? listing.description || 'Professional contractor services' : mockItem.desc}</p>
                          </div>
                          <div className="listing-info-details">
                            <div className="d-flex align-items-center justify-content-start gap-4">
                              <div className="list-calls d-flex align-items-center">
                                <BsTelephone className="mb-0 me-2"/>
                                {isRealListing ? (listing.phone || 'Contact via listing') : mockItem.call}
                              </div>
                              <div className="list-distance d-flex align-items-center">
                                <BsGeoAlt className="mb-0 me-2"/>
                                {isRealListing ? 
                                  (listing.city && listing.state ? `${listing.city}, ${listing.state}` : 'Location not set') : 
                                  mockItem.loction
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="listing-footer-item">
                          <div className="d-flex align-items-center justify-content-between gap-2">
                            <div className="catdWraps">
                              <div className="flex-start">
                                <Link 
                                  to={isRealListing ? `/contractor/${listing.id}` : `/single-listing-01/${mockItem.id}`} 
                                  className="d-flex align-items-center justify-content-start gap-2"
                                >
                                  <span className="catIcon text-primary"><BsPatchCheckFill /></span>
                                  <span className="catTitle">
                                    {isRealListing ? 
                                      ((listing as any).categories?.name || 'General Services') : 
                                      mockItem.tag
                                    }
                                  </span>
                                </Link>
                              </div>
                              <div className="flex-end"><span className="moreCatcounter">+2</span></div>
                            </div>
                            <div className="listing-rates">
                              <div className="d-flex align-items-center justify-content-start gap-1">
                                {isRealListing ? (
                                  listing.review_count && listing.review_count > 0 && (
                                    <>
                                      <span className="ratingAvarage text-warning">{listing.average_rating || '0'}</span>
                                      <span className="overallrates">({listing.review_count} reviews)</span>
                                    </>
                                  )
                                ) : (
                                  <>
                                    <span className={`ratingAvarage ${mockItem.rating}`}>{mockItem.ratingRate}</span>
                                    <span className="overallrates">{mockItem.review}</span>
                                  </>
                                )}
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
						
						<div className="row align-items-center justify-content-center my-5">
							<div className="col-lg-12 col-md-12 col-sm-12">
								<nav aria-label="Page navigation example">
								    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <Link to="#" className="page-link"><FaArrowLeft /></Link>
                                        </li>
                                        <li className="page-item"><Link to="#" className="page-link">1</Link></li>
                                        <li className="page-item active"><Link to="#" className="page-link">2</Link></li>
                                        <li className="page-item"><Link to="#" className="page-link">3</Link></li>
                                        <li className="page-item"><Link to="#" className="page-link">4</Link></li>
                                        <li className="page-item"><Link to="#" className="page-link">5</Link></li>
                                        <li className="page-item">
                                            <Link to="#" className="page-link"><FaArrowRight /></Link>
                                        </li>
								    </ul>
								</nav>
							</div>
						</div>
						
						<div className="row align-items-center justify-content-center mt-5">
							<div className="col-lg-12 col-md-12 col-sm-12">
								<div className="copyrightbox text-center"> <p className="mb-0">© {new Date().getFullYear()} FOAMSTARS. The #1 directory for spray foam insulation contractors.</p></div>
							</div>
						</div>
							
					</div>
				</div>
				
			</div>
    </>
  )
}
