import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Profile } from '../../lib/neon';

interface ProfileFormProps {
  onSuccess?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSuccess }) => {
  const { profile, updateProfile, loading } = useAuth();
  const [formData, setFormData] = useState<Partial<Profile>>({
    full_name: '',
    phone: '',
    bio: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    website_url: '',
    business_name: '',
    years_experience: 0,
    hourly_rate: 0,
    min_project_budget: 0,
    service_area_radius: 25,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load profile data when component mounts
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        zip_code: profile.zip_code || '',
        website_url: profile.website_url || '',
        business_name: profile.business_name || '',
        years_experience: profile.years_experience || 0,
        hourly_rate: profile.hourly_rate || 0,
        min_project_budget: profile.min_project_budget || 0,
        service_area_radius: profile.service_area_radius || 25,
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
    
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      await updateProfile(formData);
      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isContractor = profile?.user_type === 'contractor';

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          Profile updated successfully!
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="full_name" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              className="form-control"
              id="full_name"
              name="full_name"
              value={formData.full_name || ''}
              onChange={handleInputChange}
              required
              disabled={loading || isSubmitting}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleInputChange}
              disabled={loading || isSubmitting}
            />
          </div>
        </div>
      </div>

      {isContractor && (
        <div className="mb-3">
          <label htmlFor="business_name" className="form-label">
            Business Name
          </label>
          <input
            type="text"
            className="form-control"
            id="business_name"
            name="business_name"
            value={formData.business_name || ''}
            onChange={handleInputChange}
            disabled={loading || isSubmitting}
          />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="bio" className="form-label">
          {isContractor ? 'Business Description' : 'About Me'}
        </label>
        <textarea
          className="form-control"
          id="bio"
          name="bio"
          rows={4}
          value={formData.bio || ''}
          onChange={handleInputChange}
          placeholder={isContractor ? 'Describe your business and services...' : 'Tell us about yourself...'}
          disabled={loading || isSubmitting}
        />
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleInputChange}
              disabled={loading || isSubmitting}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city || ''}
              onChange={handleInputChange}
              disabled={loading || isSubmitting}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={formData.state || ''}
              onChange={handleInputChange}
              disabled={loading || isSubmitting}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="zip_code" className="form-label">
              ZIP Code
            </label>
            <input
              type="text"
              className="form-control"
              id="zip_code"
              name="zip_code"
              value={formData.zip_code || ''}
              onChange={handleInputChange}
              disabled={loading || isSubmitting}
            />
          </div>
        </div>
      </div>

      {isContractor && (
        <>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="years_experience" className="form-label">
                  Years of Experience
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="years_experience"
                  name="years_experience"
                  min="0"
                  value={formData.years_experience || 0}
                  onChange={handleInputChange}
                  disabled={loading || isSubmitting}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="service_area_radius" className="form-label">
                  Service Area Radius (miles)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="service_area_radius"
                  name="service_area_radius"
                  min="1"
                  max="100"
                  value={formData.service_area_radius || 25}
                  onChange={handleInputChange}
                  disabled={loading || isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="hourly_rate" className="form-label">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="hourly_rate"
                  name="hourly_rate"
                  min="0"
                  step="0.01"
                  value={formData.hourly_rate || 0}
                  onChange={handleInputChange}
                  disabled={loading || isSubmitting}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="min_project_budget" className="form-label">
                  Minimum Project Budget ($)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="min_project_budget"
                  name="min_project_budget"
                  min="0"
                  step="0.01"
                  value={formData.min_project_budget || 0}
                  onChange={handleInputChange}
                  disabled={loading || isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="website_url" className="form-label">
              Website URL
            </label>
            <input
              type="url"
              className="form-control"
              id="website_url"
              name="website_url"
              value={formData.website_url || ''}
              onChange={handleInputChange}
              placeholder="https://your-website.com"
              disabled={loading || isSubmitting}
            />
          </div>
        </>
      )}

      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Updating...
            </>
          ) : (
            'Update Profile'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;