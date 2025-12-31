import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BsCamera, BsTrash, BsCheck2Circle, BsExclamationCircle } from 'react-icons/bs';

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  onAvatarUpdate?: (newAvatarUrl: string | null) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatarUrl,
  onAvatarUpdate
}) => {
  const { refreshProfile, updateProfile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image file must be less than 5MB');
      return;
    }

    setError(null);
    setSuccess(false);
    setUploading(true);

    try {
      // Create a local preview URL
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      // Note: Cloud storage upload is not configured yet
      // For now, just update the profile with the preview URL
      // In production, you would upload to cloud storage and use that URL
      await updateProfile({ avatar_url: localUrl });

      // Refresh the profile data
      await refreshProfile();

      // Notify parent component
      onAvatarUpdate?.(localUrl);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to upload avatar');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteAvatar = async () => {
    if (!confirm('Are you sure you want to remove your profile picture?')) return;

    setError(null);
    setSuccess(false);
    setDeleting(true);

    try {
      // Update profile to remove avatar
      await updateProfile({ avatar_url: null });

      // Refresh the profile data
      await refreshProfile();

      // Clean up preview URL if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }

      // Notify parent component
      onAvatarUpdate?.(null);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to remove avatar');
    } finally {
      setDeleting(false);
    }
  };

  const displayUrl = previewUrl || currentAvatarUrl;

  return (
    <div className="avatar-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div className="alert alert-warning alert-sm mb-3">
        <BsExclamationCircle className="me-1" />
        <small>Cloud storage not configured. Avatar preview only.</small>
      </div>

      {error && (
        <div className="alert alert-danger alert-sm mb-3">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-sm mb-3">
          <BsCheck2Circle className="me-1" />
          Avatar updated successfully!
        </div>
      )}

      <div className="d-flex gap-2 justify-content-center">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={handleFileSelect}
          disabled={uploading || deleting}
        >
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Uploading...
            </>
          ) : (
            <>
              <BsCamera className="me-1" />
              {displayUrl ? 'Change Photo' : 'Upload Photo'}
            </>
          )}
        </button>

        {displayUrl && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={handleDeleteAvatar}
            disabled={uploading || deleting}
          >
            {deleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Removing...
              </>
            ) : (
              <>
                <BsTrash className="me-1" />
                Remove
              </>
            )}
          </button>
        )}
      </div>

      <div className="text-center mt-2">
        <small className="text-muted">
          Max file size: 5MB. Supported formats: JPG, PNG, GIF
        </small>
      </div>
    </div>
  );
};

export default AvatarUpload;
