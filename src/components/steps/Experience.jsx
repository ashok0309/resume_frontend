import React, { useState } from 'react';

const Experience = ({ data = {}, onChange, nextStep, prevStep }) => {
  const experienceList = data.experience || [];
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (index, field, value) => {
    const updated = [...experienceList];
    updated[index][field] = value;
    onChange('experience', updated);
    
    // Clear error when typing
    if (errors[`${field}_${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${field}_${index}`];
      setErrors(newErrors);
    }
  };

  const handleBlur = (index, field) => {
    setTouched({
      ...touched,
      [`${field}_${index}`]: true
    });
  };

  const handleAddExperience = () => {
    const newExperience = [...experienceList, { company: '', role: '', duration: '' }];
    onChange('experience', newExperience);
  };

  const handleRemoveExperience = (index) => {
    if (experienceList.length > 1) {
      const updated = [...experienceList];
      updated.splice(index, 1);
      onChange('experience', updated);
      
      // Remove errors for deleted item
      const newErrors = { ...errors };
      delete newErrors[`company_${index}`];
      delete newErrors[`role_${index}`];
      delete newErrors[`duration_${index}`];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    experienceList.forEach((exp, index) => {
      if (!exp.company.trim()) {
        newErrors[`company_${index}`] = "Company name is required";
        isValid = false;
      }

      if (!exp.role.trim()) {
        newErrors[`role_${index}`] = "Role/Position is required";
        isValid = false;
      }

      if (!exp.duration.trim()) {
        newErrors[`duration_${index}`] = "Duration is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    // Mark all fields as touched
    const allTouched = {};
    experienceList.forEach((_, index) => {
      allTouched[`company_${index}`] = true;
      allTouched[`role_${index}`] = true;
      allTouched[`duration_${index}`] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Professional Experience</h2>
      
      {experienceList.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Add your work experience details below to continue.
        </div>
      ) : (
        experienceList.map((exp, index) => (
          <div key={index} className="card mb-4" data-testid={`experience-item-${index}`}>
            <div className="card-body">
              <h3 className="card-title h5">Experience #{index + 1}</h3>
              
              <div className="mb-3">
                <label htmlFor={`company-${index}`} className="form-label">Company/Organization</label>
                <input
                  id={`company-${index}`}
                  type="text"
                  className={`form-control ${touched[`company_${index}`] && errors[`company_${index}`] ? 'is-invalid' : ''}`}
                  placeholder="Enter company name"
                  value={exp.company}
                  onChange={(e) => handleChange(index, 'company', e.target.value)}
                  onBlur={() => handleBlur(index, 'company')}
                  data-testid={`company-input-${index}`}
                />
                {touched[`company_${index}`] && errors[`company_${index}`] && (
                  <div className="invalid-feedback">{errors[`company_${index}`]}</div>
                )}
              </div>
              
              <div className="mb-3">
                <label htmlFor={`role-${index}`} className="form-label">Role/Position</label>
                <input
                  id={`role-${index}`}
                  type="text"
                  className={`form-control ${touched[`role_${index}`] && errors[`role_${index}`] ? 'is-invalid' : ''}`}
                  placeholder="Enter your job title"
                  value={exp.role}
                  onChange={(e) => handleChange(index, 'role', e.target.value)}
                  onBlur={() => handleBlur(index, 'role')}
                  data-testid={`role-input-${index}`}
                />
                {touched[`role_${index}`] && errors[`role_${index}`] && (
                  <div className="invalid-feedback">{errors[`role_${index}`]}</div>
                )}
              </div>
              
              <div className="mb-3">
                <label htmlFor={`duration-${index}`} className="form-label">Duration</label>
                <input
                  id={`duration-${index}`}
                  type="text"
                  className={`form-control ${touched[`duration_${index}`] && errors[`duration_${index}`] ? 'is-invalid' : ''}`}
                  placeholder="e.g., Jan 2020 - Present"
                  value={exp.duration}
                  onChange={(e) => handleChange(index, 'duration', e.target.value)}
                  onBlur={() => handleBlur(index, 'duration')}
                  data-testid={`duration-input-${index}`}
                />
                {touched[`duration_${index}`] && errors[`duration_${index}`] && (
                  <div className="invalid-feedback">{errors[`duration_${index}`]}</div>
                )}
              </div>
              
              {experienceList.length > 1 && (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveExperience(index)}
                  data-testid={`remove-experience-${index}`}
                >
                  Remove Experience
                </button>
              )}
            </div>
          </div>
        ))
      )}
      
      <div className="mb-4">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddExperience}
          data-testid="add-experience-button"
        >
          + Add Experience
        </button>
      </div>
      
      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={prevStep}
          data-testid="prev-button"
        >
          ← Previous
        </button>
        
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNextStep}
          data-testid="next-button"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Experience;