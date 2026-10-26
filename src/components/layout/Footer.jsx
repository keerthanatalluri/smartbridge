import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Layers, ShieldCheck, Lock, Headphones, RefreshCw, Heart } from 'lucide-react';

export const Footer = () => {
  const { resetSeedData } = useData();

  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#94a3b8',
      borderTop: '1px solid #1e293b',
      marginTop: 'auto',
      paddingTop: '3.5rem',
      paddingBottom: '2.5rem'
    }}>
      <div className="max-w-7xl">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid #1e293b'
        }}>
          {/* Brand info */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Layers size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Freelance<span style={{ color: '#3b82f6' }}>Hub</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#64748b', marginBottom: '1.25rem' }}>
              Enterprise-grade freelance marketplace powering top tech companies and vetted global independent specialists.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#10b981' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
              All systems operational (100% Client-Side)
            </div>
          </div>

          {/* Freelancers column */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1rem' }}>
              For Talent
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <Link to="/projects" style={{ color: '#94a3b8' }}>Browse All Projects</Link>
              <Link to="/dashboard/freelancer" style={{ color: '#94a3b8' }}>Freelancer Workspace</Link>
              <Link to="/proposals" style={{ color: '#94a3b8' }}>My Bids & Proposals</Link>
              <Link to="/profile" style={{ color: '#94a3b8' }}>Skill Portfolio Verification</Link>
            </div>
          </div>

          {/* Clients column */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1rem' }}>
              For Clients
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <Link to="/post-project" style={{ color: '#94a3b8' }}>Post a New Project</Link>
              <Link to="/dashboard/client" style={{ color: '#94a3b8' }}>Hiring Overview</Link>
              <Link to="/my-projects" style={{ color: '#94a3b8' }}>Contract Deliverables</Link>
              <span style={{ color: '#64748b' }}>Enterprise Escrow Guarantee</span>
            </div>
          </div>

          {/* Trust & Moderation column */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1rem' }}>
              Governance & Demo
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                <ShieldCheck size={16} color="#3b82f6" /> Verified Milestone Escrow
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                <Lock size={16} color="#10b981" /> End-to-End Local Sync
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                <Headphones size={16} color="#f59e0b" /> Dedicated Admin Center
              </div>
              <button
                onClick={resetSeedData}
                className="btn btn-secondary btn-sm"
                style={{
                  marginTop: '0.5rem',
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  color: '#e2e8f0',
                  justifyContent: 'flex-start'
                }}
                title="Reset LocalStorage data to pristine demo state"
              >
                <RefreshCw size={14} color="#60a5fa" /> Reset Pristine Demo Data
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingTop: '2rem',
          fontSize: '0.8125rem',
          color: '#64748b'
        }}>
          <div>
            &copy; {new Date().getFullYear()} FreelanceHub Inc. Enterprise Architecture. Built with React & Tailwind aesthetics.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Escrow Guidelines</span>
            <Link to="/admin" style={{ color: '#94a3b8' }}>Admin Console</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

