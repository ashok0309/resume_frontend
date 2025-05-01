import React, { useState, useCallback } from 'react';
import PersonalInfo from "./steps/PersonalInfo"
import Education from './steps/Education';
import Experience from './steps/Experience';
import Skills from './steps/Skills';
import Projects from './steps/Projects';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MultiStepForm = ({ resumeData, setResumeData, theme, setTheme, onComplete }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Total number of steps in the form
  const TOTAL_STEPS = 6;

  // Move to next form step
  const nextStep = useCallback(() => {
    setStep(prevStep => Math.min(prevStep + 1, TOTAL_STEPS));
  }, []);

  // Go back to previous step
  const prevStep = useCallback(() => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  }, []);

  // Handles updating resume data when any field is changed
  const handleChange = useCallback((field, value) => {
    setResumeData(prevData => ({
      ...prevData,
      [field]: value
    }));
  }, [setResumeData]);

  // Handles theme font/color changes
  const handleThemeChange = useCallback((e) => {
    const { name, value } = e.target;
    setTheme(prevTheme => ({
      ...prevTheme,
      [name]: value
    }));
  }, [setTheme]);

  // Show message for 3 seconds
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  // Final step: Submit data to backend
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const response = await axios.post(`${API_URL}/resumes`, {
        ...resumeData,
        theme,
        updatedAt: new Date().toISOString()
      });
      
      showMessage('Resume submitted successfully!');
      
      // Pass the created resume ID to the onComplete callback if available
      if (response.data && response.data.id) {
        onComplete(response.data.id);
      } else {
        onComplete();
      }
    } catch (error) {
      console.error('Error submitting resume:', error);
      showMessage(error.response?.data?.message || 'Failed to save your resume. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step components configuration
  const steps = [
    {
      component: PersonalInfo,
      props: { data: resumeData, onChange: handleChange }
    },
    {
      component: Education,
      props: { data: resumeData, onChange: handleChange }
    },
    {
      component: Experience,
      props: { data: resumeData, onChange: handleChange }
    },
    {
      component: Skills,
      props: { data: resumeData, onChange: handleChange }
    },
    {
      component: Projects,
      props: { data: resumeData, onChange: handleChange }
    }
  ];

  // Render current step component
  const renderStep = () => {
    if (step <= steps.length) {
      const StepComponent = steps[step - 1].component;
      return (
        <StepComponent
          {...steps[step - 1].props}
          nextStep={nextStep}
          prevStep={step > 1 ? prevStep : undefined}
        />
      );
    }
    
    // Final step - Theme customization
    return (
      <div className="theme-customization">
        <h3 className="step-title">🎨 Customize Your Resume Theme</h3>

        {/* Show message if there is one */}
        {message.text && (
          <div 
            style={{ 
              padding: '10px', 
              margin: '10px 0', 
              backgroundColor: message.type === 'error' ? '#ffebee' : '#e8f5e9',
              color: message.type === 'error' ? '#c62828' : '#2e7d32',
              borderRadius: '4px'
            }}
          >
            {message.text}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="font-selector">Font Style:</label>
          <select
            id="font-selector"
            name="font"
            value={theme.font}
            onChange={handleThemeChange}
            className="form-control"
            disabled={isSubmitting}
          >
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="color-picker">Primary Color:</label>
          <input
            id="color-picker"
            type="color"
            name="color"
            value={theme.color}
            onChange={handleThemeChange}
            className="form-control color-input"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-actions">
          <button
            onClick={prevStep}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            ⬅ Back
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : '✅ Submit'}
          </button>
        </div>
      </div>
    );
  };

  // Progress indicator
  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="resume-form-container">
      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="step-indicator">
          Step {step} of {TOTAL_STEPS}
        </div>
      </div>
      
      {/* Current step content */}
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;