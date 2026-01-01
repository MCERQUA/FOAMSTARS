import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import blogImg from '../../assets/img/banner-5.jpg'

import { blogData } from '../../data/data'

import { MdArrowForwardIos } from 'react-icons/md'
import { BsCalendarCheck, BsEyeFill } from 'react-icons/bs'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import NavbarLight from '../../components/navbar/navbar-light'
import FooterTop from '../../components/footer-top'
import Footer from '../../components/footer'
import BackToTop from '../../components/back-to-top'

interface BlogData{
    id: number;
    image: string;
    title: string;
    desc: string;
    date: string;
    views: string;
}

export default function Blog() {
  useEffect(() => {
    document.title = 'Spray Foam Insulation Blog - Industry News & Tips | FOAMSTARS'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Read the latest spray foam insulation news, tips, and industry insights. Learn about open vs closed cell foam, SPF roofing, concrete lifting, and more from FOAMSTARS experts.')
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
                        <h1 className="text-white xl-heading">Industry Blog</h1>
                        <p className="text-white-50">Stay updated with the latest spray foam industry news and insights</p>
                        <nav id="breadcrumbs" className="breadcrumbs mt-3">
                            <ul className="d-flex align-items-center justify-content-center gap-2">
                                <li><Link to="/" className="text-white-50">Home</Link></li>
                                <MdArrowForwardIos className='text-white-50'/>
                                <li className="text-white">Blog</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section className="bg-light">
        <div className="container">
            <div className="row justify-content-center g-4">
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card rounded-4 border">
                        <div className="row align-items-center justify-content-start">
                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <Link to="/blog-detail/4" className="d-block p-3">
                                    <img className="img-fluid rounded" src={blogImg} alt="blog image"/>
                                </Link>
                            </div>

                            <div className="col-xl-8 col-lg-8 col-md-8">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-start gap-2 mb-3">
                                        <span className="badge badge-xs badge-success rounded-pill">Featured</span>
                                        <span className="badge badge-xs badge-primary rounded-pill">SEO & Marketing</span>
                                    </div>
                                    <Link to="/blog-detail/4"><h4 className="fw-semibold fs-5 lh-base mb-2">Boost Your Spray Foam Company's Website Performance with These SEO Tips</h4></Link>
                                    <p>Learn how to optimize your spray foam insulation business website for better search rankings and more leads. Discover essential SEO strategies, local search optimization, and performance tips specifically designed for spray foam contractors looking to grow their online presence.</p>
                                    <div className="d-flex align-items-center justify-content-start mt-4">
                                        <Link to="/blog-detail/4" className="badge badge-primary rounded-pill">Continue Reading</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {blogData.length === 0 ? (
                    <div className="col-12">
                        <div className="text-center py-5">
                            <div className="text-muted">
                                <h4>No Blog Posts Available</h4>
                                <p>We're working on creating valuable content for you. Check back soon for helpful tips and industry insights.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    blogData.map((item:BlogData,index:number)=>{
                    return(
                        <div className="col-xl-4 col-lg-4 col-md-6" key={index}>
                            <div className="card rounded-4 shadow-sm h-100">
                                <Link to={`/blog-detail/${item.id}`} className="d-block bg-gradient rounded-top">
                                    <img className="card-img-top hover-fade-out" src={item.image} alt="blog image"/>
                                </Link>
                                <div className="card-body">
                                    <Link to={`/blog-detail/${item.id}`}><h4 className="fw-semibold fs-5 lh-base mb-3">{item.title}</h4></Link>
                                    <p>{item.desc}</p>
                                    <div className="d-flex align-items-center justify-content-start mt-4">
                                        <Link to={`/blog-detail/${item.id}`} className="badge badge-primary rounded-pill">Continue Reading</Link>
                                    </div>
                                </div>
                                <div className="card-footer bg-white d-flex justify-content-between align-items-center py-3">
                                    <div className="text-dark fw-medium text-md d-flex align-items-center"><BsCalendarCheck className="me-2"/>{item.date}</div>
                                    <div className="text-muted fw-medium text-md d-flex align-items-center"><BsEyeFill className="me-2"/>{item.views}</div>
                                </div>
                            </div>
                        </div>
                    )
                }))}
            </div>

            <div className="row align-items-center justify-content-center mt-5">
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <Link to="#" className="page-link"><FaArrowLeft className=""/></Link>
                            </li>
                            <li className="page-item"><Link to="#" className="page-link">1</Link></li>
                            <li className="page-item active"><Link to="#" className="page-link">2</Link></li>
                            <li className="page-item"><Link to="#" className="page-link">3</Link></li>
                            <li className="page-item">
                                <Link to="#" className="page-link"><FaArrowRight className=""/></Link>
                            </li>
                        </ul>
                    </nav>
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
