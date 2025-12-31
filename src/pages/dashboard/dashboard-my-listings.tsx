import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import AdminNavbar from '../../components/navbar/admin-navbar'
import AdminSidebar from '../../components/admin/admin-sidebar'
import BackToTop from '../../components/back-to-top'
import BusinessListingForm from '../../components/business/BusinessListingForm'

import { getUserListings, deleteListing, BusinessListing } from '../../lib/neon'
import { useAuth } from '../../contexts/AuthContext'

import { BsStarFill, BsStarHalf, BsPencil, BsTrash, BsPlus } from 'react-icons/bs'

export default function DashboardMyListings() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [listings, setListings] = useState<BusinessListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingListing, setEditingListing] = useState<BusinessListing | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (user?.id) {
      loadListings()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadListings = async () => {
    if (!user?.id) return
    try {
      setLoading(true)
      const data = await getUserListings(user.id)
      setListings(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load listings')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return
    
    try {
      setDeletingId(id)
      await deleteListing(id)
      setListings(prev => prev.filter(listing => listing.id !== id))
    } catch (err: any) {
      alert(err.message || 'Failed to delete listing')
    } finally {
      setDeletingId(null)
    }
  }

  const handleFormSuccess = (listing: BusinessListing) => {
    if (editingListing) {
      setListings(prev => prev.map(l => l.id === listing.id ? listing : l))
    } else {
      setListings(prev => [listing, ...prev])
    }
    setShowForm(false)
    setEditingListing(null)
  }

  const handleEdit = (listing: BusinessListing) => {
    setEditingListing(listing)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingListing(null)
  }

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'active': 'bg-success',
      'pending': 'bg-warning',
      'suspended': 'bg-danger',
      'draft': 'bg-secondary'
    }
    return statusColors[status] || 'bg-secondary'
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} className="text-warning" />)
    }
    
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" className="text-warning" />)
    }
    
    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<BsStarFill key={`empty-${i}`} className="text-muted" />)
    }
    
    return stars
  }


  return (
    <>
        <AdminNavbar/>

        <section className="p-0">
            <div className="container-fluid p-0">
                <div className="row user-dashboard g-0">
                    
                    <AdminSidebar/>
                    
                    <div className="col-xl-10 col-lg-9 col-md-12 pt-lg-0 pt-5">
                        <div className="user-dashboard-box bg-light">
                            
                            <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 pt-lg-0 pt-5">
                                <h2 className="fw-medium mb-0">My Listings</h2>
                            </div>
                            
                            <div className="dashCaption p-xl-5 p-3 p-md-4">
                                
                                {showForm ? (
                                    <BusinessListingForm
                                        listing={editingListing || undefined}
                                        onSuccess={handleFormSuccess}
                                        onCancel={handleCloseForm}
                                    />
                                ) : (
                                    <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="card rounded-3 shadow-sm">
                                                <div className="card-header px-4 py-3 d-flex justify-content-between align-items-center">
                                                    <h4 className="m-0">Manage Listings</h4>
                                                    <button 
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => navigate('/dashboard/add-listing')}
                                                    >
                                                        <BsPlus className="me-1" />
                                                        Add New Listing
                                                    </button>
                                                </div>
                                                <div className="card-body p-0">
                                                    {error && (
                                                        <div className="alert alert-danger m-4">
                                                            {error}
                                                        </div>
                                                    )}
                                                    
                                                    {loading ? (
                                                        <div className="text-center py-5">
                                                            <div className="spinner-border text-primary" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    ) : listings.length === 0 ? (
                                                        <div className="text-center py-5">
                                                            <div className="text-muted">
                                                                <h5>No Listings Yet</h5>
                                                                <p>You haven't created any listings. Start by adding your first listing to get customers.</p>
                                                                <div className="mt-4">
                                                                    <button 
                                                                        className="btn btn-primary"
                                                                        onClick={() => navigate('/dashboard/add-listing')}
                                                                    >
                                                                        Add Your First Listing
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <ul className="dashboardListgroup">
                                                            {listings.map((listing) => (
                                                                <li key={listing.id}>
                                                                    <div className="mngListings">
                                                                        <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap">
                                                                            <div className="mngListinfirst">
                                                                                <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap">
                                                                                    <div className="mngListings-thumb">
                                                                                        <figure className="m-0">
                                                                                            <img 
                                                                                                src={listing.featured_image_url || "/src/assets/img/list-1.jpg"} 
                                                                                                className="img-fluid rounded" 
                                                                                                alt={listing.title}
                                                                                            />
                                                                                        </figure>
                                                                                    </div>
                                                                                    
                                                                                    <div className="mngListings-caps">
                                                                                        <div className="d-flex align-items-center justify-content-start mb-1 gap-2">
                                                                                            <span className={`badge badge-xs ${getStatusBadge(listing.status || 'draft')}`}>
                                                                                                {(listing.status || 'draft').charAt(0).toUpperCase() + (listing.status || 'draft').slice(1)}
                                                                                            </span>
                                                                                            {listing.is_featured && (
                                                                                                <span className="badge badge-xs bg-warning">Featured</span>
                                                                                            )}
                                                                                            {listing.is_verified && (
                                                                                                <span className="badge badge-xs bg-success">Verified</span>
                                                                                            )}
                                                                                        </div>
                                                                                        <h5 className="mnglstTitle">{listing.title}</h5>
                                                                                        <span>{listing.city && listing.state ? `${listing.city}, ${listing.state}` : 'Location not set'}</span>
                                                                                        <div className="d-flex align-items-center justify-content-start gap-2 mt-3">
                                                                                            <div className="ratingView">
                                                                                                {renderStars(listing.average_rating || 0)}
                                                                                            </div>
                                                                                            <div className="text-md">
                                                                                                {listing.review_count || 0} review{(listing.review_count || 0) !== 1 ? 's' : ''}
                                                                                            </div>
                                                                                        </div>
                                                                                        {listing.hourly_rate && (
                                                                                            <div className="text-success fw-medium mt-2">
                                                                                                ${listing.hourly_rate}/hour
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mngListinlast">
                                                                                <div className="d-flex align-items-center justify-content-start gap-3">
                                                                                    <button 
                                                                                        className="btn btn-sm btn-light-success fw-medium rounded-pill"
                                                                                        onClick={() => handleEdit(listing)}
                                                                                    >
                                                                                        <BsPencil className="me-1"/>Edit
                                                                                    </button>
                                                                                    <button 
                                                                                        className="btn btn-sm btn-light-danger fw-medium rounded-pill"
                                                                                        onClick={() => handleDelete(listing.id)}
                                                                                        disabled={deletingId === listing.id}
                                                                                    >
                                                                                        {deletingId === listing.id ? (
                                                                                            <>
                                                                                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                                                                Deleting...
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <BsTrash className="me-1"/>Delete
                                                                                            </>
                                                                                        )}
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="row align-items-start g-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <p className="text-muted m-0">© {new Date().getFullYear()} FOAMSTARS. The #1 directory for spray foam insulation contractors.</p>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <BackToTop/>
    </>
  )
}
