import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import tick from '../../../assets/img/tick.svg'

import { FaLocationDot } from 'react-icons/fa6'
import { BiBriefcase } from 'react-icons/bi'
import { FiArrowRight } from 'react-icons/fi'
import { BsSendCheck, BsStarFill, BsStarHalf, BsX } from 'react-icons/bs'

import NavbarLight from '../../../components/navbar/navbar-light'
import FeatureNav from '../../../components/navbar/feature-nav'
import SingleSidebarOne from '../../../components/single-sidebar-one'
import Descriptions from '../../../components/list-detail/descriptions'
import Services from '../../../components/list-detail/services'
import ProjectPortfolio from '../../../components/list-detail/project-portfolio'
import Certifications from '../../../components/list-detail/certifications'
import Galleries from '../../../components/list-detail/galleries'
import Maps from '../../../components/list-detail/maps'
import Reviews from '../../../components/list-detail/reviews'
import List from '../../../components/list-detail/list'
import FooterTop from '../../../components/footer-top'
import Footer from '../../../components/footer'
import BackToTop from '../../../components/back-to-top'

import { getListingById } from '../../../lib/neon'

interface BusinessListing {
    id: string;
    business_name: string | null;
    title: string;
    description: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    phone: string | null;
    email: string | null;
    website_url: string | null;
    featured_image_url: string | null;
    gallery_images: string[];
    average_rating: number;
    review_count: number;
    is_verified: boolean;
    hourly_rate: number | null;
    years_in_business: number | null;
    certifications: string[];
    tags: string[];
    categories?: { name: string };
}

