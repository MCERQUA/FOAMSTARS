import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AdminNavbar from '../../components/navbar/admin-navbar'
import AdminSidebar from '../../components/admin/admin-sidebar'
import BackToTop from '../../components/back-to-top';
import ListingImageUpload from '../../components/business/ListingImageUpload';
import { useAuth } from '../../contexts/AuthContext';
import { getCategories, createListing, Category } from '../../lib/neon';

import { FaFile, FaImages } from 'react-icons/fa6';
import { BsGeoAlt, BsPatchQuestionFill, BsPlusCircle, BsStopwatch } from 'react-icons/bs';


// Category type imported from neon.ts

interface FormData {
    title: string;
    business_name: string;
    description: string;
    category_id: string;
    phone: string;
    email: string;
    website_url: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    pricing_model: string;
    hourly_rate: string;
    min_project_budget: string;
    max_project_budget: string;
}

interface ImageData {
    logo?: string;
    featured?: string;
    gallery: string[];
}

export default function DashboardAddListing() {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState<ImageData>({ gallery: [] });
    const [formData, setFormData] = useState<FormData>({
        title: '',
        business_name: profile?.business_name || '',
        description: '',
        category_id: '',
        phone: profile?.phone || '',
        email: user?.email || '',
        website_url: profile?.website_url || '',
        address: profile?.address || '',
        city: profile?.city || '',
        state: profile?.state || '',
        zip_code: profile?.zip_code || '',
        pricing_model: 'hourly',
        hourly_rate: '',
        min_project_budget: '',
        max_project_budget: ''
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert('You must be logged in to create a listing');
            return;
        }

        setLoading(true);

        try {
            const result = await createListing({
                owner_id: user.id,
                title: formData.title,
                business_name: formData.business_name || null,
                description: formData.description || null,
                category_id: formData.category_id,
                phone: formData.phone || null,
                email: formData.email || null,
                website_url: formData.website_url || null,
                address: formData.address || null,
                city: formData.city || null,
                state: formData.state || null,
                zip_code: formData.zip_code || null,
                hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
                featured_image_url: imageData.featured || null,
                gallery_images: imageData.gallery.length > 0 ? imageData.gallery : [],
            });

            if (!result) {
                throw new Error('Failed to create listing');
            }

            alert('Listing created successfully and is now live!');
            navigate('/dashboard/listings');
        } catch (error: any) {
            console.error('Error creating listing:', error);
            alert('Error creating listing: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    
  return (
    <>
        <AdminNavbar/>

        <section className="p-0">
            <div className="container-fluid p-0">
                <div className="row user-dashboard g-0">
                    <AdminSidebar/>
                    <div className="col-xl-10 col-lg-9 col-md-12 pt-lg-0 pt-5">
                        <div className="user-dashboard-box bg-light">
                            
                            <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 pt-lg-0 pt-5">
                                <h2 className="fw-medium mb-0">Add Listing</h2>
                            </div>
                            
                            <div className="dashCaption p-xl-5 p-3 p-md-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="card rounded-3 shadow-sm">
                                                <div className="card-header py-4 px-4">
                                                    <h4 className="fs-5 fw-medium"><FaFile className="text-primary me-2"/>Basic Information</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Listing Title<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="Name your contractor service"/></label>
                                                                <input 
                                                                    type="text" 
                                                                    name="title"
                                                                    className="form-control rounded" 
                                                                    placeholder="e.g. Professional Plumbing Services"
                                                                    value={formData.title}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Business Name</label>
                                                                <input 
                                                                    type="text" 
                                                                    name="business_name"
                                                                    className="form-control rounded" 
                                                                    placeholder="Your Business Name"
                                                                    value={formData.business_name}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Service Category</label>
                                                                <select 
                                                                    name="category_id"
                                                                    className="form-control rounded"
                                                                    value={formData.category_id}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                >
                                                                    <option value="">Select Category</option>
                                                                    {categories.map(cat => (
                                                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Service Description</label>
                                                                <textarea 
                                                                    name="description"
                                                                    className="form-control rounded ht-150" 
                                                                    placeholder="Describe your services, experience, and what makes you stand out..."
                                                                    value={formData.description}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="card rounded-3 shadow-sm">
                                                <div className="card-header py-4 px-4">
                                                    <h4 className="fs-5 fw-medium"><BsGeoAlt className="text-primary me-2"/>Contact & Location</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Phone Number</label>
                                                                <input 
                                                                    type="tel" 
                                                                    name="phone"
                                                                    className="form-control rounded" 
                                                                    placeholder="(555) 123-4567"
                                                                    value={formData.phone}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Email Address</label>
                                                                <input 
                                                                    type="email" 
                                                                    name="email"
                                                                    className="form-control rounded" 
                                                                    placeholder="contact@yourbuiness.com"
                                                                    value={formData.email}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Website URL (Optional)</label>
                                                                <input 
                                                                    type="url" 
                                                                    name="website_url"
                                                                    className="form-control rounded" 
                                                                    placeholder="https://www.yourbusiness.com"
                                                                    value={formData.website_url}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Service Address</label>
                                                                <input 
                                                                    type="text" 
                                                                    name="address"
                                                                    className="form-control rounded" 
                                                                    placeholder="123 Main Street"
                                                                    value={formData.address}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">City</label>
                                                                <input 
                                                                    type="text" 
                                                                    name="city"
                                                                    className="form-control rounded" 
                                                                    placeholder="City"
                                                                    value={formData.city}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">State</label>
                                                                <input 
                                                                    type="text" 
                                                                    name="state"
                                                                    className="form-control rounded" 
                                                                    placeholder="State"
                                                                    value={formData.state}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">ZIP Code</label>
                                                                <input 
                                                                    type="text" 
                                                                    name="zip_code"
                                                                    className="form-control rounded" 
                                                                    placeholder="12345"
                                                                    value={formData.zip_code}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="card rounded-3 shadow-sm">
                                                <div className="card-header py-4 px-4">
                                                    <h4 className="fs-5 fw-medium"><BsStopwatch className="text-primary me-2"/>Pricing Information</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Pricing Model</label>
                                                                <select 
                                                                    name="pricing_model"
                                                                    className="form-control rounded"
                                                                    value={formData.pricing_model}
                                                                    onChange={handleInputChange}
                                                                >
                                                                    <option value="hourly">Hourly Rate</option>
                                                                    <option value="project">Per Project</option>
                                                                    <option value="square_foot">Per Square Foot</option>
                                                                    <option value="custom">Custom Quote</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {formData.pricing_model === 'hourly' && (
                                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                                <div className="form-group form-border">
                                                                    <label className="lableTitle">Hourly Rate ($)</label>
                                                                    <input 
                                                                        type="number" 
                                                                        name="hourly_rate"
                                                                        className="form-control rounded" 
                                                                        placeholder="75"
                                                                        value={formData.hourly_rate}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Minimum Project Budget ($)</label>
                                                                <input 
                                                                    type="number" 
                                                                    name="min_project_budget"
                                                                    className="form-control rounded" 
                                                                    placeholder="500"
                                                                    value={formData.min_project_budget}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Maximum Project Budget ($) (Optional)</label>
                                                                <input 
                                                                    type="number" 
                                                                    name="max_project_budget"
                                                                    className="form-control rounded" 
                                                                    placeholder="10000"
                                                                    value={formData.max_project_budget}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="card rounded-3 shadow-sm">
                                                <div className="card-header py-4 px-4">
                                                    <h4 className="fs-5 fw-medium"><FaImages className="text-primary me-2"/>Images & Media</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Business Logo</label>
                                                                <p className="text-muted small mb-2">Upload your business logo (recommended: 200x200px)</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Featured Image</label>
                                                                <p className="text-muted small mb-2">Main image for your listing (recommended: 800x600px)</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Gallery Images</label>
                                                                <p className="text-muted small mb-2">Showcase your work samples and projects</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <ListingImageUpload onImagesChange={setImageData} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="text-end">
                                                <button type="submit" className="btn btn-primary rounded px-4" disabled={loading}>
                                                    {loading ? 'Creating Listing...' : (
                                                        <>
                                                            <BsPlusCircle className="me-2"/>
                                                            Create Listing
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <BackToTop/>
    </>
  )
}
