import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentSession } from '../../lib/auth';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the auth callback - Better Auth handles the OAuth flow
        const session = await getCurrentSession();

        if (session?.user) {
          // Successfully authenticated, redirect to dashboard
          navigate('/dashboard');
        } else {
          // No session found, redirect to login
          navigate('/auth/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/auth/login?error=auth_callback_failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4>Completing authentication...</h4>
        <p className="text-muted">Please wait while we sign you in.</p>
      </div>
    </div>
  );
}
