import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency, formatRelativeTime } from '../../utils/formatters';
import { Star, Clock, Calendar, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ProposalCard = ({
  proposal,
  viewMode = 'client', // 'client' or 'freelancer'
  onAccept,
  onWithdraw
}) => {
  const { users, projects } = useData();
  const freelancer = users.find(u => u.id === proposal.freelancerId);
  const project = projects.find(p => p.id === proposal.projectId);

  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        {viewMode === 'client' && freelancer ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  {freelancer.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontSize: '0.8125rem', fontWeight: 700 }}>
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>{freelancer.rating || 5.0}</span>
                </div>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                {freelancer.title || 'Specialist'} &bull; ${freelancer.hourlyRate}/hr
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <StatusBadge status={proposal.status} />
              <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                Submitted {formatRelativeTime(proposal.createdAt)}
              </span>
            </div>
            {project && (
              <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  {project.title}
                </h4>
              </Link>
            )}
          </div>
        )}

        {/* Pricing & Timeframe */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            {formatCurrency(proposal.proposedPrice)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
            <Clock size={12} /> {proposal.deliveryDays} day delivery
          </div>
        </div>
      </div>

      {/* Cover Letter */}
      <div style={{
        backgroundColor: 'var(--slate-50)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--slate-100)',
        fontSize: '0.875rem',
        color: 'var(--slate-700)',
        lineHeight: 1.6
      }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          Pitch & Methodology
        </div>
        {proposal.coverLetter}
      </div>

      {/* Milestones preview if any */}
      {proposal.milestones && proposal.milestones.length > 0 && (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Proposed Milestone Breakdown ({proposal.milestones.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {proposal.milestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.35rem 0.6rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem'
                }}
              >
                <span style={{ color: 'var(--slate-700)' }}>{m.title}</span>
                <span style={{ fontWeight: 600, color: 'var(--slate-900)' }}>{formatCurrency(m.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Freelancer skills tags if in client view */}
      {viewMode === 'client' && freelancer?.skills && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {freelancer.skills.map((skill, idx) => (
            <span key={idx} className="tag-pill" style={{ fontSize: '0.7rem' }}>
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.875rem',
        borderTop: '1px solid var(--slate-100)',
        marginTop: 'auto'
      }}>
        {viewMode === 'client' ? (
          <>
            <StatusBadge status={proposal.status} />
            {proposal.status === 'Pending' && (
              <button
                onClick={() => onAccept && onAccept(proposal.id)}
                className="btn btn-primary btn-sm"
              >
                <CheckCircle2 size={16} /> Accept Proposal & Hire
              </button>
            )}
            {proposal.status === 'Accepted' && (
              <Link to="/my-projects" className="btn btn-secondary btn-sm">
                Open Workspace <ArrowUpRight size={14} />
              </Link>
            )}
          </>
        ) : (
          <>
            <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
              Target: {project?.budgetType || 'Fixed'} (${project?.budget || 0})
            </div>
            {proposal.status === 'Pending' && onWithdraw && (
              <button
                onClick={() => onWithdraw(proposal.id)}
                className="btn btn-danger btn-sm"
              >
                <XCircle size={14} /> Withdraw Proposal
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

