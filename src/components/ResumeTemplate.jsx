import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const ResumeTemplate = ({ data, theme }) => {
  const { fullName, email, phone, education = [], experience = [], projects = [], skills = [] } = data || {};

  // Memoize styles to prevent recalculation on each render
  const styles = useMemo(() => ({
    container: {
      fontFamily: theme.font || 'Arial, sans-serif',
      color: '#222',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#fff',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
      borderRadius: '10px'
    },
    header: {
      marginBottom: '2rem',
      textAlign: 'center'
    },
    name: {
      color: theme.color || '#333',
      marginBottom: '0.25rem',
      fontSize: '28px',
      fontWeight: 700
    },
    contact: {
      marginBottom: '1rem',
      fontSize: '16px',
      color: '#555'
    },
    section: {
      border: `1px solid ${theme.color || '#ccc'}`,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    heading: {
      marginBottom: '12px',
      borderBottom: `2px solid ${theme.color || '#333'}`,
      paddingBottom: '6px',
      fontSize: '18px',
      color: theme.color || '#333',
      fontWeight: 600
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px'
    },
    itemTitle: {
      fontWeight: 600,
      color: '#333'
    },
    dateRange: {
      fontSize: '14px',
      color: '#666'
    },
    itemSubtitle: {
      fontStyle: 'italic',
      marginBottom: '5px',
      color: '#555'
    },
    description: {
      marginTop: '5px',
      marginBottom: '10px',
      lineHeight: '1.5',
      color: '#444'
    },
    skillsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    },
    skillItem: {
      backgroundColor: '#eee',
      color: '#333',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '14px',
      border: `1px solid ${theme.color || '#ddd'}`
    }
  }), [theme]);

  if (!data) {
    return <div>No resume data available</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.name}>{fullName || 'Your Name'}</h1>
        <p style={styles.contact}>
          {email && `${email} | `}{phone}
        </p>
      </div>

      {education.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.heading}>Education</h3>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: i < education.length - 1 ? '15px' : 0 }}>
              <div style={styles.itemHeader}>
                <span style={styles.itemTitle}>{edu.degree}</span>
                <span style={styles.dateRange}>{edu.startYear} - {edu.endYear}</span>
              </div>
              <div style={styles.itemSubtitle}>{edu.institution}</div>
            </div>
          ))}
        </div>
      )}

      {experience.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.heading}>Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: i < experience.length - 1 ? '15px' : 0 }}>
              <div style={styles.itemHeader}>
                <span style={styles.itemTitle}>{exp.role}</span>
                <span style={styles.dateRange}>{exp.startYear} - {exp.endYear}</span>
              </div>
              <div style={styles.itemSubtitle}>{exp.company}</div>
              {exp.description && <p style={styles.description}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.heading}>Projects</h3>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: i < projects.length - 1 ? '15px' : 0 }}>
              <div style={styles.itemTitle}>{proj.title}</div>
              {proj.description && <p style={styles.description}>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.heading}>Skills</h3>
          <div style={styles.skillsList}>
            {skills.map((skill, i) => (
              <span key={i} style={styles.skillItem}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ResumeTemplate.propTypes = {
  data: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    education: PropTypes.arrayOf(PropTypes.shape({
      degree: PropTypes.string,
      institution: PropTypes.string,
      startYear: PropTypes.string,
      endYear: PropTypes.string
    })),
    experience: PropTypes.arrayOf(PropTypes.shape({
      role: PropTypes.string,
      company: PropTypes.string,
      startYear: PropTypes.string,
      endYear: PropTypes.string,
      description: PropTypes.string
    })),
    projects: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    })),
    skills: PropTypes.arrayOf(PropTypes.string)
  }),
  theme: PropTypes.shape({
    font: PropTypes.string,
    color: PropTypes.string
  })
};

ResumeTemplate.defaultProps = {
  data: {},
  theme: {
    font: 'Arial, sans-serif',
    color: '#4a90e2'
  }
};

export default React.memo(ResumeTemplate);