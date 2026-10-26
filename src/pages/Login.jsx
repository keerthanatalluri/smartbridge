import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Layers, ArrowRight, UserCheck, Briefcase, Shield, AlertCircle } from 'lucide-react';

export const Login = () => {
  const { login, loginAs } = useAuth();
  const { addToast } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirectAfterLogin = (role) => {
    const from = location.state?.from?.pathname;
    if (from) {
      navigate(from, { replace: true });
    } else if (role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (role === 'client') {
      navigate('/dashboard/client', { replace: true });
    } else {
      navigate('/dashboard/freelancer', { replace: true });
    }
  };

  const handleStandardLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both your registered email address and password.');
      return;
    }

    setIsLoading(true);
    const result = login(email, password);
    setIsLoading(false);

    if (result.success) {
      addToast(`Welcome back, ${result.user.name}!`, 'success');
      redirectAfterLogin(result.user.role);
    } else {
      setError(result.message);
    }
  };

  const handleDemoPreset = (presetRole) => {
    const res = loginAs(presetRole);
    if (res.success) {
      addToast(`Logged in as ${res.user.name} (${presetRole})`, 'success');
      redirectAfterLogin(presetRole);
    }
  };

  return (
    <div style={{ padding: '3.5rem 1rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        {/* Brand header */}
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
            Sign In to FreelanceHub
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
            Enter your credentials or choose a 1-click demo role.
          </p>
        </div>

        {/* 1-Click Demo Logins Banner */}
        <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
            Instant 1-Click Demo Profiles
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleDemoPreset('freelancer')}
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '0.5rem 0.85rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserCheck size={16} color="#8b5cf6" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Demo Freelancer (Alex Rivera)</span>
              </div>
              <ArrowRight size={14} color="var(--slate-400)" />
            </button>

            <button
              type="button"
              onClick={() => handleDemoPreset('client')}
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '0.5rem 0.85rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={16} color="#2563eb" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Demo Client (Sarah Jenkins)</span>
              </div>
              <ArrowRight size={14} color="var(--slate-400)" />
            </button>

            <button
              type="button"
              onClick={() => handleDemoPreset('admin')}
              className="btn btn-secondary"
              style={{ justifyContent: 'space-between', padding: '0.5rem 0.85rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={16} color="#ef4444" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Demo Administrator (SysAdmin)</span>
              </div>
              <ArrowRight size={14} color="var(--slate-400)" />
            </button>
          </div>
        </div>

        {/* Main Login Form */}
        <div className="card" style={{ padding: '2rem' }}>
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

          <form onSubmit={handleStandardLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="e.g. alex@dev.io or sarah@designhub.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                className="form-input"
                placeholder="demo123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
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
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

