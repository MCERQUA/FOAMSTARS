import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import AdminNavbar from '../../components/navbar/admin-navbar'
import AdminSidebar from '../../components/admin/admin-sidebar'
import BackToTop from '../../components/back-to-top'

import { getUserBookings, updateBookingStatus, Booking } from '../../lib/neon'
import { useAuth } from '../../contexts/AuthContext'

import { BsCheck2Circle, BsEnvelopeDash, BsX, BsClock, BsCalendarCheck, BsExclamationTriangle } from 'react-icons/bs'


export default function DashboardMyBookings() {
  const { user, profile } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    if (user?.id && profile?.user_type) {
      loadBookings()
    } else {
      setLoading(false)
    }
  }, [user, profile])

  const loadBookings = async () => {
    if (!user?.id) return
    try {
      setLoading(true)
      const userType = profile?.user_type === 'contractor' ? 'contractor' : 'customer'
      const data = await getUserBookings(user.id, userType)
      setBookings(data as Booking[])
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: string, notes?: string) => {
    try {
      setUpdatingId(id)
      const updatedBooking = await updateBookingStatus(id, status, notes)
      if (updatedBooking) {
        setBookings(prev => prev.map(booking =>
          booking.id === id ? updatedBooking : booking
        ))
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update booking status')
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; icon?: React.ReactNode }> = {
      'pending': { bg: 'bg-warning', text: 'Pending', icon: <BsClock className="me-1" /> },
      'confirmed': { bg: 'bg-info', text: 'Confirmed', icon: <BsCheck2Circle className="me-1" /> },
      'scheduled': { bg: 'bg-primary', text: 'Scheduled', icon: <BsCalendarCheck className="me-1" /> },
      'in_progress': { bg: 'bg-info', text: 'In Progress' },
      'completed': { bg: 'bg-success', text: 'Completed', icon: <BsCheck2Circle className="me-1" /> },
      'cancelled': { bg: 'bg-danger', text: 'Cancelled', icon: <BsX className="me-1" /> },
      'rescheduled': { bg: 'bg-secondary', text: 'Rescheduled' },
      'no_show': { bg: 'bg-danger', text: 'No Show', icon: <BsExclamationTriangle className="me-1" /> }
    }
    return statusConfig[status] || { bg: 'bg-secondary', text: status.charAt(0).toUpperCase() + status.slice(1) }
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    if (filter === 'active') return ['pending', 'confirmed', 'scheduled', 'in_progress'].includes(booking.status || '')
    if (filter === 'completed') return booking.status === 'completed'
    if (filter === 'cancelled') return ['cancelled', 'no_show'].includes(booking.status || '')
    return booking.status === filter
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string | null) => {
    if (!timeString) return ''
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
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
                            <h2 className="fw-medium mb-0">Recent Bookings</h2>
                        </div>
                        
                        <div className="dashCaption p-xl-5 p-3 p-md-4">
                            
                            <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    <div className="card rounded-3 shadow-sm">
                                        <div className="card-header px-4 py-3 d-flex justify-content-between align-items-center">
                                            <h4 className="m-0">My Bookings</h4>
                                            <div className="d-flex gap-2">
                                                <select 
                                                    className="form-select form-select-sm" 
                                                    value={filter} 
                                                    onChange={(e) => setFilter(e.target.value)}
                                                    style={{width: 'auto'}}
                                                >
                                                    <option value="all">All Bookings</option>
                                                    <option value="active">Active</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
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
                                            ) : filteredBookings.length === 0 ? (
                                                <div className="text-center py-5">
                                                    <div className="text-muted">
                                                        <h5>No Bookings Found</h5>
                                                        <p>
                                                            {filter === 'all' 
                                                                ? "You don't have any bookings yet." 
                                                                : `No ${filter} bookings found.`
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <ul className="dashboardListgroup">
                                                    {filteredBookings.map((booking) => {
                                                        const statusConfig = getStatusBadge(booking.status || 'pending')
                                                        const isContractor = profile?.user_type === 'contractor'
                                                        const clientInfo = isContractor ? (booking as any).customer : (booking as any).contractor
                                                        
                                                        return (
                                                            <li key={booking.id}>
                                                                <div className="bookingActivities">
                                                                    <div className="d-flex align-items-start justify-content-start gap-3 flex-wrap">
                                                                        <div className="bookingAvatar">
                                                                            <figure className="m-0">
                                                                                <div className="avatar-xl bg-light rounded-circle d-flex align-items-center justify-content-center">
                                                                                    <span className="text-primary fw-bold fs-4">
                                                                                        {clientInfo?.full_name?.charAt(0) || '?'}
                                                                                    </span>
                                                                                </div>
                                                                            </figure>
                                                                        </div>
                                                                        
                                                                        <div className="bookingInfo flex-grow-1">
                                                                            <div className="bookingTitle">
                                                                                <h5 className="titlesName">
                                                                                    {booking.title}
                                                                                    <span className="Bookscats">#{booking.booking_reference}</span>
                                                                                </h5>
                                                                                <div className="d-flex align-items-center justify-content-start gap-2">
                                                                                    <span className={`badge badge-xs ${statusConfig.bg} rounded-pill`}>
                                                                                        {statusConfig.icon}
                                                                                        {statusConfig.text}
                                                                                    </span>
                                                                                    {booking.urgency_level === 'high' && (
                                                                                        <span className="badge badge-xs bg-danger rounded-pill">Urgent</span>
                                                                                    )}
                                                                                    {booking.urgency_level === 'emergency' && (
                                                                                        <span className="badge badge-xs bg-danger rounded-pill">Emergency</span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="bookingDetails">
                                                                                <div className="singledetailInfo">
                                                                                    <span className="listTitle">Date & Time</span>
                                                                                    {formatDate(booking.scheduled_date)}
                                                                                    {booking.scheduled_start_time && ` at ${formatTime(booking.scheduled_start_time)}`}
                                                                                </div>
                                                                                <div className="singledetailInfo">
                                                                                    <span className="listTitle">Service Address</span>
                                                                                    {booking.service_address}, {booking.service_city}, {booking.service_state}
                                                                                </div>
                                                                                <div className="singledetailInfo">
                                                                                    <span className="listTitle">{isContractor ? 'Customer' : 'Contractor'}</span>
                                                                                    {clientInfo?.full_name || 'N/A'}
                                                                                </div>
                                                                                <div className="singledetailInfo">
                                                                                    <span className="listTitle">Contact</span>
                                                                                    {clientInfo?.phone || clientInfo?.email || 'N/A'}
                                                                                </div>
                                                                                {(booking.quoted_price || booking.estimated_cost) && (
                                                                                    <div className="singledetailInfo">
                                                                                        <span className="listTitle">Price</span>
                                                                                        ${booking.quoted_price || booking.estimated_cost}
                                                                                    </div>
                                                                                )}
                                                                                {booking.description && (
                                                                                    <div className="singledetailInfo">
                                                                                        <span className="listTitle">Description</span>
                                                                                        {booking.description.length > 100 
                                                                                            ? booking.description.substring(0, 100) + '...'
                                                                                            : booking.description
                                                                                        }
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            
                                                                            {isContractor && booking.status === 'pending' && (
                                                                                <div className="bookingAction">
                                                                                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-3">
                                                                                        <button 
                                                                                            className="btn btn-sm btn-light-danger fw-medium rounded-pill"
                                                                                            onClick={() => handleStatusUpdate(booking.id, 'cancelled', 'Declined by contractor')}
                                                                                            disabled={updatingId === booking.id}
                                                                                        >
                                                                                            <BsX className="me-1"/>
                                                                                            {updatingId === booking.id ? 'Processing...' : 'Decline'}
                                                                                        </button>
                                                                                        <button 
                                                                                            className="btn btn-sm btn-light-success fw-medium rounded-pill"
                                                                                            onClick={() => handleStatusUpdate(booking.id, 'confirmed', 'Accepted by contractor')}
                                                                                            disabled={updatingId === booking.id}
                                                                                        >
                                                                                            <BsCheck2Circle className="me-1"/>
                                                                                            {updatingId === booking.id ? 'Processing...' : 'Accept'}
                                                                                        </button>
                                                                                        <Link 
                                                                                            to={`/dashboard-messages?booking=${booking.id}`} 
                                                                                            className="btn btn-sm btn-secondary fw-medium rounded-pill"
                                                                                        >
                                                                                            <BsEnvelopeDash className="me-1"/>Send Message
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            
                                                                            {isContractor && booking.status === 'confirmed' && (
                                                                                <div className="bookingAction">
                                                                                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-3">
                                                                                        <button 
                                                                                            className="btn btn-sm btn-primary fw-medium rounded-pill"
                                                                                            onClick={() => handleStatusUpdate(booking.id, 'in_progress')}
                                                                                            disabled={updatingId === booking.id}
                                                                                        >
                                                                                            Start Work
                                                                                        </button>
                                                                                        <Link 
                                                                                            to={`/dashboard-messages?booking=${booking.id}`} 
                                                                                            className="btn btn-sm btn-secondary fw-medium rounded-pill"
                                                                                        >
                                                                                            <BsEnvelopeDash className="me-1"/>Message
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            
                                                                            {isContractor && booking.status === 'in_progress' && (
                                                                                <div className="bookingAction">
                                                                                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-3">
                                                                                        <button 
                                                                                            className="btn btn-sm btn-success fw-medium rounded-pill"
                                                                                            onClick={() => handleStatusUpdate(booking.id, 'completed', 'Work completed successfully')}
                                                                                            disabled={updatingId === booking.id}
                                                                                        >
                                                                                            Mark Complete
                                                                                        </button>
                                                                                        <Link 
                                                                                            to={`/dashboard-messages?booking=${booking.id}`} 
                                                                                            className="btn btn-sm btn-secondary fw-medium rounded-pill"
                                                                                        >
                                                                                            <BsEnvelopeDash className="me-1"/>Message
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            
                                                                            {(!isContractor || !['pending', 'confirmed', 'in_progress'].includes(booking.status || '')) && (
                                                                                <div className="bookingAction">
                                                                                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-3">
                                                                                        <Link 
                                                                                            to={`/dashboard-messages?booking=${booking.id}`} 
                                                                                            className="btn btn-sm btn-secondary fw-medium rounded-pill"
                                                                                        >
                                                                                            <BsEnvelopeDash className="me-1"/>View Messages
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
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
