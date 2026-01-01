import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

import IndexOne from './pages/index/index-one';
import IndexTwo from './pages/index/index-two';
import IndexThree from './pages/index/index-three';
import IndexFour from './pages/index/index-four';
import IndexFive from './pages/index/index-five';
import IndexSix from './pages/index/index-six';
import IndexSeven from './pages/index/index-seven';
import IndexEight from './pages/index/index-eight';
import IndexNine from './pages/index/index-nine';
import IndexTen from './pages/index/index-ten';
import IndexEleven from './pages/index/index-eleven';
import IndexMap from './pages/index/index-map';

import GridLayout1 from './pages/listings/grid-layout/grid-layout-01';
import GridLayout2 from './pages/listings/grid-layout/grid-layout-02';
import GridLayout3 from './pages/listings/grid-layout/grid-layout-03';
import GridLayout4 from './pages/listings/grid-layout/grid-layout-04';
import GridLayout5 from './pages/listings/grid-layout/grid-layout-05';
import GridLayout6 from './pages/listings/grid-layout/grid-layout-06';

import ListLayout1 from './pages/listings/list-layout/list-layout-01';
import ListLayout2 from './pages/listings/list-layout/list-layout-02';
import ListLayout3 from './pages/listings/list-layout/list-layout-03';
import ListLayout4 from './pages/listings/list-layout/list-layout-04';
import ListLayout5 from './pages/listings/list-layout/list-layout-05';

import HalfMap1 from './pages/listings/half-map/half-map-01';
import HalfMap2 from './pages/listings/half-map/half-map-02';
import HalfMap3 from './pages/listings/half-map/half-map-03';
import HalfMap4 from './pages/listings/half-map/half-map-04';
import HalfMap5 from './pages/listings/half-map/half-map-05';

import SingleListing1 from './pages/listings/single/single-listing-01';
import SingleListing2 from './pages/listings/single/single-listing-02';
import SingleListing3 from './pages/listings/single/single-listing-03';
import SingleListing4 from './pages/listings/single/single-listing-04';
import SingleListing5 from './pages/listings/single/single-listing-05';
import StateContractors from './pages/listings/state-contractors';

import DashboardUser from './pages/dashboard/dashboard-user';
import DashboardMyProfile from './pages/dashboard/dashboard-my-profile';
import DashboardMyBookings from './pages/dashboard/dashboard-my-bookings';
import DashboardMyListings from './pages/dashboard/dashboard-my-listings';
import DashboardBookmarks from './pages/dashboard/dashboard-bookmarks';
import DashboardMessages from './pages/dashboard/dashboard-messages';
import DashboardReviews from './pages/dashboard/dashboard-reviews';
import DashboardWallet from './pages/dashboard/dashboard-wallet';
import DashboardAddListing from './pages/dashboard/dashboard-add-listing';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthCallback from './pages/auth/Callback';
import ForgotPassword from './pages/auth/forgot-password';
import TwoFactorAuth from './pages/auth/two-factor-auth';
import AuthorProfile from './pages/inner-pages/author-profile';
import BookingPage from './pages/inner-pages/booking-page';
import AboutUs from './pages/inner-pages/about-us';
import Blog from './pages/inner-pages/blog';
import BlogDetail from './pages/inner-pages/blog-detail';
import ContactUs from './pages/inner-pages/contact-us';
import Pricing from './pages/inner-pages/pricing';
import HelpCenter from './pages/inner-pages/help-center';
import Comingsoon from './pages/inner-pages/comingsoon';
import SingleHelps from './pages/inner-pages/single-helps';
import Faq from './pages/inner-pages/faq';
import Error from './pages/inner-pages/error';
import Elements from './pages/inner-pages/elements';
import CheckoutPage from './pages/inner-pages/checkout-page';
import SuccessPayment from './pages/inner-pages/success-payment';
import InvoicePage from './pages/inner-pages/invoice-page';
import PrivacyPolicy from './pages/inner-pages/privacy-policy';
import Viewcart from './pages/inner-pages/viewcart';

