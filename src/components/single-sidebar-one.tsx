import { useState } from 'react'

import { BsBrowserChrome, BsEnvelope, BsFacebook, BsInstagram, BsSuitHeart, BsTwitterX, BsWhatsapp, BsTelephoneFill, BsClock } from 'react-icons/bs'
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

    return (
        <div className="sidebarGroups d-flex flex-column gap-4">

            {/* Contact Information Card */}
            <div className="card">
                <div
                    className="card-header py-3"
                    style={{ background: '#000' }}
                >
                    <h6 className="text-white mb-0">Contact Information</h6>
                </div>
                <div className="card-body p-0">
                    <div className="contactInfo">
                        {listing?.phone && (
                            <a
                                href={`tel:${formatPhoneForLink(listing.phone)}`}
                                className="py-3 px-3 border-bottom d-block text-decoration-none"
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            background: 'rgba(255, 184, 0, 0.1)',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <BsTelephoneFill style={{ color: '#FFB800' }} />
                                    </div>
                                    <div>
                                        <p className="text-muted text-sm mb-0">Phone</p>
                                        <p className="text-dark fw-medium mb-0">{listing.phone}</p>
                                    </div>
                                </div>
                            </a>
                        )}

                        {listing?.email && (
                            <a
                                href={`mailto:${listing.email}`}
                                className="py-3 px-3 border-bottom d-block text-decoration-none"
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            background: 'rgba(255, 184, 0, 0.1)',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <BsEnvelope style={{ color: '#FFB800' }} />
                                    </div>
                                    <div>
                                        <p className="text-muted text-sm mb-0">Email</p>
                                        <p className="text-dark fw-medium mb-0">{listing.email}</p>
                                    </div>
                                </div>
                            </a>
                        )}

                        {listing?.website_url && (
                            <a
                                href={listing.website_url.startsWith('http') ? listing.website_url : `https://${listing.website_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-3 px-3 border-bottom d-block text-decoration-none"
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            background: 'rgba(255, 184, 0, 0.1)',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <BsBrowserChrome style={{ color: '#FFB800' }} />
                                    </div>
                                    <div>
                                        <p className="text-muted text-sm mb-0">Website</p>
                                        <p className="text-dark fw-medium mb-0">Visit Website</p>
                                    </div>
                                </div>
                            </a>
                        )}

                        {(listing?.address || listing?.city || listing?.state) && (
                            <div className="py-3 px-3">
                                <div className="d-flex align-items-start gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            background: 'rgba(255, 184, 0, 0.1)',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <FaLocationDot style={{ color: '#FFB800' }} />
                                    </div>
                                    <div>
                                        <p className="text-muted text-sm mb-0">Location</p>
                                        <p className="text-dark fw-medium mb-0">
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
            <div className="card">
                <div
                    className="card-header py-3"
                    style={{ background: '#000' }}
                >
                    <h6 className="text-white mb-0">
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
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn w-100 fw-medium"
                            style={{
                                background: '#FFB800',
                                color: '#000',
                                border: 'none'
                            }}
                        >
                            Send Quote Request
                        </button>
                    </form>
                </div>
            </div>

            {/* Business Hours */}
            <div className="card">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">
                        <BsClock className="me-2" />
                        Business Hours
                    </h6>
                    <span className="badge badge-xs badge-success rounded-pill">Open Now</span>
                </div>
                <div className="card-body p-0">
                    <div className="hoursInfo">
                        {timeTable.map((item: TimeTable, index: number) => (
                            <div
                                className={`py-2 px-3 d-flex justify-content-between ${index < timeTable.length - 1 ? 'border-bottom' : ''}`}
                                key={index}
                            >
                                <span className="text-dark text-sm fw-medium">{item.day}</span>
                                <span className={`text-sm ${item.time === 'Closed' ? 'text-danger' : 'text-muted'}`}>
                                    {item.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Share & Bookmark */}
            <div className="card">
                <div className="card-body px-3 py-3">
                    <div className="form-group mb-3">
                        <button type="button" className="btn btn-whites border rounded-pill fw-medium w-100">
                            <BsSuitHeart className="me-2" />Bookmark This Company
                        </button>
                    </div>
                    <div className="form-group m-0">
                        <p className="text-sm text-muted mb-2 text-center">Share this listing:</p>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <a href="#" className="btn btn-sm btn-whites border rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BsFacebook className="color--facebook" />
                            </a>
                            <a href="#" className="btn btn-sm btn-whites border rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BsTwitterX className="color--twitter" />
                            </a>
                            <a href="#" className="btn btn-sm btn-whites border rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BsInstagram className="color--instagram" />
                            </a>
                            <a href="#" className="btn btn-sm btn-whites border rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BsWhatsapp className="color--whatsapp" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
