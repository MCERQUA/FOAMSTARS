import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import NavbarDark from '../../components/navbar/navbar-dark'
import FormFour from '../../components/form-four';
import CategoryFive from '../../components/categories-five';
import FeaturedListing from '../../components/featured-listing';
import HowItsWork from '../../components/how-its-work';
import WorkingProcessTwo from '../../components/working-process-two';
import ClientOne from '../../components/client-one';
import BlogOne from '../../components/blog-one';
import FooterTop from '../../components/footer-top';
import FooterLight from '../../components/footer-light';
import BackToTop from '../../components/back-to-top';

export default function IndexMap() {

    const defaultProps = {
        center: {
            lat: 40.7, // Latitude for San Francisco
            lng: -73.87, // Longitude for San Francisco
        },
        zoom: 16,
    };

    const markerPositions = [
        { lat: 40.72956781, lng: -73.99726866 }, 
        { lat: 40.76221766, lng: -73.96511769 }, 
        { lat: 40.88496706, lng: -73.88191222 }, 
        { lat: 40.72228267, lng: -73.99246214 },
        { lat: 40.94982541, lng: -73.84357452 }, 
        { lat: 40.90261483, lng: -74.08252716 }, 
    ];

  return (
    <>
        <NavbarDark/>

        <section className="p-0 overflow-hidden">
			<div className="position-relative">
				<div className="ht-500" id="map-main">
                    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}>
                        <GoogleMap
                            mapContainerStyle={{ height: '600px', width: '100%' }}
                            center={defaultProps.center}
                            zoom={defaultProps.zoom}
                        >
                            {markerPositions.map((position, index) => (
                            <Marker key={index} position={position} />
                        ))}
                        </GoogleMap>
                    </LoadScript>
                </div>
			</div>
		</section>

        <FormFour/>

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

        <WorkingProcessTwo/>

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
        <FooterLight/>
        <BackToTop/>
    </>
  )
}
