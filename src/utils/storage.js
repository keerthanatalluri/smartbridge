import {
  initialUsers,
  initialProjects,
  initialProposals,
  initialContracts,
  initialMessages,
  initialPlatformLogs
} from '../data/sampleData';

export const STORAGE_KEYS = {
  USERS: 'fh_users',
  PROJECTS: 'fh_projects',
  PROPOSALS: 'fh_proposals',
  CONTRACTS: 'fh_contracts',
  MESSAGES: 'fh_messages',
  LOGS: 'fh_logs',
  SESSION: 'fh_session_user'
};

export const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return fallback;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for same-window updates
    window.dispatchEvent(new CustomEvent('fh_storage_update', { detail: { key, value } }));
    return true;
  } catch (error) {
    console.error(`Error writing key "${key}" to localStorage:`, error);
    return false;
  }
};

export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    saveToStorage(STORAGE_KEYS.USERS, initialUsers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    saveToStorage(STORAGE_KEYS.PROJECTS, initialProjects);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROPOSALS)) {
    saveToStorage(STORAGE_KEYS.PROPOSALS, initialProposals);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONTRACTS)) {
    saveToStorage(STORAGE_KEYS.CONTRACTS, initialContracts);
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    saveToStorage(STORAGE_KEYS.MESSAGES, initialMessages);
  }
  if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
    saveToStorage(STORAGE_KEYS.LOGS, initialPlatformLogs);
  }
};

export const resetStorageToSeed = () => {
  saveToStorage(STORAGE_KEYS.USERS, initialUsers);
  saveToStorage(STORAGE_KEYS.PROJECTS, initialProjects);
  saveToStorage(STORAGE_KEYS.PROPOSALS, initialProposals);
  saveToStorage(STORAGE_KEYS.CONTRACTS, initialContracts);
  saveToStorage(STORAGE_KEYS.MESSAGES, initialMessages);
  saveToStorage(STORAGE_KEYS.LOGS, [
    {
      id: `log_${Date.now()}`,
      type: "system_reset",
      message: "Database restored to pristine seed configuration.",
      timestamp: new Date().toISOString()
    },
    ...initialPlatformLogs
  ]);
};

