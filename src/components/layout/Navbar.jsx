import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  Briefcase,
  Compass,
  FileCheck,
  PlusCircle,
  Shield,
  Layers,
  LogOut,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, isAuthenticated, role, logout, loginAs } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleRoleSwitch = (targetRole) => {
    loginAs(targetRole);
    setRoleSwitcherOpen(false);
    if (targetRole === 'admin') navigate('/admin');
    else if (targetRole === 'client') navigate('/dashboard/client');
    else navigate('/dashboard/freelancer');
  };

  return (
    <nav style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--slate-200)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
    }}>
      <div className="max-w-7xl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.25rem' }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
            }}>
              <Layers size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em' }}>
                  Freelance<span style={{ color: 'var(--primary-600)' }}>Hub</span>
                </span>
                <span style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '4px',
                  backgroundColor: 'var(--primary-50)',
                  color: 'var(--primary-700)',
                  border: '1px solid var(--primary-200)'
                }}>
                  Enterprise
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: 'none' }} className="desktop-nav-links">
            {/* Will be styled via inline responsive display or visible on desktop */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }} className="nav-desktop-only">
            <NavLink
              to="/projects"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: isActive ? 'var(--primary-600)' : 'var(--slate-600)',
                textDecoration: 'none'
              })}
            >
              <Compass size={17} /> Browse Projects
            </NavLink>

            {isAuthenticated && role === 'freelancer' && (
              <>
                <NavLink
                  to="/dashboard/freelancer"
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--primary-600)' : 'var(--slate-600)',
                    textDecoration: 'none'
                  })}
                >
                  <Briefcase size={17} /> Freelancer Hub
                </NavLink>
                <NavLink
                  to="/proposals"
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--primary-600)' : 'var(--slate-600)',
                    textDecoration: 'none'
                  })}
                >
                  <FileCheck size={17} /> My Proposals
                </NavLink>
                <NavLink
                  to="/my-projects"
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--primary-600)' : 'var(--slate-600)',
                    textDecoration: 'none'
                  })}
                >
                  <Layers size={17} /> Active Contracts
                </NavLink>
              </>
            )}

            {isAuthenticated && role === 'client' && (
              <>
                <NavLink
                  to="/dashboard/client"
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--primary-600)' : 'var(--slate-600)',
                    textDecoration: 'none'
                  })}
                >
                  <Briefcase size={17} /> Client Cockpit
                </NavLink>
                <NavLink
                  to="/my-projects"
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--primary-600)' : 'var(--slate-600)',
                    textDecoration: 'none'
                  })}
                >
                  <Layers size={17} /> Projects & Contracts
                </NavLink>
                <Link to="/post-project" className="btn btn-primary btn-sm">
                  <PlusCircle size={16} /> Post Project
                </Link>
              </>
            )}

            {isAuthenticated && role === 'admin' && (
              <NavLink
                to="/admin"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--danger-600)' : 'var(--slate-600)',
                  textDecoration: 'none'
                })}
              >
                <Shield size={17} /> Admin Moderation
              </NavLink>
            )}
          </div>
        </div>

        {/* Right Section: Role switcher & User session */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Persona / Demo Role Switcher Quick Pill */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="btn btn-secondary btn-sm"
              title="Switch demo persona instantly"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderStyle: 'dashed' }}
            >
              <Sparkles size={14} color="var(--primary-600)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-700)' }}>
                Demo: <span style={{ color: 'var(--primary-700)', textTransform: 'capitalize' }}>{role}</span>
              </span>
              <ChevronDown size={14} />
            </button>

            {roleSwitcherOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: '0.5rem',
                  width: '260px',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--slate-200)',
                  padding: '0.6rem',
                  zIndex: 100
                }}
              >
                <div style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase' }}>
                  Quick Persona Switcher
                </div>
                <button
                  onClick={() => handleRoleSwitch('freelancer')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.5rem 0.6rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: role === 'freelancer' ? 'var(--primary-50)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-900)' }}>Alex Rivera</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Freelancer Persona</div>
                  </div>
                  <StatusBadge status="freelancer" />
                </button>

                <button
                  onClick={() => handleRoleSwitch('client')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.5rem 0.6rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: role === 'client' ? 'var(--primary-50)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginTop: '0.25rem'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-900)' }}>Sarah Jenkins</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Client / Hiring Persona</div>
                  </div>
                  <StatusBadge status="client" />
                </button>

                <button
                  onClick={() => handleRoleSwitch('admin')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.5rem 0.6rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: role === 'admin' ? 'var(--danger-50)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginTop: '0.25rem'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-900)' }}>SysAdmin Desk</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Admin & Moderation</div>
                  </div>
                  <StatusBadge status="admin" />
                </button>
              </div>
            )}
          </div>

          {/* User Account / Login */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--slate-200)'
                  }}
                />
                <div style={{ textAlign: 'left', display: 'none' }} className="nav-desktop-only">
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-900)' }}>
                    {currentUser?.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)', textTransform: 'capitalize' }}>
                    {currentUser?.role}
                  </div>
                </div>
                <ChevronDown size={14} color="var(--slate-500)" />
              </button>

              {userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginTop: '0.5rem',
                    width: '220px',
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--slate-200)',
                    padding: '0.5rem',
                    zIndex: 100
                  }}
                >
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--slate-100)', marginBottom: '0.35rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{currentUser.email}</div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--slate-700)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--slate-100)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <User size={16} /> View & Edit Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--danger-600)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      width: '100%',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--danger-50)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">Log In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Join FreelanceHub</Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              color: 'var(--slate-700)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1.25rem',
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--slate-200)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--slate-800)' }}
          >
            <Compass size={18} /> Browse Projects
          </Link>
          {isAuthenticated && role === 'freelancer' && (
            <>
              <Link
                to="/dashboard/freelancer"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--slate-800)' }}
              >
                <Briefcase size={18} /> Freelancer Hub
              </Link>
              <Link
                to="/proposals"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--slate-800)' }}
              >
                <FileCheck size={18} /> My Proposals
              </Link>
              <Link
                to="/my-projects"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--slate-800)' }}
              >
                <Layers size={18} /> Active Contracts
              </Link>
            </>
          )}
          {isAuthenticated && role === 'client' && (
            <>
              <Link
                to="/dashboard/client"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--slate-800)' }}
              >
                <Briefcase size={18} /> Client Cockpit
              </Link>
              <Link
                to="/post-project"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary btn-sm"
              >
                <PlusCircle size={16} /> Post Project
              </Link>
            </>
          )}
          {isAuthenticated && role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--danger-600)' }}
            >
              <Shield size={18} /> Admin Moderation
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--slate-800)' }}
            >
              <User size={18} /> Profile
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

