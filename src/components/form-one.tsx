import Select from 'react-select';
import { FaLocationDot } from 'react-icons/fa6'
import { BiSearch } from 'react-icons/bi';

export default function FormOne() {
    // Spray Foam Service Categories
    const serviceOptions = [
        { value: 'all', label: 'All Services' },
        { value: 'insulation', label: 'Spray Foam Insulation' },
        { value: 'concrete', label: 'Concrete Lifting' },
        { value: 'artistic', label: 'Artistic & Themed Projects' },
        { value: 'coatings', label: 'Polyurethane Coatings' },
        { value: 'roofing', label: 'SPF Roofing' },
      ];
  return (
    <div className="row align-items-start justify-content-center mb-lg-5 mb-4">
        <div className="col-xl-11 col-lg-12 col-md-12 col-sm-12">
            <div className="heroSearch style-01 shadow">
                <div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
                    <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12">
                        <div className="form-group position-relative">
                            <input type="text" className="form-control fs-6 fw-medium ps-md-2" placeholder="Search company name..."/>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 side-border">
                        <div className="form-group position-relative">
                            <input type="text" className="form-control fs-6 fw-medium border-0" placeholder="State (e.g., Arizona)"/>
                            <span className="position-absolute top-50 end-0 translate-middle me-2"><FaLocationDot className="fa-solid fa-location-dot text-muted opacity-50 fs-5"/></span>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                        <div className="form-group fw-medium lights-bg no-border">
                            <div className="selects">
                                <Select placeholder="All Services" options={serviceOptions} className="categories form-control border-0"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12">
                        <div className="form-group">
                            <button type="button" className="btn btn-primary full-width fw-medium"><BiSearch className="me-2"/>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
