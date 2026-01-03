import { Link } from 'react-router-dom'
import { BsShieldFillCheck, BsCheckCircleFill, BsArrowRight } from 'react-icons/bs'
import { FaShieldHalved } from 'react-icons/fa6'

interface InsuranceVerificationProps {
    businessName?: string;
    isVerified?: boolean;
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

export default function InsuranceVerification({ businessName, isVerified = true }: InsuranceVerificationProps) {
    return (
        <div className="mb-4" id="insurance" style={darkCardStyle}>
            <div style={darkCardHeaderStyle}>
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#insuranceContent"
                    data-bs-target="#insuranceContent"
                    aria-controls="insuranceContent"
                    to="#"
                    aria-expanded="false"
                    className="collapsed text-decoration-none d-flex align-items-center gap-2"
                >
                    <BsShieldFillCheck style={{ color: '#FFB800', fontSize: '1.25rem' }} />
                    <h4 className="mb-0 fw-semibold" style={{ color: '#FFB800' }}>Insurance Verification</h4>
                    {isVerified && (
                        <span
                            className="badge ms-2"
                            style={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: '#fff',
                                fontSize: '0.7rem',
                                padding: '4px 10px'
                            }}
                        >
                            VERIFIED
                        </span>
                    )}
                </Link>
            </div>

            <div id="insuranceContent" className="panel-collapse collapse show">
                <div className="p-4">
                    {/* Verified Insurance Badge */}
                    <div
                        className="d-flex align-items-center gap-3 p-3 rounded-3 mb-4"
                        style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 100%)',
                            border: '1px solid rgba(34, 197, 94, 0.3)'
                        }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                flexShrink: 0
                            }}
                        >
                            <FaShieldHalved style={{ color: '#fff', fontSize: '1.75rem' }} />
                        </div>
                        <div>
                            <h6 className="mb-1 fw-semibold" style={{ color: '#22c55e' }}>
                                Active Insurance Coverage
                            </h6>
                            <p className="mb-0 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                {businessName ? `${businessName} maintains` : 'This contractor maintains'} verified spray foam-specific insurance coverage
                            </p>
                        </div>
                    </div>

                    {/* SprayFoamInsurance.com Feature */}
                    <div
                        className="rounded-3 p-4 mb-4"
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)'
                        }}
                    >
                        <div className="d-flex align-items-start gap-3 mb-3">
                            <img
                                src="/sprayfoaminsurance-logo.png"
                                alt="SprayFoamInsurance.com"
                                style={{
                                    height: '50px',
                                    width: 'auto',
                                    filter: 'brightness(1.1)'
                                }}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                }}
                            />
                            <div>
                                <h5 className="mb-1" style={{ color: '#fff' }}>
                                    Insured by SprayFoamInsurance.com
                                </h5>
                                <p className="mb-0 text-sm" style={{ color: '#FFB800' }}>
                                    The Premier Insurance Provider for the Spray Foam Industry
                                </p>
                            </div>
                        </div>

                        <p className="mb-3" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
                            All contractors listed on FOAMSTARS maintain active insurance coverage through{' '}
                            <a
                                href="https://sprayfoaminsurance.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#FFB800', textDecoration: 'none' }}
                            >
                                SprayFoamInsurance.com
                            </a>
                            , the industry's leading provider of spray foam-specific insurance solutions.
                        </p>

                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <div className="d-flex align-items-start gap-2">
                                    <BsCheckCircleFill style={{ color: '#22c55e', marginTop: '3px', flexShrink: 0 }} />
                                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                                        <strong style={{ color: '#fff' }}>Spray Foam Specific</strong> - Not generic business insurance
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex align-items-start gap-2">
                                    <BsCheckCircleFill style={{ color: '#22c55e', marginTop: '3px', flexShrink: 0 }} />
                                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                                        <strong style={{ color: '#fff' }}>General Liability</strong> - Covers property damage & injuries
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex align-items-start gap-2">
                                    <BsCheckCircleFill style={{ color: '#22c55e', marginTop: '3px', flexShrink: 0 }} />
                                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                                        <strong style={{ color: '#fff' }}>Professional Liability</strong> - Covers workmanship errors
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex align-items-start gap-2">
                                    <BsCheckCircleFill style={{ color: '#22c55e', marginTop: '3px', flexShrink: 0 }} />
                                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                                        <strong style={{ color: '#fff' }}>Workers Compensation</strong> - Protects crew members
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why It Matters */}
                    <div
                        className="rounded-3 p-4 mb-4"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.08) 0%, rgba(255, 140, 0, 0.05) 100%)',
                            border: '1px solid rgba(255, 184, 0, 0.2)'
                        }}
                    >
                        <h6 className="mb-3" style={{ color: '#FFB800' }}>
                            Why Spray Foam-Specific Insurance Matters
                        </h6>
                        <p className="mb-0" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.7' }}>
                            Standard business insurance policies often exclude or limit coverage for spray foam insulation work due to the specialized nature of the application process and materials.
                            <strong style={{ color: '#fff' }}> SprayFoamInsurance.com</strong> provides policies specifically designed for the unique risks of spray polyurethane foam application, including chemical handling, overspray, and proper application procedures.
                            When you hire a FOAMSTARS contractor, you're hiring a professional with proper industry-specific coverage.
                        </p>
                    </div>

                    {/* Trust Badge & CTA */}
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <div className="d-flex align-items-center gap-2">
                            <BsShieldFillCheck style={{ color: '#22c55e', fontSize: '1.25rem' }} />
                            <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                                Coverage verified by FOAMSTARS
                            </span>
                        </div>
                        <a
                            href="https://sprayfoaminsurance.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn d-inline-flex align-items-center gap-2"
                            style={{
                                background: 'linear-gradient(135deg, #FFB800 0%, #FF9500 100%)',
                                color: '#000',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '10px 20px',
                                fontWeight: '600',
                                textDecoration: 'none'
                            }}
                        >
                            Learn More <BsArrowRight />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
