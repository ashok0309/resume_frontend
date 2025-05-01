import React, { useState } from 'react';

const PersonalInfo = ({ data = {}, onChange, nextStep }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false
  });

  const handleChange = (field, value) => {
    onChange(field, value);
    
    // Clear error when typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
    
    // Validate on blur
    validateField(field, data[field] || '');
  };

  const validateField = (field, value) => {
    let newErrors = { ...errors };
    
    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'Full name is required';
        } else if (value.trim().length < 2) {
          newErrors.fullName = 'Name must be at least 2 characters';
        } else {
          delete newErrors.fullName;
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^[\d\s\(\)\-\+]{7,15}$/.test(value)) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return !newErrors[field];
  };

  const validateForm = () => {
    const fields = ['fullName', 'email', 'phone'];
    let isValid = true;
    
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true
    });
    
    // Validate all fields
    fields.forEach(field => {
      if (!validateField(field, data[field] || '')) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Personal Information</h2>
      
      <form onSubmit={(e) => e.preventDefault()} data-testid="personal-info-form">
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            id="fullName"
            type="text"
            className={`form-control ${touched.fullName && errors.fullName ? 'is-invalid' : ''}`}
            placeholder="Enter your full name"
            value={data.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            data-testid="fullname-input"
          />
          {touched.fullName && errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            id="email"
            type="email"
            className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
            placeholder="Enter your email address"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            data-testid="email-input"
          />
          {touched.email && errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            id="phone"
            type="tel"
            className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
            placeholder="Enter your phone number"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            data-testid="phone-input"
          />
          {touched.phone && errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
          <div className="form-text">
            Please include country code if applicable (e.g., +1 234 567 8900)
          </div>
        </div>
        
        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNextStep}
            data-testid="next-button"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;