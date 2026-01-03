import { Link } from 'react-router-dom'
import { BsBuilding } from 'react-icons/bs'

interface DescriptionsProps {
    description?: string;
}

const defaultDescription = `We are a professional spray foam insulation contractor dedicated to providing high-quality insulation solutions for residential and commercial properties. Our team of certified installers uses the latest equipment and techniques to ensure optimal energy efficiency, comfort, and protection for your building.

Whether you need attic insulation, wall cavity insulation, crawl space encapsulation, or commercial building insulation, we have the expertise to handle projects of any size. We use premium spray foam products that provide superior R-value, air sealing, and moisture control compared to traditional insulation materials.

Contact us today for a free estimate and learn how spray foam insulation can reduce your energy bills and improve your indoor comfort.`

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

export default function Descriptions({ description }: DescriptionsProps) {
    const displayDescription = description || defaultDescription

    return (
        <div className="mb-4" id="descriptions" style={darkCardStyle}>
            <div style={darkCardHeaderStyle}>
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#description"
                    data-bs-target="#description"
                    aria-controls="description"
                    to="#"
                    aria-expanded="false"
                    className="collapsed text-decoration-none d-flex align-items-center gap-2"
                >
                    <BsBuilding style={{ color: '#FFB800', fontSize: '1.25rem' }} />
                    <h4 className="mb-0 fw-semibold" style={{ color: '#FFB800' }}>About This Company</h4>
                </Link>
            </div>

            <div id="description" className="panel-collapse collapse show">
                <div className="p-4">
                    {displayDescription.split('\n\n').map((paragraph, index) => (
                        <p
                            key={index}
                            className={index === displayDescription.split('\n\n').length - 1 ? 'mb-0' : 'mb-3'}
                            style={{
                                color: 'rgba(255, 255, 255, 0.75)',
                                lineHeight: '1.8',
                                fontSize: '0.95rem'
                            }}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}
