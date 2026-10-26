import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ProposalCard } from '../components/cards/ProposalCard';
import { FileCheck, Compass, ArrowRight } from 'lucide-react';

export const MyProposals = () => {
  const { currentUser } = useAuth();
  const { proposals, withdrawProposal } = useData();

  const [activeTab, setActiveTab] = useState('All');

  // Filter freelancer's proposals
  const myProposals = useMemo(() => {
    return proposals.filter(p => p.freelancerId === currentUser?.id);
  }, [proposals, currentUser]);

  const tabs = ['All', 'Pending', 'Accepted', 'Rejected', 'Withdrawn'];

  const getCount = (tabName) => {
    if (tabName === 'All') return myProposals.length;
    return myProposals.filter(p => p.status === tabName).length;
  };

  const displayedProposals = useMemo(() => {
    if (activeTab === 'All') return myProposals;
    return myProposals.filter(p => p.status === activeTab);
  }, [myProposals, activeTab]);

  return (
    <div className="max-w-7xl" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            My Proposals Hub
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
            Track proposal review statuses, pending bids, accepted offers, and contract awards.
          </p>
        </div>

        <Link to="/projects" className="btn btn-primary">
          <Compass size={18} /> Find More Projects
        </Link>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid var(--slate-200)',
        marginBottom: '2rem',
        overflowX: 'auto',
        paddingBottom: '0.25rem'
      }}>
        {tabs.map(tab => {
          const count = getCount(tab);
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.75rem 1.25rem',
                border: 'none',
                background: 'none',
                borderBottom: isActive ? '3px solid var(--primary-600)' : '3px solid transparent',
                color: isActive ? 'var(--primary-700)' : 'var(--slate-500)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9375rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{tab}</span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.15rem 0.45rem',
                borderRadius: '9999px',
                backgroundColor: isActive ? 'var(--primary-100)' : 'var(--slate-100)',
                color: isActive ? 'var(--primary-800)' : 'var(--slate-600)'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Proposal Cards List */}
      {displayedProposals.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {displayedProposals.map(proposal => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              viewMode="freelancer"
              onWithdraw={withdrawProposal}
            />
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--slate-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: 'var(--slate-400)'
          }}>
            <FileCheck size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
            No {activeTab === 'All' ? '' : activeTab.toLowerCase()} proposals found
          </h3>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9375rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            {activeTab === 'All'
              ? 'You have not submitted any proposals yet. Browse open projects to place your first bid!'
              : `You have no proposals currently categorized under "${activeTab}".`}
          </p>
          <Link to="/projects" className="btn btn-primary">
            <Compass size={16} /> Browse Open Marketplace Projects
          </Link>
        </div>
      )}
    </div>
  );
};

