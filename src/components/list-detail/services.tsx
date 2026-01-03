import { Link } from 'react-router-dom'
import { FaSprayCan, FaHouseChimney, FaBuilding, FaRoad, FaPaintRoller, FaWarehouse, FaTemperatureArrowDown, FaDroplet, FaWrench } from 'react-icons/fa6'
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
        <div className="mb-4" id="services" style={darkCardStyle}>
            <div style={darkCardHeaderStyle}>
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#servicesContent"
                    data-bs-target="#servicesContent"
                    aria-controls="servicesContent"
                    to="#"
                    aria-expanded="false"
                    className="collapsed text-decoration-none d-flex align-items-center gap-2"
                >
                    <FaWrench style={{ color: '#FFB800', fontSize: '1.25rem' }} />
                    <h4 className="mb-0 fw-semibold" style={{ color: '#FFB800' }}>Services Offered</h4>
                </Link>
            </div>

            <div id="servicesContent" className="panel-collapse collapse show">
                <div className="p-4">
                    <div className="row g-3">
                        {displayServices.map((service, index) => {
                            const Icon = service.icon
                            return (
                                <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                                    <div
                                        className="serviceCard d-flex align-items-start gap-3 p-3 h-100"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '12px',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <div
                                            className="serviceIcon d-flex align-items-center justify-content-center flex-shrink-0"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 15px rgba(255, 184, 0, 0.3)'
                                            }}
                                        >
                                            <Icon className="text-dark" style={{ fontSize: '1.25rem' }} />
                                        </div>
                                        <div className="serviceInfo">
                                            <h6 className="fw-semibold mb-1" style={{ color: '#fff' }}>{service.name}</h6>
                                            {service.description && (
                                                <p className="text-sm mb-0" style={{ color: 'rgba(255,255,255,0.5)' }}>{service.description}</p>
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
