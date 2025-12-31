import { BiPaperPlane } from "react-icons/bi";
export default function FooterTop() {
  return (
    <section className="newsletter-section position-relative py-5">
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="col-xl-10 col-lg-11">
                    <div className="newsletter-box rounded-4 p-5">
                        <div className="row align-items-center justify-content-between g-4">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="callsTitles">
                                    <h4 className="mb-2 lh-base">Stay Updated on Spray Foam</h4>
                                    <p className="opacity-75 m-0">Get industry news, tips, and new contractor listings in your inbox</p>
                                </div>
                            </div>

                            <div className="col-xl-5 col-lg-6 col-md-6">
                                <div className="subscribeForm">
                                    <div className="input-group">
                                        <input type="email" className="form-control newsletter-input" placeholder="Enter your email..."/>
                                        <button className="btn btn-newsletter" type="button">
                                            <BiPaperPlane className="me-2" style={{width:'18px', height:'18px'}}/>
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
