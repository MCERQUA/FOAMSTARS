import { Link } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6'

interface MapsProps {
    address?: string;
    city?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
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

export default function Maps({ address, city, state, latitude, longitude }: MapsProps) {
    // Build the address string for the embed
    const locationParts = [address, city, state].filter(Boolean)
    const locationQuery = locationParts.join(', ')

    // If we have coordinates, use them; otherwise use address search
    const mapUrl = latitude && longitude
        ? `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}&q=${latitude},${longitude}&zoom=14`
        : locationQuery
            ? `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}&q=${encodeURIComponent(locationQuery)}&zoom=12`
            : null

    // Don't render if we don't have location info or API key
    if (!mapUrl && !locationQuery) {
        return null
    }

    // Fallback to a simple embed without API key (uses legacy embed)
    const fallbackUrl = locationQuery
        ? `https://maps.google.com/maps?q=${encodeURIComponent(locationQuery)}&t=&z=12&ie=UTF8&iwloc=&output=embed`
        : 'https://maps.google.com/maps?q=United%20States&t=&z=4&ie=UTF8&iwloc=&output=embed'

    return (
        <div className="mb-4" id="maps" style={darkCardStyle}>
            <div style={darkCardHeaderStyle}>
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#map"
                    data-bs-target="#map"
                    aria-controls="map"
                    to="#"
                    aria-expanded="false"
                    className="collapsed text-decoration-none d-flex align-items-center gap-2"
                >
                    <FaLocationDot style={{ color: '#FFB800', fontSize: '1.25rem' }} />
                    <h4 className="mb-0 fw-semibold" style={{ color: '#FFB800' }}>Location</h4>
                </Link>
            </div>

            <div id="map" className="panel-collapse collapse show">
                <div className="p-4">
                    {locationQuery && (
                        <p className="mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                            Service area: <strong style={{ color: '#fff' }}>{locationQuery}</strong>
                        </p>
                    )}
                    <div
                        className="map-container rounded-3 overflow-hidden"
                        style={{
                            border: '2px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <iframe
                            src={fallbackUrl}
                            className="full-width w-100"
                            height="350"
                            style={{ border: '0', filter: 'grayscale(20%) contrast(1.1)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
