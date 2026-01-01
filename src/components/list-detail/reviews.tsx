import { Link } from 'react-router-dom'
import { useState } from 'react'

import { FaStar, FaRegStar, FaCircleUser } from 'react-icons/fa6'
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
                stars.push(<FaStar key={i} className="text-sm text-warning" />)
            } else {
                stars.push(<FaRegStar key={i} className="text-sm text-muted" />)
            }
        }
        return stars
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <div className="listingSingleblock mb-4" id="reviews">
            <div className="SingleblockHeader">
                <Link
                    data-bs-toggle="collapse"
                    data-parent="#review"
                    data-bs-target="#review"
                    aria-controls="review"
                    to="#"
                    aria-expanded="false"
                    className="collapsed"
                >
                    <h4 className="listingcollapseTitle">Customer Reviews</h4>
                </Link>
            </div>

            <div id="review" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <div className="allreviewsWrapper">
                        <div className="reviewsTitle d-flex align-items-center justify-content-between mb-3">
                            <h5 className="mb-0">{reviews.length} Reviews</h5>
                            {reviews.length > 0 && (
                                <div className="d-flex align-items-center gap-2">
                                    <span className="text-muted">Average:</span>
                                    <div className="d-flex align-items-center gap-1">
                                        {renderStars(Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border spinner-border-sm text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-4">
                                <p className="text-muted mb-0">No reviews yet. Be the first to leave a review!</p>
                            </div>
                        ) : (
                            <div className="allreviewsLists mb-4">
                                {reviews.map((review) => (
                                    <div className="singlereviews" key={review.id}>
                                        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
                                            <div className="reviewerThumb">
                                                <div className="square--60 circle overflow-hidden bg-light d-flex align-items-center justify-content-center">
                                                    <FaCircleUser className="text-muted" style={{ fontSize: '3rem' }} />
                                                </div>
                                            </div>
                                            <div className="reviewerMessage flex-grow-1">
                                                <div className="d-flex align-items-start justify-content-between gap-3 mb-2">
                                                    <div className="reviewerInfo">
                                                        <h6 className="mb-0">{review.reviewer_name}</h6>
                                                        <p className="text-md text-muted mb-0">
                                                            {formatDate(review.created_at)}
                                                            {review.project_type && (
                                                                <span className="ms-2 badge bg-light text-dark">{review.project_type}</span>
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
                                                    <p className="mb-0">{review.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="reviewssubmition">
                            <h6 className="mb-3">Leave a Review</h6>
                            <div className="formRow">
                                <div className="row align-items-start gx-3">
                                    <div className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="form-group mb-3">
                                            <input type="text" className="form-control" placeholder="Your Name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="form-group mb-3">
                                            <Select
                                                placeholder="Select Rating"
                                                options={options}
                                                className="categories"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <input type="text" className="form-control" placeholder="Project type (e.g., Attic Insulation, Crawl Space)" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <textarea
                                                className="form-control"
                                                placeholder="Share your experience with this company..."
                                                style={{ height: '120px' }}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button
                                            type="button"
                                            className="btn fw-medium px-5"
                                            style={{ background: '#FFB800', color: '#000', border: 'none' }}
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
