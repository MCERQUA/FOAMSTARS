import { Link } from 'react-router-dom'
import { FaSprayCan, FaHouseChimney, FaBuilding, FaRoad, FaPaintRoller, FaWarehouse, FaTemperatureArrowDown, FaDroplet } from 'react-icons/fa6'
import { IconType } from 'react-icons'

interface ServicesProps {
    services?: string[];
}

// Default spray foam services with icons
const defaultServices: { name: string; icon: IconType; description: string }[] = [
    {
        name: 'Residential Insulation',
        icon: FaHouseChimney,
        description: 'Home attics, walls, crawl spaces, and basements'
    },
    {
        name: 'Commercial Insulation',
        icon: FaBuilding,
        description: 'Warehouses, offices, retail, and industrial buildings'
    },
    {
        name: 'Concrete Lifting',
        icon: FaRoad,
        description: 'Driveways, sidewalks, patios, and pool decks'
    },
    {
        name: 'SPF Roofing',
        icon: FaWarehouse,
        description: 'Spray polyurethane foam roofing systems'
    },
    {
        name: 'Polyurethane Coatings',
        icon: FaPaintRoller,
        description: 'Protective coatings and waterproofing'
    },
    {
        name: 'Open Cell Foam',
        icon: FaSprayCan,
        description: 'Flexible, sound-dampening insulation'
    },
    {
        name: 'Closed Cell Foam',
        icon: FaTemperatureArrowDown,
        description: 'High R-value, moisture barrier insulation'
    },
    {
        name: 'Moisture Control',
        icon: FaDroplet,
        description: 'Vapor barriers and waterproofing solutions'
    }
]

// Map service names to icons
const serviceIconMap: Record<string, IconType> = {
    'residential': FaHouseChimney,
    'commercial': FaBuilding,
    'concrete': FaRoad,
    'roofing': FaWarehouse,
    'coating': FaPaintRoller,
    'open cell': FaSprayCan,
    'closed cell': FaTemperatureArrowDown,
    'moisture': FaDroplet,
    'insulation': FaSprayCan,
}

function getIconForService(serviceName: string): IconType {
    const lowerName = serviceName.toLowerCase()
    for (const [key, icon] of Object.entries(serviceIconMap)) {
        if (lowerName.includes(key)) {
            return icon
        }
    }
    return FaSprayCan // default icon
}

export default function Services({ services }: ServicesProps) {
    // If no services provided, show default spray foam services
    const displayServices = services && services.length > 0
        ? services.map(name => ({
            name,
            icon: getIconForService(name),
            description: ''
        }))
        : defaultServices

    if (displayServices.length === 0) {
        return null
    }

    return (
        <div className="listingSingleblock mb-4" id="services">
            <div className="SingleblockHeader">
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#servicesContent"
                    data-bs-target="#servicesContent"
                    aria-controls="servicesContent"
                    to="#"
                    aria-expanded="false"
                    className="collapsed"
                >
                    <h4 className="listingcollapseTitle">Services Offered</h4>
                </Link>
            </div>

            <div id="servicesContent" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <div className="row g-3">
                        {displayServices.map((service, index) => {
                            const Icon = service.icon
                            return (
                                <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                                    <div className="serviceCard d-flex align-items-start gap-3 p-3 bg-light rounded-3 h-100">
                                        <div
                                            className="serviceIcon d-flex align-items-center justify-content-center flex-shrink-0"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                                                borderRadius: '12px'
                                            }}
                                        >
                                            <Icon className="text-white" style={{ fontSize: '1.25rem' }} />
                                        </div>
                                        <div className="serviceInfo">
                                            <h6 className="fw-semibold mb-1">{service.name}</h6>
                                            {service.description && (
                                                <p className="text-muted text-sm mb-0">{service.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
