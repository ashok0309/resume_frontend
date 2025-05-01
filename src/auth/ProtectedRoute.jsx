// src/auth/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Track if the component is mounted to prevent state updates after unmount
    let isMounted = true;

    async function checkSession() {
      try {
        // 1. Get initial session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (isMounted) {
          console.log('⚡ getSession:', data.session);
          setSession(data.session);
        }
      } catch (err) {
        console.error('Session check error:', err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    // Check session immediately
    checkSession();

    // 2. Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        console.log('🔄 authStateChange:', session);
        setSession(session);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      isMounted = false;
      if (listener && listener.subscription) {
        listener.subscription.unsubscribe();
      }
    };
  }, []);

  // 3. Show a loader while checking authentication
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If there was an error checking the session
  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        Error checking authentication: {error}
        <button 
          className="btn btn-link"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // 4. If no session, redirect to login and remember the current location
  if (!session) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // 5. Otherwise render the protected content
  return children;
}