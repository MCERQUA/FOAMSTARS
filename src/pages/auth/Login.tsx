import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import bg from '../../assets/img/auth-bg.png';
import logo from '../../assets/img/icon.png';
import { FaEye, FaGooglePlusG, FaEyeSlash } from 'react-icons/fa6';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError('Google login failed. Please try again.');
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ffe8ee',
        backgroundSize: 'cover'
      }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-5 col-lg-7 col-md-9">
              <div className="authWrap">
                <div className="authhead">
                  <div className="text-center mb-4">
                    <Link to="/">
                      <img className="img-fluid" src={logo} width="55" alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="authbody d-black mb-4">
                  <div className="card rounded-4 p-sm-5 p-4">
                    <div className="card-body p-0">
                      <div className="text-center">
                        <h1 className="mb-2 fs-2">Welcome To FOAMSTARS!</h1>
                      </div>
                      
                      {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                          {error}
                        </div>
                      )}

                      <form className="mt-5 text-start" onSubmit={handleSubmit}>
                        <div className="form mb-5">
                          <div className="form-group form-border mb-4">
                            <label>Email Address</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="name@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              disabled={isLoading}
                            />
                          </div>
                          <div className="form-group form-border position-relative mb-4">
                            <label>Password</label>
                            <div className="position-relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                              />
                              <button
                                type="button"
                                className="btn position-absolute top-50 end-0 translate-middle-y me-3 p-0 border-0 bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                          </div>

                          <div className="form-group form-border mb-4">
                            <button
                              type="submit"
                              className="btn btn-primary full-width fw-medium"
                              disabled={isLoading || !email || !password}
                            >
                              {isLoading ? 'Signing In...' : 'Log In'}
                            </button>
                          </div>

                          <div className="modal-flex-item d-flex align-items-center justify-content-between mb-3">
                            <div className="modal-flex-first">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="savepassword"
                                  value="option1"
                                />
                                <label className="form-check-label" htmlFor="savepassword">
                                  Remember me
                                </label>
                              </div>
                            </div>
                            <div className="modal-flex-last">
                              <Link to="/forgot-password" className="text-primary fw-medium">
                                Forget Password?
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="prixer my-5">
                          <div className="devider-wraps position-relative">
                            <div className="devider-text text-muted text-md">Or signin with</div>
                          </div>
                        </div>

                        <div className="social-login">
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              type="button"
                              onClick={handleGoogleLogin}
                              className="btn bg-white border border-2 text-dark full-width"
                              disabled={isLoading}
                            >
                              <FaGooglePlusG className="color--googleplus me-2" />
                              <span className="fw-medium text-md">
                                {isLoading ? 'Loading...' : 'Signin with Google'}
                              </span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="authfooter">
                  <div className="text-center">
                    <p className="text-dark mb-0">
                      Are you new here?
                      <Link to="/register" className="fw-medium text-primary"> Create an account</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
