import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <div style={{ maxWidth: '32rem', margin: '4rem auto', padding: '2rem', textAlign: 'center' }} className="card">
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#fef2f2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <ShieldAlert size={28} color="#ef4444" />
        </div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Access Restricted</h2>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
          Your current account role (<strong>{role}</strong>) does not have authorization to view this workspace.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
          <Navigate to={`/dashboard/${role === 'admin' ? 'admin' : role}`} replace />
        </div>
      </div>
    );
  }

  return children;
};

