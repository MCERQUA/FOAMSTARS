import { useEffect } from 'react';
import { Link } from 'react-router-dom'

import { FaHouseChimney, FaRoad, FaFilm, FaUmbrella } from 'react-icons/fa6'
import { BsDroplet } from 'react-icons/bs'

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
            {/* Background spray foam worker - left side */}
            <div style={{
                position: 'absolute',
                left: '-5%',
                bottom: 0,
                width: '500px',
                height: '90%',
                backgroundImage: 'url(/backgorund mike spray.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left bottom',
                opacity: 0.35,
                filter: 'brightness(0.4) contrast(1.1)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            {/* Gradient overlay to fade image to center */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '60%',
                height: '100%',
                background: 'linear-gradient(to right, transparent 0%, transparent 30%, #000000 80%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

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
                                <div className="singleItem"><Link to="/contractors/list" data-bs-toggle="tooltip" data-bs-title="Spray Foam Insulation" className="badge-transparent square--70 circle"><FaHouseChimney className="fs-3"/></Link></div>
                                <div className="singleItem"><Link to="/contractors/list" data-bs-toggle="tooltip" data-bs-title="Concrete Lifting" className="badge-transparent square--70 circle"><FaRoad className="fs-3"/></Link></div>
                                <div className="singleItem"><Link to="/contractors/list" data-bs-toggle="tooltip" data-bs-title="Artistic & Themed Projects" className="badge-transparent square--70 circle"><FaFilm className="fs-3"/></Link></div>
                                <div className="singleItem"><Link to="/contractors/list" data-bs-toggle="tooltip" data-bs-title="Polyurethane Coatings" className="badge-transparent square--70 circle"><BsDroplet className="fs-3"/></Link></div>
                                <div className="singleItem"><Link to="/contractors/list" data-bs-toggle="tooltip" data-bs-title="SPF Roofing" className="badge-transparent square--70 circle"><FaUmbrella className="fs-3"/></Link></div>
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
                            <h3 className="sectionHeading">Spray Foam <span className="text-primary">Services</span></h3>
                            <p>Find specialized spray foam companies for insulation, coatings, roofing, and more</p>
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
                            <h3 className="sectionHeading">Featured Spray Foam <span className="text-primary">Companies</span></h3>
                            <p>Browse verified spray foam insulation professionals with proven track records</p>
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
                            <h3 className="sectionHeading">Browse By <span className="text-primary">State</span></h3>
                            <p>Find spray foam contractors in your state</p>
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
                            <h3 className="sectionHeading">Customer <span className="text-primary">Testimonials</span></h3>
                            <p>Read what property owners say about their spray foam projects</p>
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
                            <h3 className="sectionHeading">Spray Foam <span className="text-primary">Industry News</span></h3>
                            <p>Stay updated with the latest trends, techniques, and industry insights</p>
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
                            <h3 className="sectionHeading">Industry <span className="text-primary">Events</span></h3>
                            <p>Join spray foam trade shows and industry networking events</p>
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
