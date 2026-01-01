// Data layer - Real data comes from Neon PostgreSQL
// FOAMSTARS - Spray Foam Insulation Contractor Directory

import { BsBarChart, BsCameraReels, BsCoin, BsCreditCard2Back, BsEnvelopeAt, BsFacebook, BsFileEarmarkTextFill, BsGraphUpArrow, BsInstagram, BsLinkedin, BsPatchCheck, BsPatchQuestion, BsPeopleFill, BsPersonCheck, BsPinMap, BsPinMapFill, BsPinterest, BsSuitHeart, BsTwitter, BsYelp, BsDroplet } from "react-icons/bs";
import { FaStar, FaStarHalfStroke, FaHouseChimney, FaFilm, FaRoad, FaUmbrella } from "react-icons/fa6";

// Placeholder images - these can be removed once real data is integrated
const placeholderImage = '/placeholder.svg';

// Review platform images for testimonials
import review1 from '../assets/img/google.png'
import review2 from '../assets/img/trustpilot.png'
import review3 from '../assets/img/capterra.png'

// Import Neon database functions
import {
  getPublicListings,
  getFeaturedListings,
  getCategories,
  getCategoryStats,
  getListingsByState,
  getListingsByCategory,
  searchListings
} from '../lib/neon';

// Re-export Neon functions for use throughout the app
export {
  getPublicListings,
  getFeaturedListings,
  getCategories,
  getCategoryStats,
  getListingsByState,
  getListingsByCategory,
  searchListings
};

// Spray Foam Service Categories (static version for initial render)
export const categoryData = [
    {
        image: placeholderImage,
        icon: FaHouseChimney,
        title: 'Spray Foam Insulation',
        slug: 'spray-foam-insulation',
        list: '0 Companies',
        description: 'Residential & commercial insulation services'
    },
    {
        image: placeholderImage,
        icon: FaRoad,
        title: 'Concrete Lifting',
        slug: 'concrete-lifting',
        list: '0 Companies',
        description: 'Polyurethane foam concrete leveling & lifting'
    },
    {
        image: placeholderImage,
        icon: FaFilm,
        title: 'Artistic & Themed Projects',
        slug: 'artistic-themed-projects',
        list: '0 Companies',
        description: 'Movie sets, theme parks & sculptural foam'
    },
    {
        image: placeholderImage,
        icon: BsDroplet,
        title: 'Polyurethane Coatings',
        slug: 'polyurethane-coatings',
        list: '0 Companies',
        description: 'Protective coatings & waterproofing'
    },
    {
        image: placeholderImage,
        icon: FaUmbrella,
        title: 'SPF Roofing',
        slug: 'spf-roofing',
        list: '0 Companies',
        description: 'Spray polyurethane foam roofing systems'
    },
]

// Real data comes from Neon - export functions instead of static arrays
export const getListData = getPublicListings;
export const getFeaturedListData = getFeaturedListings;

// For backwards compatibility, provide empty array (components should migrate to async functions)
export const listData: any[] = [];

// Review testimonials - empty array, real data comes from Supabase
export const reviewData: any[] = [];

// Blog data
// Use spray foam banner images for blog posts
import blog1 from '../assets/img/banner-1.jpg'
import blog2 from '../assets/img/banner-2.jpg'
import blog3 from '../assets/img/banner-4.jpg'

import blog4 from '../assets/img/banner-5.jpg'

export const blogData = [
    {
        id: 1,
        image: blog1,
        title: 'Open Cell vs Closed Cell Spray Foam: Which is Right for You?',
        desc: 'Understanding the differences between open cell and closed cell spray foam insulation. Learn about R-values, moisture barriers, and which type works best for different applications.',
        date: 'December 15, 2024',
        views: '2.5k views'
    },
    {
        id: 2,
        image: blog2,
        title: 'The Complete Guide to SPF Roofing Systems',
        desc: 'Discover why spray polyurethane foam roofing is becoming the preferred choice for commercial buildings. Energy savings, durability, and seamless waterproofing explained.',
        date: 'December 10, 2024',
        views: '1.8k views'
    },
    {
        id: 3,
        image: blog3,
        title: 'How Concrete Lifting with Polyurethane Foam Works',
        desc: 'Learn how polyurethane foam injection can raise and level sunken concrete slabs. A cost-effective alternative to replacement for driveways, patios, and foundations.',
        date: 'December 5, 2024',
        views: '3.2k views'
    },
    {
        id: 4,
        image: blog4,
        title: 'SEO Tips for Spray Foam Contractors: Grow Your Online Presence',
        desc: 'Essential search engine optimization strategies for spray foam companies. Learn how to rank higher in local searches, optimize your Google Business Profile, and attract more leads online.',
        date: 'December 20, 2024',
        views: '1.2k views'
    }
];

