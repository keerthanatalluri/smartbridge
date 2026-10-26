import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';
import { POPULAR_SKILLS } from '../data/sampleData';
import {
  User,
  Building,
  Globe,
  MapPin,
  Mail,
  Edit3,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Star,
  Award
} from 'lucide-react';

export const Profile = () => {
  const { currentUser, role, updateUserProfile } = useAuth();
  const { addToast } = useData();

  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [name, setName] = useState(currentUser?.name || '');
  const [title, setTitle] = useState(currentUser?.title || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [hourlyRate, setHourlyRate] = useState(currentUser?.hourlyRate || 65);
  const [location, setLocation] = useState(currentUser?.location || 'San Francisco, CA');
  const [company, setCompany] = useState(currentUser?.company || '');
  const [industry, setIndustry] = useState(currentUser?.industry || '');
  const [website, setWebsite] = useState(currentUser?.website || '');
  const [availability, setAvailability] = useState(currentUser?.availability || 'Available');
  const [skills, setSkills] = useState(currentUser?.skills || ['React', 'JavaScript']);
  const [skillInput, setSkillInput] = useState('');
  const [portfolioLinks, setPortfolioLinks] = useState(currentUser?.portfolioLinks || []);

  // New portfolio entry state
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortUrl, setNewPortUrl] = useState('');
  const [newPortDesc, setNewPortDesc] = useState('');
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);

  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || skillInput).trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddPortfolio = () => {
    if (!newPortTitle.trim() || !newPortUrl.trim()) return;
    const newEntry = {
      id: `port_${Date.now()}`,
      title: newPortTitle.trim(),
      url: newPortUrl.trim(),
      desc: newPortDesc.trim()
    };
    setPortfolioLinks([...portfolioLinks, newEntry]);
    setNewPortTitle('');
    setNewPortUrl('');
    setNewPortDesc('');
    setShowAddPortfolio(false);
  };

  const handleRemovePortfolio = (id) => {
    setPortfolioLinks(portfolioLinks.filter(p => p.id !== id));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      title,
      bio,
      hourlyRate: Number(hourlyRate),
      location,
      company,
      industry,
      website,
      availability,
      skills,
      portfolioLinks
    });
    setIsEditing(false);
    addToast('Profile Updated Successfully', 'success');
  };

  return (
    <div className="max-w-5xl" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Profile Header Banner */}
      <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--primary-200)',
                boxShadow: 'var(--shadow-md)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {currentUser?.name}
                </h1>
                <StatusBadge status={role} />
                {currentUser?.verified && (
                  <span title="Verified Identity" style={{ display: 'inline-flex' }}>
                    <ShieldCheck size={20} color="var(--primary-600)" />
                  </span>
                )}
              </div>
              <p style={{ color: 'var(--slate-600)', fontSize: '1rem', fontWeight: 500 }}>
                {role === 'client' ? (currentUser?.company || 'Company Studio') : (currentUser?.title || 'Freelance Specialist')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.8125rem', color: 'var(--slate-500)', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Mail size={14} /> {currentUser?.email}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} /> {currentUser?.location || 'Global'}
                </span>
                {role === 'freelancer' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f59e0b', fontWeight: 700 }}>
                    <Star size={14} fill="#f59e0b" /> {currentUser?.rating || 5.0} Rating ({currentUser?.completedProjectsCount || 0} completed)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? 'btn btn-secondary' : 'btn btn-primary'}
            >
              <Edit3 size={16} /> {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content / Edit Form */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--slate-900)' }}>
            Edit Profile Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="md-grid-cols-1">
            <div className="form-group">
              <label className="form-label" htmlFor="edit-name">Full Name</label>
              <input
                id="edit-name"
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="edit-location">Location</label>
              <input
                id="edit-location"
                type="text"
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {role === 'client' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="md-grid-cols-1">
              <div className="form-group">
                <label className="form-label" htmlFor="edit-company">Company Name</label>
                <input
                  id="edit-company"
                  type="text"
                  className="form-input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="edit-industry">Industry</label>
                <input
                  id="edit-industry"
                  type="text"
                  className="form-input"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="edit-website">Website URL</label>
                <input
                  id="edit-website"
                  type="url"
                  className="form-input"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="md-grid-cols-1">
              <div className="form-group">
                <label className="form-label" htmlFor="edit-title">Professional Title</label>
                <input
                  id="edit-title"
                  type="text"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="edit-rate">Hourly Rate ($/hr)</label>
                <input
                  id="edit-rate"
                  type="number"
                  className="form-input"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="edit-avail">Availability</label>
                <select
                  id="edit-avail"
                  className="form-select"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="Available">Available for Contracts</option>
                  <option value="Busy">Currently Busy</option>
                </select>
              </div>
            </div>
          )}

          {/* Bio */}
          <div className="form-group">
            <label className="form-label" htmlFor="edit-bio">Professional Bio & Experience Summary</label>
            <textarea
              id="edit-bio"
              className="form-textarea"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* Skills Management (Freelancers) */}
          {role === 'freelancer' && (
            <div className="form-group">
              <label className="form-label">Specialist Skills</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add skill tag..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill()}
                  className="btn btn-secondary"
                >
                  Add
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skills.map(s => (
                  <span key={s} className="tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    {s}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s)}
                      style={{ background: 'none', border: 'none', color: 'var(--slate-500)', cursor: 'pointer' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Check size={16} /> Save Profile Changes
            </button>
          </div>
        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Bio Section */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              About
            </h3>
            <p style={{ color: 'var(--slate-700)', lineHeight: 1.7, fontSize: '0.9375rem', whiteSpace: 'pre-line' }}>
              {currentUser?.bio || 'No bio provided yet. Click "Edit Profile" to share your expertise and history.'}
            </p>
          </div>

          {/* Skills Section for Freelancers */}
          {role === 'freelancer' && (
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
                Skills & Technologies
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {currentUser?.skills?.map((s, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--primary-50)',
                      color: 'var(--primary-700)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      border: '1px solid var(--primary-200)'
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Showcase */}
          {role === 'freelancer' && (
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  Portfolio Showcase
                </h3>
                <button
                  onClick={() => setShowAddPortfolio(!showAddPortfolio)}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus size={14} /> Add Project Link
                </button>
              </div>

              {/* Add portfolio inline form */}
              {showAddPortfolio && (
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--slate-50)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--slate-200)',
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    Add Portfolio Project
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '0.75rem' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Project Title (e.g. AI Prompt Studio)"
                      value={newPortTitle}
                      onChange={(e) => setNewPortTitle(e.target.value)}
                    />
                    <input
                      type="url"
                      className="form-input"
                      placeholder="Live URL (https://...)"
                      value={newPortUrl}
                      onChange={(e) => setNewPortUrl(e.target.value)}
                    />
                  </div>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    placeholder="Brief description of your role and tech used..."
                    value={newPortDesc}
                    onChange={(e) => setNewPortDesc(e.target.value)}
                    style={{ marginBottom: '0.75rem' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowAddPortfolio(false)}
                      className="btn btn-secondary btn-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddPortfolio}
                      className="btn btn-primary btn-sm"
                    >
                      Save Portfolio Project
                    </button>
                  </div>
                </div>
              )}

              {/* Portfolio Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {(currentUser?.portfolioLinks || []).map((port) => (
                  <div
                    key={port.id || port.title}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--slate-200)',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.75rem'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
                        {port.title}
                      </h4>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                        {port.desc}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--slate-100)' }}>
                      <a
                        href={port.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--primary-600)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        Visit Project <ExternalLink size={12} />
                      </a>
                      <button
                        onClick={() => handleRemovePortfolio(port.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer' }}
                        title="Delete item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

