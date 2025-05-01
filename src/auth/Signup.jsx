import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear submission error when typing
    if (submissionError) {
      setSubmissionError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain both letters and numbers';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setSubmissionError('');
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { 
          data: { full_name: formData.fullName } 
        },
      });
      
      if (error) throw error;
      
      // Success message and redirect
      alert('Success! Please check your email for the verification link.');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setSubmissionError(error.message || 'An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Create Your Account</h2>
      
      {submissionError && (
        <div className="alert alert-danger mx-auto" style={{ maxWidth: "500px" }} role="alert">
          {submissionError}
        </div>
      )}
      
      <form onSubmit={handleSignup} className="mx-auto" style={{ maxWidth: "500px" }} data-testid="signup-form">
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className={`form-control ${formSubmitted && errors.fullName ? 'is-invalid' : ''}`}
            value={formData.fullName}
            onChange={handleChange}
            disabled={isLoading}
            required
            data-testid="fullname-input"
          />
          {formSubmitted && errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${formSubmitted && errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
            data-testid="email-input"
          />
          {formSubmitted && errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={`form-control ${formSubmitted && errors.password ? 'is-invalid' : ''}`}
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
            data-testid="password-input"
          />
          {formSubmitted && errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
          <div className="form-text">
            Password must be at least 6 characters and include both letters and numbers.
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={`form-control ${formSubmitted && errors.confirmPassword ? 'is-invalid' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
            data-testid="confirm-password-input"
          />
          {formSubmitted && errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary w-100 mb-3"
          disabled={isLoading}
          data-testid="signup-button"
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Creating Account...
            </>
          ) : 'Sign Up'}
        </button>
      </form>
      
      <div className="text-center mt-4">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none fw-bold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;