// Footer links - FOAMSTARS specific
export const footerLink1 = [
    { label: 'About FOAMSTARS', url: '/about' },
    { label: 'Find Companies', url: '/contractors/list' },
    { label: 'List Your Company', url: '/dashboard/add-listing' },
    { label: 'Browse by State', url: '/contractors/list' }
];
export const footerLink2 = [
    { label: 'Trust & Safety', url: '/help' },
    { label: 'Company Verification', url: '/help' },
    { label: 'Terms of Services', url: '/terms' },
    { label: 'Advertising', url: '/pricing' },
    { label: 'Spray Foam Blog', url: '/blog' }
];
export const footerLink3 = [
    { label: 'Help Center', url: '/help' },
    { label: 'Contact Support', url: '/contact' },
    { label: 'Pricing', url: '/pricing' },
    { label: 'Insurance Info', url: '/help' },
    { label: 'Safety Guidelines', url: '/help' }
];

// City/location data - empty array, real data comes from Supabase
export const cityData: any[] = [];

// Event data - empty array, real data comes from CMS/Supabase
export const eventData: any[] = [];

// How it works section - FOAMSTARS specific
export const workData = [
    {
        icon: BsPinMap,
        title: 'Search by State',
        desc: 'Browse spray foam insulation companies by state. Find local professionals for insulation, concrete lifting, coatings, and roofing.'
    },
    {
        icon: BsEnvelopeAt,
        title: 'Compare Services',
        desc: 'Review company profiles, services offered, certifications, and customer reviews. Compare specialists for your specific project needs.'
    },
    {
        icon: BsPatchCheck,
        title: 'Connect Directly',
        desc: 'Contact verified spray foam professionals directly. Get quotes for insulation, SPF roofing, concrete lifting, or specialty projects.'
    },
];

// Review platform ratings - kept for display purposes
export const reviewData2 = [
    {
        image: review1,
        rate: '4.8',
        star: [FaStar, FaStar, FaStar, FaStar, FaStarHalfStroke],
        reviews: '0 Reviews'
    },
    {
        image: review2,
        rate: '4.8',
        star: [FaStar, FaStar, FaStar, FaStar, FaStarHalfStroke],
        reviews: '0 Reviews'
    },
    {
        image: review3,
        rate: '4.8',
        star: [FaStar, FaStar, FaStar, FaStar, FaStarHalfStroke],
        reviews: '0 Reviews'
    },
];

// Dashboard admin counter - empty/zero values
export const adminCounter = [
    {
        icon: BsPinMapFill,
        iconStyle: 'text-success',
        number: 0,
        symbol: '',
        title: 'Active Listings',
        bg: 'bg-light-success'
    },
    {
        icon: BsGraphUpArrow,
        iconStyle: 'text-danger',
        number: 0,
        symbol: '',
        title: 'Total Views',
        bg: 'bg-light-danger'
    },
    {
        icon: BsSuitHeart,
        iconStyle: 'text-warning',
        number: 0,
        symbol: '',
        title: 'Total Saved',
        bg: 'bg-light-warning'
    },
    {
        icon: BsYelp,
        iconStyle: 'text-info',
        number: 0,
        symbol: '',
        title: 'Total Reviews',
        bg: 'bg-light-info'
    },
];

// Dashboard data arrays - all empty, real data comes from Supabase
export const chatData: any[] = [];
export const invoiceData: any[] = [];
export const bookingData: any[] = [];
export const adminListing: any[] = [];
export const message: any[] = [];
export const adminReview: any[] = [];
export const earning: any[] = [];

// Counter data for about/stats section - minimal values
export const counterData = [
    {
        number: 0,
        symbol: '',
        title: 'Daily New Visitors'
    },
    {
        number: 0,
        symbol: '',
        title: 'Active Listings'
    },
    {
        number: 0,
        symbol: '',
        title: 'Won Awards'
    },
    {
        number: 0,
        symbol: '',
        title: 'Happy Customers'
    },
];

// Team data - empty array, real data comes from CMS/Supabase
export const teamData: any[] = [];

// Blog related data - most viewed blog posts
export const mostViewBlog: any[] = [];

// Blog tags - kept as static content for filtering
export const blogTag = ['Contractors', 'Home Improvement', 'DIY', 'Renovation', 'Maintenance', 'Tips'];

// Social media icons - kept for social sharing
export const blogSocial = [
    BsFacebook, BsTwitter, BsInstagram, BsPinterest, BsLinkedin
];

