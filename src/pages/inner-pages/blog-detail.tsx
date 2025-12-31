import { Link, useParams } from 'react-router-dom'

import blogImg from '../../assets/img/banner-5.jpg'
import team1 from '../../assets/img/team-1.jpg'
import team2 from '../../assets/img/team-2.jpg'
import team3 from '../../assets/img/team-3.jpg'

import { blogData } from '../../data/data'

import NavbarLight from '../../components/navbar/navbar-light'
import BlogSidebar from '../../components/blog-sidebar'
import FooterTop from '../../components/footer-top'
import Footer from '../../components/footer'
import BackToTop from '../../components/back-to-top'

import { MdArrowForwardIos } from 'react-icons/md'
import { FaQuoteLeft, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { BsReply } from 'react-icons/bs'

export default function BlogDetail() {

    const params = useParams()
    const id:any = params.id
    const data = blogData.find((item)=>item.id === parseInt(id))

  return (
    <div className='bg-light'>
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
                            <h1 className="text-white xl-heading">{data?.title || 'Article'}</h1>
                            <nav id="breadcrumbs" className="breadcrumbs mt-3">
                                <ul className="d-flex align-items-center justify-content-center gap-2">
                                    <li><Link to="/" className="text-white-50">Home</Link></li>
                                    <MdArrowForwardIos className='text-white-50'/>
                                    <li><Link to="/blog" className="text-white-50">Blog</Link></li>
                                    <MdArrowForwardIos className='text-white-50'/>
                                    <li className="text-white">Article</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>  

        <section className="pt-0">
            <div className="container">
                <div className="row g-4">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="blogDetails d-flex align-items-start gap-4 flex-column w-100">
                            <div className="card shadow-sm w-100">
                                <div className="blogThumb">
                                    <img src={data?.image ? data?.image :blogImg} className="img-fluid" alt="Blog Thumb"/>
                                </div>
                                <div className="card-body">
                                    <div className="d-inline-flex mb-2"><span className="badge badge-xs badge-primary rounded-pill">SEO & Marketing</span></div>
                                    <h1 className="fs-3">{data?.title ? data?.title : 'Boost Your Spray Foam Company\'s Website Performance'}</h1>
                                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 mb-3">
                                        <div>By <Link to="#" className="link">FOAMSTARS Team</Link></div>
                                        <div>{data?.date || 'December 2024'}</div>
                                        <div><Link to="#" className="link">0 Comments</Link></div>
                                    </div>

                                    <p>In today's competitive spray foam insulation market, having a strong online presence is essential for attracting new customers and growing your business. Whether you specialize in residential insulation, commercial roofing, concrete lifting, or specialty foam applications, your website is often the first impression potential clients have of your company.</p>

                                    <p>Search engine optimization (SEO) is the foundation of online visibility. When property owners search for "spray foam insulation near me" or "concrete lifting contractors," you want your company to appear at the top of the results. This requires a combination of technical optimization, quality content, and local search strategies.</p>

                                    <blockquote className="bg-light-primary rounded text-center p-3 p-md-4 my-4">
                                        <h6 className="fw-normal lh-base"><FaQuoteLeft className="me-2"/>A well-optimized website doesn't just attract more visitors—it attracts the right visitors. Spray foam contractors who invest in SEO see higher quality leads and better conversion rates.<i className="fa-solid fa-quote-right ms-2"></i></h6>
                                        <div className="blockquote-footer mb-0 fs-6 mt-3 text-primary fw-medium">Industry Expert</div>
                                    </blockquote>

                                    <p>Key areas to focus on include: optimizing your Google Business Profile with accurate service areas and categories, creating location-specific landing pages for each market you serve, showcasing customer reviews and project galleries, and ensuring your site loads quickly on mobile devices.</p>

                                    <p>Content marketing is equally important. Blog posts about topics like "open cell vs closed cell spray foam" or "benefits of SPF roofing" help establish your expertise and attract organic traffic from homeowners researching their options.</p>

                                    <p>At FOAMSTARS, we're committed to helping spray foam professionals grow their businesses. Our directory connects you with property owners actively searching for insulation services, and we provide resources to help you optimize your online presence for maximum visibility.</p>

                                </div>
                                
                                <div className="card-footer border-top bg-white">
                                    <div className="d-md-flex justify-content-between align-items-center">
                                        <h6 className="mb-0">Was this article helpful?</h6>
                                        <small className="py-3 p-md-0 d-block">40 out of 84 found this helpful</small>
                                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradio1"/>
                                            <label className="btn btn-outline-secondary btn-sm mb-0" htmlFor="btnradio1"><FaThumbsUp className="me-1"/> Yes</label>
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2"/>
                                            <label className="btn btn-outline-secondary btn-sm mb-0" htmlFor="btnradio2"> No <FaThumbsDown className="ms-1"/></label>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="card shadow-sm w-100">
                                <div className="card-header p-4">
                                    <h4>Comments (4)</h4>
                                </div>
                                
                                <div className="card-body">
                                    <div className="blogcommentsBox">
                                        <ul>
                                            <li>
                                                <div className="singleComments">
                                                    <div className="blogavatar">
                                                        <img src={team1} className="img-fluid circle" alt=""/>
                                                    </div>
                                                    
                                                    <div className="blogCaps">
                                                        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                                                            <div className="commentBy">
                                                                <h6 className="mb-1 lh-base">Mitchel Musk</h6>
                                                                <span>Aug 15 2024</span>
                                                            </div>
                                                            <div className="replyLink">
                                                                <Link to="#" className="btn btn-sm btn-light rounded-pill" data-bs-toggle="modal" data-bs-target="#commentModal"><BsReply className="me-2"/>Reply</Link>
                                                            </div>
                                                        </div>
                                                        <div className="commentsDes">
                                                            <p>That's not so bad, there's though he or her can't quite put a finger dummy copy to the rescue. But worse, what if the fish doesn't fit in the can, the foot's to big for the boot? Or to small?</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <ul>
                                                    
                                                    <li>
                                                        <div className="singleComments">
                                                            <div className="blogavatar">
                                                                <img src={team2} className="img-fluid circle" alt=""/>
                                                            </div>
                                                            
                                                            <div className="blogCaps">
                                                                <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                                                                    <div className="commentBy">
                                                                        <h6 className="mb-1 lh-base">Renuka Muksr</h6>
                                                                        <span>Sep 16 2024</span>
                                                                    </div>
                                                                    <div className="replyLink">
                                                                        <Link to="#" className="btn btn-sm btn-light rounded-pill" data-bs-toggle="modal" data-bs-target="#commentModal"><BsReply className="me-2"/>Reply</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="commentsDes">
                                                                    <p>That's not so bad, there's though he or her can't quite put a finger dummy copy to the rescue. But worse, what if the fish doesn't fit in the can, the foot's to big for the boot? Or to small?</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <ul>
                                                            <li>
                                                                <div className="singleComments">
                                                                    <div className="blogavatar">
                                                                        <img src={team3} className="img-fluid circle" alt=""/>
                                                                    </div>
                                                                    
                                                                    <div className="blogCaps">
                                                                        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                                                                            <div className="commentBy">
                                                                                <h6 className="mb-1 lh-base">Warner Devid</h6>
                                                                                <span>Sep 17 2024</span>
                                                                            </div>
                                                                            <div className="replyLink">
                                                                                <Link to="#" className="btn btn-sm btn-light rounded-pill" data-bs-toggle="modal" data-bs-target="#commentModal"><BsReply className="me-2"/>Reply</Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="commentsDes">
                                                                            <p>That's not so bad, there's though he or her can't quite put a finger dummy copy to the rescue. But worse, what if the fish doesn't fit in the can, the foot's to big for the boot? Or to small?</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            
                                            <li>
                                                <div className="singleComments">
                                                    <div className="blogavatar">
                                                        <img src={team1} className="img-fluid circle" alt=""/>
                                                    </div>
                                                    
                                                    <div className="blogCaps">
                                                        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                                                            <div className="commentBy">
                                                                <h6 className="mb-1 lh-base">Mitchel Musk</h6>
                                                                <span>Aug 15 2024</span>
                                                            </div>
                                                            <div className="replyLink">
                                                                <Link to="#" className="btn btn-sm btn-light rounded-pill" data-bs-toggle="modal" data-bs-target="#commentModal"><BsReply className="me-2"/>Reply</Link>
                                                            </div>
                                                        </div>
                                                        <div className="commentsDes">
                                                            <p>That's not so bad, there's though he or her can't quite put a finger dummy copy to the rescue. But worse, what if the fish doesn't fit in the can, the foot's to big for the boot? Or to small?</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="card shadow-sm p-4 w-100">
                                <div className="commentsBox">
                                    <div className="row align-items-start">
                                    
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <h4 className="fw-semibold">Drop Comments</h4>
                                        </div>
                                        
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group form-border">
                                                <label>Name:</label>
                                                <input type="text" className="form-control gray border-0"/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group form-border">
                                                <label>Email:</label>
                                                <input type="text" className="form-control gray border-0"/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group form-border">
                                                <label>Comments:</label>
                                                <textarea className="form-control gray border-0"></textarea>
                                            </div>
                                        </div>
                                        
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <button type="button" className="btn btn-light-primary rounded-pill fw-medium px-5">Submit Comment</button>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        
                    </div>
                    
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                        <BlogSidebar/>
                    </div>
                    
                </div>
            </div>
        </section>
        <FooterTop/>
        <Footer/>
        <BackToTop/>

    </div>
  )
}
