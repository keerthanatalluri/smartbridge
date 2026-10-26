import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BrowseProjects } from './pages/BrowseProjects';
import { ProjectDetails } from './pages/ProjectDetails';
import { FreelancerDashboard } from './pages/FreelancerDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { PostProject } from './pages/PostProject';
import { MyProposals } from './pages/MyProposals';
import { MyProjects } from './pages/MyProjects';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Marketplace Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/projects" element={<BrowseProjects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />

                {/* Freelancer Protected Routes */}
                <Route
                  path="/dashboard/freelancer"
                  element={
                    <ProtectedRoute allowedRoles={['freelancer', 'admin']}>
                      <FreelancerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/proposals"
                  element={
                    <ProtectedRoute allowedRoles={['freelancer', 'admin']}>
                      <MyProposals />
                    </ProtectedRoute>
                  }
                />

                {/* Client Protected Routes */}
                <Route
                  path="/dashboard/client"
                  element={
                    <ProtectedRoute allowedRoles={['client', 'admin']}>
                      <ClientDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/post-project"
                  element={
                    <ProtectedRoute allowedRoles={['client', 'admin']}>
                      <PostProject />
                    </ProtectedRoute>
                  }
                />

                {/* Shared Contract Workspace */}
                <Route
                  path="/my-projects"
                  element={
                    <ProtectedRoute allowedRoles={['freelancer', 'client', 'admin']}>
                      <MyProjects />
                    </ProtectedRoute>
                  }
                />

                {/* User Profile */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Console */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