// Help page data - kept as static content
export const helpData = [
    {
        icon: BsPeopleFill,
        title: 'Community',
        desc: 'Connect with other homeowners and contractors in our community forum to share experiences and advice.',
        tag: ['Share', 'Network', 'Discussion']
    },
    {
        icon: BsFileEarmarkTextFill,
        title: 'Project Management',
        desc: 'Track your home improvement projects from initial consultation to completion with our management tools.',
        tag: ['Tracking', 'Progress', 'Management']
    },
    {
        icon: BsCoin,
        title: 'Payment & Pricing',
        desc: 'Understand our transparent pricing structure and secure payment options for contractor services.',
        tag: ['Methods', 'Security']
    },
    {
        icon: BsPersonCheck,
        title: 'Account Support',
        desc: 'Get help with your account settings, profile management, and platform navigation.',
        tag: ['Profile', 'Settings', 'Support']
    },
    {
        icon: BsBarChart,
        title: 'Business Tools',
        desc: 'Access professional tools and analytics to grow your contracting business on our platform.',
        tag: ['Dashboard', 'Analytics', 'Growth']
    },
    {
        icon: BsCreditCard2Back,
        title: 'Payment Processing',
        desc: 'Learn about our secure payment processing, invoicing, and financial management features.',
        tag: ['Billing', 'Security', 'Finance']
    },
    {
        icon: BsCameraReels,
        title: 'Guides & Tutorials',
        desc: 'Access comprehensive guides and video tutorials to help you make the most of our platform.',
        tag: ['Tutorials', 'Help', 'Learning']
    },
    {
        icon: BsPatchQuestion,
        title: 'Frequently Asked Questions',
        desc: 'Find quick answers to common questions about our platform, services, and policies.',
        tag: ['Help', 'Support']
    },
];

// Help articles - empty array, real data comes from CMS
export const articles: any[] = [];

// FAQ data - kept as static content but can be moved to CMS
export const faqData1 = [
    {
        id: 'collapseOne',
        title: 'How do I find qualified contractors?',
        desc: 'Our platform features verified contractors with proper licensing, insurance, and customer reviews. Use our search filters to find contractors by location, specialty, and rating to ensure you connect with qualified professionals.'
    },
    {
        id: 'collapseTwo',
        title: 'Are all contractors verified?',
        desc: 'Yes, we verify all contractors on our platform by checking their licenses, insurance coverage, and business credentials. We also monitor customer reviews and ratings to maintain quality standards.'
    },
    {
        id: 'collapseThree',
        title: 'How does the booking process work?',
        desc: 'Simply browse contractors, read reviews, and contact them directly through our platform. You can request quotes, schedule consultations, and manage your project communications all in one place.'
    },
    {
        id: 'collapseFour',
        title: 'What if I need to change or cancel my booking?',
        desc: 'Booking changes and cancellations depend on the contractor\'s policy. Contact the contractor directly through our messaging system to discuss any changes to your scheduled services.'
    },
    {
        id: 'collapseFive',
        title: 'How do I leave a review?',
        desc: 'After your project is completed, you can leave a review through your account dashboard. Your honest feedback helps other homeowners make informed decisions and helps contractors improve their services.'
    },
];

export const faqData2 = [
    {
        id: 'collapseOne2',
        title: 'What payment methods do you accept?',
        desc: 'We support various payment methods including credit cards, debit cards, and digital payment platforms. Payment terms are set by individual contractors, so check with your chosen professional for their preferred methods.'
    },
    {
        id: 'collapseTwo2',
        title: 'Is there a service fee?',
        desc: 'Our platform is free for homeowners to use. Contractors may include platform fees in their pricing, but there are no hidden charges for customers browsing and booking services.'
    },
    {
        id: 'collapseThree2',
        title: 'How do refunds work?',
        desc: 'Refund policies vary by contractor and service type. We recommend discussing payment terms and refund policies with your contractor before starting any work. Our support team can help mediate disputes if needed.'
    },
    {
        id: 'collapseFour2',
        title: 'Are quotes binding?',
        desc: 'Quotes provided by contractors are estimates based on the information provided. Final pricing may vary depending on project scope, materials, and unforeseen circumstances. Always confirm pricing details before work begins.'
    },
    {
        id: 'collapseFive2',
        title: 'Do you offer project insurance?',
        desc: 'All verified contractors on our platform carry proper insurance coverage. However, we recommend discussing specific insurance details and coverage with your chosen contractor for your peace of mind.'
    },
];

export const faqData3 = [
    {
        id: 'collapseOne3',
        title: 'Can I message contractors directly?',
        desc: 'Yes, our platform includes a secure messaging system that allows you to communicate directly with contractors, share project details, and ask questions before booking their services.'
    },
    {
        id: 'collapseTwo3',
        title: 'How quickly do contractors respond?',
        desc: 'Response times vary by contractor, but most verified professionals on our platform respond within 24 hours. You can see each contractor\'s typical response time on their profile.'
    },
    {
        id: 'collapseThree3',
        title: 'What if I have an emergency repair?',
        desc: 'Many contractors on our platform offer emergency services. Use our filter options to find contractors who provide emergency or same-day service in your area for urgent repairs.'
    },
];