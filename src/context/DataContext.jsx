import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  initializeStorage,
  resetStorageToSeed
} from '../utils/storage';
import {
  initialProjects,
  initialProposals,
  initialContracts,
  initialMessages,
  initialUsers,
  initialPlatformLogs
} from '../data/sampleData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Initialize storage once if not already initialized
  useEffect(() => {
    initializeStorage();
  }, []);

  const [projects, setProjects] = useState(() => loadFromStorage(STORAGE_KEYS.PROJECTS, initialProjects));
  const [proposals, setProposals] = useState(() => loadFromStorage(STORAGE_KEYS.PROPOSALS, initialProposals));
  const [contracts, setContracts] = useState(() => loadFromStorage(STORAGE_KEYS.CONTRACTS, initialContracts));
  const [messages, setMessages] = useState(() => loadFromStorage(STORAGE_KEYS.MESSAGES, initialMessages));
  const [users, setUsers] = useState(() => loadFromStorage(STORAGE_KEYS.USERS, initialUsers));
  const [logs, setLogs] = useState(() => loadFromStorage(STORAGE_KEYS.LOGS, initialPlatformLogs));
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const addToast = useCallback((title, type = 'info', description = '') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
    setToasts(prev => [...prev, { id, title, type, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Sync state from storage
  const syncAllFromStorage = useCallback(() => {
    setProjects(loadFromStorage(STORAGE_KEYS.PROJECTS, initialProjects));
    setProposals(loadFromStorage(STORAGE_KEYS.PROPOSALS, initialProposals));
    setContracts(loadFromStorage(STORAGE_KEYS.CONTRACTS, initialContracts));
    setMessages(loadFromStorage(STORAGE_KEYS.MESSAGES, initialMessages));
    setUsers(loadFromStorage(STORAGE_KEYS.USERS, initialUsers));
    setLogs(loadFromStorage(STORAGE_KEYS.LOGS, initialPlatformLogs));
  }, []);

  // Multi-tab and intra-window storage listeners
  useEffect(() => {
    const handleStorageEvent = (e) => {
      syncAllFromStorage();
    };

    const handleCustomUpdate = () => {
      syncAllFromStorage();
    };

    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('fh_storage_update', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('fh_storage_update', handleCustomUpdate);
    };
  }, [syncAllFromStorage]);

  // Project Management Actions
  const addProject = (projectData, clientUser) => {
    const newProject = {
      id: `prj_${Date.now()}`,
      clientId: clientUser.id,
      title: projectData.title,
      description: projectData.description,
      category: projectData.category,
      requiredSkills: projectData.requiredSkills || [],
      budgetType: projectData.budgetType || 'Fixed',
      budget: Number(projectData.budget) || 1000,
      deadline: projectData.deadline,
      scopeLevel: projectData.scopeLevel || 'Intermediate',
      status: 'Open',
      proposalsCount: 0,
      createdAt: new Date().toISOString()
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    saveToStorage(STORAGE_KEYS.PROJECTS, updatedProjects);

    // Add activity log
    const newLog = {
      id: `log_${Date.now()}`,
      type: 'project_posted',
      message: `${clientUser.name} posted project "${newProject.title}" ($${newProject.budget})`,
      timestamp: new Date().toISOString()
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    saveToStorage(STORAGE_KEYS.LOGS, updatedLogs);

    addToast('Project Published!', 'success', 'Your project listing is now live for freelancers to bid on.');
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    const updatedProjects = projects.map(p => p.id === projectId ? { ...p, ...updates } : p);
    setProjects(updatedProjects);
    saveToStorage(STORAGE_KEYS.PROJECTS, updatedProjects);
    addToast('Project Updated', 'success', 'Project details have been updated.');
  };

  const deleteProject = (projectId, reason = 'Removed by administrator') => {
    const target = projects.find(p => p.id === projectId);
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    saveToStorage(STORAGE_KEYS.PROJECTS, updatedProjects);

    const newLog = {
      id: `log_${Date.now()}`,
      type: 'project_removed',
      message: `Project "${target?.title || projectId}" removed. Reason: ${reason}`,
      timestamp: new Date().toISOString()
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    saveToStorage(STORAGE_KEYS.LOGS, updatedLogs);

    addToast('Project Listing Removed', 'warning', reason);
  };

  // Proposal Actions
  const submitProposal = (proposalData, freelancerUser) => {
    // Duplicate check
    const existing = proposals.find(
      p => p.projectId === proposalData.projectId && p.freelancerId === freelancerUser.id && p.status !== 'Withdrawn'
    );
    if (existing) {
      addToast('Proposal Exists', 'warning', 'You have already submitted a proposal for this project.');
      return { success: false, message: 'You have already submitted a proposal for this project.' };
    }

    const newProposal = {
      id: `prop_${Date.now()}`,
      projectId: proposalData.projectId,
      freelancerId: freelancerUser.id,
      coverLetter: proposalData.coverLetter,
      proposedPrice: Number(proposalData.proposedPrice),
      deliveryDays: Number(proposalData.deliveryDays),
      status: 'Pending',
      milestones: proposalData.milestones || [
        { title: 'Project Completion Deliverables', amount: Number(proposalData.proposedPrice) }
      ],
      createdAt: new Date().toISOString()
    };

    const updatedProposals = [newProposal, ...proposals];
    setProposals(updatedProposals);
    saveToStorage(STORAGE_KEYS.PROPOSALS, updatedProposals);

    // Update proposal count on project
    const updatedProjects = projects.map(p => {
      if (p.id === proposalData.projectId) {
        return { ...p, proposalsCount: (p.proposalsCount || 0) + 1 };
      }
      return p;
    });
    setProjects(updatedProjects);
    saveToStorage(STORAGE_KEYS.PROJECTS, updatedProjects);

    // Activity log
    const project = projects.find(p => p.id === proposalData.projectId);
    const newLog = {
      id: `log_${Date.now()}`,
      type: 'proposal_submitted',
      message: `${freelancerUser.name} submitted a $${newProposal.proposedPrice} proposal for "${project?.title}"`,
      timestamp: new Date().toISOString()
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    saveToStorage(STORAGE_KEYS.LOGS, updatedLogs);

    addToast('Proposal Submitted!', 'success', 'Your proposal was sent to the client.');
    return { success: true, proposal: newProposal };
  };

  const withdrawProposal = (proposalId) => {
    const updatedProposals = proposals.map(p =>
      p.id === proposalId ? { ...p, status: 'Withdrawn' } : p
    );
    setProposals(updatedProposals);
    saveToStorage(STORAGE_KEYS.PROPOSALS, updatedProposals);
    addToast('Proposal Withdrawn', 'info', 'Your proposal has been marked as withdrawn.');
  };

  // Hiring Workflow: Accept proposal
  const acceptProposal = (proposalId) => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (!proposal) return;

    const project = projects.find(p => p.id === proposal.projectId);
    if (!project) return;

    // 1. Update accepted proposal
    const updatedProposals = proposals.map(p => {
      if (p.id === proposalId) {
        return { ...p, status: 'Accepted' };
      }
      // Auto-reject remaining pending proposals for this project
      if (p.projectId === proposal.projectId && p.status === 'Pending') {
        return { ...p, status: 'Rejected' };
      }
      return p;
    });
    setProposals(updatedProposals);
    saveToStorage(STORAGE_KEYS.PROPOSALS, updatedProposals);

    // 2. Lock project status to 'In Progress'
    const updatedProjects = projects.map(p => {
      if (p.id === project.id) {
        return { ...p, status: 'In Progress', hiredFreelancerId: proposal.freelancerId };
      }
      return p;
    });
    setProjects(updatedProjects);
    saveToStorage(STORAGE_KEYS.PROJECTS, updatedProjects);

    // 3. Create active Contract
    const initialMilestones = (proposal.milestones && proposal.milestones.length > 0)
      ? proposal.milestones.map((m, idx) => ({
          id: `m_${Date.now()}_${idx}`,
          title: m.title || `Milestone ${idx + 1}`,
          amount: Number(m.amount) || Math.round(proposal.proposedPrice / proposal.milestones.length),
          status: 'Pending', // Pending, Submitted, Approved
          dueDate: new Date(Date.now() + (idx + 1) * 7 * 86400000).toISOString().split('T')[0],
          deliverableUrl: '',
          deliverableNote: '',
          approvedAt: null
        }))
      : [
          {
            id: `m_${Date.now()}_1`,
            title: 'Initial Deliverable & Architecture',
            amount: Math.round(proposal.proposedPrice / 2),
            status: 'Pending',
            dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
            deliverableUrl: '',
            deliverableNote: '',
            approvedAt: null
          },
          {
            id: `m_${Date.now()}_2`,
            title: 'Final Release & Implementation',
            amount: proposal.proposedPrice - Math.round(proposal.proposedPrice / 2),
            status: 'Pending',
            dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
            deliverableUrl: '',
            deliverableNote: '',
            approvedAt: null
          }
        ];

    const newContract = {
      id: `cnt_${Date.now()}`,
      projectId: project.id,
      projectTitle: project.title,
      clientId: project.clientId,
      freelancerId: proposal.freelancerId,
      totalAmount: proposal.proposedPrice,
      paidAmount: 0,
      status: 'In Progress',
      startDate: new Date().toISOString(),
      milestones: initialMilestones
    };

    const updatedContracts = [newContract, ...contracts];
    setContracts(updatedContracts);
    saveToStorage(STORAGE_KEYS.CONTRACTS, updatedContracts);

    // 4. Initial greeting message
    const welcomeMsg = {
      id: `msg_${Date.now()}`,
      contractId: newContract.id,
      senderId: project.clientId,
      recipientId: proposal.freelancerId,
      text: `Proposal accepted! Let's build something exceptional together for "${project.title}".`,
      createdAt: new Date().toISOString()
    };
    const updatedMessages = [...messages, welcomeMsg];
    setMessages(updatedMessages);
    saveToStorage(STORAGE_KEYS.MESSAGES, updatedMessages);

    // 5. Activity log
    const clientUser = users.find(u => u.id === project.clientId);
    const freelancerUser = users.find(u => u.id === proposal.freelancerId);
    const newLog = {
      id: `log_${Date.now()}`,
      type: 'contract_created',
      message: `${clientUser?.name || 'Client'} hired ${freelancerUser?.name || 'Freelancer'} for "${project.title}" ($${proposal.proposedPrice})`,
      timestamp: new Date().toISOString()
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    saveToStorage(STORAGE_KEYS.LOGS, updatedLogs);

    // Celebration burst!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    addToast('Candidate Hired!', 'success', `Contract created. Remaining candidates have been notified.`);
    return newContract;
  };

  // Contract Workspace Actions
  const submitMilestoneDeliverable = (contractId, milestoneId, deliverableUrl, deliverableNote) => {
    const updatedContracts = contracts.map(c => {
      if (c.id === contractId) {
        const updatedMilestones = c.milestones.map(m => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: 'Submitted',
              deliverableUrl,
              deliverableNote,
              submittedAt: new Date().toISOString()
            };
          }
          return m;
        });
        return { ...c, milestones: updatedMilestones };
      }
      return c;
    });

    setContracts(updatedContracts);
    saveToStorage(STORAGE_KEYS.CONTRACTS, updatedContracts);
    addToast('Deliverable Submitted!', 'success', 'Your client has been notified to review and release funds.');
  };

  const approveMilestone = (contractId, milestoneId) => {
    let releasedAmount = 0;
    let isFullyComplete = false;
    let targetContract = null;

    const updatedContracts = contracts.map(c => {
      if (c.id === contractId) {
        targetContract = c;
        const updatedMilestones = c.milestones.map(m => {
          if (m.id === milestoneId) {
            releasedAmount = m.amount;
            return {
              ...m,
              status: 'Approved',
              approvedAt: new Date().toISOString()
            };
          }
          return m;
        });

        const newPaidAmount = c.paidAmount + releasedAmount;
        const allApproved = updatedMilestones.every(m => m.status === 'Approved');
        isFullyComplete = allApproved;

        return {
          ...c,
          paidAmount: newPaidAmount,
          status: allApproved ? 'Completed' : 'In Progress',
          completedDate: allApproved ? new Date().toISOString() : null,
          milestones: updatedMilestones
        };
      }
      return c;
    });

    setContracts(updatedContracts);
    saveToStorage(STORAGE_KEYS.CONTRACTS, updatedContracts);

    // If fully completed, update project status to Completed
    if (isFullyComplete && targetContract) {
      const updatedProjects = projects.map(p => {
        if (p.id === targetContract.projectId) {
          return { ...p, status: 'Completed' };
        }
        return p;
      });
      setProjects(updatedProjects);
      saveToStorage(STORAGE_KEYS.PROJECTS, updatedProjects);
    }

    // Update user earnings & client spent
    if (targetContract) {
      const updatedUsers = users.map(u => {
        if (u.id === targetContract.freelancerId) {
          return {
            ...u,
            totalEarnings: (u.totalEarnings || 0) + releasedAmount,
            completedProjectsCount: isFullyComplete ? (u.completedProjectsCount || 0) + 1 : (u.completedProjectsCount || 0)
          };
        }
        if (u.id === targetContract.clientId) {
          return {
            ...u,
            totalSpent: (u.totalSpent || 0) + releasedAmount
          };
        }
        return u;
      });
      setUsers(updatedUsers);
      saveToStorage(STORAGE_KEYS.USERS, updatedUsers);
    }

    // Activity log
    const newLog = {
      id: `log_${Date.now()}`,
      type: 'milestone_approved',
      message: `Milestone approved on contract ${contractId}. Released $${releasedAmount}.`,
      timestamp: new Date().toISOString()
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    saveToStorage(STORAGE_KEYS.LOGS, updatedLogs);

    // Confetti celebration
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    addToast('Funds Released!', 'success', `$${releasedAmount} released to the freelancer's balance.`);
  };

  // Messaging Actions
  const sendMessage = (contractId, text, senderId, recipientId) => {
    if (!text || !text.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      contractId,
      senderId,
      recipientId,
      text: text.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    saveToStorage(STORAGE_KEYS.MESSAGES, updatedMessages);
    return newMsg;
  };

  // Moderation Actions
  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'suspended' ? 'active' : 'suspended';
        return { ...u, status: nextStatus };
      }
      return u;
    });
    setUsers(updatedUsers);
    saveToStorage(STORAGE_KEYS.USERS, updatedUsers);

    const targetUser = users.find(u => u.id === userId);
    addToast(
      'User Status Updated',
      'info',
      `${targetUser?.name || 'User'} is now ${targetUser?.status === 'suspended' ? 'Active' : 'Suspended'}.`
    );
  };

  const handleResetToSeed = () => {
    resetStorageToSeed();
    syncAllFromStorage();
    addToast('System Reset Complete', 'info', 'All data reset to clean initial seed state.');
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        proposals,
        contracts,
        messages,
        users,
        logs,
        toasts,
        addToast,
        removeToast,
        addProject,
        updateProject,
        deleteProject,
        submitProposal,
        withdrawProposal,
        acceptProposal,
        submitMilestoneDeliverable,
        approveMilestone,
        sendMessage,
        toggleUserStatus,
        resetSeedData: handleResetToSeed
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

