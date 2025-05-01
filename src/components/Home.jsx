import React from 'react';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Resume Builder</h1>
      <p>Create your professional resume in just a few steps!</p>
      <Link to="/form">
        <button style={{ marginTop: '1rem' }}>Get Started</button>
      </Link>
    </div>
  );
}

export default Home;
