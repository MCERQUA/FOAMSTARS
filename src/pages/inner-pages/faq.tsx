import { Link } from 'react-router-dom'

import { MdArrowForwardIos } from 'react-icons/md'
import { faqData1, faqData2, faqData3 } from '../../data/data'

import NavbarLight from '../../components/navbar/navbar-light'
import FooterTop from '../../components/footer-top'
import Footer from '../../components/footer'
import BackToTop from '../../components/back-to-top'

interface FaqData{
    id: string;
    title: string;
    desc: string;
}

export default function Faq() {
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
                    <div className="position-relative text-center">
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
                        <h1 className="xl-heading text-white">Frequently Asked Questions</h1>
                        <p className="text-white-50">Find answers to common questions about spray foam insulation</p>
                        <nav id="breadcrumbs" className="breadcrumbs mt-3">
                            <ul className="d-flex align-items-center justify-content-center gap-2">
                                <li><Link to="/" className="text-white-50">Home</Link></li>
                                <MdArrowForwardIos className='text-white-50'/>
                                <li className="text-white">FAQ</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section>
        <div className="container">
            <div className="row align-items-start">
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="d-flex align-items-start flex-column gap-xl-5 gap-4">
                        <div className="faqsWraps w-100">
                            <div className="fasqHeads mb-3">
                                <h4>About Spray Foam Insulation</h4>
                            </div>
                            <div className="faqsCaps">
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    {faqData1.map((item:FaqData,index:number)=>{
                                        return(
                                            <div className="accordion-item" key={index}>
                                                <h2 className="accordion-header rounded-2">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-${item.id}`} aria-expanded="false" aria-controls={`#flush-${item.id}`}>
                                                        {item.title}
                                                    </button>
                                                </h2>
                                                <div id={`flush-${item.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body">{item.desc}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="faqsWraps w-100">
                            <div className="fasqHeads mb-3">
                                <h4>Hiring a Contractor</h4>
                            </div>
                            <div className="faqsCaps">
                                <div className="accordion accordion-flush" id="paymentFlushExample">
                                    {faqData2.map((item:FaqData,index:number)=>{
                                        return(
                                            <div className="accordion-item" key={index}>
                                                <h2 className="accordion-header rounded-2">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-${item.id}`} aria-expanded="false" aria-controls={`#flush-${item.id}`}>
                                                        {item.title}
                                                    </button>
                                                </h2>
                                                <div id={`flush-${item.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body">{item.desc}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="faqsWraps w-100">
                            <div className="fasqHeads mb-3">
                                <h4>Support & Help</h4>
                            </div>
                            <div className="faqsCaps">
                                <div className="accordion accordion-flush" id="supportFlushExample">
                                    {faqData3.map((item:FaqData,index:number)=>{
                                        return(
                                            <div className="accordion-item" key={index}>
                                                <h2 className="accordion-header rounded-2">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-${item.id}`} aria-expanded="false" aria-controls={`#flush-${item.id}`}>
                                                        {item.title}
                                                    </button>
                                                </h2>
                                                <div id={`flush-${item.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body">{item.desc}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
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
