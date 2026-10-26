import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StatsCard } from '../components/cards/StatsCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatCurrency, formatDate, formatRelativeTime } from '../utils/formatters';
import {
  Shield,
  Users,
  Briefcase,
  Layers,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Trash2,
  UserX,
  UserCheck,
  Search,
  Activity,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboard = () => {
  const { users, projects, contracts, logs, toggleUserStatus, deleteProject, resetSeedData } = useData();

  const [activeTab, setActiveTab] = useState('users'); // 'users', 'projects', 'logs'
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleteReason, setDeleteReason] = useState('Violates platform quality or terms of service');

  // KPI Calculations
  const totalUsersCount = users.length;
  const freelancersCount = users.filter(u => u.role === 'freelancer').length;
  const clientsCount = users.filter(u => u.role === 'client').length;
  const activeProjectsCount = projects.filter(p => p.status === 'Open' || p.status === 'In Progress').length;
  const completedContractsCount = contracts.filter(c => c.status === 'Completed').length;
  const totalGrossVolume = contracts.reduce((sum, c) => sum + (c.paidAmount || 0), 0) + 12000; // includes historical volume

  // Filtered lists
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const q = searchTerm.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.includes(q);
    });
  }, [users, searchTerm]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const q = searchTerm.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.status.toLowerCase().includes(q);
    });
  }, [projects, searchTerm]);

  const handleConfirmDeleteProject = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id, deleteReason);
      setDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Shield size={18} color="#ef4444" />
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#b91c1c', textTransform: 'uppercase' }}>
              System Supervisor Console
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Admin Moderation & Analytics
          </h1>
        </div>

        {/* Pristine seed reset button */}
        <button
          onClick={resetSeedData}
          className="btn btn-secondary btn-sm"
          style={{ borderColor: 'var(--slate-300)', backgroundColor: '#ffffff' }}
          title="Reset database to initial pristine seed state"
        >
          <RotateCcw size={16} color="var(--primary-600)" /> Reset Database to Pristine Seed
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <StatsCard
          title="Total Users"
          value={totalUsersCount}
          subtitle={`${freelancersCount} talent • ${clientsCount} clients`}
          icon={<Users size={20} />}
          color="blue"
        />

        <StatsCard
          title="Active Projects"
          value={activeProjectsCount}
          subtitle="Open or in-progress listings"
          icon={<Briefcase size={20} />}
          color="purple"
        />

        <StatsCard
          title="Completed Contracts"
          value={completedContractsCount}
          subtitle="100% milestone delivery"
          icon={<CheckCircle2 size={20} />}
          color="green"
        />

        <StatsCard
          title="Gross Platform Volume"
          value={formatCurrency(totalGrossVolume)}
          subtitle="Total platform settlements"
          icon={<DollarSign size={20} />}
          color="amber"
        />
      </div>

      {/* Tabs & Search Toolbar */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => { setActiveTab('users'); setSearchTerm(''); }}
              className={`btn btn-sm ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Users size={14} /> Users ({users.length})
            </button>
            <button
              onClick={() => { setActiveTab('projects'); setSearchTerm(''); }}
              className={`btn btn-sm ${activeTab === 'projects' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Briefcase size={14} /> Projects ({projects.length})
            </button>
            <button
              onClick={() => { setActiveTab('logs'); setSearchTerm(''); }}
              className={`btn btn-sm ${activeTab === 'logs' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Activity size={14} /> System Logs ({logs.length})
            </button>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              className="form-input"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.25rem', paddingRight: '0.75rem', fontSize: '0.85rem' }}
            />
            <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }}>
              <Search size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {activeTab === 'users' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)', color: 'var(--slate-600)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.875rem 1.25rem' }}>User / Identity</th>
                  <th style={{ padding: '0.875rem 1rem' }}>Role</th>
                  <th style={{ padding: '0.875rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.875rem 1rem' }}>Joined</th>
                  <th style={{ padding: '0.875rem 1.25rem', textAlign: 'right' }}>Moderation Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const isSuspended = u.status === 'suspended';

                  return (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--slate-100)', backgroundColor: isSuspended ? '#fef2f2' : 'transparent' }}>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={u.avatar}
                            alt={u.name}
                            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>{u.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{u.email}</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '1rem 1rem' }}>
                        <StatusBadge status={u.role} />
                      </td>

                      <td style={{ padding: '1rem 1rem' }}>
                        <StatusBadge status={u.status || 'active'} />
                      </td>

                      <td style={{ padding: '1rem 1rem', color: 'var(--slate-500)' }}>
                        {formatDate(u.createdAt)}
                      </td>

                      <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                        {u.role !== 'admin' ? (
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className={`btn btn-sm ${isSuspended ? 'btn-success' : 'btn-danger'}`}
                          >
                            {isSuspended ? (
                              <>
                                <UserCheck size={14} /> Reinstate Account
                              </>
                            ) : (
                              <>
                                <UserX size={14} /> Suspend Account
                              </>
                            )}
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontStyle: 'italic' }}>
                            Protected Admin
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'projects' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)', color: 'var(--slate-600)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.875rem 1.25rem' }}>Project Listing</th>
                  <th style={{ padding: '0.875rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.875rem 1rem' }}>Budget</th>
                  <th style={{ padding: '0.875rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.875rem 1rem' }}>Posted</th>
                  <th style={{ padding: '0.875rem 1.25rem', textAlign: 'right' }}>Moderation</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--slate-100)' }}>
                    <td style={{ padding: '1rem 1.25rem', maxWidth: '320px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>{p.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                        ID: {p.id} &bull; {p.proposalsCount || 0} bids
                      </div>
                    </td>

                    <td style={{ padding: '1rem 1rem', color: 'var(--slate-700)' }}>
                      {p.category}
                    </td>

                    <td style={{ padding: '1rem 1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                      {formatCurrency(p.budget, p.budgetType)}
                    </td>

                    <td style={{ padding: '1rem 1rem' }}>
                      <StatusBadge status={p.status} />
                    </td>

                    <td style={{ padding: '1rem 1rem', color: 'var(--slate-500)' }}>
                      {formatDate(p.createdAt)}
                    </td>

                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <button
                        onClick={() => {
                          setProjectToDelete(p);
                          setDeleteModalOpen(true);
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        <Trash2 size={14} /> Remove Listing
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'logs' && (
          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {logs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: '0.875rem 1.25rem',
                    backgroundColor: 'var(--slate-50)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Activity size={16} color="var(--primary-600)" />
                    <span style={{ color: 'var(--slate-800)', fontWeight: 500 }}>{log.message}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', whiteSpace: 'nowrap' }}>
                    {formatRelativeTime(log.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Project Confirmation Modal */}
      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b91c1c', marginBottom: '1rem' }}>
              <AlertTriangle size={24} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Confirm Listing Removal</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
              Are you sure you want to remove <strong>"{projectToDelete?.title}"</strong> from the public marketplace feed?
            </p>

            <div className="form-group">
              <label className="form-label" htmlFor="del-reason">Moderation Reason / Alert Note</label>
              <textarea
                id="del-reason"
                className="form-textarea"
                rows={3}
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteProject}
                className="btn btn-danger"
              >
                <Trash2 size={16} /> Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

