import React, { useState, useEffect } from 'react';
import { BusinessListing, Category, getCategories, createListing, updateListing } from '../../lib/neon';
import { useAuth } from '../../contexts/AuthContext';

// Type for creating a new listing
type BusinessListingInsert = Partial<BusinessListing>;

interface BusinessListingFormProps {
  listing?: BusinessListing;
  onSuccess?: (listing: BusinessListing) => void;
  onCancel?: () => void;
}

const BusinessListingForm: React.FC<BusinessListingFormProps> = ({
  listing,
  onSuccess,
  onCancel
}) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Partial<BusinessListingInsert>>({
    title: '',
    description: '',
    business_name: '',
    category_id: '',
    phone: '',
    email: '',
    website_url: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    pricing_model: 'hourly',
    hourly_rate: 0,
    min_project_budget: 0,
    max_project_budget: 0,
    service_area_radius: 25,
    emergency_services: false,
    accepts_online_booking: false,
    slug: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadCategories();
    if (listing) {
      setFormData({
        title: listing.title,
        description: listing.description,
        business_name: listing.business_name,
        category_id: listing.category_id,
        phone: listing.phone,
        email: listing.email,
        website_url: listing.website_url,
        address: listing.address,
        city: listing.city,
        state: listing.state,
        zip_code: listing.zip_code,
        pricing_model: listing.pricing_model,
        hourly_rate: listing.hourly_rate,
        min_project_budget: listing.min_project_budget,
        max_project_budget: listing.max_project_budget,
        service_area_radius: listing.service_area_radius,
        emergency_services: listing.emergency_services,
        accepts_online_booking: listing.accepts_online_booking,
        slug: listing.slug
      });
    }
  }, [listing]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) || 0 : 
              value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
    
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    if (!formData.title || !formData.category_id) {
      setError('Title and category are required');
      setIsSubmitting(false);
      return;
    }

    try {
      let result;
      if (listing) {
        result = await updateListing(listing.id, formData);
      } else {
        if (!user?.id) {
          setError('You must be logged in to create a listing');
          setIsSubmitting(false);
          return;
        }
        result = await createListing({
          ...formData,
          owner_id: user.id
        } as BusinessListingInsert);
      }

      if (result) {
        setSuccess(true);
        onSuccess?.(result);
      } else {
        setError('Failed to save listing');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card rounded-3 shadow-sm">
      <div className="card-body p-4">
        <div className="row align-items-start">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="cardTitle d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-semibold">{listing ? 'Edit Listing' : 'Create New Listing'}</h6>
              {onCancel && (
                <button type="button" className="btn-close" onClick={onCancel}></button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            Listing {listing ? 'updated' : 'created'} successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8">
              <div className="mb-3">
                <label className="form-label">Listing Title *</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Category *</label>
                <select
                  className="form-select"
                  name="category_id"
                  value={formData.category_id || ''}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows={4}
              value={formData.description || ''}
              onChange={handleInputChange}
              placeholder="Describe your services..."
              disabled={isSubmitting}
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Business Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="business_name"
                  value={formData.business_name || ''}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Website</label>
                <input
                  type="url"
                  className="form-control"
                  name="website_url"
                  value={formData.website_url || ''}
                  onChange={handleInputChange}
                  placeholder="https://your-website.com"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address || ''}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="zip_code"
                  value={formData.zip_code || ''}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Pricing Model</label>
                <select
                  className="form-select"
                  name="pricing_model"
                  value={formData.pricing_model || 'hourly'}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                >
                  <option value="hourly">Hourly Rate</option>
                  <option value="project">Per Project</option>
                  <option value="square_foot">Per Square Foot</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Hourly Rate ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="hourly_rate"
                  min="0"
                  step="0.01"
                  value={formData.hourly_rate || 0}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Service Area (miles)</label>
                <input
                  type="number"
                  className="form-control"
                  name="service_area_radius"
                  min="1"
                  max="100"
                  value={formData.service_area_radius || 25}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Min Project Budget ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="min_project_budget"
                  min="0"
                  step="0.01"
                  value={formData.min_project_budget || 0}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Max Project Budget ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="max_project_budget"
                  min="0"
                  step="0.01"
                  value={formData.max_project_budget || 0}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="emergency_services"
                  checked={formData.emergency_services || false}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <label className="form-check-label">
                  Offer Emergency Services
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="accepts_online_booking"
                  checked={formData.accepts_online_booking || false}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <label className="form-check-label">
                  Accept Online Bookings
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3">
            {onCancel && (
              <button
                type="button"
                className="btn btn-light"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {listing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                listing ? 'Update Listing' : 'Create Listing'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessListingForm;