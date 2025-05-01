import React, { useState } from 'react';

const Projects = ({ data = {}, onChange, nextStep, prevStep }) => {
  const projects = data.projects || [];
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    onChange('projects', updated);
    
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

  const handleAddProject = () => {
    const updated = [
      ...projects,
      { title: '', description: '', technologies: '' },
    ];
    onChange('projects', updated);
  };

  const handleRemove = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange('projects', updated);
    
    // Remove errors for deleted project
    const newErrors = { ...errors };
    delete newErrors[`title_${index}`];
    delete newErrors[`description_${index}`];
    delete newErrors[`technologies_${index}`];
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    projects.forEach((project, index) => {
      if (!project.title.trim()) {
        newErrors[`title_${index}`] = "Project title is required";
        isValid = false;
      }
      
      if (!project.description.trim()) {
        newErrors[`description_${index}`] = "Project description is required";
        isValid = false;
      }
      
      if (!project.technologies.trim()) {
        newErrors[`technologies_${index}`] = "Technologies used is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    // Mark all fields as touched
    const allTouched = {};
    projects.forEach((_, index) => {
      allTouched[`title_${index}`] = true;
      allTouched[`description_${index}`] = true;
      allTouched[`technologies_${index}`] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Projects</h2>
      
      {projects.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Add your project details below to continue.
        </div>
      ) : (
        projects.map((proj, index) => (
          <div key={index} className="card mb-4" data-testid={`project-item-${index}`}>
            <div className="card-body">
              <h3 className="card-title h5">Project #{index + 1}</h3>
              
              <div className="mb-3">
                <label htmlFor={`title-${index}`} className="form-label">Project Title</label>
                <input
                  id={`title-${index}`}
                  type="text"
                  className={`form-control ${touched[`title_${index}`] && errors[`title_${index}`] ? 'is-invalid' : ''}`}
                  placeholder="Enter project title"
                  value={proj.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  onBlur={() => handleBlur(index, 'title')}
                  data-testid={`title-input-${index}`}
                />
                {touched[`title_${index}`] && errors[`title_${index}`] && (
                  <div className="invalid-feedback">{errors[`title_${index}`]}</div>
                )}
              </div>
              
              <div className="mb-3">
                <label htmlFor={`description-${index}`} className="form-label">Description</label>
                <textarea
                  id={`description-${index}`}
                  className={`form-control ${touched[`description_${index}`] && errors[`description_${index}`] ? 'is-invalid' : ''}`}
                  placeholder="Describe your project, its purpose, and your role"
                  value={proj.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  onBlur={() => handleBlur(index, 'description')}
                  rows={4}
                  data-testid={`description-input-${index}`}
                ></textarea>
                {touched[`description_${index}`] && errors[`description_${index}`] && (
                  <div className="invalid-feedback">{errors[`description_${index}`]}</div>
                )}
              </div>
              
              <div className="mb-3">
                <label htmlFor={`technologies-${index}`} className="form-label">Technologies Used</label>
                <input
                  id={`technologies-${index}`}
                  type="text"
                  className={`form-control ${touched[`technologies_${index}`] && errors[`technologies_${index}`] ? 'is-invalid' : ''}`}
                  placeholder="e.g., React, Node.js, MongoDB"
                  value={proj.technologies}
                  onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                  onBlur={() => handleBlur(index, 'technologies')}
                  data-testid={`technologies-input-${index}`}
                />
                {touched[`technologies_${index}`] && errors[`technologies_${index}`] && (
                  <div className="invalid-feedback">{errors[`technologies_${index}`]}</div>
                )}
                <div className="form-text">
                  Separate technologies with commas
                </div>
              </div>
              
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemove(index)}
                data-testid={`remove-project-${index}`}
              >
                Remove Project
              </button>
            </div>
          </div>
        ))
      )}
      
      <div className="mb-4">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddProject}
          data-testid="add-project-button"
        >
          + Add Project
        </button>
      </div>
      
      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={prevStep}
          data-testid="prev-button"
        >
          ← Back
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

export default Projects;