import { Link } from 'react-router-dom'

interface MapsProps {
    address?: string;
    city?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
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
        <div className="listingSingleblock mb-4" id="maps">
            <div className="SingleblockHeader">
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#map"
                    data-bs-target="#map"
                    aria-controls="map"
                    to="#"
                    aria-expanded="false"
                    className="collapsed"
                >
                    <h4 className="listingcollapseTitle">Location</h4>
                </Link>
            </div>

            <div id="map" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    {locationQuery && (
                        <p className="text-muted mb-3">
                            Service area: <strong>{locationQuery}</strong>
                        </p>
                    )}
                    <div className="map-container rounded-3 overflow-hidden">
                        <iframe
                            src={fallbackUrl}
                            className="full-width w-100"
                            height="350"
                            style={{ border: '0' }}
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
