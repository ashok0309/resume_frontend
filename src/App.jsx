// src/App.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MultiStepForm from './components/MultiStepForm';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';
import DownloadPDF from './components/DownloadPDF';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ProtectedRoute from './auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Default resume data structure
const defaultResumeData = {
  fullName: '',
  email: '',
  phone: '',
  education: [],
  experience: [],
  skills: [],
  projects: []
};

// Default theme settings
const defaultTheme = {
  font: 'Arial',
  color: '#2a64c7'
};

export default function App() {
  const navigate = useNavigate();
  
  // State management
  const [resumeData, setResumeData] = useState(() => {
    // Try to load from localStorage if available
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : defaultResumeData;
  });
  
  const [template, setTemplate] = useState(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate');
    return savedTemplate || 'template1';
  });
  
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('resumeTheme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  // Handle form completion
  const handleFormComplete = useCallback(() => {
    // Save to localStorage
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    localStorage.setItem('resumeTheme', JSON.stringify(theme));
    
    // Navigate to preview
    navigate('/preview');
  }, [resumeData, theme, navigate]);
  
  // Handle template change
  const handleTemplateChange = useCallback((newTemplate) => {
    setTemplate(newTemplate);
    localStorage.setItem('selectedTemplate', newTemplate);
  }, []);

  // Preview page styles
  const previewContainerStyle = useMemo(() => ({
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px'
  }), []);

  const resumePreviewStyle = useMemo(() => ({
    width: 794,
    minHeight: 1123,
    padding: 20,
    backgroundColor: '#fff',
    margin: '20px auto',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px'
  }), []);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>
        
        <Route path="/form" element={
          <ProtectedRoute>
            <MultiStepForm
              resumeData={resumeData}
              setResumeData={setResumeData}
              theme={theme}
              setTheme={setTheme}
              onComplete={handleFormComplete}
            />
          </ProtectedRoute>
        }/>
        
        <Route path="/preview" element={
          <ProtectedRoute>
            <div style={previewContainerStyle}>
              <h2>Preview Your Resume</h2>
              <TemplateSelector 
                selected={template} 
                onChange={handleTemplateChange}
              />
              
              <div id="resume-preview" style={resumePreviewStyle}>
                <ResumePreview 
                  data={resumeData} 
                  template={template} 
                  theme={theme}
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <DownloadPDF 
                  elementId="resume-preview" 
                  fileName={`${resumeData.fullName?.replace(/\s+/g, '_')}_resume.pdf` || 'resume.pdf'}
                />
              </div>
            </div>
          </ProtectedRoute>
        }/>
        
        <Route path="/templates" element={
          <ProtectedRoute>
            <div style={previewContainerStyle}>
              <h2>Select a Template</h2>
              <TemplateSelector 
                selected={template} 
                onChange={handleTemplateChange}
                showPreview={true}
              />
            </div>
          </ProtectedRoute>
        }/>
      </Routes>
      
      {/* Toast notifications container */}
      <ToastContainer position="bottom-right" />
    </>
  );
} 