import { useEffect } from 'react';
import { Link } from 'react-router-dom'

import { FaHammer, FaWrench, FaPaintRoller, FaPlug, FaTools } from 'react-icons/fa'

import NavbarLight from '../../components/navbar/navbar-light'
import FormOne from '../../components/form-one'
import CategoryTwo from '../../components/category-two'
import PopularListingTwo from '../../components/popular-listing-two'
import ExploreCity from '../../components/explore-city'
import ClientOne from '../../components/client-one'
import BlogOne from '../../components/blog-one'
import EventOne from '../../components/event-one'
import FooterTop from '../../components/footer-top'
import BackToTop from '../../components/back-to-top'
import Footer from '../../components/footer'
 
export default function IndexTwo() {

    useEffect(() => {
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
          new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
      }, []);
  return (
    <>
        <NavbarLight/>

        <div className="hero-header full-height" style={{
            background: '#000000',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Yellow glow effect behind logo */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(255, 200, 0, 0.4) 0%, rgba(255, 165, 0, 0.2) 30%, rgba(255, 140, 0, 0.1) 50%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row justify-content-center align-items-center mb-5 pt-lg-0 pt-5">
                    <div className="col-xl-10 col-lg-11 col-md-12 col-sm-12">
                        <div className="position-relative text-center">
                            {/* FOAMSTARS Logo */}
                            <img
                                src="/FOAMSTARS_logo.png"
                                alt="FOAMSTARS"
                                style={{
                                    maxWidth: '400px',
                                    width: '100%',
                                    height: 'auto',
                                    marginBottom: '20px',
                                    filter: 'drop-shadow(0 0 30px rgba(255, 200, 0, 0.5))'
                                }}
                            />
                            <h1 className="text-white">Find Trusted Spray Foam Contractors</h1>
                            <p className="fs-5 fw-light text-white-50">Connect with verified spray foam insulation professionals near you!</p>
                        </div>
                    </div>
                </div>
                
                <FormOne/>
                
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="d-block position-relative">
                            <div className="popularSearches d-flex align-items-center justify-content-center gap-4 flex-wrap">
                                <div className="singleItem"><Link to="#" data-bs-toggle="tooltip" data-bs-title="General Contractors" className="badge-transparent square--70 circle"><FaHammer className="fs-3"/></Link></div>	
                                <div className="singleItem"><Link to="#" data-bs-toggle="tooltip" data-bs-title="Plumbing" className="badge-transparent square--70 circle"><FaWrench className="fs-3"/></Link></div>	
                                <div className="singleItem"><Link to="#" data-bs-toggle="tooltip" data-bs-title="Painting" className="badge-transparent square--70 circle"><FaPaintRoller className="fs-3"/></Link></div>	
                                <div className="singleItem"><Link to="#" data-bs-toggle="tooltip" data-bs-title="Electrical" className="badge-transparent square--70 circle"><FaPlug className="fs-3"/></Link></div>	
                                <div className="singleItem"><Link to="#" data-bs-toggle="tooltip" data-bs-title="Home Repair" className="badge-transparent square--70 circle"><FaTools className="fs-3"/></Link></div>		
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section className="pb-0">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Popular Contractor <span className="text-primary">Services</span></h3>
                            <p>Find contractors for all types of home improvement and repair services</p>
                        </div>
                    </div>
                </div>
                <CategoryTwo/>
            </div>
        </section>

        <section>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Top-Rated Contractors In <span className="text-primary">Your Area</span></h3>
                            <p>Browse trusted contractors with verified reviews and ratings</p>
                        </div>
                    </div>
                </div>
                <PopularListingTwo/>
            </div>
        </section>

        <section className="bg-light">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Find Contractors By <span className="text-primary">Location</span></h3>
                            <p>Connect with local contractors in your city and surrounding areas</p>
                        </div>
                    </div>
                </div>
                <ExploreCity/>
            </div>
        </section>

        <section>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Customer <span className="text-primary">Success Stories</span></h3>
                            <p>Read what homeowners say about their contractor experiences</p>
                        </div>
                    </div>
                </div>
                <ClientOne/>
            </div>
        </section>

        <section className="light-top-gredient">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Home Improvement <span className="text-primary">Tips & News</span></h3>
                            <p>Stay updated with the latest trends, tips, and contractor insights</p>
                        </div>
                    </div>
                </div>
                <BlogOne/>
            </div>
        </section>

        <section className="pt-0">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Home & Garden <span className="text-primary">Events</span></h3>
                            <p>Join local home improvement shows and contractor networking events</p>
                        </div>
                    </div>
                </div>
                <EventOne/>
            </div>
        </section>

        <FooterTop/>

        <BackToTop/>
        <Footer/>
    </>
  )
}
