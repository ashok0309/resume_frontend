import React from 'react';

const Template1 = ({ data, theme }) => {
  return (
    <div style={{ fontFamily: theme.font, color: theme.color }}>
      <h1>{data.fullName}</h1>
      <p>{data.email} | {data.phone}</p>

      <h2>Education</h2>
      <ul>
        {data.education.map((edu, index) => (
          <li key={index}>{edu.degree}, {edu.institution} ({edu.year})</li>
        ))}
      </ul>

      <h2>Experience</h2>
      <ul>
        {data.experience.map((exp, index) => (
          <li key={index}>{exp.role} @ {exp.company} ({exp.duration})</li>
        ))}
      </ul>

      <h2>Skills</h2>
      <p>{data.skills.join(', ')}</p>
    </div>
  );
};

export default Template1;

