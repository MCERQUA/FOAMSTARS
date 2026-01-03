import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { BsGeoAlt, BsPatchCheckFill, BsStarFill, BsSuitHeart, BsPeople } from 'react-icons/bs'
import { FaSprayCan } from 'react-icons/fa6'
import { getPublicListings } from '../../lib/neon'

interface SimilarListing {
    id: string;
    business_name: string | null;
    featured_image_url: string | null;
    city: string | null;
    state: string | null;
    average_rating: number;
    review_count: number;
    is_verified: boolean;
    is_featured: boolean;
    category_name?: string;
}

interface ListProps {
    currentListingId?: string;
    category?: string;
}

// Dark card styles
const darkCardStyle = {
    background: 'linear-gradient(145deg, #1e1e1e 0%, #151515 100%)',
    border: '1px solid rgba(255, 184, 0, 0.15)',
    borderRadius: '16px',
    overflow: 'hidden'
}

const darkCardHeaderStyle = {
    background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.15) 0%, rgba(255, 140, 0, 0.1) 100%)',
    borderBottom: '1px solid rgba(255, 184, 0, 0.2)',
    padding: '16px 20px'
}

export default function List({ currentListingId }: ListProps) {
    const [similarListings, setSimilarListings] = useState<SimilarListing[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchSimilarListings() {
            setLoading(true)

            const listings = await getPublicListings(7)

            // Filter out the current listing
            const filtered = currentListingId
                ? listings.filter(l => l.id !== currentListingId).slice(0, 6)
                : listings.slice(0, 6)

            setSimilarListings(filtered as SimilarListing[])
            setLoading(false)
        }

        fetchSimilarListings()
    }, [currentListingId])

    // Don't render if no similar listings
    if (!loading && similarListings.length === 0) {
        return null
    }

    const renderStars = (rating: number) => {
        const stars = []
        const fullStars = Math.floor(rating || 0)
        for (let i = 0; i < 5; i++) {
            stars.push(
                <BsStarFill
                    key={i}
                    className="mb-0"
                    style={{ color: i < fullStars ? '#FFB800' : 'rgba(255,255,255,0.2)' }}
                />
            )
        }
        return stars
    }

    return (
        <div style={darkCardStyle}>
            <div style={darkCardHeaderStyle}>
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#similar"
                    data-bs-target="#similar"
                    aria-controls="similar"
                    to="#"
                    aria-expanded="false"
                    className="collapsed text-decoration-none d-flex align-items-center gap-2"
                >
                    <BsPeople style={{ color: '#FFB800', fontSize: '1.25rem' }} />
                    <h4 className="mb-0 fw-semibold" style={{ color: '#FFB800' }}>Similar Contractors</h4>
                </Link>
            </div>

            <div id="similar" className="panel-collapse collapse show">
                <div className="p-4">
                    {loading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border spinner-border-sm" style={{ color: '#FFB800' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={15}
                            modules={[Autoplay, Pagination]}
                            pagination={{ clickable: true }}
                            loop={similarListings.length > 2}
                            autoplay={{ delay: 4000, disableOnInteraction: true }}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 2 },
                            }}
                        >
                            {similarListings.map((item) => (
                                <SwiperSlide className="singleItem" key={item.id}>
                                    <div className="listingitem-container">
                                        <div
                                            className="singlelisting-item rounded-3 overflow-hidden"
                                            style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.08)'
                                            }}
                                        >
                                            <div className="listing-top-item position-relative">
                                                <div className="position-absolute end-0 top-0 me-3 mt-3 z-2">
                                                    <button
                                                        className="bookmarkList btn btn-sm rounded-circle p-2"
                                                        style={{
                                                            background: 'rgba(0,0,0,0.5)',
                                                            border: '1px solid rgba(255,255,255,0.2)'
                                                        }}
                                                    >
                                                        <BsSuitHeart className="m-0" style={{ color: '#fff' }} />
                                                    </button>
                                                </div>
                                                <Link to={`/contractor/${item.id}`} className="topLink d-block">
                                                    <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                                                        <div className="d-flex align-items-center gap-2">
                                                            {item.is_featured && (
                                                                <span
                                                                    className="badge badge-xs"
                                                                    style={{
                                                                        background: 'linear-gradient(135deg, #FFB800 0%, #FF9500 100%)',
                                                                        color: '#000'
                                                                    }}
                                                                >
                                                                    Featured
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <img
                                                        src={item.featured_image_url || '/FOAMSTARS_logo.png'}
                                                        className="img-fluid w-100"
                                                        style={{ height: '180px', objectFit: 'cover' }}
                                                        alt={item.business_name || 'Spray Foam Company'}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="listing-footer-item p-3 border-0">
                                                <Link to={`/contractor/${item.id}`} className="text-decoration-none">
                                                    <h6 className="mb-1" style={{ color: '#fff' }}>
                                                        {item.business_name}
                                                        {item.is_verified && (
                                                            <BsPatchCheckFill className="ms-1" style={{ color: '#FFB800', fontSize: '0.75rem' }} />
                                                        )}
                                                    </h6>
                                                </Link>
                                                <div className="d-flex align-items-center text-sm mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                                    <BsGeoAlt className="me-1" />
                                                    {item.city && item.state ? `${item.city}, ${item.state}` : item.state || 'USA'}
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center gap-1">
                                                        <FaSprayCan style={{ color: '#FFB800' }} />
                                                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.category_name || 'Spray Foam'}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-1">
                                                        {renderStars(item.average_rating)}
                                                        <span className="text-sm ms-1" style={{ color: 'rgba(255,255,255,0.5)' }}>({item.review_count || 0})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
        </div>
    )
}
