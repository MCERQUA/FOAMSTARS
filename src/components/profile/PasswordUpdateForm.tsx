import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const PasswordUpdateForm: React.FC = () => {
  const { updatePassword } = useAuth();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      await updatePassword(formData.newPassword);
      setSuccess(true);
      setFormData({ newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card rounded-3 shadow-sm">
      <div className="card-body p-4">
        <div className="row align-items-start">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="cardTitle d-flex align-items-center justify-content-start mb-3">
              <h6 className="fw-semibold">Update Password</h6>
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
            Password updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row align-items-start">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="form-group form-border">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="form-group form-border">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary fw-medium flex-fill"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdateForm;