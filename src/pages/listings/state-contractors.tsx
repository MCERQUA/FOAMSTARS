import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import NavbarLight from '../../components/navbar/navbar-light'
import FooterTop from '../../components/footer-top'
import Footer from '../../components/footer'
import BackToTop from '../../components/back-to-top'

import { BsPatchCheckFill, BsTelephone, BsStar, BsGlobe } from 'react-icons/bs'
import { FaLocationDot } from 'react-icons/fa6'

import { getListingsByState, BusinessListing } from '../../lib/neon'
import { getStateBySlug, US_STATES } from '../../data/states'

export default function StateContractors() {
  const { state: stateSlug } = useParams<{ state: string }>()
  const [listings, setListings] = useState<BusinessListing[]>([])
  const [loading, setLoading] = useState(true)

  const stateInfo = stateSlug ? getStateBySlug(stateSlug) : null
  const stateName = stateInfo?.name || 'Unknown State'
  const stateAbbr = stateInfo?.abbreviation || ''

  // SEO: Dynamic page title and meta + Schema.org
  useEffect(() => {
    if (stateInfo) {
      document.title = `Spray Foam Contractors in ${stateName} | FOAMSTARS Directory`

      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content',
          `Find verified spray foam insulation contractors in ${stateName}. Browse SPF professionals for residential, commercial insulation, concrete lifting, and roofing in ${stateAbbr}.`
        )
      }

      // Add ItemList schema for state contractors
      const existingSchema = document.querySelector('#state-schema')
      if (existingSchema) existingSchema.remove()

      const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Spray Foam Contractors in ${stateName}`,
        "description": `Directory of spray foam insulation contractors serving ${stateName}`,
        "url": `https://foamstars.netlify.app/contractors/${stateSlug}`,
        "numberOfItems": listings.length,
        "itemListElement": listings.slice(0, 10).map((listing, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "LocalBusiness",
            "name": listing.business_name || listing.title,
            "url": `https://foamstars.netlify.app/contractor/${listing.id}`,
            ...(listing.city && { "addressLocality": listing.city }),
            "addressRegion": stateAbbr
          }
        }))
      }

      const scriptTag = document.createElement('script')
      scriptTag.id = 'state-schema'
      scriptTag.type = 'application/ld+json'
      scriptTag.text = JSON.stringify(schema)
      document.head.appendChild(scriptTag)

      return () => {
        const schemaEl = document.querySelector('#state-schema')
        if (schemaEl) schemaEl.remove()
      }
    }
  }, [stateInfo, stateName, stateAbbr, stateSlug, listings])

  useEffect(() => {
    const loadListings = async () => {
      if (!stateAbbr) {
        setLoading(false)
        return
      }

      try {
        const data = await getListingsByState(stateAbbr)
        setListings(data || [])
      } catch (error) {
        console.error('Error loading state listings:', error)
        setListings([])
      } finally {
        setLoading(false)
      }
    }

    loadListings()
  }, [stateAbbr])

  // If invalid state slug, show 404-like message
  if (!stateInfo) {
    return (
      <>
        <NavbarLight />
        <div className="container py-5 text-center">
          <h1>State Not Found</h1>
          <p>The state "{stateSlug}" was not found.</p>
          <Link to="/contractors/list" className="btn btn-primary">
            Browse All Contractors
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <NavbarLight />

      {/* Hero Section */}
      <div className="hero-header" style={{
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '120px',
        paddingBottom: '60px'
      }}>
        <img src="/backgorund mike spray.png" alt="" className="hero-spray-worker hero-spray-left" />
        <img src="/backgorund-mike-spray-rv.png" alt="" className="hero-spray-worker hero-spray-right" />

        <div style={{
          position: 'absolute',
          left: 0, top: 0, width: '100%', height: '100%',
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.85) 75%, #000000 100%)',
          zIndex: 2, pointerEvents: 'none'
        }} />

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
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-8 col-lg-10 col-md-12 text-center">
              <img
                src="/FOAMSTARS_logo.png"
                alt="FOAMSTARS"
                style={{
                  maxWidth: '300px',
                  width: '100%',
                  height: 'auto',
                  marginBottom: '20px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  filter: 'drop-shadow(0 0 30px rgba(255, 200, 0, 0.5))'
                }}
              />
              <h1 className="text-white">
                Spray Foam Contractors in <span style={{ color: '#FFB800' }}>{stateName}</span>
              </h1>
              <p className="fs-5 text-white-50">
                Find verified spray foam insulation professionals serving {stateName}
              </p>
              <nav className="mt-3">
                <ul className="d-flex align-items-center justify-content-center gap-2 list-unstyled">
                  <li><Link to="/" className="text-white-50">Home</Link></li>
                  <span className="text-white-50">/</span>
                  <li><Link to="/contractors/list" className="text-white-50">Contractors</Link></li>
                  <span className="text-white-50">/</span>
                  <li className="text-white">{stateName}</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Contractors List */}
      <section className="py-5">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading contractors in {stateName}...</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-5">
              <div className="bg-light rounded-4 p-5">
                <h3 className="mb-3">No Contractors Listed in {stateName} Yet</h3>
                <p className="text-muted mb-4">
                  Be the first spray foam contractor to list your business in {stateName}!
                </p>
                <Link to="/dashboard/listings" className="btn btn-primary px-4">
                  List Your Business
                </Link>
              </div>

              {/* Show nearby states */}
              <div className="mt-5">
                <h4 className="mb-4">Browse Other States</h4>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {US_STATES.slice(0, 12).map(s => (
                    <Link
                      key={s.slug}
                      to={`/contractors/${s.slug}`}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="row mb-4">
                <div className="col-12">
                  <h2 className="mb-1">
                    {listings.length} Spray Foam {listings.length === 1 ? 'Contractor' : 'Contractors'} in {stateName}
                  </h2>
                  <p className="text-muted">
                    Verified professionals for insulation, concrete lifting, coatings, and roofing
                  </p>
                </div>
              </div>

              <div className="row g-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="col-xl-4 col-lg-6 col-md-6">
                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                      <div className="position-relative">
                        <Link to={`/contractor/${listing.id}`}>
                          <img
                            src={listing.featured_image_url || '/FOAMSTARS_logo.png'}
                            alt={listing.business_name || listing.title}
                            className="card-img-top"
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        </Link>
                        {listing.is_verified && (
                          <span className="position-absolute top-0 end-0 m-3 badge bg-success">
                            <BsPatchCheckFill className="me-1" /> Verified
                          </span>
                        )}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mb-2">
                          <Link to={`/contractor/${listing.id}`} className="text-dark text-decoration-none">
                            {listing.business_name || listing.title}
                          </Link>
                        </h5>
                        <p className="text-muted small mb-2">
                          <FaLocationDot className="me-1 text-warning" />
                          {listing.city ? `${listing.city}, ${listing.state}` : listing.state}
                        </p>
                        {listing.average_rating > 0 && (
                          <p className="mb-2">
                            <BsStar className="text-warning me-1" />
                            <strong>{listing.average_rating.toFixed(1)}</strong>
                            <span className="text-muted small ms-1">({listing.review_count} reviews)</span>
                          </p>
                        )}
                        <p className="card-text text-muted small">
                          {listing.description?.substring(0, 100)}
                          {listing.description && listing.description.length > 100 ? '...' : ''}
                        </p>
                      </div>
                      <div className="card-footer bg-transparent border-0 pb-3">
                        <div className="d-flex gap-2">
                          {listing.phone && (
                            <a href={`tel:${listing.phone}`} className="btn btn-outline-primary btn-sm flex-fill">
                              <BsTelephone className="me-1" /> Call
                            </a>
                          )}
                          {listing.website_url && (
                            <a
                              href={listing.website_url.startsWith('http') ? listing.website_url : `https://${listing.website_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-secondary btn-sm flex-fill"
                            >
                              <BsGlobe className="me-1" /> Website
                            </a>
                          )}
                          <Link to={`/contractor/${listing.id}`} className="btn btn-primary btn-sm flex-fill">
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* All States Grid */}
          <div className="mt-5 pt-5 border-top">
            <h3 className="text-center mb-4">Browse Contractors by State</h3>
            <div className="row g-2">
              {US_STATES.map(s => (
                <div key={s.slug} className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <Link
                    to={`/contractors/${s.slug}`}
                    className={`btn w-100 btn-sm ${s.slug === stateSlug ? 'btn-primary' : 'btn-outline-secondary'}`}
                  >
                    {s.abbreviation}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterTop />
      <Footer />
      <BackToTop />
    </>
  )
}
