import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '../utils/storage';
import { initialUsers } from '../data/sampleData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize with persisted session or default to freelancer (Alex Rivera) for seamless initial testing
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.SESSION, null);
    if (saved) return saved;
    // Default preset user: Alex Rivera (freelancer)
    return initialUsers[1];
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SESSION, currentUser);
  }, [currentUser]);

  // Quick preset login helper
  const loginAs = (role) => {
    const allUsers = loadFromStorage(STORAGE_KEYS.USERS, initialUsers);
    let target = null;
    if (role === 'freelancer') {
      target = allUsers.find(u => u.id === 'usr_02') || allUsers.find(u => u.role === 'freelancer');
    } else if (role === 'client') {
      target = allUsers.find(u => u.id === 'usr_01') || allUsers.find(u => u.role === 'client');
    } else if (role === 'admin') {
      target = allUsers.find(u => u.role === 'admin');
    }

    if (target) {
      setCurrentUser(target);
      return { success: true, user: target };
    }
    return { success: false, message: `No preset found for role: ${role}` };
  };

  // Standard login
  const login = (email, password) => {
    const allUsers = loadFromStorage(STORAGE_KEYS.USERS, initialUsers);
    const found = allUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Invalid email or password.' };
    }

    if (found.status === 'suspended') {
      return { success: false, message: 'This account has been suspended by an administrator.' };
    }

    setCurrentUser(found);
    return { success: true, user: found };
  };

  // Register new user
  const register = (userData) => {
    const allUsers = loadFromStorage(STORAGE_KEYS.USERS, initialUsers);
    const exists = allUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase().trim());
    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name,
      email: userData.email.toLowerCase().trim(),
      password: userData.password,
      role: userData.role || 'freelancer',
      avatar: userData.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80`,
      company: userData.company || (userData.role === 'client' ? `${userData.name}'s Studio` : ''),
      title: userData.title || (userData.role === 'freelancer' ? 'Independent Specialist' : 'Hiring Manager'),
      bio: userData.bio || '',
      hourlyRate: Number(userData.hourlyRate) || 50,
      skills: userData.skills || ['React', 'JavaScript'],
      portfolioLinks: userData.portfolioLinks || [],
      rating: 5.0,
      completedProjectsCount: 0,
      totalSpent: 0,
      totalEarnings: 0,
      verified: false,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    const updated = [newUser, ...allUsers];
    saveToStorage(STORAGE_KEYS.USERS, updated);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // Update profile
  const updateUserProfile = (updates) => {
    if (!currentUser) return;
    const allUsers = loadFromStorage(STORAGE_KEYS.USERS, initialUsers);
    const updatedUser = { ...currentUser, ...updates };

    const updatedUsers = allUsers.map(u => u.id === currentUser.id ? updatedUser : u);
    saveToStorage(STORAGE_KEYS.USERS, updatedUsers);
    setCurrentUser(updatedUser);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        role: currentUser?.role || 'guest',
        login,
        loginAs,
        register,
        updateUserProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

