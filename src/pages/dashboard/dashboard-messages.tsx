import { useSearchParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

import AdminNavbar from '../../components/navbar/admin-navbar'
import AdminSidebar from '../../components/admin/admin-sidebar'
import BackToTop from '../../components/back-to-top'

import { getUserBookings, getBookingMessages, sendMessage, markMessagesAsRead, Booking } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

import { BsSend, BsClock, BsCheckAll } from 'react-icons/bs'

interface BookingMessage {
  id: string;
  message: string;
  sender_id: string;
  created_at: string | null;
  is_read: boolean | null;
  sender: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export default function DashboardMessages() {
    const { profile } = useAuth()
    const [searchParams] = useSearchParams()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [messages, setMessages] = useState<BookingMessage[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [sendingMessage, setSendingMessage] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (profile?.user_type) {
            loadBookings()
        } else {
            setLoading(false)
        }
    }, [profile])

    useEffect(() => {
        const bookingId = searchParams.get('booking')
        if (bookingId && bookings.length > 0) {
            const booking = bookings.find(b => b.id === bookingId)
            if (booking) {
                handleSelectBooking(booking)
            }
        }
    }, [searchParams, bookings])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const loadBookings = async () => {
        try {
            setLoading(true)
            const userType = profile?.user_type === 'contractor' ? 'contractor' : 'customer'
            const data = await getUserBookings(userType)
            setBookings(data)
        } catch (err: any) {
            setError(err.message || 'Failed to load bookings')
        } finally {
            setLoading(false)
        }
    }

    const handleSelectBooking = async (booking: Booking) => {
        setSelectedBooking(booking)
        setLoadingMessages(true)
        try {
            const messageData = await getBookingMessages(booking.id)
            setMessages(messageData)
            // Mark messages as read
            await markMessagesAsRead(booking.id)
        } catch (err: any) {
            console.error('Error loading messages:', err)
        } finally {
            setLoadingMessages(false)
        }
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !selectedBooking) return

        setSendingMessage(true)
        try {
            const sentMessage = await sendMessage(selectedBooking.id, newMessage.trim())
            setMessages(prev => [...prev, sentMessage])
            setNewMessage('')
        } catch (err: any) {
            alert(err.message || 'Failed to send message')
        } finally {
            setSendingMessage(false)
        }
    }

    const formatMessageTime = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        
        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })
        }
    }

    const getOtherParty = (booking: any) => {
        const isContractor = profile?.user_type === 'contractor'
        // booking includes joined customer/contractor data
        return isContractor ? booking.customer : booking.contractor
    }

    const getLastMessage = () => {
        // In a real app, you'd fetch the last message for each booking
        return "Click to start conversation..."
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
                                    <h2 className="fw-medium mb-0">Messages</h2>
                                </div>
                                
                                <div className="dashCaption p-xl-5 p-3 p-md-4">
                                    <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                        <div className="col-xl-4 col-lg-5 col-md-12">
                                            <div className="card rounded-3 shadow-sm">
                                                <div className="card-header px-4 py-3">
                                                    <h5 className="m-0">Conversations</h5>
                                                </div>
                                                <div className="card-body p-0" style={{maxHeight: '600px', overflowY: 'auto'}}>
                                                    {error && (
                                                        <div className="alert alert-danger m-3">
                                                            {error}
                                                        </div>
                                                    )}
                                                    
                                                    {loading ? (
                                                        <div className="text-center py-5">
                                                            <div className="spinner-border text-primary" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    ) : bookings.length === 0 ? (
                                                        <div className="text-center py-5">
                                                            <div className="text-muted">
                                                                <h6>No Conversations</h6>
                                                                <p className="small">You don't have any bookings with messages yet.</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <ul className="list-group list-group-flush">
                                                            {bookings.map((booking) => {
                                                                const otherParty = getOtherParty(booking)
                                                                const isActive = selectedBooking?.id === booking.id
                                                                
                                                                return (
                                                                    <li 
                                                                        key={booking.id}
                                                                        className={`list-group-item list-group-item-action cursor-pointer ${isActive ? 'active' : ''}`}
                                                                        onClick={() => handleSelectBooking(booking)}
                                                                    >
                                                                        <div className="d-flex align-items-start gap-3">
                                                                            <div className="flex-shrink-0">
                                                                                <div className="avatar bg-light rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                                                                                    <span className="text-primary fw-bold">
                                                                                        {(otherParty?.full_name || 'U').charAt(0)}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-grow-1 min-w-0">
                                                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                                                    <h6 className={`mb-0 ${isActive ? 'text-white' : ''}`}>
                                                                                        {otherParty?.full_name || 'Unknown User'}
                                                                                    </h6>
                                                                                    <small className={`${isActive ? 'text-white-50' : 'text-muted'}`}>
                                                                                        {formatMessageTime(booking.created_at || new Date().toISOString())}
                                                                                    </small>
                                                                                </div>
                                                                                <p className={`mb-1 text-truncate small ${isActive ? 'text-white-50' : 'text-muted'}`}>
                                                                                    {booking.title}
                                                                                </p>
                                                                                <p className={`mb-0 text-truncate small ${isActive ? 'text-white-50' : 'text-muted'}`}>
                                                                                    {getLastMessage()}
                                                                                </p>
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
                                        
                                        <div className="col-xl-8 col-lg-7 col-md-12">
                                            <div className="card rounded-3 shadow-sm">
                                                {selectedBooking ? (
                                                    <>
                                                        <div className="card-header px-4 py-3 border-bottom">
                                                            <div className="d-flex align-items-center gap-3">
                                                                <div className="avatar bg-light rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                                                                    <span className="text-primary fw-bold">
                                                                        {(getOtherParty(selectedBooking)?.full_name || 'U').charAt(0)}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <h6 className="mb-0">{getOtherParty(selectedBooking)?.full_name || 'Unknown User'}</h6>
                                                                    <small className="text-muted">{selectedBooking.title}</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="card-body" style={{height: '400px', overflowY: 'auto'}}>
                                                            {loadingMessages ? (
                                                                <div className="text-center py-5">
                                                                    <div className="spinner-border text-primary" role="status">
                                                                        <span className="visually-hidden">Loading messages...</span>
                                                                    </div>
                                                                </div>
                                                            ) : messages.length === 0 ? (
                                                                <div className="text-center py-5">
                                                                    <div className="text-muted">
                                                                        <h6>No messages yet</h6>
                                                                        <p>Start the conversation by sending a message below.</p>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="messages-container">
                                                                    {messages.map((message) => {
                                                                        const isOwn = message.sender_id === profile?.id
                                                                        
                                                                        return (
                                                                            <div 
                                                                                key={message.id} 
                                                                                className={`d-flex mb-3 ${isOwn ? 'justify-content-end' : 'justify-content-start'}`}
                                                                            >
                                                                                <div className={`message-bubble p-3 rounded-3 ${isOwn ? 'bg-primary text-white' : 'bg-light'}`} style={{maxWidth: '70%'}}>
                                                                                    <p className="mb-1">{message.message}</p>
                                                                                    <div className={`d-flex align-items-center gap-1 ${isOwn ? 'justify-content-end' : 'justify-content-start'}`}>
                                                                                        <small className={`${isOwn ? 'text-white-50' : 'text-muted'}`}>
                                                                                            {formatMessageTime(message.created_at || new Date().toISOString())}
                                                                                        </small>
                                                                                        {isOwn && (
                                                                                            <BsCheckAll className={`${message.is_read ? 'text-info' : 'text-white-50'}`} />
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                    <div ref={messagesEndRef} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="card-footer px-4 py-3">
                                                            <form onSubmit={handleSendMessage}>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Type your message..."
                                                                        value={newMessage}
                                                                        onChange={(e) => setNewMessage(e.target.value)}
                                                                        disabled={sendingMessage}
                                                                    />
                                                                    <button 
                                                                        type="submit" 
                                                                        className="btn btn-primary"
                                                                        disabled={sendingMessage || !newMessage.trim()}
                                                                    >
                                                                        {sendingMessage ? (
                                                                            <div className="spinner-border spinner-border-sm" role="status">
                                                                                <span className="visually-hidden">Sending...</span>
                                                                            </div>
                                                                        ) : (
                                                                            <BsSend />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="card-body d-flex align-items-center justify-content-center" style={{height: '500px'}}>
                                                        <div className="text-center">
                                                            <BsClock size={48} className="text-muted mb-3" />
                                                            <h5 className="text-muted">Select a conversation</h5>
                                                            <p className="text-muted">Choose a booking from the left to start messaging.</p>
                                                        </div>
                                                    </div>
                                                )}
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