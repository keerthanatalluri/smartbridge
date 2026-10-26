import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatCurrency, formatDate, formatRelativeTime } from '../utils/formatters';
import { validateProposalForm } from '../utils/validation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Layers,
  Send,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  UserCheck,
  Building,
  Globe,
  MapPin,
  ShieldCheck,
  Lock
} from 'lucide-react';

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, proposals, users, submitProposal } = useData();
  const { currentUser, isAuthenticated, role, loginAs } = useAuth();

  const project = projects.find(p => p.id === id);
  const client = users.find(u => u.id === project?.clientId);

  // Proposal Form State
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedPrice, setProposedPrice] = useState(project?.budget || 2000);
  const [deliveryDays, setDeliveryDays] = useState(14);
  const [milestones, setMilestones] = useState([
    { title: 'Initial Concept & Architecture', amount: Math.round((project?.budget || 2000) / 2) },
    { title: 'Final Implementation & Testing', amount: (project?.budget || 2000) - Math.round((project?.budget || 2000) / 2) }
  ]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!project) {
    return (
      <div className="max-w-5xl" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Project Not Found</h2>
        <p style={{ color: 'var(--slate-500)', marginBottom: '1.5rem' }}>
          This project may have been closed or removed by administrators.
        </p>
        <Link to="/projects" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  // Check if current freelancer already submitted a proposal
  const existingProposal = isAuthenticated && role === 'freelancer'
    ? proposals.find(p => p.projectId === project.id && p.freelancerId === currentUser?.id && p.status !== 'Withdrawn')
    : null;

  // Milestone helpers
  const handleAddMilestone = () => {
    setMilestones([...milestones, { title: `Deliverable ${milestones.length + 1}`, amount: 500 }]);
  };

  const handleRemoveMilestone = (index) => {
    if (milestones.length <= 1) return;
    setMilestones(milestones.filter((_, idx) => idx !== index));
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = field === 'amount' ? Number(value) : value;
    setMilestones(updated);
  };

  const milestoneTotal = milestones.reduce((sum, m) => sum + (Number(m.amount) || 0), 0);

  const handleSubmitProposal = (e) => {
    e.preventDefault();

    const { isValid, errors } = validateProposalForm({
      coverLetter,
      proposedPrice,
      deliveryDays
    });

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const result = submitProposal({
      projectId: project.id,
      coverLetter,
      proposedPrice: Number(proposedPrice),
      deliveryDays: Number(deliveryDays),
      milestones
    }, currentUser);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/proposals');
    }
  };

  return (
    <div className="max-w-7xl" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary btn-sm"
        style={{ marginBottom: '1.5rem' }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Main Grid: Details + Proposal / Client sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '2.5rem',
        alignItems: 'start'
      }} className="lg-grid-cols-1">
        {/* Left Column: Project Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            {/* Meta Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--primary-700)',
                backgroundColor: 'var(--primary-50)',
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--primary-200)'
              }}>
                {project.category}
              </span>
              <StatusBadge status={project.status} />
              <span style={{ fontSize: '0.8125rem', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={14} /> Posted {formatRelativeTime(project.createdAt)}
              </span>
            </div>

            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1.3, marginBottom: '1.5rem' }}>
              {project.title}
            </h1>

            {/* Quick KPI stats strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              backgroundColor: 'var(--slate-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-100)',
              marginBottom: '2rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Budget
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {formatCurrency(project.budget, project.budgetType)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{project.budgetType} Price</div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Experience
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  {project.scopeLevel || 'Intermediate'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Expertise Level</div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Deadline
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  {formatDate(project.deadline)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Target Delivery</div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Activity
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  {project.proposalsCount || 0} Proposals
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Submitted Bids</div>
              </div>
            </div>

            {/* Scope & Description */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
                Project Description & Scope
              </h3>
              <div style={{
                fontSize: '0.9375rem',
                color: 'var(--slate-700)',
                lineHeight: 1.8,
                whiteSpace: 'pre-line'
              }}>
                {project.description}
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
                Required Skills & Tech Stack
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.requiredSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--primary-50)',
                      color: 'var(--primary-700)',
                      border: '1px solid var(--primary-200)',
                      fontSize: '0.8125rem',
                      fontWeight: 600
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Proposal Submission Panel for Freelancers */}
          {isAuthenticated && role === 'freelancer' && (
            <div className="card" style={{ padding: '2rem', border: '2px solid var(--primary-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Send size={20} color="var(--primary-600)" />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  Submit a Bid & Milestone Proposal
                </h3>
              </div>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Describe your technical approach, timeline, and proposed milestone release schedule.
              </p>

              {existingProposal ? (
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={20} />
                    You have already submitted a proposal for this project!
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#065f46', marginBottom: '1rem' }}>
                    Your proposed bid of <strong>{formatCurrency(existingProposal.proposedPrice)}</strong> is currently <strong>{existingProposal.status}</strong> with the client.
                  </p>
                  <Link to="/proposals" className="btn btn-secondary btn-sm" style={{ backgroundColor: '#ffffff' }}>
                    View Proposal Status in Hub &rarr;
                  </Link>
                </div>
              ) : project.status !== 'Open' ? (
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: 'var(--radius-lg)',
                  color: '#92400e',
                  fontSize: '0.875rem'
                }}>
                  This project is currently <strong>{project.status}</strong> and is not accepting further proposals.
                </div>
              ) : (
                <form onSubmit={handleSubmitProposal}>
                  {/* Proposed price & Delivery days */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.25rem',
                    marginBottom: '1.25rem'
                  }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="prop-price">Your Proposed Total Price ($)</label>
                      <input
                        id="prop-price"
                        type="number"
                        className="form-input"
                        value={proposedPrice}
                        onChange={(e) => setProposedPrice(e.target.value)}
                        min="1"
                      />
                      {formErrors.proposedPrice && (
                        <div className="form-error"><AlertCircle size={14} /> {formErrors.proposedPrice}</div>
                      )}
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="prop-delivery">Delivery Timeframe (Days)</label>
                      <input
                        id="prop-delivery"
                        type="number"
                        className="form-input"
                        value={deliveryDays}
                        onChange={(e) => setDeliveryDays(e.target.value)}
                        min="1"
                        max="365"
                      />
                      {formErrors.deliveryDays && (
                        <div className="form-error"><AlertCircle size={14} /> {formErrors.deliveryDays}</div>
                      )}
                    </div>
                  </div>

                  {/* Cover letter with character count */}
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <label className="form-label" htmlFor="prop-cover-letter" style={{ margin: 0 }}>
                        Cover Letter & Execution Plan
                      </label>
                      <span style={{ fontSize: '0.75rem', color: coverLetter.length < 30 ? 'var(--danger-500)' : 'var(--slate-400)' }}>
                        {coverLetter.length} chars (min 30)
                      </span>
                    </div>
                    <textarea
                      id="prop-cover-letter"
                      className="form-textarea"
                      rows={5}
                      placeholder="Explain your technical stack, architecture plan, and why your experience fits this project perfectly..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                    {formErrors.coverLetter && (
                      <div className="form-error"><AlertCircle size={14} /> {formErrors.coverLetter}</div>
                    )}
                  </div>

                  {/* Milestone Breakdown Builder */}
                  <div style={{
                    marginBottom: '1.5rem',
                    padding: '1.25rem',
                    backgroundColor: 'var(--slate-50)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--slate-200)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                          Milestone Budget Breakdown
                        </h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                          Total milestones sum: <strong>${milestoneTotal}</strong>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddMilestone}
                        className="btn btn-secondary btn-sm"
                      >
                        <Plus size={14} /> Add Milestone
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {milestones.map((m, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            className="form-input"
                            style={{ flex: 2 }}
                            placeholder={`Milestone ${idx + 1} deliverable description`}
                            value={m.title}
                            onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                          />
                          <div style={{ position: 'relative', flex: 1 }}>
                            <span style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)', fontSize: '0.85rem' }}>$</span>
                            <input
                              type="number"
                              className="form-input"
                              style={{ paddingLeft: '1.5rem' }}
                              placeholder="Amount"
                              value={m.amount}
                              onChange={(e) => handleMilestoneChange(idx, 'amount', e.target.value)}
                            />
                          </div>
                          {milestones.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMilestone(idx)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--danger-500)',
                                cursor: 'pointer',
                                padding: '0.4rem'
                              }}
                              title="Remove milestone"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                  >
                    <Send size={18} /> Submit Formal Proposal
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Not logged in banner */}
          {!isAuthenticated && (
            <div className="card" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8fafc' }}>
              <Lock size={32} color="var(--slate-400)" style={{ margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Sign In to Place a Bid
              </h3>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Join FreelanceHub as a vetted freelancer or log in with our 1-click demo to submit a proposal.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button onClick={() => loginAs('freelancer')} className="btn btn-primary btn-sm">
                  1-Click Demo As Freelancer
                </button>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Sign In
                </Link>
              </div>
            </div>
          )}

          {/* Client or Admin viewing note */}
          {isAuthenticated && role !== 'freelancer' && (
            <div className="card" style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderLeft: '4px solid var(--primary-500)' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--slate-700)' }}>
                You are currently viewing this project as <strong>{currentUser.name}</strong> ({role}). Only freelancer accounts can submit bids.
              </div>
              <button
                onClick={() => loginAs('freelancer')}
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '0.75rem' }}
              >
                Switch to Freelancer Persona to Bid
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Client Trust Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {client && (
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                About the Client
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <img
                  src={client.avatar}
                  alt={client.name}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--slate-200)' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                      {client.name}
                    </h4>
                    {client.verified && (
                      <span title="Verified Client Identity">
                        <CheckCircle2 size={16} color="var(--primary-600)" />
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                    {client.company || 'Enterprise Client'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                {client.industry && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building size={16} color="var(--slate-400)" />
                    <span>{client.industry}</span>
                  </div>
                )}
                {client.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} color="var(--slate-400)" />
                    <span>{client.location}</span>
                  </div>
                )}
                {client.website && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={16} color="var(--slate-400)" />
                    <a href={client.website} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-600)' }}>
                      {client.website.replace('https://', '')}
                    </a>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={16} color="#10b981" />
                  <span>Verified Payment Method</span>
                </div>
              </div>

              <div style={{
                marginTop: '1.25rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--slate-100)',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>Total Spent</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                    {formatCurrency(client.totalSpent || 0)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>Projects Posted</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                    {client.projectsCount || 1}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Escrow Guarantee Card */}
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-700)', fontWeight: 700, marginBottom: '0.5rem' }}>
              <ShieldCheck size={20} />
              Platform Escrow Protection
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
              Funds are held securely by FreelanceHub. Milestone payments are only disbursed when the client approves the deliverables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

