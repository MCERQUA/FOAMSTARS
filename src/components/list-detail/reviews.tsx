import { Link } from 'react-router-dom'
import { useState } from 'react'

import { FaStar, FaRegStar, FaCircleUser, FaComments } from 'react-icons/fa6'
import Select from 'react-select'

interface Review {
    id: string;
    reviewer_name: string;
    rating: number;
    comment: string;
    created_at: string;
    project_type?: string;
}

interface ReviewsProps {
    listingId?: string;
}

// Sample reviews for demo purposes
const sampleReviews: Review[] = [
    {
        id: '1',
        reviewer_name: 'John M.',
        rating: 5,
        comment: 'Excellent work on our attic insulation! The team was professional, arrived on time, and completed the job in one day. Our energy bills have dropped significantly since the install. Highly recommend!',
        created_at: '2024-11-15',
        project_type: 'Residential Attic'
    },
    {
        id: '2',
        reviewer_name: 'Sarah K.',
        rating: 5,
        comment: 'We had our crawl space encapsulated with closed-cell foam. The difference in our home comfort is night and day. No more cold floors in winter! Great communication throughout the project.',
        created_at: '2024-10-28',
        project_type: 'Crawl Space'
    },
    {
        id: '3',
        reviewer_name: 'Mike R.',
        rating: 4,
        comment: 'Professional team that knew their stuff. They insulated our metal building and it\'s much more comfortable now. Would have given 5 stars but scheduling took a bit longer than expected.',
        created_at: '2024-09-12',
        project_type: 'Commercial'
    }
]

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

const darkInputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#fff',
    padding: '12px 16px',
    borderRadius: '10px'
}

// Custom styles for react-select in dark mode
const darkSelectStyles = {
    control: (base: any) => ({
        ...base,
        background: 'rgba(255,255,255,0.05)',
        borderColor: 'rgba(255,255,255,0.15)',
        borderRadius: '10px',
        padding: '4px 8px',
        '&:hover': {
            borderColor: 'rgba(255, 184, 0, 0.5)'
        }
    }),
    menu: (base: any) => ({
        ...base,
        background: '#1e1e1e',
        border: '1px solid rgba(255,255,255,0.15)'
    }),
    option: (base: any, state: any) => ({
        ...base,
        background: state.isFocused ? 'rgba(255, 184, 0, 0.2)' : 'transparent',
        color: '#fff',
        '&:hover': {
            background: 'rgba(255, 184, 0, 0.2)'
        }
    }),
    singleValue: (base: any) => ({
        ...base,
        color: '#fff'
    }),
    placeholder: (base: any) => ({
        ...base,
        color: 'rgba(255,255,255,0.5)'
    }),
    input: (base: any) => ({
        ...base,
        color: '#fff'
    })
}

export default function Reviews({ listingId: _listingId }: ReviewsProps) {
    // TODO: Fetch reviews from database when review system is implemented
    // listingId will be used to fetch reviews for specific listing
    const [reviews] = useState<Review[]>(sampleReviews)
    const loading = false

    const options = [
        { value: '5', label: '5 Stars - Excellent' },
        { value: '4', label: '4 Stars - Very Good' },
        { value: '3', label: '3 Stars - Good' },
        { value: '2', label: '2 Stars - Fair' },
        { value: '1', label: '1 Star - Poor' },
    ]

    const renderStars = (rating: number) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-sm" style={{ color: '#FFB800' }} />)
            } else {
                stars.push(<FaRegStar key={i} className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }} />)
            }
        }
        return stars
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <div className="mb-4" id="reviews" style={darkCardStyle}>
            <div style={darkCardHeaderStyle}>
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#review"
                    data-bs-target="#review"
                    aria-controls="review"
                    to="#"
                    aria-expanded="false"
                    className="collapsed text-decoration-none d-flex align-items-center gap-2"
                >
                    <FaComments style={{ color: '#FFB800', fontSize: '1.25rem' }} />
                    <h4 className="mb-0 fw-semibold" style={{ color: '#FFB800' }}>Customer Reviews</h4>
                </Link>
            </div>

            <div id="review" className="panel-collapse collapse show">
                <div className="p-4">
                    <div className="allreviewsWrapper">
                        <div className="reviewsTitle d-flex align-items-center justify-content-between mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <h5 className="mb-0" style={{ color: '#fff' }}>{reviews.length} Reviews</h5>
                            {reviews.length > 0 && (
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>Average:</span>
                                    <div className="d-flex align-items-center gap-1">
                                        {renderStars(Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border spinner-border-sm" style={{ color: '#FFB800' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-4">
                                <p className="mb-0" style={{ color: 'rgba(255,255,255,0.5)' }}>No reviews yet. Be the first to leave a review!</p>
                            </div>
                        ) : (
                            <div className="allreviewsLists mb-4">
                                {reviews.map((review, index) => (
                                    <div
                                        className="singlereviews p-3 rounded-3 mb-3"
                                        key={review.id}
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.08)'
                                        }}
                                    >
                                        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
                                            <div className="reviewerThumb">
                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.2) 0%, rgba(255, 140, 0, 0.1) 100%)',
                                                        border: '1px solid rgba(255, 184, 0, 0.3)'
                                                    }}
                                                >
                                                    <FaCircleUser style={{ color: '#FFB800', fontSize: '1.5rem' }} />
                                                </div>
                                            </div>
                                            <div className="reviewerMessage flex-grow-1">
                                                <div className="d-flex align-items-start justify-content-between gap-3 mb-2">
                                                    <div className="reviewerInfo">
                                                        <h6 className="mb-0" style={{ color: '#fff' }}>{review.reviewer_name}</h6>
                                                        <p className="text-sm mb-0" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                                            {formatDate(review.created_at)}
                                                            {review.project_type && (
                                                                <span
                                                                    className="ms-2 badge"
                                                                    style={{
                                                                        background: 'rgba(255, 184, 0, 0.15)',
                                                                        color: '#FFB800',
                                                                        border: '1px solid rgba(255, 184, 0, 0.3)'
                                                                    }}
                                                                >
                                                                    {review.project_type}
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="reviewsFlexlast">
                                                        <div className="d-flex align-items-center gap-1">
                                                            {renderStars(review.rating)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="messageDescription">
                                                    <p className="mb-0" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.6' }}>{review.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div
                            className="reviewssubmition p-4 rounded-3"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.08)'
                            }}
                        >
                            <h6 className="mb-3" style={{ color: '#FFB800' }}>Leave a Review</h6>
                            <div className="formRow">
                                <div className="row align-items-start gx-3">
                                    <div className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="form-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Name"
                                                style={darkInputStyle}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="form-group mb-3">
                                            <Select
                                                placeholder="Select Rating"
                                                options={options}
                                                styles={darkSelectStyles}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Project type (e.g., Attic Insulation, Crawl Space)"
                                                style={darkInputStyle}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <textarea
                                                className="form-control"
                                                placeholder="Share your experience with this company..."
                                                style={{ ...darkInputStyle, height: '120px' }}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button
                                            type="button"
                                            className="btn fw-semibold px-5 py-3"
                                            style={{
                                                background: 'linear-gradient(135deg, #FFB800 0%, #FF9500 100%)',
                                                color: '#000',
                                                border: 'none',
                                                borderRadius: '10px'
                                            }}
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
