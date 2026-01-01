import { Link } from 'react-router-dom'

interface DescriptionsProps {
    description?: string;
}

const defaultDescription = `We are a professional spray foam insulation contractor dedicated to providing high-quality insulation solutions for residential and commercial properties. Our team of certified installers uses the latest equipment and techniques to ensure optimal energy efficiency, comfort, and protection for your building.

Whether you need attic insulation, wall cavity insulation, crawl space encapsulation, or commercial building insulation, we have the expertise to handle projects of any size. We use premium spray foam products that provide superior R-value, air sealing, and moisture control compared to traditional insulation materials.

Contact us today for a free estimate and learn how spray foam insulation can reduce your energy bills and improve your indoor comfort.`

export default function Descriptions({ description }: DescriptionsProps) {
    const displayDescription = description || defaultDescription

    return (
        <div className="listingSingleblock mb-4" id="descriptions">
            <div className="SingleblockHeader">
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#description"
                    data-bs-target="#description"
                    aria-controls="description"
                    to="#"
                    aria-expanded="false"
                    className="collapsed"
                >
                    <h4 className="listingcollapseTitle">About This Company</h4>
                </Link>
            </div>

            <div id="description" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    {displayDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className={index === displayDescription.split('\n\n').length - 1 ? 'mb-0' : ''}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}
