import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import {
  formatCurrency,
  formatDate,
  formatRelativeTime,
  calculateMilestoneProgress
} from '../utils/formatters';
import {
  Layers,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  DollarSign,
  User,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const MyProjects = () => {
  const { currentUser, role } = useAuth();
  const {
    contracts,
    messages,
    users,
    submitMilestoneDeliverable,
    approveMilestone,
    sendMessage
  } = useData();

  // Role-filtered contracts
  const myContracts = useMemo(() => {
    if (role === 'client') {
      return contracts.filter(c => c.clientId === currentUser?.id);
    }
    if (role === 'admin') {
      return contracts;
    }
    return contracts.filter(c => c.freelancerId === currentUser?.id);
  }, [contracts, currentUser, role]);

  // Active contract selection for the workspace
  const [selectedContractId, setSelectedContractId] = useState(
    myContracts[0]?.id || null
  );

  const activeContract = myContracts.find(c => c.id === selectedContractId) || myContracts[0];

  // Counterparty info
  const counterparty = useMemo(() => {
    if (!activeContract) return null;
    const targetId = role === 'client' ? activeContract.freelancerId : activeContract.clientId;
    return users.find(u => u.id === targetId);
  }, [activeContract, role, users]);

  // Deliverable Submission Modal State (for freelancers)
  const [deliverableModalOpen, setDeliverableModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [deliverableNote, setDeliverableNote] = useState('');

  // Chat message input state
  const [chatInput, setChatInput] = useState('');

  // Filter messages for the current contract
  const contractMessages = useMemo(() => {
    if (!activeContract) return [];
    return messages.filter(m => m.contractId === activeContract.id);
  }, [messages, activeContract]);

  const handleOpenDeliverableModal = (milestone) => {
    setSelectedMilestone(milestone);
    setDeliverableUrl(milestone.deliverableUrl || '');
    setDeliverableNote(milestone.deliverableNote || '');
    setDeliverableModalOpen(true);
  };

  const handleDeliverableSubmit = (e) => {
    e.preventDefault();
    if (!deliverableUrl.trim()) return;

    submitMilestoneDeliverable(
      activeContract.id,
      selectedMilestone.id,
      deliverableUrl.trim(),
      deliverableNote.trim()
    );
    setDeliverableModalOpen(false);
  };

  const handleApproveMilestone = (milestoneId) => {
    approveMilestone(activeContract.id, milestoneId);
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeContract) return;

    const recipientId = role === 'client' ? activeContract.freelancerId : activeContract.clientId;
    sendMessage(activeContract.id, chatInput, currentUser.id, recipientId);
    setChatInput('');
  };

  if (myContracts.length === 0) {
    return (
      <div className="max-w-7xl" style={{ padding: '4rem 1.5rem' }}>
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
            <Layers size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
            No Active Contracts Yet
          </h2>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9375rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            {role === 'client'
              ? 'Review pending proposals on your posted projects to award contracts and kick off milestones.'
              : 'Submit proposals on open marketplace projects to win your first enterprise contract!'}
          </p>
          <Link to={role === 'client' ? '/dashboard/client' : '/projects'} className="btn btn-primary">
            {role === 'client' ? 'Review Proposals in Dashboard' : 'Browse Open Projects'}
          </Link>
        </div>
      </div>
    );
  }

  const progressPercent = calculateMilestoneProgress(activeContract?.milestones);

  return (
    <div className="max-w-7xl" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Workspace Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary-600)', textTransform: 'uppercase' }}>
              Project Workspace & Escrow Engine
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Contract Collaboration Hub
          </h1>
        </div>

        {/* Contract Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label htmlFor="active-contract-select" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-600)' }}>
            Active Contract:
          </label>
          <select
            id="active-contract-select"
            className="form-select"
            value={activeContract.id}
            onChange={(e) => setSelectedContractId(e.target.value)}
            style={{ width: 'auto', fontWeight: 600 }}
          >
            {myContracts.map(c => (
              <option key={c.id} value={c.id}>
                {c.projectTitle} ({c.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.45fr 1fr',
        gap: '2rem',
        alignItems: 'start'
      }} className="lg-grid-cols-1">
        {/* Left Side: Contract Overview & Milestone Tracker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Contract Metadata Card */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <StatusBadge status={activeContract.status} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                    Started {formatDate(activeContract.startDate)}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {activeContract.projectTitle}
                </h2>
              </div>

              {/* Counterparty badge */}
              {counterparty && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.5rem 0.85rem',
                  backgroundColor: 'var(--slate-50)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--slate-200)'
                }}>
                  <img
                    src={counterparty.avatar}
                    alt={counterparty.name}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: 700 }}>
                      {role === 'client' ? 'Hired Freelancer' : 'Client Organization'}
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                      {counterparty.name}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Financial & Escrow Progress Bar */}
            <div style={{
              backgroundColor: 'var(--slate-50)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-100)',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--slate-600)' }}>
                  Escrow Release Progress ({progressPercent}%)
                </span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  {formatCurrency(activeContract.paidAmount)} / {formatCurrency(activeContract.totalAmount)}
                </span>
              </div>
              <div style={{
                height: '8px',
                width: '100%',
                backgroundColor: 'var(--slate-200)',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, var(--primary-600) 0%, #10b981 100%)',
                  borderRadius: '9999px',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          </div>

          {/* Milestone List & Action Cards */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Contract Milestones ({activeContract.milestones?.length || 0})
              </h3>
              <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                Protected by Simulated Escrow
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeContract.milestones?.map((milestone, idx) => {
                const isApproved = milestone.status === 'Approved';
                const isSubmitted = milestone.status === 'Submitted';
                const isPending = milestone.status === 'Pending';

                return (
                  <div
                    key={milestone.id}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      border: isApproved ? '1px solid #a7f3d0' : isSubmitted ? '1px solid #ddd6fe' : '1px solid var(--slate-200)',
                      backgroundColor: isApproved ? '#f0fdf4' : isSubmitted ? '#faf5ff' : '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-400)' }}>
                            #{idx + 1}
                          </span>
                          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                            {milestone.title}
                          </h4>
                          <StatusBadge status={milestone.status} />
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Clock size={12} /> Target Due Date: {formatDate(milestone.dueDate)}
                        </div>
                      </div>

                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                        {formatCurrency(milestone.amount)}
                      </div>
                    </div>

                    {/* Deliverable Review Info if submitted */}
                    {milestone.deliverableUrl && (
                      <div style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: '#ffffff',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--slate-200)',
                        fontSize: '0.8125rem'
                      }}>
                        <div style={{ fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          Deliverable Artifact:
                          <a
                            href={milestone.deliverableUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: 'var(--primary-600)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                          >
                            {milestone.deliverableUrl} <ExternalLink size={12} />
                          </a>
                        </div>
                        {milestone.deliverableNote && (
                          <div style={{ color: 'var(--slate-600)', marginTop: '0.25rem' }}>
                            <strong>Engineer's Note:</strong> {milestone.deliverableNote}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons based on role & status */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '0.75rem',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid rgba(0,0,0,0.05)'
                    }}>
                      {/* Freelancer: Submit Deliverable button */}
                      {role === 'freelancer' && !isApproved && (
                        <button
                          onClick={() => handleOpenDeliverableModal(milestone)}
                          className="btn btn-secondary btn-sm"
                        >
                          {isSubmitted ? 'Update Deliverable' : 'Submit Work for Approval'} &rarr;
                        </button>
                      )}

                      {/* Client: Approve Milestone & Release Escrow */}
                      {role === 'client' && isSubmitted && (
                        <button
                          onClick={() => handleApproveMilestone(milestone.id)}
                          className="btn btn-success btn-sm"
                        >
                          <CheckCircle2 size={16} /> Approve & Release ${milestone.amount}
                        </button>
                      )}

                      {isApproved && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#047857', fontSize: '0.8125rem', fontWeight: 600 }}>
                          <CheckCircle2 size={14} /> Approved & Funds Disbursed ({formatDate(milestone.approvedAt)})
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Client-Freelancer Simulated Real-Time Chat */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '620px' }}>
          {/* Chat Header */}
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--slate-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  Direct Project Thread
                </h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                  Chatting with {counterparty?.name || 'Project Collaborator'}
                </div>
              </div>
            </div>
            <MessageSquare size={18} color="var(--slate-400)" />
          </div>

          {/* Message List */}
          <div style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: 'var(--slate-50)'
          }}>
            {contractMessages.map(msg => {
              const isMe = msg.senderId === currentUser?.id;
              const sender = users.find(u => u.id === msg.senderId);

              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: isMe ? 'row-reverse' : 'row',
                    gap: '0.65rem',
                    alignItems: 'flex-end'
                  }}
                >
                  <img
                    src={sender?.avatar}
                    alt={sender?.name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{
                    maxWidth: '75%',
                    padding: '0.75rem 1rem',
                    borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    backgroundColor: isMe ? 'var(--primary-600)' : '#ffffff',
                    color: isMe ? '#ffffff' : 'var(--slate-800)',
                    boxShadow: 'var(--shadow-sm)',
                    border: isMe ? 'none' : '1px solid var(--slate-200)',
                    fontSize: '0.875rem',
                    lineHeight: 1.5
                  }}>
                    <div>{msg.text}</div>
                    <div style={{
                      fontSize: '0.65rem',
                      marginTop: '0.25rem',
                      textAlign: isMe ? 'right' : 'left',
                      color: isMe ? 'rgba(255,255,255,0.7)' : 'var(--slate-400)'
                    }}>
                      {formatRelativeTime(msg.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendChatMessage}
            style={{
              padding: '1rem',
              borderTop: '1px solid var(--slate-200)',
              backgroundColor: '#ffffff',
              display: 'flex',
              gap: '0.5rem'
            }}
          >
            <input
              type="text"
              className="form-input"
              placeholder={`Message ${counterparty?.name || 'collaborator'}...`}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!chatInput.trim()}
              style={{ padding: '0.625rem 1rem' }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Deliverable Submission Modal */}
      <Modal
        isOpen={deliverableModalOpen}
        onClose={() => setDeliverableModalOpen(false)}
        title="Submit Milestone Deliverables"
        subtitle={`Milestone: ${selectedMilestone?.title || ''}`}
        maxWidth="540px"
      >
        <form onSubmit={handleDeliverableSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="del-url">
              Artifact / Repository / Preview URL *
            </label>
            <input
              id="del-url"
              type="url"
              className="form-input"
              placeholder="https://github.com/username/repo or https://staging.example.com"
              value={deliverableUrl}
              onChange={(e) => setDeliverableUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="del-note">
              Summary of Deliverables & Test Instructions
            </label>
            <textarea
              id="del-note"
              className="form-textarea"
              rows={4}
              placeholder="Highlight key components completed, test credentials, or deployment notes for client verification..."
              value={deliverableNote}
              onChange={(e) => setDeliverableNote(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setDeliverableModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Send size={16} /> Submit Deliverable
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

