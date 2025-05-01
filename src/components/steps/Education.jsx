import React, { useState } from "react";

const Education = ({ data = {}, onChange, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});
  const educationList = data.education || [];
  const [touched, setTouched] = useState({});

  // Validate form before proceeding to next step
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    educationList.forEach((edu, index) => {
      if (!edu.institution.trim()) {
        newErrors[`institution_${index}`] = "Institution is required";
        isValid = false;
      }
      
      if (!edu.degree.trim()) {
        newErrors[`degree_${index}`] = "Degree is required";
        isValid = false;
      }
      
      if (!edu.year.trim()) {
        newErrors[`year_${index}`] = "Year is required";
        isValid = false;
      } else if (!/^\d{4}$/.test(edu.year.trim())) {
        newErrors[`year_${index}`] = "Please enter a valid year (YYYY)";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    // Mark all fields as touched
    const allTouched = {};
    educationList.forEach((_, index) => {
      allTouched[`institution_${index}`] = true;
      allTouched[`degree_${index}`] = true;
      allTouched[`year_${index}`] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      nextStep();
    }
  };

  const handleChange = (index, field, value) => {
    const newEdu = [...educationList];
    newEdu[index][field] = value;
    onChange('education', newEdu);
    
    // Clear error when user types
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

  const addEducation = () => {
    const newEdu = [...educationList, { institution: '', degree: '', year: '' }];
    onChange('education', newEdu);
  };

  const removeEducation = (index) => {
    if (educationList.length > 1) {
      const newEdu = [...educationList];
      newEdu.splice(index, 1);
      onChange('education', newEdu);
      
      // Remove related errors
      const newErrors = { ...errors };
      delete newErrors[`institution_${index}`];
      delete newErrors[`degree_${index}`];
      delete newErrors[`year_${index}`];
      setErrors(newErrors);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Education Information</h2>
      
      <form onSubmit={(e) => e.preventDefault()} data-testid="education-form">
        {educationList.length === 0 ? (
          <div className="alert alert-info" role="alert">
            Add your education details below to continue.
          </div>
        ) : (
          educationList.map((edu, index) => (
            <div key={index} className="card mb-4" data-testid={`education-item-${index}`}>
              <div className="card-body">
                <h3 className="card-title h5">Education #{index + 1}</h3>
                
                <div className="mb-3">
                  <label htmlFor={`institution-${index}`} className="form-label">Institution</label>
                  <input
                    id={`institution-${index}`}
                    type="text"
                    className={`form-control ${touched[`institution_${index}`] && errors[`institution_${index}`] ? 'is-invalid' : ''}`}
                    placeholder="Enter institution name"
                    value={edu.institution}
                    onChange={(e) => handleChange(index, 'institution', e.target.value)}
                    onBlur={() => handleBlur(index, 'institution')}
                    data-testid={`institution-input-${index}`}
                  />
                  {touched[`institution_${index}`] && errors[`institution_${index}`] && (
                    <div className="invalid-feedback">{errors[`institution_${index}`]}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor={`degree-${index}`} className="form-label">Degree</label>
                  <input
                    id={`degree-${index}`}
                    type="text"
                    className={`form-control ${touched[`degree_${index}`] && errors[`degree_${index}`] ? 'is-invalid' : ''}`}
                    placeholder="Enter degree or certification"
                    value={edu.degree}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    onBlur={() => handleBlur(index, 'degree')}
                    data-testid={`degree-input-${index}`}
                  />
                  {touched[`degree_${index}`] && errors[`degree_${index}`] && (
                    <div className="invalid-feedback">{errors[`degree_${index}`]}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor={`year-${index}`} className="form-label">Graduation Year</label>
                  <input
                    id={`year-${index}`}
                    type="text"
                    className={`form-control ${touched[`year_${index}`] && errors[`year_${index}`] ? 'is-invalid' : ''}`}
                    placeholder="YYYY"
                    value={edu.year}
                    onChange={(e) => handleChange(index, 'year', e.target.value)}
                    onBlur={() => handleBlur(index, 'year')}
                    maxLength="4"
                    data-testid={`year-input-${index}`}
                  />
                  {touched[`year_${index}`] && errors[`year_${index}`] && (
                    <div className="invalid-feedback">{errors[`year_${index}`]}</div>
                  )}
                </div>
                
                {educationList.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeEducation(index)}
                    data-testid={`remove-education-${index}`}
                  >
                    Remove Education
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
            onClick={addEducation}
            data-testid="add-education-button"
          >
            + Add Education
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
      </form>
    </div>
  );
};

export default Education;