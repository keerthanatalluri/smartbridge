import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { isValidEmail } from '../utils/validation';
import { Layers, Briefcase, UserCheck, AlertCircle } from 'lucide-react';

export const Register = () => {
  const { register } = useAuth();
  const { addToast } = useData();
  const navigate = useNavigate();

  const [role, setRole] = useState('freelancer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [extraField, setExtraField] = useState(''); // Company for client, Title for freelancer
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || name.trim().length < 2) {
      setError('Please provide your full name.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    const result = register({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
      company: role === 'client' ? (extraField || `${name}'s Company`) : '',
      title: role === 'freelancer' ? (extraField || 'Full-Stack Specialist') : 'Hiring Manager'
    });
    setIsLoading(false);

    if (result.success) {
      addToast(`Account created successfully! Welcome to FreelanceHub.`, 'success');
      if (role === 'client') {
        navigate('/dashboard/client', { replace: true });
      } else {
        navigate('/dashboard/freelancer', { replace: true });
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ padding: '3.5rem 1rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            marginBottom: '1rem',
            boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
          }}>
            <Layers size={26} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Join FreelanceHub
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
            Choose your account role to get started immediately.
          </p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          {/* Role Selector Tabs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            padding: '0.25rem',
            backgroundColor: 'var(--slate-100)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <button
              type="button"
              onClick={() => setRole('freelancer')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: role === 'freelancer' ? '#ffffff' : 'transparent',
                boxShadow: role === 'freelancer' ? 'var(--shadow-sm)' : 'none',
                color: role === 'freelancer' ? 'var(--primary-700)' : 'var(--slate-600)',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <UserCheck size={18} /> I'm a Freelancer
            </button>

            <button
              type="button"
              onClick={() => setRole('client')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: role === 'client' ? '#ffffff' : 'transparent',
                boxShadow: role === 'client' ? 'var(--shadow-sm)' : 'none',
                color: role === 'client' ? 'var(--primary-700)' : 'var(--slate-600)',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Briefcase size={18} /> I'm a Client
            </button>
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 'var(--radius-md)',
              color: '#b91c1c',
              fontSize: '0.875rem',
              marginBottom: '1.25rem'
            }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                type="text"
                className="form-input"
                placeholder="e.g. Jordan Miller"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Work Email</label>
              <input
                id="reg-email"
                type="email"
                className="form-input"
                placeholder="e.g. jordan@techcorp.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password (6+ characters)</label>
              <input
                id="reg-password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-extra">
                {role === 'client' ? 'Company Name / Studio' : 'Professional Headline'}
              </label>
              <input
                id="reg-extra"
                type="text"
                className="form-input"
                placeholder={role === 'client' ? 'e.g. Nova Innovations Ltd.' : 'e.g. Senior Frontend Engineer'}
                value={extraField}
                onChange={(e) => setExtraField(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : `Register as ${role === 'client' ? 'Client' : 'Freelancer'}`}
            </button>
          </form>

          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--slate-100)',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--slate-500)'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

