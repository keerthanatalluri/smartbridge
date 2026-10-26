import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Compass,
  FileCheck,
  Layers,
  User,
  PlusCircle,
  Shield,
  Briefcase
} from 'lucide-react';

export const Sidebar = () => {
  const { role } = useAuth();

  const getLinks = () => {
    if (role === 'client') {
      return [
        { to: '/dashboard/client', label: 'Client Cockpit', icon: <LayoutDashboard size={18} /> },
        { to: '/post-project', label: 'Post New Project', icon: <PlusCircle size={18} /> },
        { to: '/my-projects', label: 'Projects & Contracts', icon: <Layers size={18} /> },
        { to: '/projects', label: 'Marketplace Feed', icon: <Compass size={18} /> },
        { to: '/profile', label: 'Company Profile', icon: <User size={18} /> }
      ];
    }
    if (role === 'admin') {
      return [
        { to: '/admin', label: 'Admin Overview', icon: <Shield size={18} /> },
        { to: '/projects', label: 'Marketplace Feed', icon: <Compass size={18} /> },
        { to: '/profile', label: 'Supervisor Profile', icon: <User size={18} /> }
      ];
    }
    // Default freelancer
    return [
      { to: '/dashboard/freelancer', label: 'Freelancer Hub', icon: <LayoutDashboard size={18} /> },
      { to: '/projects', label: 'Browse Projects', icon: <Compass size={18} /> },
      { to: '/proposals', label: 'My Proposals', icon: <FileCheck size={18} /> },
      { to: '/my-projects', label: 'Active Contracts', icon: <Layers size={18} /> },
      { to: '/profile', label: 'Skills & Portfolio', icon: <User size={18} /> }
    ];
  };

  const links = getLinks();

  return (
    <aside style={{
      width: '240px',
      flexShrink: 0,
      backgroundColor: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--slate-200)',
      padding: '1rem',
      height: 'fit-content',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'var(--slate-400)',
        padding: '0.5rem 0.75rem',
        letterSpacing: '0.05em'
      }}>
        Navigation
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: isActive ? 'var(--primary-700)' : 'var(--slate-600)',
              backgroundColor: isActive ? 'var(--primary-50)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s ease'
            })}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

