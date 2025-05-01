import React from 'react';

const Template3 = ({ data, theme }) => {
  return (
    <div style={{
      fontFamily: theme.font,
      color: theme.color,
      backgroundColor: '#f9f9f9',
      padding: '15px',
      borderRadius: '8px'
    }}>
      <h1 style={{ borderBottom: '2px solid gray' }}>{data.fullName}</h1>
      <p>{data.email} | {data.phone}</p>

      <div>
        <h3>Education</h3>
        {data.education.map((edu, idx) => (
          <p key={idx}>{edu.degree} - {edu.institution} ({edu.year})</p>
        ))}
      </div>

      <div>
        <h3>Experience</h3>
        {data.experience.map((exp, idx) => (
          <p key={idx}>{exp.role} - {exp.company} ({exp.duration})</p>
        ))}
      </div>

      <div>
        <h3>Skills</h3>
        <p>{data.skills.join(', ')}</p>
      </div>
    </div>
  );
};

export default Template3;
