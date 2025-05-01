import React, { useState } from 'react';

const Skills = ({ data = {}, onChange, nextStep, prevStep }) => {
  // Initialize with default empty arrays if data doesn't have technical skills
  const initialSkills = data.technicalSkills || { languages: [], libraries: [], tools: [] };
  
  // Create local state to manage the form
  const [skills, setSkills] = useState(initialSkills);
  
  // This function handles input changes
  const handleChange = (type, index, event) => {
    const newValue = event.target.value;
    const newSkills = { ...skills };
    newSkills[type][index] = newValue;
    
    // Update local state first
    setSkills(newSkills);
    
    // Then inform parent component
    onChange('technicalSkills', newSkills);
  };
  
  // Add a new skill field
  const handleAdd = (type) => {
    const newSkills = { ...skills };
    newSkills[type] = [...newSkills[type], ''];
    
    setSkills(newSkills);
    onChange('technicalSkills', newSkills);
  };
  
  // Remove a skill field
  const handleRemove = (type, index) => {
    const newSkills = { ...skills };
    newSkills[type] = newSkills[type].filter((_, i) => i !== index);
    
    setSkills(newSkills);
    onChange('technicalSkills', newSkills);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Technical Skills</h2>
      
      {/* LANGUAGES SECTION */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Languages</h4>
        {skills.languages.map((language, index) => (
          <div key={`lang-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder={`Language #${index + 1}`}
              value={language}
              onChange={(e) => handleChange('languages', index, e)}
              style={{
                padding: '8px',
                marginRight: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '80%',
              }}
            />
            <button
              type="button"
              onClick={() => handleRemove('languages', index)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '5px',
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd('languages')}
          style={{
            padding: '8px 16px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          + Add Language
        </button>
      </div>
      
      <hr />
      
      {/* LIBRARIES SECTION */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Libraries/Frameworks</h4>
        {skills.libraries.map((library, index) => (
          <div key={`lib-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder={`Library/Framework #${index + 1}`}
              value={library}
              onChange={(e) => handleChange('libraries', index, e)}
              style={{
                padding: '8px',
                marginRight: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '80%',
              }}
            />
            <button
              type="button"
              onClick={() => handleRemove('libraries', index)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '5px',
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd('libraries')}
          style={{
            padding: '8px 16px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          + Add Library/Framework
        </button>
      </div>
      
      <hr />
      
      {/* TOOLS SECTION */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Tools & Platforms</h4>
        {skills.tools.map((tool, index) => (
          <div key={`tool-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder={`Tool/Platform #${index + 1}`}
              value={tool}
              onChange={(e) => handleChange('tools', index, e)}
              style={{
                padding: '8px',
                marginRight: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '80%',
              }}
            />
            <button
              type="button"
              onClick={() => handleRemove('tools', index)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '5px',
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd('tools')}
          style={{
            padding: '8px 16px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          + Add Tool/Platform
        </button>
      </div>
      
      {/* NAVIGATION BUTTONS */}
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={prevStep}
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          ⬅ Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Skills;