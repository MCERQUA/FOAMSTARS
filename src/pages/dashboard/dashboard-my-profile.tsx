// Link removed - not used

import AdminNavbar from '../../components/navbar/admin-navbar'
import AdminSidebar from '../../components/admin/admin-sidebar'
import BackToTop from '../../components/back-to-top'
import ProfileForm from '../../components/profile/ProfileForm'
import PasswordUpdateForm from '../../components/profile/PasswordUpdateForm'
import AvatarUpload from '../../components/profile/AvatarUpload'

// Generate a default avatar URL using the user's initials
const getDefaultAvatar = (name?: string | null) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=c71f37&color=fff&size=200`
}

import { useAuth } from '../../contexts/AuthContext'

export default function DashboardMyProfile() {
  const { profile, user } = useAuth()

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
                            <h2 className="fw-medium mb-0">My Profile</h2>
                        </div>
                        
                        <div className="dashCaption p-xl-5 p-3 p-md-4">
                            <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                <div className="col-xl-8 col-lg-8 col-md-7">
                                    <div className="card rounded-3 shadow-sm mb-lg-5 mb-4">
                                        <div className="card-body p-4">
                                            <div className="row align-items-start">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                                    <div className="cardTitle d-flex align-items-center justify-content-start mb-3">
                                                        <h6 className="fw-semibold">Profile Information</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <ProfileForm />
                                            
                                        </div>
                                    </div>
                                    
                                    <PasswordUpdateForm />
                                    
                                </div>
                                
                                <div className="col-xl-4 col-lg-4 col-md-5">
                                    <div className="card rounded-3 shadow-sm">
                                        <div className="card-body py-5 p-4">
                                            <div className="dash-prf-start d-flex flex-column align-items-center justify-content-start">
                                                <div className="dash-prf-start-upper mx-auto text-center">
                                                    <div className="dash-prf-start-thumb w-40 h-40 mb-2 mx-auto">
                                                        <figure className="m-0">
                                                            <img 
                                                                src={profile?.avatar_url || getDefaultAvatar(profile?.full_name)} 
                                                                className="img-fluid circle" 
                                                                alt={profile?.full_name || "Profile"} 
                                                            />
                                                        </figure>
                                                    </div>
                                                    <AvatarUpload 
                                                        currentAvatarUrl={profile?.avatar_url} 
                                                    />
                                                </div>
                                                <div className="dash-prf-start-bottom mx-auto mt-3">
                                                    <div className="text-center mb-3">
                                                        <h5 className="mb-1">{profile?.full_name || 'User'}</h5>
                                                        <p className="text-muted mb-0">{user?.email || ''}</p>
                                                        {profile?.user_type === 'contractor' && (
                                                            <span className="badge bg-primary mt-1">Contractor</span>
                                                        )}
                                                        {profile?.is_verified && (
                                                            <span className="badge bg-success mt-1 ms-1">Verified</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row align-items-start g-4">
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    © {new Date().getFullYear()} FOAMSTARS. The #1 directory for spray foam insulation contractors.
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
