import React from 'react';

const Template2 = ({ data, theme }) => {
  return (
    <div style={{ fontFamily: theme.font, color: theme.color, border: '2px solid #ccc', padding: '20px' }}>
      <header>
        <h1>{data.fullName}</h1>
        <p>{data.email} | {data.phone}</p>
      </header>
      <section>
        <h2>Education</h2>
        {data.education.map((edu, i) => (
          <div key={i}>
            <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
          </div>
        ))}
      </section>
      <section>
        <h2>Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i}>
            <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
          </div>
        ))}
      </section>
      <section>
        <h2>Skills</h2>
        <ul>{data.skills.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
      </section>
    </div>
  );
};

export default Template2;

