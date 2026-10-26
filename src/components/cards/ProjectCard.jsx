import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency, formatRelativeTime, truncateText } from '../../utils/formatters';
import { Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ProjectCard = ({ project, showClientDetails = true }) => {
  const { users } = useData();
  const client = users.find(u => u.id === project.clientId);

  return (
    <div className="card card-hover" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--primary-600)',
              backgroundColor: 'var(--primary-50)',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              {project.category}
            </span>
            <StatusBadge status={project.status} />
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={12} /> {formatRelativeTime(project.createdAt)}
            </span>
          </div>

          <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--slate-900)',
              lineHeight: 1.35,
              transition: 'color 0.15s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary-600)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--slate-900)')}
            >
              {project.title}
            </h3>
          </Link>
        </div>

        {/* Budget */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            {formatCurrency(project.budget, project.budgetType)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 500 }}>
            {project.budgetType} Price
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
        {truncateText(project.description, 160)}
      </p>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.requiredSkills?.map((skill, idx) => (
          <span key={idx} className="tag-pill">
            {skill}
          </span>
        ))}
      </div>

      {/* Footer details */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.875rem',
        borderTop: '1px solid var(--slate-100)',
        marginTop: 'auto',
        fontSize: '0.8125rem',
        color: 'var(--slate-500)'
      }}>
        {showClientDetails && client ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src={client.avatar}
              alt={client.name}
              style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontWeight: 600, color: 'var(--slate-700)' }}>{client.company || client.name}</span>
            {client.verified && (
              <span title="Verified Client" style={{ display: 'inline-flex' }}>
                <CheckCircle size={14} color="var(--primary-600)" />
              </span>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Users size={14} />
            <span>{project.proposalsCount || 0} proposal{project.proposalsCount === 1 ? '' : 's'}</span>
          </div>
        )}

        <Link
          to={`/projects/${project.id}`}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.3rem 0.75rem', fontSize: '0.8125rem' }}
        >
          View Scope <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

