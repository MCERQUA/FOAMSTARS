import { useState } from 'react'

import { BsBrowserChrome, BsEnvelope, BsFacebook, BsInstagram, BsSuitHeart, BsTwitterX, BsWhatsapp, BsTelephoneFill, BsClock, BsShieldFillCheck } from 'react-icons/bs'
import { FaLocationDot } from 'react-icons/fa6'
import { FiSend } from 'react-icons/fi'

interface ListingData {
    id?: string;
    business_name?: string | null;
    phone?: string | null;
    email?: string | null;
    website_url?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zip_code?: string | null;
    featured_image_url?: string | null;
    years_in_business?: number | null;
    is_verified?: boolean;
}

interface SingleSidebarOneProps {
    listing?: ListingData | null;
}

interface TimeTable {
    day: string;
    time: string;
}

export default function SingleSidebarOne({ listing }: SingleSidebarOneProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const timeTable: TimeTable[] = [
        { day: 'Monday', time: '8:00 AM - 5:00 PM' },
        { day: 'Tuesday', time: '8:00 AM - 5:00 PM' },
        { day: 'Wednesday', time: '8:00 AM - 5:00 PM' },
        { day: 'Thursday', time: '8:00 AM - 5:00 PM' },
        { day: 'Friday', time: '8:00 AM - 5:00 PM' },
        { day: 'Saturday', time: 'By Appointment' },
        { day: 'Sunday', time: 'Closed' },
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement form submission
        console.log('Quote request submitted:', formData)
        alert('Thank you! Your quote request has been submitted.')
        setFormData({ name: '', email: '', phone: '', message: '' })
    }

    const formatPhoneForLink = (phone: string) => {
        return phone.replace(/[^0-9+]/g, '')
    }

    // Dark card style
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

    return (
        <div className="sidebarGroups d-flex flex-column gap-4">

            {/* Insurance Verification Badge */}
            <a
                href="#insurance"
                className="text-decoration-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 100%)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'block'
                }}
            >
                <div className="d-flex align-items-center gap-3">
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            flexShrink: 0
                        }}
                    >
                        <BsShieldFillCheck style={{ color: '#fff', fontSize: '1.25rem' }} />
                    </div>
                    <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <span className="fw-semibold" style={{ color: '#22c55e' }}>Verified Insured</span>
                            <span
                                className="badge"
                                style={{
                                    background: '#22c55e',
                                    color: '#fff',
                                    fontSize: '0.65rem',
                                    padding: '2px 6px'
                                }}
                            >
                                ACTIVE
                            </span>
                        </div>
                        <p className="mb-0 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                            Covered by SprayFoamInsurance.com
                        </p>
                    </div>
                </div>
            </a>

            {/* Contact Information Card */}
            <div style={darkCardStyle}>
                <div style={darkCardHeaderStyle}>
                    <h6 className="mb-0" style={{ color: '#FFB800' }}>Contact Information</h6>
                </div>
                <div className="p-0">
                    <div className="contactInfo">
                        {listing?.phone && (
                            <a
                                href={`tel:${formatPhoneForLink(listing.phone)}`}
                                className="py-3 px-4 d-block text-decoration-none"
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.2) 0%, rgba(255, 140, 0, 0.1) 100%)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255, 184, 0, 0.3)'
                                        }}
                                    >
                                        <BsTelephoneFill style={{ color: '#FFB800', fontSize: '1.1rem' }} />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-0" style={{ color: 'rgba(255,255,255,0.5)' }}>Phone</p>
                                        <p className="fw-medium mb-0" style={{ color: '#fff' }}>{listing.phone}</p>
                                    </div>
                                </div>
                            </a>
                        )}

                        {listing?.email && (
                            <a
                                href={`mailto:${listing.email}`}
                                className="py-3 px-4 d-block text-decoration-none"
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.2) 0%, rgba(255, 140, 0, 0.1) 100%)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255, 184, 0, 0.3)'
                                        }}
                                    >
                                        <BsEnvelope style={{ color: '#FFB800', fontSize: '1.1rem' }} />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-0" style={{ color: 'rgba(255,255,255,0.5)' }}>Email</p>
                                        <p className="fw-medium mb-0" style={{ color: '#fff' }}>{listing.email}</p>
                                    </div>
                                </div>
                            </a>
                        )}

                        {listing?.website_url && (
                            <a
                                href={listing.website_url.startsWith('http') ? listing.website_url : `https://${listing.website_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-3 px-4 d-block text-decoration-none"
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.2) 0%, rgba(255, 140, 0, 0.1) 100%)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255, 184, 0, 0.3)'
                                        }}
                                    >
                                        <BsBrowserChrome style={{ color: '#FFB800', fontSize: '1.1rem' }} />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-0" style={{ color: 'rgba(255,255,255,0.5)' }}>Website</p>
                                        <p className="fw-medium mb-0" style={{ color: '#fff' }}>Visit Website</p>
                                    </div>
                                </div>
                            </a>
                        )}

                        {(listing?.address || listing?.city || listing?.state) && (
                            <div className="py-3 px-4">
                                <div className="d-flex align-items-start gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.2) 0%, rgba(255, 140, 0, 0.1) 100%)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255, 184, 0, 0.3)'
                                        }}
                                    >
                                        <FaLocationDot style={{ color: '#FFB800', fontSize: '1.1rem' }} />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-0" style={{ color: 'rgba(255,255,255,0.5)' }}>Location</p>
                                        <p className="fw-medium mb-0" style={{ color: '#fff' }}>
                                            {listing?.address && <>{listing.address}<br /></>}
                                            {listing?.city && listing?.state
                                                ? `${listing.city}, ${listing.state}`
                                                : listing?.state || ''}
                                            {listing?.zip_code && ` ${listing.zip_code}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Quote Request Form */}
            <div style={darkCardStyle}>
                <div style={{
                    ...darkCardHeaderStyle,
                    background: 'linear-gradient(135deg, #FFB800 0%, #FF9500 100%)'
                }}>
                    <h6 className="mb-0" style={{ color: '#000' }}>
                        <FiSend className="me-2" />
                        Request a Free Quote
                    </h6>
                </div>
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Your Name *"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#fff',
                                    padding: '12px 16px',
                                    borderRadius: '10px'
                                }}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email Address *"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#fff',
                                    padding: '12px 16px',
                                    borderRadius: '10px'
                                }}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="tel"
                                name="phone"
                                className="form-control"
                                placeholder="Phone Number *"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#fff',
                                    padding: '12px 16px',
                                    borderRadius: '10px'
                                }}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <textarea
                                name="message"
                                className="form-control"
                                rows={3}
                                placeholder="Briefly describe your project..."
                                value={formData.message}
                                onChange={handleInputChange}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#fff',
                                    padding: '12px 16px',
                                    borderRadius: '10px'
                                }}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn w-100 fw-semibold py-3"
                            style={{
                                background: 'linear-gradient(135deg, #FFB800 0%, #FF9500 100%)',
                                color: '#000',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1rem'
                            }}
                        >
                            Send Quote Request
                        </button>
                    </form>
                </div>
            </div>

            {/* Business Hours */}
            <div style={darkCardStyle}>
                <div style={darkCardHeaderStyle} className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0" style={{ color: '#FFB800' }}>
                        <BsClock className="me-2" />
                        Business Hours
                    </h6>
                    <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                            background: 'rgba(40, 167, 69, 0.2)',
                            color: '#28a745',
                            border: '1px solid rgba(40, 167, 69, 0.3)'
                        }}
                    >
                        Open Now
                    </span>
                </div>
                <div className="p-0">
                    <div className="hoursInfo">
                        {timeTable.map((item: TimeTable, index: number) => (
                            <div
                                className="py-3 px-4 d-flex justify-content-between"
                                style={{
                                    borderBottom: index < timeTable.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none'
                                }}
                                key={index}
                            >
                                <span className="text-sm fw-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{item.day}</span>
                                <span
                                    className="text-sm"
                                    style={{
                                        color: item.time === 'Closed' ? '#dc3545' : 'rgba(255,255,255,0.5)'
                                    }}
                                >
                                    {item.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Share & Bookmark */}
            <div style={darkCardStyle}>
                <div className="px-4 py-4">
                    <div className="form-group mb-3">
                        <button
                            type="button"
                            className="btn fw-medium w-100 py-3"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255, 184, 0, 0.4)',
                                color: '#FFB800',
                                borderRadius: '10px'
                            }}
                        >
                            <BsSuitHeart className="me-2" />Bookmark This Company
                        </button>
                    </div>
                    <div className="form-group m-0">
                        <p className="text-sm mb-3 text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>Share this listing:</p>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <a
                                href="#"
                                className="btn btn-sm rounded-circle"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.15)'
                                }}
                            >
                                <BsFacebook style={{ color: '#1877f2' }} />
                            </a>
                            <a
                                href="#"
                                className="btn btn-sm rounded-circle"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.15)'
                                }}
                            >
                                <BsTwitterX style={{ color: '#fff' }} />
                            </a>
                            <a
                                href="#"
                                className="btn btn-sm rounded-circle"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.15)'
                                }}
                            >
                                <BsInstagram style={{ color: '#e4405f' }} />
                            </a>
                            <a
                                href="#"
                                className="btn btn-sm rounded-circle"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.15)'
                                }}
                            >
                                <BsWhatsapp style={{ color: '#25d366' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
