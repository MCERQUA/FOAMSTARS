import { Link } from 'react-router-dom'

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'
import { footerLink1, footerLink2, footerLink3 } from '../data/data'
const logo = '/FOAMSTARS_logo.png'
import { BsGeoAltFill, BsTelephoneOutbound } from 'react-icons/bs'

export default function Footer() {
  return (
        <footer className="footer skin-dark-footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-5 col-lg-12 col-xl-4">
                        <div className="footer-widget pe-xl-4 mb-5">
                            <div className="footerLogo"><img src={logo} className="img-fluid" width="160" alt="Footer Logo"/></div>
                            <div className="footerText"><p>© {new Date().getFullYear()} FOAMSTARS. The #1 directory for spray foam insulation contractors.</p></div>
                            <div className="footerSocialwrap">
                                <ul className="footersocial">
                                    <li><Link to="#" className="social-link"><FaFacebookF className=""/></Link></li>
                                    <li><Link to="#" className="social-link"><FaTwitter className=""/></Link></li>
                                    <li><Link to="#" className="social-link"><FaInstagram className=""/></Link></li>
                                    <li><Link to="#" className="social-link"><FaLinkedin className=""/></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-6 col-md-4 offset-md-3 col-lg-3  offset-lg-0 col-xl-2">
                        <div className="footer-widget mb-5 mb-md-5 mb-lg-0">
                            <h4 className="widget-title text-pri">Community</h4>
                            <ul className="footer-menu">
                                {footerLink1.map((item,index)=>{
                                    return(
                                        <li key={index}><Link to="#">{item}</Link></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div className="footer-widget mb-5 mb-md-5 mb-lg-0">
                            <h4 className="widget-title">Getting Started</h4>
                            <ul className="footer-menu">
                                {footerLink2.map((item,index)=>{
                                    return(
                                        <li key={index}><Link to="#">{item}</Link></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div className="footer-widget">
                            <h4 className="widget-title">FOAMSTARS Business</h4>
                            <ul className="footer-menu">
                                {footerLink3.map((item,index)=>{
                                    return(
                                        <li key={index}><Link to="#">{item}</Link></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div className="footer-widget">
                            <h4 className="widget-title">Get In Touch</h4>
                            <div className="contactInfowrap">
                                
                                <div className="singleinfo">
                                    <div className="icons"><BsGeoAltFill className=""/></div>
                                    <div className="caps">
                                        <h5 className="title">{import.meta.env.VITE_CONTACT_ADDRESS || 'Contact address not configured'}</h5>
                                        <p className="subs">Reach Us</p>											
                                    </div>
                                </div>
                                
                                <div className="singleinfo">
                                    <div className="icons"><BsTelephoneOutbound className=""/></div>
                                    <div className="caps">
                                        <h5 className="title">{import.meta.env.VITE_CONTACT_PHONE || 'Contact phone not configured'}</h5>
                                        <p className="subs">{import.meta.env.VITE_CONTACT_HOURS || 'Business hours not configured'}</p>											
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
  )
}
