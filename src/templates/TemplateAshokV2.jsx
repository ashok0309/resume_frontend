import React from 'react';

const TemplateAshokV2 = ({ data = {}, theme = {} }) => {
  const {
    fullName,
    email,
    phone,
    github,
    linkedin,
    education = [],
    experience = [],
    projects = [],
    technicalSkills = {},
    achievements = []
  } = data;

  const { languages = [], libraries = [], tools = [] } = technicalSkills;

  const sectionStyle = {
    borderBottom: `1px solid ${theme.color || '#000'}`,
    paddingBottom: '8px',
    marginBottom: '16px',
    fontFamily: theme.font || 'Arial',
  };

  const titleStyle = {
    color: theme.color || '#000',
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '8px',
    fontFamily: theme.font || 'Arial',
  };

  const itemTitle = {
    fontWeight: 'bold',
    marginBottom: '4px',
  };

  const bullet = (text) => <li style={{ marginBottom: '4px' }}>{text}</li>;

  return (
    <div style={{ fontFamily: theme.font || 'Arial', padding: '30px', color: '#111', maxWidth: '800px', margin: 'auto' }}>
      {/* Header */}
      <div style={{ borderBottom: `2px solid ${theme.color || '#000'}`, paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ margin: '0', color: theme.color || '#000' }}>{fullName || 'Your Name'}</h1>
        <p>{email} | {phone}</p>
        {(github || linkedin) && (
          <p>
            {github && <>GitHub: {github} &nbsp;&nbsp;</>}
            {linkedin && <>LinkedIn: {linkedin}</>}
          </p>
        )}
      </div>

      {/* Education */}
      <div style={sectionStyle}>
        <h3 style={titleStyle}>EDUCATION</h3>
        {education.map((edu, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <div style={itemTitle}>{edu.degree} – {edu.institution}</div>
            <div>{edu.year}</div>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div style={sectionStyle}>
        <h3 style={titleStyle}>WORK EXPERIENCE</h3>
        {experience.map((exp, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <div style={itemTitle}>{exp.role} – {exp.company}</div>
            <div>{exp.duration}</div>
            {/* If you want to support bullet descriptions later, you can map exp.details here */}
          </div>
        ))}
      </div>

      {/* Projects */}
      <div style={sectionStyle}>
        <h3 style={titleStyle}>PROJECTS</h3>
        {projects.map((proj, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <div style={itemTitle}>{proj.title}</div>
            <div>{proj.description}</div>
            <small><i>Technologies: {proj.technologies}</i></small>
          </div>
        ))}
      </div>

      {/* Technical Skills */}
      <div style={sectionStyle}>
        <h3 style={titleStyle}>TECHNICAL SKILLS</h3>
        <p><strong>Languages:</strong> {languages.join(', ')}</p>
        <p><strong>Libraries/Frameworks:</strong> {libraries.join(', ')}</p>
        <p><strong>Tools & Platforms:</strong> {tools.join(', ')}</p>
      </div>

      {/* Achievements (Optional) */}
      {achievements.length > 0 && (
        <div style={sectionStyle}>
          <h3 style={titleStyle}>EXTRA-CURRICULAR / ACHIEVEMENTS</h3>
          <ul>
            {achievements.map((item, idx) => bullet(item))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TemplateAshokV2;