export default function SingleListing1() {
    const params = useParams()
    const id = params.id
    const [listing, setListing] = useState<BusinessListing | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchListing() {
            if (!id) return

            const data = await getListingById(id)

            if (data) {
                // Map Neon data to our interface
                setListing({
                    ...data,
                    categories: data.category_name ? { name: data.category_name } : undefined
                } as BusinessListing)
            }
            setLoading(false)
        }

        fetchListing()
    }, [id])

    // Helper to render star rating
    const renderStars = (rating: number) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5

        for (let i = 0; i < fullStars; i++) {
            stars.push(<BsStarFill key={i} className="text-warning text-sm"/>)
        }
        if (hasHalfStar) {
            stars.push(<BsStarHalf key="half" className="text-warning text-sm"/>)
        }
        return stars
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

  return (
    <>
        <NavbarLight/>

        {/* FOAMSTARS Hero Section */}
        <div className="hero-header" style={{
            background: '#000000',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '500px',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* Spray worker images */}
            <img src="/backgorund mike spray.png" alt="" className="hero-spray-worker hero-spray-left" />
            <img src="/backgorund-mike-spray-rv.png" alt="" className="hero-spray-worker hero-spray-right" />

            {/* Black vignette overlay */}
            <div style={{
                position: 'absolute',
                left: 0, top: 0, width: '100%', height: '100%',
                background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.85) 75%, #000000 100%)',
                zIndex: 2, pointerEvents: 'none'
            }} />

            {/* Yellow glow effect */}
            <div style={{
                position: 'absolute',
                top: '45%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '700px', height: '700px',
                background: 'radial-gradient(circle, rgba(255, 200, 0, 0.35) 0%, rgba(255, 165, 0, 0.2) 25%, rgba(255, 140, 0, 0.1) 45%, transparent 65%)',
                filter: 'blur(50px)',
                zIndex: 3, pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="row align-items-center">
                    <div className="col-12">
                        <div className="mainlistingInfo py-5">
                            <div className="d-flex align-items-end justify-content-between flex-wrap gap-4">
                                <div className="firstColumn">
                                    <div className="listingFirstinfo d-flex align-items-center justify-content-start gap-4 flex-wrap">
                                        <div className="listingAvatar">
                                            <div className="d-block bg-white rounded-3 p-2" style={{ boxShadow: '0 0 30px rgba(255, 200, 0, 0.3)' }}>
                                                <img
                                                    src={listing?.featured_image_url || '/FOAMSTARS_logo.png'}
                                                    className="img-fluid rounded-2"
                                                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                                    alt={listing?.business_name || 'Company Logo'}
                                                />
                                            </div>
                                        </div>
                                        <div className="listingCaptioninfo">
                                            <div className="propertyTitlename d-flex align-items-center gap-2 mb-2">
                                                <h1 className="fw-bold text-white mb-0" style={{ fontSize: '2rem' }}>
                                                    {listing?.business_name || listing?.title || 'Spray Foam Company'}
                                                </h1>
                                                {listing?.is_verified && (
                                                    <span className="verified mt-1">
                                                        <img src={tick} className="img-fluid" width="24" alt="Verified"/>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="listingsbasicInfo">
                                                <div className="d-flex align-items-center justify-content-start flex-wrap gap-3">
                                                    <div className="flexItem">
                                                        <span className="text-md fw-medium text-white-50 d-flex align-items-center">
                                                            <FaLocationDot className="me-2 text-warning"/>
                                                            {listing?.city && listing?.state
                                                                ? `${listing.city}, ${listing.state}`
                                                                : listing?.state || 'United States'}
                                                        </span>
                                                    </div>
                                                    <div className="flexItem">
                                                        <span className="text-md fw-medium text-white-50 d-flex align-items-center">
                                                            <BiBriefcase className="me-2 text-warning"/>
                                                            {listing?.categories?.name || 'Spray Foam Insulation'}
                                                        </span>
                                                    </div>
                                                    {listing?.average_rating && listing.average_rating > 0 && (
                                                        <div className="flexItem">
                                                            <div className="d-flex align-items-center justify-content-start gap-2">
                                                                <div className="d-flex align-items-center justify-content-start gap-1">
                                                                    {renderStars(listing.average_rating)}
                                                                </div>
                                                                <span className="text-md fw-medium text-white-50">
                                                                    ({listing.review_count || 0} Reviews)
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lastColumn">
                                    <div className="d-flex align-items-center justify-content-md-end flex-wrap gap-3">
                                        {listing?.years_in_business && (
                                            <div className="flexStart d-flex flex-column text-end">
                                                <span className="fw-medium text-white-50">Experience</span>
                                                <span className="fw-bold fs-5 text-white">{listing.years_in_business}+ Years</span>
                                            </div>
                                        )}
                                        <div className="flexlastButton">
                                            <button
                                                type="button"
                                                className="btn px-4 py-2 fw-medium"
                                                style={{
                                                    background: '#FFB800',
                                                    color: '#000',
                                                    border: 'none',
                                                    borderRadius: '50px'
                                                }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#messageModal"
                                            >
                                                <BsSendCheck className="me-2"/>Get a Quote
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FeatureNav/>

        <section className="gray-simple pt-4 pt-xl-5">
            <div data-bs-spy="scroll" data-bs-target="#scrollphyNav" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex={0}>
                <div className="container">
                    <div className="row align-items-start gx-xl-5 g-4">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <Descriptions description={listing?.description || undefined} />

                            <Services services={listing?.tags} />

                            <ProjectPortfolio images={listing?.gallery_images} businessName={listing?.business_name || undefined} />

                            <Certifications certifications={listing?.certifications} />

                            <Galleries images={listing?.gallery_images} />

                            <Maps address={listing?.address || undefined} city={listing?.city || undefined} state={listing?.state || undefined} />

                            <Reviews listingId={listing?.id} />

                            <List currentListingId={listing?.id} category={listing?.categories?.name} />

                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <SingleSidebarOne listing={listing} />
                        </div>

                    </div>

                </div>
            </div>
        </section>
        <FooterTop/>
        <Footer/>
        <BackToTop/>
        {/* Quote Request Modal */}
        <div className="modal modal-lg fade" id="messageModal" tabIndex={-1} aria-labelledby="messageModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0 px-md-5 d-flex justify-content-between" style={{ background: '#000' }}>
                        <h4 className="modal-title fw-medium text-white" id="messageModalLabel">
                            Request a Quote from {listing?.business_name || 'this company'}
                        </h4>
                        <Link to="#" data-bs-dismiss="modal" aria-label="Close" className="square--40 circle bg-dark text-white border border-secondary">
                            <BsX />
                        </Link>
                    </div>
                    <div className="modal-body p-md-5">
                        <form className="quoteForm">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label fw-medium">Your Name *</label>
                                        <input type="text" className="form-control" placeholder="Full Name" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label fw-medium">Phone Number *</label>
                                        <input type="tel" className="form-control" placeholder="(555) 123-4567" required />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="form-label fw-medium">Email Address *</label>
                                        <input type="email" className="form-control" placeholder="your@email.com" required />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="form-label fw-medium">Project Type</label>
                                        <select className="form-select">
                                            <option value="">Select a service...</option>
                                            <option value="residential">Residential Insulation</option>
                                            <option value="commercial">Commercial Insulation</option>
                                            <option value="concrete">Concrete Lifting</option>
                                            <option value="roofing">SPF Roofing</option>
                                            <option value="coatings">Polyurethane Coatings</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="form-label fw-medium">Project Details</label>
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            placeholder="Describe your project (approximate square footage, building type, timeline, etc.)"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="form-label fw-medium">Preferred Contact Method</label>
                                        <div className="d-flex gap-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="contactMethod" id="contactPhone" defaultChecked />
                                                <label className="form-check-label" htmlFor="contactPhone">Phone</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="contactMethod" id="contactEmail" />
                                                <label className="form-check-label" htmlFor="contactEmail">Email</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="contactMethod" id="contactEither" />
                                                <label className="form-check-label" htmlFor="contactEither">Either</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="btn fw-medium px-5 py-2"
                                    style={{ background: '#FFB800', color: '#000', border: 'none' }}
                                >
                                    Submit Quote Request<FiArrowRight className="ms-2"/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
