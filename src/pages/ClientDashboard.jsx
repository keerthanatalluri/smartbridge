import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StatsCard } from '../components/cards/StatsCard';
import { ProposalCard } from '../components/cards/ProposalCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatCurrency, formatRelativeTime } from '../utils/formatters';
import {
  DollarSign,
  Briefcase,
  Users,
  FileCheck,
  PlusCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Building,
  CheckCircle2
} from 'lucide-react';

export const ClientDashboard = () => {
  const { currentUser } = useAuth();
  const { projects, proposals, contracts, acceptProposal } = useData();

  // Client's projects
  const myProjects = useMemo(() => {
    return projects.filter(p => p.clientId === currentUser?.id);
  }, [projects, currentUser]);

  const openProjects = myProjects.filter(p => p.status === 'Open');
  const inProgressProjects = myProjects.filter(p => p.status === 'In Progress');
  const myProjectIds = myProjects.map(p => p.id);

  // Incoming proposals for this client
  const incomingProposals = useMemo(() => {
    return proposals.filter(p => myProjectIds.includes(p.projectId));
  }, [proposals, myProjectIds]);

  const pendingProposals = incomingProposals.filter(p => p.status === 'Pending');

  // Client active contracts
  const myContracts = contracts.filter(c => c.clientId === currentUser?.id);

  return (
    <div className="max-w-7xl" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Top Banner with Post Project CTA */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                {currentUser?.name}
              </h1>
              {currentUser?.verified && (
                <span title="Verified Enterprise Client">
                  <CheckCircle2 size={18} color="var(--primary-600)" />
                </span>
              )}
            </div>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>
              {currentUser?.company || 'Company Studio'} &bull; Client Cockpit
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/my-projects" className="btn btn-secondary btn-sm">
            <Layers size={16} /> Contracts ({myContracts.length})
          </Link>
          <Link to="/post-project" className="btn btn-primary">
            <PlusCircle size={18} /> Post New Project
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
          title="Total Capital Deployed"
          value={formatCurrency(currentUser?.totalSpent || 18400)}
          subtitle="Simulated escrow & releases"
          icon={<DollarSign size={20} />}
          color="blue"
        />

        <StatsCard
          title="Open Project Listings"
          value={openProjects.length}
          subtitle="Actively accepting bids"
          icon={<Briefcase size={20} />}
          color="purple"
        />

        <StatsCard
          title="Contracts In Progress"
          value={inProgressProjects.length}
          subtitle="Active sprint deliverables"
          icon={<Layers size={20} />}
          color="green"
        />

        <StatsCard
          title="Pending Bids to Review"
          value={pendingProposals.length}
          subtitle="Incoming candidate proposals"
          icon={<FileCheck size={20} />}
          color="amber"
        />
      </div>

      {/* Main Grid: Pending Proposals Review + Project Listings */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.3fr 1fr',
        gap: '2rem',
        alignItems: 'start'
      }} className="lg-grid-cols-1">
        {/* Left Column: Quick Candidate Review Desk */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Incoming Proposals to Review
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                Accepting a candidate automatically initiates a milestone contract.
              </p>
            </div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: 'var(--warning-50)',
              color: 'var(--warning-600)',
              padding: '0.2rem 0.55rem',
              borderRadius: '9999px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              {pendingProposals.length} Awaiting Review
            </span>
          </div>

          {pendingProposals.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {pendingProposals.map(prop => (
                <ProposalCard
                  key={prop.id}
                  proposal={prop}
                  viewMode="client"
                  onAccept={acceptProposal}
                />
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--slate-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'var(--slate-400)'
              }}>
                <FileCheck size={28} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
                All proposals reviewed!
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', maxWidth: '380px', margin: '0 auto 1.25rem' }}>
                You have handled all incoming proposals. Post a new project or manage existing active contracts.
              </p>
              <Link to="/post-project" className="btn btn-primary btn-sm">
                <PlusCircle size={14} /> Post Project
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Client's Project Listings */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              My Projects ({myProjects.length})
            </h3>
            <Link to="/post-project" style={{ fontSize: '0.8125rem', color: 'var(--primary-600)', fontWeight: 600 }}>
              + Create New
            </Link>
          </div>

          {myProjects.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {myProjects.map(proj => (
                <div key={proj.id} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <Link to={`/projects/${proj.id}`} style={{ textDecoration: 'none' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                        {proj.title}
                      </h4>
                    </Link>
                    <StatusBadge status={proj.status} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--slate-500)', marginBottom: '0.75rem' }}>
                    <span>Budget: <strong>{formatCurrency(proj.budget, proj.budgetType)}</strong></span>
                    <span>{proj.proposalsCount || 0} proposals</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.65rem',
                    borderTop: '1px solid var(--slate-100)',
                    fontSize: '0.75rem'
                  }}>
                    <span style={{ color: 'var(--slate-400)' }}>Posted {formatRelativeTime(proj.createdAt)}</span>
                    <Link to={`/projects/${proj.id}`} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                      Manage Listing &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--slate-400)' }}>
              No projects created yet. Post your first job now!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