function App() {
  useEffect(() => {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Load Google Identity Services
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      // Remove crossOrigin to prevent CORS issues with Google's script
      // Google's GSI client doesn't support CORS headers
      
      // Add error handling for script loading
      script.onerror = () => {
        if (import.meta.env.DEV) {
          console.error('Failed to load Google Identity Services script');
        }
      };
      
      document.head.appendChild(script);
    };

    // Load Google script only if environment variable is set
    if (import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      loadGoogleScript();
    }
    
    // Facebook script loading removed - keeping backend functionality intact
    // To re-enable Facebook login in the future:
    // 1. Uncomment the Facebook script loading below
    // 2. Add Facebook buttons back to login/register pages
    // 3. Set VITE_FACEBOOK_APP_ID in environment variables
    
    /*
    const loadFacebookScript = () => {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: import.meta.env.VITE_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      };

      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    if (import.meta.env.VITE_FACEBOOK_APP_ID) {
      loadFacebookScript();
    }
    */
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<IndexTwo/>}/>
        <Route path='/home-1' element={<IndexOne/>}/>
        <Route path='/home-2' element={<IndexTwo/>}/>
        <Route path='/home-3' element={<IndexThree/>}/>
        <Route path='/home-4' element={<IndexFour/>}/>
        <Route path='/home-5' element={<IndexFive/>}/>
        <Route path='/home-6' element={<IndexSix/>}/>
        <Route path='/home-7' element={<IndexSeven/>}/>
        <Route path='/home-8' element={<IndexEight/>}/>
        <Route path='/home-9' element={<IndexNine/>}/>
        <Route path='/home-10' element={<IndexTen/>}/>
        <Route path='/home-splash' element={<IndexEleven/>}/>
        <Route path='/home-map' element={<IndexMap/>}/>

        {/* Contractor Listings Routes */}
        <Route path='/contractors' element={<Navigate to="/contractors/list" replace />}/>
        <Route path='/contractors/list' element={<ListLayout1/>}/>
        <Route path='/contractors/map' element={<HalfMap1/>}/>
        <Route path='/contractors/:state' element={<StateContractors/>}/>
        <Route path='/contractor/:id' element={<SingleListing1/>}/>
        
        {/* Legacy Grid Layout Routes */}
        <Route path='/grid-layout-01' element={<GridLayout1/>}/>
        <Route path='/grid-layout-02' element={<GridLayout2/>}/>
        <Route path='/grid-layout-03' element={<GridLayout3/>}/>
        <Route path='/grid-layout-04' element={<GridLayout4/>}/>
        <Route path='/grid-layout-05' element={<GridLayout5/>}/>
        <Route path='/grid-layout-06' element={<GridLayout6/>}/>

        <Route path='/list-layout-01' element={<ListLayout1/>}/>
        <Route path='/list-layout-02' element={<ListLayout2/>}/>
        <Route path='/list-layout-03' element={<ListLayout3/>}/>
        <Route path='/list-layout-04' element={<ListLayout4/>}/>
        <Route path='/list-layout-05' element={<ListLayout5/>}/>

        <Route path='/half-map-01' element={<HalfMap1/>}/>
        <Route path='/half-map-02' element={<HalfMap2/>}/>
        <Route path='/half-map-03' element={<HalfMap3/>}/>
        <Route path='/half-map-04' element={<HalfMap4/>}/>
        <Route path='/half-map-05' element={<HalfMap5/>}/>

        <Route path='/single-listing-01' element={<SingleListing1/>}/>
        <Route path='/single-listing-01/:id' element={<SingleListing1/>}/>
        <Route path='/single-listing-02' element={<SingleListing2/>}/>
        <Route path='/single-listing-02/:id' element={<SingleListing2/>}/>
        <Route path='/single-listing-03' element={<SingleListing3/>}/>
        <Route path='/single-listing-03/:id' element={<SingleListing3/>}/>
        <Route path='/single-listing-04' element={<SingleListing4/>}/>
        <Route path='/single-listing-04/:id' element={<SingleListing4/>}/>
        <Route path='/single-listing-05' element={<SingleListing5/>}/>
        <Route path='/single-listing-05/:id' element={<SingleListing5/>}/>

        {/* Protected Dashboard Routes */}
        <Route path='/dashboard' element={<ProtectedRoute><DashboardUser/></ProtectedRoute>}/>
        <Route path='/dashboard/profile' element={<ProtectedRoute><DashboardMyProfile/></ProtectedRoute>}/>
        <Route path='/dashboard/bookings' element={<ProtectedRoute><DashboardMyBookings/></ProtectedRoute>}/>
        <Route path='/dashboard/listings' element={<ProtectedRoute><DashboardMyListings/></ProtectedRoute>}/>
        <Route path='/dashboard/add-listing' element={<ProtectedRoute><DashboardAddListing/></ProtectedRoute>}/>
        <Route path='/dashboard/bookmarks' element={<ProtectedRoute><DashboardBookmarks/></ProtectedRoute>}/>
        <Route path='/dashboard/messages' element={<ProtectedRoute><DashboardMessages/></ProtectedRoute>}/>
        <Route path='/dashboard/reviews' element={<ProtectedRoute><DashboardReviews/></ProtectedRoute>}/>
        <Route path='/dashboard/wallet' element={<ProtectedRoute><DashboardWallet/></ProtectedRoute>}/>
        
        {/* Legacy Dashboard Routes */}
        <Route path='/dashboard-user' element={<ProtectedRoute><DashboardUser/></ProtectedRoute>}/>
        <Route path='/dashboard-my-profile' element={<ProtectedRoute><DashboardMyProfile/></ProtectedRoute>}/>
        <Route path='/dashboard-my-bookings' element={<ProtectedRoute><DashboardMyBookings/></ProtectedRoute>}/>
        <Route path='/dashboard-my-listings' element={<ProtectedRoute><DashboardMyListings/></ProtectedRoute>}/>
        <Route path='/dashboard-bookmarks' element={<ProtectedRoute><DashboardBookmarks/></ProtectedRoute>}/>
        <Route path='/dashboard-messages' element={<ProtectedRoute><DashboardMessages/></ProtectedRoute>}/>
        <Route path='/dashboard-reviews' element={<ProtectedRoute><DashboardReviews/></ProtectedRoute>}/>
        <Route path='/dashboard-wallet' element={<ProtectedRoute><DashboardWallet/></ProtectedRoute>}/>
        <Route path='/dashboard-add-listing' element={<ProtectedRoute><DashboardAddListing/></ProtectedRoute>}/>

        {/* Auth Routes - Redirect to dashboard if already logged in */}
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/register' element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path='/auth/callback' element={<AuthCallback/>}/>
        <Route path='/forgot-password' element={<PublicRoute><ForgotPassword/></PublicRoute>}/>
        <Route path='/two-factor-auth' element={<PublicRoute><TwoFactorAuth/></PublicRoute>}/>

        {/* Static Pages */}
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/help' element={<HelpCenter/>}/>
        <Route path='/faq' element={<Faq/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/blog/:id' element={<BlogDetail/>}/>
        <Route path='/privacy' element={<PrivacyPolicy/>}/>
        <Route path='/terms' element={<PrivacyPolicy/>}/>
        
        {/* Booking & Payment Flow */}
        <Route path='/book/:contractorId' element={<BookingPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/payment/success' element={<SuccessPayment/>}/>
        <Route path='/invoice/:id' element={<InvoicePage/>}/>
        <Route path='/cart' element={<Viewcart/>}/>
        
        {/* Utility Pages */}
        <Route path='/contractor-profile/:id' element={<AuthorProfile/>}/>
        <Route path='/404' element={<Error/>}/>
        <Route path='/coming-soon' element={<Comingsoon/>}/>
        <Route path='/elements' element={<Elements/>}/>
        
        {/* Legacy Routes */}
        <Route path='/author-profile' element={<AuthorProfile/>}/>
        <Route path='/booking-page' element={<BookingPage/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/blog-detail' element={<BlogDetail/>}/>
        <Route path='/blog-detail/:id' element={<BlogDetail/>}/>
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path='/help-center' element={<HelpCenter/>}/>
        <Route path='/single-helps' element={<SingleHelps/>}/>
        <Route path='/comingsoon' element={<Comingsoon/>}/>
        <Route path='/error' element={<Error/>}/>
        <Route path='/checkout-page' element={<CheckoutPage/>}/>
        <Route path='/success-payment' element={<SuccessPayment/>}/>
        <Route path='/invoice-page' element={<InvoicePage/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/viewcart' element={<Viewcart/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
