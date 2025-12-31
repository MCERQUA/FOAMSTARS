import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import NavbarDark from '../../../components/navbar/navbar-dark'
import ListSidebarOne from '../../../components/list-sidebar-one'
import FooterTop from '../../../components/footer-top'
import Footer from '../../../components/footer'
import BackToTop from '../../../components/back-to-top'

import bg from '../../../assets/img/banner-6.jpg'

import { BsCoin, BsLightningChargeFill, BsPatchCheckFill, BsSearch, BsTelephone } from 'react-icons/bs'
import { FaArrowLeft, FaArrowRight, FaHeart, FaLocationDot, FaStar } from 'react-icons/fa6'

import { getPublicListings, BusinessListing } from '../../../lib/neon'

export default function ListLayout1() {
  const [listings, setListings] = useState<BusinessListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadListings = async () => {
      try {
        console.log('Loading public listings...')
        
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 30000)
        })
        
        const data = await Promise.race([
          getPublicListings(50),
          timeoutPromise
        ]) as BusinessListing[]
        
        console.log('Loaded listings:', data?.length || 0, 'items')
        setListings(data || [])
      } catch (error) {
        console.error('Error loading listings:', error)
        // Don't set error state, just leave empty listings array
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

        <div className="image-cover hero-banner bg-primary" style={{backgroundImage:`url(${bg})`}} data-overlay="5">
            <div className="container">
				<div className="row justify-content-center align-items-center">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="position-relative text-start mt-4">
                            <h2>Find Spray Foam Insulation Contractors</h2>
                            <p className="fs-5 fw-light">Connect with trusted spray foam professionals across the United States.</p>
                        </div>
                    </div>
				</div>

            </div>
        </div>

        <div className="position-relative d-flex flex-column mt-n3 z-2">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-11 col-lg-12 col-md-12 col-12">
                        <div className="heroSearch style-01 shadow-sm">
                            <div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
                                <div className="col-xl-10 col-lg-9 col-md-12">
                                    <div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className="form-group">
                                                <div className="mobSearch d-flex align-items-center justify-content-start">
                                                    <div className="flexStart ps-2"><span className="fw-semibold text-dark">Find</span></div>
                                                    <input type="text" className="form-control fs-6 fw-medium border-0" placeholder="What are you looking for?"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 single-border">
                                            <div className="form-group">
                                                <div className="mobSearch d-flex align-items-center justify-content-start">
                                                    <div className="flexStart ps-2"><span className="fw-semibold text-dark">Where</span></div>
                                                    <input type="text" className="form-control fs-6 fw-medium border-0" placeholder="Location"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary full-width fw-medium"><BsSearch className="me-2"/>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div className="container">
                <div className="row g-4">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <ListSidebarOne/>
                    </div>
                
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                        <div className="row align-items-start mb-4">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap">
                                    <div className="alert tag-alert alert-light alert-dismissible fade show" role="alert">
                                        <span>Classified</span>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    <div className="alert tag-alert alert-light alert-dismissible fade show" role="alert">
                                        <span>Services</span>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    <div className="alert tag-alert alert-light alert-dismissible fade show" role="alert">
                                        <span>75Km</span>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    <div className="alert tag-alert alert-light alert-dismissible fade show" role="alert">
                                        <span>Dinner</span>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    <div className="alert tag-alert alert-light alert-dismissible fade show" role="alert">
                                        <span>$80-$100</span>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    <div className="clearList">
                                        <Link to="#" className="fw-medium text-primary text-md">Clear All</Link>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    
                        <div className="row align-items-center justify-content-between mb-4">
                            <div className="col-xl- 5 col-lg-5 col-md-5 col-sm-6 col-6">
                                <h6 className="m-0">{loading ? 'Loading...' : `${listings.length} Listings Found`}</h6>
                            </div>
                            
                            <div className="col-xl- 5 col-lg-5 col-md-5 col-sm-6 col-6">
                                <div className="text-end">
                                    <div className="dropdown d-inline-flex p-0">
                                        <Link to="#shortfilter" className="py-2 px-3 dropdown-toggle toogleDrops" id="shortfilter" data-bs-toggle="dropdown" aria-expanded="false">
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
                                <div className="col-xl-12 text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-3 text-muted">Loading contractors...</p>
                                </div>
                            ) : listings.length === 0 ? (
                                <div className="col-xl-12 text-center py-5">
                                    <p className="text-muted">No contractors found at the moment. Please check back later.</p>
                                </div>
                            ) : (
                                listings.map((listing)=>{
                                    return(
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12" key={listing.id}>
                                            <div className="listingCard listLayouts light card rounded-3 border-0">
                                                
                                                <div className="row align-items-center justify-content-start g-3">
                                                    
                                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div className="listThumb overflow-hidden position-relative">
                                                            {listing.status === 'active' ? (
                                                                 <div className="position-absolute start-0 top-0 ms-3 mt-3"><span className="badge badge-xs text-uppercase listOpen rounded-pill">Active</span></div>
                                                            ) : (
                                                                <div className="position-absolute start-0 top-0 ms-3 mt-3"><span className="badge badge-xs text-uppercase listClose rounded-pill">Inactive</span></div>
                                                            )
                                                            }
                                                           
                                                            {listing.is_featured && 
                                                                <div className="position-absolute end-0 bottom-0 me-3 mb-3"><span className="badge badge-xs featuredList rounded-pill d-flex align-items-center"><FaStar className="me-1"/>Featured</span></div>
                                                            }
                                                            <Link to={`/contractor/${listing.id}`} className="d-block"><img src={listing.featured_image_url || '/src/assets/img/list-1.jpg'} className="img-fluid list-thumb object-fit" alt="Listing Img"/></Link>
                                                        </div>
                                                    </div>
                                                
                                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                                    <div className="listCaption px-3 py-4">
                                                        <div className="listTitle d-block mb-4">
                                                            <div className="d-flex align-items-start justify-content-between gap-2">
                                                                <div className="flex-first">
                                                                    <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap mb-3">
                                                                        {listing.hourly_rate && (
                                                                            <div className="singleCaption">
                                                                                <div className="bg-white rounded-pill py-1 ps-1 pe-3">
                                                                                    <div className="d-inline-flex align-items-center justify-content-start gap-2">
                                                                                        <span className="square--25 circle bg-price text-light text-sm"><BsCoin className="lh-1 h-auto"/></span>
                                                                                        <span className="text-sm fw-medium">${listing.hourly_rate}/hour</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        {listing.accepts_online_booking && 
                                                                            <div className="singleCaption">
                                                                                <div className="bg-white rounded-pill py-1 ps-1 pe-3">
                                                                                    <div className="d-inline-flex align-items-center justify-content-start gap-2">
                                                                                        <span className="square--25 circle bg-booking text-light text-sm"><BsLightningChargeFill className="lh-1 h-auto"/></span>
                                                                                        <span className="text-sm fw-medium">Online Booking</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                    <h5 className="listItemtitle mb-3"><Link to={`/contractor/${listing.id}`}>{listing.title}{listing.is_verified && <span className="verified"><BsPatchCheckFill className="m-0"/></span>}</Link></h5>
                                                                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-3">
                                                                        <div className="flex-start"><div className="list-location text-muted"><span><FaLocationDot className="me-2"/>{listing.city && listing.state ? `${listing.city}, ${listing.state}` : 'Location not set'}</span></div></div>
                                                                        <div className="flex-last">
                                                                            <div className=" d-flex align-items-center justify-content-start">
                                                                                {[...Array(5)].map((_, i) => (
                                                                                    <FaStar key={i} className={`fa-solid fa-star ${i < Math.floor(listing.average_rating || 0) ? 'text-warning' : 'text-muted'}`}></FaStar>
                                                                                ))}
                                                                                <span className="mx-1 text-dark fw-bold">{listing.average_rating || '0.0'}</span><span className="text-muted text-md">({listing.review_count || 0} Reviews)</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-last">
                                                                    <Link to={`/contractor/${listing.id}`} className="bookmarkList"><FaHeart className=""/></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="list-features d-flex align-items-center justify-content-start row-gap-2 column-gap-3 flex-wrap text-dark">
                                                            <div className="d-flex align-items-center fw-medium">
                                                                <span className="text-primary me-2"><BsPatchCheckFill className="text-md"></BsPatchCheckFill></span>{(listing as any).categories?.name || 'General Services'}
                                                            </div>
                                                            <div className="d-flex align-items-center fw-medium">
                                                                <span className="listCall me-2"><BsTelephone className=""/></span>{listing.phone || 'Contact via listing'}
                                                            </div>			
                                                        </div>
                                                    </div>	
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                            )}
                            
                        </div>
                        
                        <div className="row align-items-center justify-content-center mt-5">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <Link to="#" className="page-link"><FaArrowLeft className=""/></Link>
                                        </li>
                                        <li className="page-item"><Link to="#" className="page-link">1</Link></li>
                                        <li className="page-item active"><Link to="#" className="page-link">2</Link></li>
                                        <li className="page-item"><Link to="#" className="page-link">3</Link></li>
                                        <li className="page-item"><Link to="#" className="page-link">4</Link></li>
                                        <li className="page-item"><Link to="#" className="page-link">5</Link></li>
                                        <li className="page-item">
                                            <Link to="#" className="page-link"><FaArrowRight className=""/></Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <FooterTop/>
        <Footer/>
        <BackToTop/>
    </>
  )
}
