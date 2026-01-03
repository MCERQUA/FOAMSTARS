import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsImages } from 'react-icons/bs'

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface GalleriesProps {
    images?: string[];
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

export default function Galleries({ images }: GalleriesProps) {
    const [isOpen, setisOpen] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    // Only show gallery if company has actual images - no placeholders
    const displayImages = images && images.length > 0 ? images : [];

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
        setisOpen(true);
    };

    const slides = displayImages.map((image) => ({ src: image }));

    // Don't render if no images
    if (displayImages.length === 0) {
        return null;
    }

    return (
        <div className="mb-4" id="Galleries" style={darkCardStyle}>
            <div style={darkCardHeaderStyle}>
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#gallery"
                    data-bs-target="#gallery"
                    aria-controls="gallery"
                    to="#"
                    aria-expanded="false"
                    className="collapsed text-decoration-none d-flex align-items-center gap-2"
                >
                    <BsImages style={{ color: '#FFB800', fontSize: '1.25rem' }} />
                    <h4 className="mb-0 fw-semibold" style={{ color: '#FFB800' }}>Photo Gallery</h4>
                </Link>
            </div>

            <div id="gallery" className="panel-collapse collapse show">
                <div className="p-4">
                    <ul className="row align-items-center justify-content-center g-3 p-0 list-unstyled mb-0">
                        {displayImages.map((item, index) => (
                            <li className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6" key={index}>
                                <Link
                                    to="#"
                                    className="mfp-gallery d-block position-relative overflow-hidden rounded-3"
                                    onClick={() => handleImageClick(index)}
                                    style={{
                                        aspectRatio: '4/3',
                                        border: '2px solid rgba(255, 255, 255, 0.1)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <img
                                        src={item}
                                        className="img-fluid rounded-3 w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                        alt={`Gallery Image ${index + 1}`}
                                    />
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                        style={{
                                            background: 'rgba(0,0,0,0.4)',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                                    >
                                        <BsImages style={{ color: '#FFB800', fontSize: '2rem' }} />
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Lightbox
                open={isOpen}
                close={() => setisOpen(false)}
                slides={slides}
                index={currentImageIndex}
            />
        </div>
    )
}
