import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  // Form validation
  const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (!isFormValid) return;
    
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Store user session if needed
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Navigate to home page
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(
        err.message === 'Invalid login credentials'
          ? 'Incorrect email or password. Please try again.'
          : 'Error signing in. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      // Redirect happens automatically
    } catch (err) {
      console.error('Google login error:', err);
      setErrorMsg('Error signing in with Google. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    // Clear errors when user types
    if (formSubmitted) setErrorMsg('');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Log In to Your Account</h2>
      
      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: "450px" }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            id="email"
            type="email"
            className={`form-control ${formSubmitted && !isEmailValid ? 'is-invalid' : ''}`}
            value={email}
            onChange={handleInputChange(setEmail)}
            disabled={isLoading}
            required
            data-testid="email-input"
          />
          {formSubmitted && !isEmailValid && (
            <div className="invalid-feedback">
              Please enter a valid email address
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className={`form-control ${formSubmitted && !isPasswordValid ? 'is-invalid' : ''}`}
            value={password}
            onChange={handleInputChange(setPassword)}
            disabled={isLoading}
            required
            data-testid="password-input"
          />
          {formSubmitted && !isPasswordValid && (
            <div className="invalid-feedback">
              Password must be at least 6 characters
            </div>
          )}
        </div>

        <div className="d-flex justify-content-end mb-3">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot password?
          </Link>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-100 mb-3"
          disabled={isLoading}
          data-testid="login-button"
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Logging in...
            </>
          ) : 'Log In'}
        </button>
      </form>

      <div className="text-center my-4">
        <div className="d-flex align-items-center justify-content-center">
          <hr className="flex-grow-1" />
          <span className="mx-3 text-muted">OR</span>
          <hr className="flex-grow-1" />
        </div>
      </div>

      <div className="text-center mb-4">
        <button 
          onClick={handleGoogleLogin} 
          className="btn btn-outline-dark w-100" 
          style={{ maxWidth: "450px" }}
          disabled={isLoading}
          data-testid="google-login-button"
        >
          <i className="bi bi-google me-2"></i>
          Continue with Google
        </button>
      </div>

      <div className="text-center mt-4">
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="text-decoration-none fw-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}