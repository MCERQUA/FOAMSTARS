import { Link } from 'react-router-dom'
import { FaAward, FaCertificate, FaShieldHalved, FaUserGraduate, FaLeaf, FaHelmetSafety, FaCircleCheck, FaMedal } from 'react-icons/fa6'
import { IconType } from 'react-icons'

interface CertificationsProps {
    certifications?: string[];
}

// Map certification keywords to icons
const certIconMap: Record<string, IconType> = {
    'spfa': FaCertificate,
    'spray foam': FaCertificate,
    'icaa': FaAward,
    'certified': FaCertificate,
    'licensed': FaShieldHalved,
    'insured': FaShieldHalved,
    'bonded': FaShieldHalved,
    'training': FaUserGraduate,
    'osha': FaHelmetSafety,
    'safety': FaHelmetSafety,
    'green': FaLeaf,
    'energy': FaLeaf,
    'leed': FaLeaf,
    'bbb': FaAward,
    'accredited': FaAward,
}

// Default certifications for spray foam companies
const defaultCertifications = [
    'SPFA Certified Installer',
    'Fully Licensed & Insured',
    'OSHA Safety Trained',
    'Energy Star Partner'
]

function getIconForCert(certName: string): IconType {
    const lowerName = certName.toLowerCase()
    for (const [key, icon] of Object.entries(certIconMap)) {
        if (lowerName.includes(key)) {
            return icon
        }
    }
    return FaCircleCheck // default icon
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

export default function Certifications({ certifications }: CertificationsProps) {
    // Use provided certifications or defaults
    const displayCerts = certifications && certifications.length > 0
        ? certifications
        : defaultCertifications

    if (displayCerts.length === 0) {
        return null
    }

    return (
        <div className="mb-4" id="certifications" style={darkCardStyle}>
            <div style={darkCardHeaderStyle}>
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#certsContent"
                    data-bs-target="#certsContent"
                    aria-controls="certsContent"
                    to="#"
                    aria-expanded="false"
                    className="collapsed text-decoration-none d-flex align-items-center gap-2"
                >
                    <FaMedal style={{ color: '#FFB800', fontSize: '1.25rem' }} />
                    <h4 className="mb-0 fw-semibold" style={{ color: '#FFB800' }}>Certifications & Credentials</h4>
                </Link>
            </div>

            <div id="certsContent" className="panel-collapse collapse show">
                <div className="p-4">
                    <div className="row g-3">
                        {displayCerts.map((cert, index) => {
                            const Icon = getIconForCert(cert)
                            return (
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12" key={index}>
                                    <div
                                        className="certItem d-flex align-items-center gap-3 p-3"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '12px'
                                        }}
                                    >
                                        <div
                                            className="certIcon d-flex align-items-center justify-content-center flex-shrink-0"
                                            style={{
                                                width: '44px',
                                                height: '44px',
                                                background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.2) 0%, rgba(255, 140, 0, 0.1) 100%)',
                                                borderRadius: '10px',
                                                border: '1px solid rgba(255, 184, 0, 0.3)'
                                            }}
                                        >
                                            <Icon style={{ color: '#FFB800', fontSize: '1.25rem' }} />
                                        </div>
                                        <span className="fw-medium" style={{ color: '#fff' }}>{cert}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div
                        className="mt-4 p-3 rounded-3 d-flex align-items-center gap-2"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%)',
                            border: '1px solid rgba(255, 184, 0, 0.2)'
                        }}
                    >
                        <FaShieldHalved style={{ color: '#FFB800', fontSize: '1.25rem', flexShrink: 0 }} />
                        <p className="text-sm mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            <strong style={{ color: '#FFB800' }}>Quality Assurance:</strong> All FOAMSTARS contractors are vetted for proper licensing, insurance, and industry certifications.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
