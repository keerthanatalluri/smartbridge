import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StatsCard } from '../components/cards/StatsCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatCurrency, formatRelativeTime } from '../utils/formatters';
import {
  DollarSign,
  FileCheck,
  Award,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  User,
  Briefcase
} from 'lucide-react';

export const FreelancerDashboard = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const { projects, proposals, contracts, addToast } = useData();

  // Metrics
  const myProposals = useMemo(() => {
    return proposals.filter(p => p.freelancerId === currentUser?.id);
  }, [proposals, currentUser]);

  const activeBids = myProposals.filter(p => p.status === 'Pending').length;
  const wonContracts = contracts.filter(c => c.freelancerId === currentUser?.id);
  const activeContracts = wonContracts.filter(c => c.status === 'In Progress');

  // Profile completion calculation
  const profileScore = useMemo(() => {
    if (!currentUser) return 50;
    let score = 20; // base
    if (currentUser.bio && currentUser.bio.length > 20) score += 20;
    if (currentUser.skills && currentUser.skills.length >= 3) score += 20;
    if (currentUser.portfolioLinks && currentUser.portfolioLinks.length >= 1) score += 20;
    if (currentUser.hourlyRate > 0) score += 10;
    if (currentUser.avatar) score += 10;
    return Math.min(100, score);
  }, [currentUser]);

  // Recommended projects matched to current user's skills
  const recommendedProjects = useMemo(() => {
    const userSkills = (currentUser?.skills || []).map(s => s.toLowerCase());
    return projects
      .filter(p => p.status === 'Open')
      .map(p => {
        const matches = (p.requiredSkills || []).filter(s => userSkills.includes(s.toLowerCase())).length;
        return { ...p, matchesCount: matches };
      })
      .sort((a, b) => b.matchesCount - a.matchesCount)
      .slice(0, 3);
  }, [projects, currentUser]);

  const toggleAvailability = () => {
    const nextStatus = currentUser?.availability === 'Available' ? 'Busy' : 'Available';
    updateUserProfile({ availability: nextStatus });
    addToast('Availability Updated', 'info', `Status is now: ${nextStatus}`);
  };

  return (
    <div className="max-w-7xl" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Welcome & Top Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--slate-200)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Welcome, {currentUser?.name}!
              </h1>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.55rem',
                borderRadius: '9999px',
                backgroundColor: currentUser?.availability === 'Available' ? '#ecfdf5' : '#fef2f2',
                color: currentUser?.availability === 'Available' ? '#047857' : '#b91c1c',
                border: `1px solid ${currentUser?.availability === 'Available' ? '#a7f3d0' : '#fecaca'}`,
                cursor: 'pointer'
              }}
              onClick={toggleAvailability}
              title="Click to toggle availability"
              >
                ● {currentUser?.availability || 'Available'} (click to change)
              </span>
            </div>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>
              {currentUser?.title || 'Senior Freelance Specialist'} &bull; ${currentUser?.hourlyRate || 65}/hr
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/proposals" className="btn btn-secondary btn-sm">
            <FileCheck size={16} /> My Proposals ({myProposals.length})
          </Link>
          <Link to="/my-projects" className="btn btn-primary btn-sm">
            <Layers size={16} /> Contract Workspaces ({activeContracts.length})
          </Link>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <StatsCard
          title="Total Lifetime Earnings"
          value={formatCurrency(currentUser?.totalEarnings || 34200)}
          subtitle="Direct milestone payouts"
          icon={<DollarSign size={20} />}
          color="green"
          trend="+18% MoM"
        />

        <StatsCard
          title="Active Bids & Proposals"
          value={activeBids}
          subtitle="Proposals pending review"
          icon={<FileCheck size={20} />}
          color="blue"
        />

        <StatsCard
          title="Won Contracts"
          value={wonContracts.length}
          subtitle={`${activeContracts.length} currently in progress`}
          icon={<Layers size={20} />}
          color="purple"
        />

        <StatsCard
          title="Client Feedback Rating"
          value={currentUser?.rating ? `${currentUser.rating} ★` : '4.9 ★'}
          subtitle={`${currentUser?.reviewsCount || 28} verified reviews`}
          icon={<Star size={20} />}
          color="amber"
        />
      </div>

      {/* Profile Completion Meter */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2.5rem', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="var(--primary-600)" />
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--slate-900)' }}>
              Profile Strength & Client Visibility Score
            </span>
          </div>
          <span style={{ fontWeight: 800, color: 'var(--primary-600)', fontSize: '1rem' }}>
            {profileScore}%
          </span>
        </div>

        <div style={{
          height: '8px',
          width: '100%',
          backgroundColor: 'var(--slate-100)',
          borderRadius: '9999px',
          overflow: 'hidden',
          marginBottom: '0.75rem'
        }}>
          <div style={{
            height: '100%',
            width: `${profileScore}%`,
            background: 'linear-gradient(90deg, var(--primary-600) 0%, #10b981 100%)',
            borderRadius: '9999px',
            transition: 'width 0.5s ease'
          }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--slate-500)', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span>Add more verified portfolio links and skills to unlock Top-Rated badge.</span>
          <Link to="/profile" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>
            Edit Profile &rarr;
          </Link>
        </div>
      </div>

      {/* Two-Column Section: Recommended Projects vs Active Proposals Activity */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '2rem',
        alignItems: 'start'
      }} className="lg-grid-cols-1">
        {/* Recommended Projects matched to skills */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Recommended for Your Skills
            </h3>
            <Link to="/projects" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary-600)' }}>
              Browse All &rarr;
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {recommendedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Right side: My Recent Proposals & Active Contracts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Active Proposals Tracker */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Recent Proposals
              </h4>
              <Link to="/proposals" style={{ fontSize: '0.8125rem', color: 'var(--primary-600)', fontWeight: 600 }}>
                View All ({myProposals.length})
              </Link>
            </div>

            {myProposals.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {myProposals.slice(0, 4).map(prop => {
                  const targetProj = projects.find(p => p.id === prop.projectId);
                  return (
                    <div
                      key={prop.id}
                      style={{
                        padding: '0.875rem',
                        backgroundColor: 'var(--slate-50)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--slate-100)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Link to={`/projects/${prop.projectId}`} style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-900)', textDecoration: 'none' }}>
                          {targetProj?.title || 'Project Proposal'}
                        </Link>
                        <StatusBadge status={prop.status} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                        <span>Bid: {formatCurrency(prop.proposedPrice)}</span>
                        <span>{formatRelativeTime(prop.createdAt)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--slate-400)', fontSize: '0.875rem' }}>
                No proposals submitted yet. Browse open projects to place your first bid!
              </div>
            )}
          </div>

          {/* Active Contracts Quick Launch */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Ongoing Contracts ({activeContracts.length})
              </h4>
              <Link to="/my-projects" style={{ fontSize: '0.8125rem', color: 'var(--primary-600)', fontWeight: 600 }}>
                Open Workspace &rarr;
              </Link>
            </div>

            {activeContracts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {activeContracts.map(cnt => (
                  <div
                    key={cnt.id}
                    style={{
                      padding: '0.875rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--primary-100)',
                      backgroundColor: 'var(--primary-50)'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--primary-900)', marginBottom: '0.25rem' }}>
                      {cnt.projectTitle}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--primary-700)' }}>
                      <span>Value: {formatCurrency(cnt.totalAmount)}</span>
                      <span>Paid: {formatCurrency(cnt.paidAmount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--slate-400)', fontSize: '0.875rem' }}>
                No active contracts at this time.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

