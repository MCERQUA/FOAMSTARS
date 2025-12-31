import { Link } from 'react-router-dom'

const logo = '/FOAMSTARS_logo.png'
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { footerLink1, footerLink2, footerLink3 } from '../data/data'
import { BsGeoAltFill, BsTelephoneInbound } from 'react-icons/bs'

export default function FooterLight() {
  return (
    <footer className="footer skin-light-footer">
        <div className="container-fluid">
            <div className="row">

                <div className="col-12 col-md-5 col-lg-12 col-xl-4">
                    <div className="footer-widget pe-xl-4 mb-5">
                        <div className="footerLogo"><img src={logo} className="img-fluid" width="160" alt="Footer Logo"/></div>
                        <div className="footerText"><p>© {new Date().getFullYear()} FOAMSTARS. The #1 directory for spray foam insulation contractors.</p></div>
                        <div className="footerSocialwrap">
                            <ul className="footersocial">
                                <li><Link to="#" className="social-link"><FaFacebookF/></Link></li>
                                <li><Link to="#" className="social-link"><FaTwitter/></Link></li>
                                <li><Link to="#" className="social-link"><FaInstagram/></Link></li>
                                <li><Link to="#" className="social-link"><FaLinkedin/></Link></li>
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
                                <div className="icons"><BsGeoAltFill/></div>
                                <div className="caps">
                                    <h5 className="title">Angraster 7, Greenhorst<br/>Los Angeles QTC564</h5>
                                    <p className="subs">Reach Us</p>											
                                </div>
                            </div>
                            
                            <div className="singleinfo">
                                <div className="icons"><BsTelephoneInbound /></div>
                                <div className="caps">
                                    <h5 className="title">042 - 526 - 5263</h5>
                                    <p className="subs">Mon - Sat 10am - 6PM</p>											
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
