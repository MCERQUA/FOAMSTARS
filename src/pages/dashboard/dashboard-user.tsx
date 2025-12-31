
import AdminNavbar from '../../components/navbar/admin-navbar'
import AdminSidebar from '../../components/admin/admin-sidebar'
import RecentActivity from '../../components/admin/recent-activity';
import BackToTop from '../../components/back-to-top';
import { useAuth } from '../../contexts/AuthContext';
import { getUserDashboardStats, getUserRecentMessages } from '../../lib/neon';

import CountUp from 'react-countup';
import { IconType } from 'react-icons';
import { BsPinMapFill, BsGraphUpArrow, BsJournalCheck, BsClock } from 'react-icons/bs';
import { useState, useEffect } from 'react';

interface CounterData{
    icon: IconType;
    iconStyle: string;
    number: number;
    symbol: string;
    title: string;
    bg: string;
}

export default function DashboardUser() {
    const { user, profile } = useAuth();
    const [dashboardStats, setDashboardStats] = useState({
        activeListings: 0,
        totalListings: 0,
        totalBookings: 0,
        pendingBookings: 0,
    });
    const [recentMessages, setRecentMessages] = useState<any[]>([]);
    
    const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';

    useEffect(() => {
        if (user?.id) {
            loadDashboardData();
        }
    }, [user]);

    const loadDashboardData = async () => {
        if (!user?.id) return;
        try {
            const [stats, messages] = await Promise.all([
                getUserDashboardStats(user.id),
                getUserRecentMessages(user.id)
            ]);
            setDashboardStats(stats);
            setRecentMessages(messages);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    };

    // Create dynamic counter data based on real stats
    const dynamicCounters: CounterData[] = [
        {
            icon: BsPinMapFill,
            iconStyle: 'text-success',
            number: dashboardStats.activeListings,
            symbol: '',
            title: 'Active Listings',
            bg: 'bg-light-success'
        },
        {
            icon: BsGraphUpArrow,
            iconStyle: 'text-primary',
            number: dashboardStats.totalListings,
            symbol: '',
            title: 'Total Listings',
            bg: 'bg-light-primary'
        },
        {
            icon: BsJournalCheck,
            iconStyle: 'text-info',
            number: dashboardStats.totalBookings,
            symbol: '',
            title: 'Total Bookings',
            bg: 'bg-light-info'
        },
        {
            icon: BsClock,
            iconStyle: 'text-warning',
            number: dashboardStats.pendingBookings,
            symbol: '',
            title: 'Pending Bookings',
            bg: 'bg-light-warning'
        }
    ];

    return (
        <>
            <AdminNavbar/>

            <section className="p-0">
                <div className="container-fluid p-0">
                    <div className="row user-dashboard g-0">
                        <AdminSidebar/>
                        <div className="col-xl-10 col-lg-9 col-md-12 pt-lg-0 pt-5">
                            <div className="user-dashboard-box bg-light pt-lg-0 pt-5">
                                <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0">
                                    <h2 className="fw-medium mb-0">Hello, {displayName}</h2>
                                </div>
                            <div className="dashCaption p-xl-5 p-3 p-md-4">
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    {dynamicCounters.map((item:CounterData,index:number)=>{
                                        const Icon = item.icon
                                        return(
                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6" key={index}>
                                                <div className="card rounded-3 position-relative p-4">
                                                    <div className={`position-absolute w-30 h-100 start-0 top-0 rounded-end-pill ${item.bg}`}><div className="position-absolute top-50 start-50 translate-middle"><Icon className={`fs-2 ${item.iconStyle}`}></Icon></div></div>
                                                    <div className="d-flex flex-column align-items-end justify-content-end ht-80">
                                                        <h2 className="mb-0"><CountUp className="ctr" end={item.number}/>{item.symbol}</h2>
                                                        <p className="text-muted-2 fw-medium mb-0">{item.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header py-3 px-4">
                                                <h4 className="m-0">Recent Activities</h4>
                                            </div>
                                           <RecentActivity/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header py-3 px-4">
                                                <h4 className="m-0">Messages</h4>
                                                <a href="#" className="text-muted-2 text-md fw-medium">View All</a>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="messagesWrapers d-flex flex-column gap-4">
                                                    {recentMessages.length > 0 ? (
                                                        recentMessages.map((message, index) => (
                                                            <div key={index} className="d-flex align-items-start gap-3">
                                                                <div className="flex-shrink-0">
                                                                    <div className="w-8 h-8 circle bg-light-primary d-flex align-items-center justify-content-center">
                                                                        <span className="text-primary fw-medium">
                                                                            {message.sender?.full_name?.charAt(0) || 'U'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <h6 className="mb-1">{message.sender?.full_name || 'User'}</h6>
                                                                    <p className="text-muted mb-1 text-sm">
                                                                        {message.message.length > 60 
                                                                            ? message.message.substring(0, 60) + '...' 
                                                                            : message.message}
                                                                    </p>
                                                                    <small className="text-muted">
                                                                        {new Date(message.created_at).toLocaleDateString()}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-center py-4">
                                                            <p className="text-muted">No messages yet. Start connecting with clients!</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header flex-wrap gap-3 px-4">
                                                <div className="cardTitle"><h4>View Invoices</h4></div>
                                                <div className="headerInformations">
                                                    <div className="d-flex align-items-center justify-content-start justify-content-md-between flex-wrap gap-3">
                                                        <div className="singleCaps">
                                                            <div className="form-group position-relative m-0">
                                                                <input type="text" className="form-control form-control-md bg-light border-0 ps-5" placeholder="Search any parameters..."/>
                                                                <span className="position-absolute top-50 start-0 translate-middle-y ms-3"><i className="fa-solid fa-magnifying-glass"></i></span>																	
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="card-body p-3">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Package Name</th>
                                                            <th scope="col">Order ID</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Due Date</th>
                                                            <th scope="col">View</th>
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={5} className="text-center py-4">
                                                                <p className="text-muted">No invoices yet. Create your first listing to start earning!</p>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
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
