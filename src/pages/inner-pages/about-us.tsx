import { Link } from 'react-router-dom'

import aboutImg from '../../assets/img/side-img.png'

import { MdArrowForwardIos } from 'react-icons/md'
import { BsCaretRight } from 'react-icons/bs'

import { counterData, workData } from '../../data/data'

import CountUp from 'react-countup'

import NavbarLight from '../../components/navbar/navbar-light'
import ClientOne from '../../components/client-one'
import TeamOne from '../../components/team-one'
import FooterTop from '../../components/footer-top'
import Footer from '../../components/footer'
import BackToTop from '../../components/back-to-top'
import { IconType } from 'react-icons'

interface CounterData{
    number: number;
    symbol: string;
    title: string;
}

interface WorkData{
    icon: IconType;
    title: string;
    desc: string;
}

export default function AboutUs() {
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
            <div className="row justify-content-center align-items-center">
                <div className="col-xl-7 col-lg-9 col-md-12 col-sm-12 pt-lg-0 pt-5">
                    <div className="position-relative text-center mb-5">
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
                        <h1 className="text-white xl-heading">About FOAMSTARS</h1>
                        <nav id="breadcrumbs" className="breadcrumbs">
                            <ul className="d-flex align-items-center justify-content-center gap-2">
                                <li><Link to="/" className="text-white-50">Home</Link></li>
                                <MdArrowForwardIos className='text-white-50'/>
                                <li className="text-white">About Us</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section className="pb-5">
        <div className="container">
            <div className="row">
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-10 col-lg-11 col-md-12 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Your Connection to <span className="text-primary">Spray Foam Excellence</span></h3>
                            <p>FOAMSTARS connects property owners with verified spray foam professionals</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-between align-items-center g-4 mb-5">
                    <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                        <div className="missionImg">
                            <img src={aboutImg} className="img-fluid" alt=""/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="missioncaps">
                            <div className="d-block mb-4">
                                <div className="d-flex align-items-start mb-2"><span className="badge badge-xs badge-success rounded-pill">Our Mission</span></div>
                                <h2>Connecting You with Spray Foam Experts</h2>
                            </div>
                            <p>FOAMSTARS is the premier directory for spray foam insulation professionals across the United States. We make it easy for property owners to find verified, experienced contractors for all their spray foam needs.</p>
                            <p>Whether you need residential insulation, commercial roofing, concrete lifting, or specialty foam applications, our directory connects you with qualified professionals who deliver quality results.</p>
                            <div className="d-flex align-items-start mt-4">
                                <Link to="/contractors/list" className="btn btn-light-primary rounded-pill px-5">Browse Contractors</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-between align-items-center g-4 border-top">
                    {counterData.map((item:CounterData,index:number)=>{
                        return(
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6" key={index}>
                                <div className="counter-wrap text-center">
                                    <h2 className="mb-0"><CountUp className="ctr text-primary me-1" end={item.number}/>{item.symbol}</h2>
                                    <p className="m-0">{item.title}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    </section>

    {/* CTA Section - Following FOAMSTARS Style Guide */}
    <div style={{
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 0'
    }}>
        {/* Yellow glow effect */}
        <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(255, 200, 0, 0.25) 0%, rgba(255, 165, 0, 0.15) 30%, transparent 60%)',
            filter: 'blur(40px)',
            zIndex: 1, pointerEvents: 'none'
        }} />
        <div className="container position-relative" style={{ zIndex: 10 }}>
            <div className="row justify-content-center align-items-center">
                <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12">
                    <div className="position-relative text-center py-4">
                        <div className="mb-3">
                            <span className="badge badge-xs rounded-pill text-warning" style={{ background: 'rgba(255, 184, 0, 0.2)' }}>FOAMSTARS Directory</span>
                        </div>
                        <h2 className="text-white mb-3">Ready to Find Your Spray Foam Contractor?</h2>
                        <p className="text-white-50 mb-4">Browse our directory of verified professionals for insulation, roofing, concrete lifting, and more.</p>
                        <Link to="/contractors/list" className="btn fw-medium rounded-pill px-4" style={{ background: '#FFB800', color: '#000' }}>Browse Contractors</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section>
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-xl-10 col-lg-11 col-md-12 col-sm-12">
                    <div className="secHeading-wrap text-center">
                        <h3 className="sectionHeading">How It <span className="text-primary">Works</span></h3>
                        <p>Simple steps to connect with spray foam professionals</p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center g-md-5 g-4">
                {workData.map((item:WorkData,index:number)=>{
                    const Icon = item.icon
                    return(
                        <div className="col-xl-4 col-lg-4 col-md-6" key={index}>
                            <div className="processWrap px-xl-4">
                                <div className="text-center">
                                    <div className="processIcons d-block">
                                        <div className="Icons">
                                            <Icon className=""/>
                                        </div>
                                    </div>
                                    <div className="processCaps">
                                        <h4 className="fw-medium">{item.title}</h4>
                                        <p className="m-0">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="d-flex align-items-center justify-content-center mt-4">
                        <Link to="/contractors/list" className="btn btn-light-primary rounded-pill px-5">Start Browsing<BsCaretRight className="ms-2"/></Link>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="bg-light">
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                    <div className="secHeading-wrap text-center">
                        <h3 className="sectionHeading">Customer <span className="text-primary">Testimonials</span></h3>
                        <p>Read what property owners say about finding contractors through FOAMSTARS</p>
                    </div>
                </div>
            </div>
            <ClientOne/>
        </div>
    </section>

    <section>
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                    <div className="secHeading-wrap text-center">
                        <h3 className="sectionHeading">Meet Our <span className="text-primary">Team</span></h3>
                        <p>The people behind FOAMSTARS who make it all happen</p>
                    </div>
                </div>
            </div>

           <TeamOne/>

        </div>
    </section>
    <FooterTop/>
    <Footer/>
    <BackToTop/>
    </>
  )
}
