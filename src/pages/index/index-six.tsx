import { Link } from 'react-router-dom'

import bg from '../../assets/img/banner-6.jpg'

import { FaBagShopping, FaBowlRice, FaMagnifyingGlass, FaMartiniGlass, FaMugSaucer, FaSpa } from 'react-icons/fa6'

import NavbarDark from '../../components/navbar/navbar-dark'
import FeaturedListing from '../../components/featured-listing'
import HowItsWork from '../../components/how-its-work'
import WorkingProcessTwo from '../../components/working-process-two'
import ClientOne from '../../components/client-one'
import BlogOne from '../../components/blog-one'
import FooterTop from '../../components/footer-top'
import Footer from '../../components/footer'
import BackToTop from '../../components/back-to-top'
import CategoryFive from '../../components/categories-five'

export default function IndexSix() {
  return (
    <>
        <NavbarDark/>

        <div className="image-cover hero-header position-relative overflow-hidden" style={{backgroundImage:`url(${bg})`}} data-overlay="6">
            <div className="container">
				<div className="row justify-content-center align-items-center">
				  <div className="col-xl-10 col-lg-11 col-md-12 col-sm-12">
					<div className="position-relative text-center mb-5 pt-lg-0 pt-5">
                        <h1 className="fw-semibold mb-4">Find <span className="text-light border border-light px-3 rounded-pill br-dashed">Spray Foam</span> Contractors</h1>
                        <p className="fs-5 fw-light">Browse top-rated spray foam insulation contractors across the United States!</p>
					</div>
				  </div>
				</div>
				
				<div className="row justify-content-center align-items-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
						  <div className="row gx-lg-0 gx-md-0 m-0">
							<div className="search-wrap bg-white rounded-pill p-2 border">
							  <div className="row gx-lg-2 gx-md-2 gx-3">
								<div className="col-auto">
								  <button type="button" className="btn btn-primary rounded-pill fw-medium"><FaMagnifyingGlass className="text-light fs-5"/></button>
								</div>
								<div className="col">
								  <div className="form-group no-border position-relative mb-0">
									<input type="text" className="form-control border-0 fw-medium rounded-pill ps-2" placeholder="Search for locality, project.."/>
									<span className="position-absolute top-50 end-0 translate-middle"><label className="badge text-success bg-light-success rounded">22k+</label></span>
								  </div>
								</div>
							  </div>
							</div>
						  </div>
					  </div>
				  </div>
				  
				  <div className="row justify-content-center align-items-center">
					 <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
						<div className="d-block position-relative mt-5">
							<div className="popularSearches d-flex align-items-center justify-content-center gap-3 flex-wrap">
								<div className="singleItem"><Link to="#" className="badge badge-transparent rounded-pill"><FaSpa className="me-2"/>Beauty & Spa</Link></div>	
								<div className="singleItem"><Link to="#" className="badge badge-transparent rounded-pill"><FaBowlRice className="me-2"/>Eat & Drink</Link></div>	
								<div className="singleItem"><Link to="#" className="badge badge-transparent rounded-pill"><FaBagShopping className="me-2"/>Shopping</Link></div>	
								<div className="singleItem"><Link to="#" className="badge badge-transparent rounded-pill"><FaMartiniGlass className="me-2"/>Nightlife</Link></div>	
								<div className="singleItem"><Link to="#" className="badge badge-transparent rounded-pill"><FaMugSaucer className="me-2"/>Coffee Shop</Link></div>	
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
                            <h3 className="sectionHeading">Hot & Trending <span className="text-primary">Categories</span></h3>
                            <p>Explore all types of popular category for submit your listings</p>
                        </div>
                    </div>
                </div>
                <CategoryFive/>
            </div>
        </section>

        <section>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Featured Listing In <span className="text-primary">Las Vegas</span></h3>
                            <p>Explore Hot & Popular Business Listings</p>
                        </div>
                    </div>
                </div>
                <FeaturedListing/>
            </div>
        </section>

        <section className="light-top-gredient">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">How FOAMSTARS <span className="text-primary">Work?</span></h3>
                            <p>Let's see FOAMSTARS work process and create an account.</p>
                        </div>
                    </div>
                </div>
               <HowItsWork/>
            </div>
        </section>

        <section className="pt-0">
            <WorkingProcessTwo/>
        </section>

        <section className="bg-light">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Our Great <span className="text-primary">Reviews</span></h3>
                            <p>Our cliens love our services and give great & positive reviews</p>
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
                            <h3 className="sectionHeading">Latest Updates <span className="text-primary">News</span></h3>
                            <p>Join FOAMSTARS and get latest & trending updates about listing</p>
                        </div>
                    </div>
                </div>
                <BlogOne/>
            </div>
        </section>
        <FooterTop/>
        <Footer/>
        <BackToTop/>
    </>
  )
}
