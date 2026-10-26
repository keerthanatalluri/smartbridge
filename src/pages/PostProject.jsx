import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Modal } from '../components/common/Modal';
import { validateProjectForm } from '../utils/validation';
import { CATEGORIES, POPULAR_SKILLS } from '../data/sampleData';
import { formatCurrency, formatDate } from '../utils/formatters';
import {
  PlusCircle,
  X,
  Eye,
  Send,
  Calendar,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const PostProject = () => {
  const { currentUser } = useAuth();
  const { addProject } = useData();
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [budgetType, setBudgetType] = useState('Fixed');
  const [budget, setBudget] = useState(2500);
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
  );
  const [scopeLevel, setScopeLevel] = useState('Intermediate');
  const [requiredSkills, setRequiredSkills] = useState(['React', 'TypeScript', 'Tailwind CSS']);
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  // Skill chip handlers
  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || skillInput).trim();
    if (trimmed && !requiredSkills.includes(trimmed)) {
      setRequiredSkills([...requiredSkills, trimmed]);
      setSkillInput('');
    }
  };

  const handleKeyDownSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const { isValid, errors: validationErrors } = validateProjectForm({
      title,
      description,
      category,
      requiredSkills,
      budget,
      deadline
    });

    if (!isValid) {
      setErrors(validationErrors);
      setShowPreview(false);
      return;
    }

    const created = addProject({
      title,
      description,
      category,
      budgetType,
      budget: Number(budget),
      deadline,
      scopeLevel,
      requiredSkills
    }, currentUser);

    navigate(`/projects/${created.id}`);
  };

  return (
    <div className="max-w-5xl" style={{ padding: '2.5rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Create & Post a Project
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
          Publish your technical requirements to receive vetted candidate proposals with milestone breakdowns.
        </p>
      </div>

      <div className="card" style={{ padding: '2.5rem' }}>
        <form onSubmit={(e) => { e.preventDefault(); setShowPreview(true); }}>
          {/* Project Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="project-title">
              Project Title *
            </label>
            <input
              id="project-title"
              type="text"
              className="form-input"
              placeholder="e.g. Next.js SaaS Analytics Cockpit with Stripe Billing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <div className="form-error"><AlertCircle size={14} /> {errors.title}</div>
            )}
          </div>

          {/* Category & Scope */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem'
          }} className="md-grid-cols-1">
            <div className="form-group">
              <label className="form-label" htmlFor="project-category">Category *</label>
              <select
                id="project-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.filter(c => c !== 'All Categories').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="project-scope">Experience Scope</label>
              <select
                id="project-scope"
                className="form-select"
                value={scopeLevel}
                onChange={(e) => setScopeLevel(e.target.value)}
              >
                <option value="Entry">Entry Level (Junior - Mid)</option>
                <option value="Intermediate">Intermediate (Proven Delivery)</option>
                <option value="Expert">Expert (Principal / Staff Level)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="project-desc">
              Project Description & Key Deliverables *
            </label>
            <textarea
              id="project-desc"
              className="form-textarea"
              rows={6}
              placeholder="Detail your architecture requirements, user personas, third-party integrations, and expectations..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <div className="form-error"><AlertCircle size={14} /> {errors.description}</div>
            )}
          </div>

          {/* Skills Management */}
          <div className="form-group">
            <label className="form-label">
              Required Skills & Technologies *
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Type a skill and press Add or Enter..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleKeyDownSkill}
              />
              <button
                type="button"
                onClick={() => handleAddSkill()}
                className="btn btn-secondary"
              >
                Add
              </button>
            </div>

            {/* Selected Skills Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {requiredSkills.map(skill => (
                <span
                  key={skill}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.3rem 0.65rem',
                    backgroundColor: 'var(--primary-50)',
                    color: 'var(--primary-700)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    border: '1px solid var(--primary-200)'
                  }}
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-600)', display: 'flex' }}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span>Suggestions:</span>
              {POPULAR_SKILLS.filter(s => !requiredSkills.includes(s)).slice(0, 6).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAddSkill(s)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-600)',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  + {s}
                </button>
              ))}
            </div>
            {errors.requiredSkills && (
              <div className="form-error"><AlertCircle size={14} /> {errors.requiredSkills}</div>
            )}
          </div>

          {/* Pricing Model & Budget & Deadline */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            padding: '1.5rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            marginBottom: '2rem'
          }} className="md-grid-cols-1">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Budget Type</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setBudgetType('Fixed')}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: budgetType === 'Fixed' ? '1px solid var(--primary-600)' : '1px solid var(--slate-300)',
                    backgroundColor: budgetType === 'Fixed' ? 'var(--primary-50)' : '#ffffff',
                    color: budgetType === 'Fixed' ? 'var(--primary-700)' : 'var(--slate-700)',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    cursor: 'pointer'
                  }}
                >
                  Fixed Price
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetType('Hourly')}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: budgetType === 'Hourly' ? '1px solid var(--primary-600)' : '1px solid var(--slate-300)',
                    backgroundColor: budgetType === 'Hourly' ? 'var(--primary-50)' : '#ffffff',
                    color: budgetType === 'Hourly' ? 'var(--primary-700)' : 'var(--slate-700)',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    cursor: 'pointer'
                  }}
                >
                  Hourly Rate
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="project-budget">
                {budgetType === 'Fixed' ? 'Total Project Budget ($)' : 'Hourly Rate ($/hr)'} *
              </label>
              <input
                id="project-budget"
                type="number"
                className="form-input"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                min="1"
              />
              {errors.budget && (
                <div className="form-error"><AlertCircle size={14} /> {errors.budget}</div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="project-deadline">Target Completion Date *</label>
              <input
                id="project-deadline"
                type="date"
                className="form-input"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              {errors.deadline && (
                <div className="form-error"><AlertCircle size={14} /> {errors.deadline}</div>
              )}
            </div>
          </div>

          {/* Form Actions: Preview Modal Trigger & Direct Publish */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => {
                const { isValid, errors: validationErrors } = validateProjectForm({
                  title,
                  description,
                  category,
                  requiredSkills,
                  budget,
                  deadline
                });
                if (!isValid) {
                  setErrors(validationErrors);
                } else {
                  setErrors({});
                  setShowPreview(true);
                }
              }}
              className="btn btn-secondary"
            >
              <Eye size={16} /> Instant Live Preview
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary btn-lg"
            >
              <Send size={18} /> Publish Project Listing
            </button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Listing Preview"
        subtitle="This is how freelancers will see your project in the marketplace feed."
        maxWidth="680px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-600)', backgroundColor: 'var(--primary-50)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                {category}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.4rem' }}>
                {title || 'Untitled Project'}
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                {formatCurrency(budget, budgetType)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{budgetType}</div>
            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--slate-700)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {description || 'No description provided.'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {requiredSkills.map(s => (
              <span key={s} className="tag-pill">{s}</span>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1rem',
            borderTop: '1px solid var(--slate-100)',
            marginTop: '0.5rem'
          }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
              Deadline: {formatDate(deadline)} &bull; Scope: {scopeLevel}
            </span>
            <button
              onClick={handleSubmit}
              className="btn btn-primary btn-sm"
            >
              Looks Great – Publish Now &rarr;
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

