import { useState } from 'react'
import { Link } from 'react-router-dom'

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Default placeholder images for spray foam work
import img1 from '../../assets/img/gal-1.jpg'
import img2 from '../../assets/img/gal-2.jpg'
import img3 from '../../assets/img/gal-3.jpg'
import img4 from '../../assets/img/gal-4.jpg'
import img5 from '../../assets/img/gal-5.jpg'
import img6 from '../../assets/img/gal-6.jpg'

const defaultImages = [img1, img2, img3, img4, img5, img6]

interface GalleriesProps {
    images?: string[];
}

export default function Galleries({ images }: GalleriesProps) {
    const [isOpen, setisOpen] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    // Use provided images or fall back to defaults
    const displayImages = images && images.length > 0 ? images : defaultImages;

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
        <div className="listingSingleblock mb-4" id="Galleries">
            <div className="SingleblockHeader">
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#gallery"
                    data-bs-target="#gallery"
                    aria-controls="gallery"
                    to="#"
                    aria-expanded="false"
                    className="collapsed"
                >
                    <h4 className="listingcollapseTitle">Photo Gallery</h4>
                </Link>
            </div>

            <div id="gallery" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <ul className="row align-items-center justify-content-center g-3 p-0">
                        {displayImages.map((item, index) => (
                            <li className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6" key={index}>
                                <Link
                                    to="#"
                                    className="mfp-gallery d-block position-relative overflow-hidden rounded"
                                    onClick={() => handleImageClick(index)}
                                    style={{ aspectRatio: '4/3' }}
                                >
                                    <img
                                        src={item}
                                        className="img-fluid rounded w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                        alt={`Gallery Image ${index + 1}`}
                                    />
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
