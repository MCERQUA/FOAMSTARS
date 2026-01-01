import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ProjectPortfolioProps {
    images?: string[];
    businessName?: string;
}

// Placeholder project images for companies without galleries
const placeholderProjects = [
    '/img/spray-foam-residential.jpg',
    '/img/spray-foam-commercial.jpg',
    '/img/spray-foam-attic.jpg',
    '/img/concrete-lifting.jpg'
]

export default function ProjectPortfolio({ images, businessName }: ProjectPortfolioProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    // Use provided images or placeholders
    const projectImages = images && images.length > 0 ? images : placeholderProjects

    // Only show if there are images
    if (projectImages.length === 0) {
        return null
    }

    const openLightbox = (index: number) => {
        setLightboxIndex(index)
        setLightboxOpen(true)
    }

    return (
        <div className="listingSingleblock mb-4" id="portfolio">
            <div className="SingleblockHeader">
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#portfolioContent"
                    data-bs-target="#portfolioContent"
                    aria-controls="portfolioContent"
                    to="#"
                    aria-expanded="false"
                    className="collapsed"
                >
                    <h4 className="listingcollapseTitle">Project Portfolio</h4>
                </Link>
            </div>

            <div id="portfolioContent" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <p className="text-muted mb-3">
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
                                    style={{ cursor: 'pointer' }}
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
                                            background: 'rgba(0, 0, 0, 0.4)',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0' }}
                                    >
                                        <span
                                            className="badge"
                                            style={{
                                                background: '#FFB800',
                                                color: '#000',
                                                padding: '8px 16px',
                                                fontSize: '0.875rem'
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
