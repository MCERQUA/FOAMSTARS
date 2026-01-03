import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { FaImages } from 'react-icons/fa6'

interface ProjectPortfolioProps {
    images?: string[];
    businessName?: string;
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

export default function ProjectPortfolio({ images, businessName }: ProjectPortfolioProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    // Only show if company has actual portfolio images - no placeholders
    const projectImages = images && images.length > 0 ? images : []

    // Don't render if no images
    if (projectImages.length === 0) {
        return null
    }

    const openLightbox = (index: number) => {
        setLightboxIndex(index)
        setLightboxOpen(true)
    }

    return (
        <div className="mb-4" id="portfolio" style={darkCardStyle}>
            <div style={darkCardHeaderStyle}>
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#portfolioContent"
                    data-bs-target="#portfolioContent"
                    aria-controls="portfolioContent"
                    to="#"
                    aria-expanded="false"
                    className="collapsed text-decoration-none d-flex align-items-center gap-2"
                >
                    <FaImages style={{ color: '#FFB800', fontSize: '1.25rem' }} />
                    <h4 className="mb-0 fw-semibold" style={{ color: '#FFB800' }}>Project Portfolio</h4>
                </Link>
            </div>

            <div id="portfolioContent" className="panel-collapse collapse show">
                <div className="p-4">
                    <p className="mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        View examples of completed projects{businessName ? ` by ${businessName}` : ''}.
                    </p>

                    <Swiper
                        slidesPerView={3}
                        spaceBetween={15}
                        modules={[Autoplay, Pagination, Navigation]}
                        pagination={{ clickable: true }}
                        navigation={true}
                        loop={projectImages.length > 3}
                        autoplay={{ delay: 4000, disableOnInteraction: true }}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="portfolio-swiper"
                    >
                        {projectImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="portfolioItem position-relative rounded-3 overflow-hidden"
                                    style={{
                                        cursor: 'pointer',
                                        border: '2px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                    onClick={() => openLightbox(index)}
                                >
                                    <img
                                        src={image}
                                        className="img-fluid w-100"
                                        style={{
                                            height: '200px',
                                            objectFit: 'cover'
                                        }}
                                        alt={`Project ${index + 1}`}
                                    />
                                    <div
                                        className="portfolioOverlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                        style={{
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0' }}
                                    >
                                        <span
                                            className="badge"
                                            style={{
                                                background: 'linear-gradient(135deg, #FFB800 0%, #FF9500 100%)',
                                                color: '#000',
                                                padding: '10px 20px',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            View Project
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={projectImages.map(src => ({ src }))}
            />
        </div>
    )
}
