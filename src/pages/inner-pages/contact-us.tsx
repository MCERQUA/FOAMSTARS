import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import NavbarLight from '../../components/navbar/navbar-light'
import FooterTop from '../../components/footer-top'
import Footer from '../../components/footer'
import BackToTop from '../../components/back-to-top'

import { FaBriefcase, FaFacebookF, FaGlobe, FaHeadset, FaInstagram, FaPaperPlane, FaTwitter } from 'react-icons/fa'

export default function ContactUs() {
  useEffect(() => {
    document.title = 'Contact FOAMSTARS - Get Help Finding Spray Foam Contractors'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Contact FOAMSTARS for help finding spray foam insulation contractors. We connect property owners with verified SPF professionals for insulation, roofing, and concrete lifting projects.')
    }
  }, [])

  return (
    <>
        <NavbarLight/>

        {/* Hero Section - Following FOAMSTARS Style Guide */}
        <div className="hero-header" style={{
            background: '#000000',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '120px',
            paddingBottom: '60px'
        }}>
            {/* Spray worker images - USE CSS CLASSES */}
            <img src="/backgorund mike spray.png" alt="" className="hero-spray-worker hero-spray-left" />
            <img src="/backgorund-mike-spray-rv.png" alt="" className="hero-spray-worker hero-spray-right" />

            {/* Black vignette overlay */}
            <div style={{
                position: 'absolute',
                left: 0, top: 0, width: '100%', height: '100%',
                background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.85) 75%, #000000 100%)',
                zIndex: 2, pointerEvents: 'none'
            }} />

            {/* Yellow glow effect */}
            <div style={{
                position: 'absolute',
                top: '45%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '700px', height: '700px',
                background: 'radial-gradient(circle, rgba(255, 200, 0, 0.35) 0%, rgba(255, 165, 0, 0.2) 25%, rgba(255, 140, 0, 0.1) 45%, transparent 65%)',
                filter: 'blur(50px)',
                zIndex: 3, pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-9 col-md-12">
                        <div className="text-center my-4">
                            {/* FOAMSTARS Logo */}
                            <img
                                src="/FOAMSTARS_logo.png"
                                alt="FOAMSTARS"
                                style={{
                                    maxWidth: '300px',
                                    width: '100%',
                                    height: 'auto',
                                    marginBottom: '20px',
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    filter: 'drop-shadow(0 0 30px rgba(255, 200, 0, 0.5))'
                                }}
                            />
                            <h1 className="xl-heading text-white">Contact Us</h1>
                            <p className="text-lg text-white-50">Get in touch with FOAMSTARS - we're here to help connect you with spray foam professionals.</p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center g-4 mt-4 pb-4">
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="card p-4 rounded-4 border-0 text-center h-100" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                            <div className="crds-icons d-inline-flex mx-auto mb-3 fs-2 text-warning"><FaBriefcase /></div>
                            <div className="crds-desc">
                                <h5 className="text-white">Drop a Mail</h5>
                                <p className="fs-6 text-white-50 mb-0">contact@foamstars.com<br/>support@foamstars.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="card p-4 rounded-4 border-0 text-center h-100" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                            <div className="crds-icons d-inline-flex mx-auto mb-3 fs-2 text-warning"><FaHeadset /></div>
                            <div className="crds-desc">
                                <h5 className="text-white">Call Us</h5>
                                <p className="fs-6 text-white-50 mb-0">Coming Soon</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="card p-4 rounded-4 border-0 text-center h-100" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                            <div className="crds-icons d-inline-flex mx-auto mb-3 fs-2 text-warning"><FaGlobe /></div>
                            <div className="crds-desc">
                                <h5 className="text-white">Connect with Social</h5>
                                <p className="text-white-50 mb-2">Follow us on social media</p>
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item"><Link className="square--40 circle text-white" style={{ background: 'rgba(255, 255, 255, 0.1)' }} to="#"><FaFacebookF/></Link></li>
                                    <li className="list-inline-item"><Link className="square--40 circle text-white" style={{ background: 'rgba(255, 255, 255, 0.1)' }} to="#"><FaInstagram/></Link></li>
                                    <li className="list-inline-item"><Link className="square--40 circle text-white" style={{ background: 'rgba(255, 255, 255, 0.1)' }} to="#"><FaTwitter/></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <section>
            <div className="container">

                <div className="row align-items-center justify-content-between g-4">

                    <div className="col-xl-7 col-lg-7 col-md-12">
                        <div className="contactForm pe-xl-5 pe-lg-4">
                            <form>
                                <div className="row align-items-center">

                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="touch-block d-flex flex-column mb-4">
                                            <h2>Drop Us a Line</h2>
                                            <p>Get in touch via the form below and we will reply as soon as we can.</p>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="form-group form-border">
                                            <label className="form-label">Your Name</label>
                                            <input type="text" className="form-control bg-light"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="form-group form-border">
                                            <label className="form-label">Email Address</label>
                                            <input type="email" className="form-control bg-light"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="form-group form-border">
                                            <label className="form-label">Phone Number</label>
                                            <input type="text" className="form-control bg-light"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="form-group form-border">
                                            <label className="form-label">Subject</label>
                                            <input type="text" className="form-control bg-light"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="form-group form-border">
                                            <label className="form-label">Your Message</label>
                                            <textarea className="form-control ht-120 bg-light"></textarea>
                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="form-group form-border">
                                            <button type="button" className="btn fw-medium btn-primary">Send Message<FaPaperPlane className="ms-2"/></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-12">
                        <iframe className="full-width ht-100 grayscale rounded" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sin!4v1586000412513!5m2!1sen!2sin" height="500" style={{border:'0'}} aria-hidden="false" tabIndex={0}></iframe>
                    </div>
                </div>
            </div>
        </section>

        <FooterTop/>
        <Footer/>
        <BackToTop/>
    </>
  )
}
