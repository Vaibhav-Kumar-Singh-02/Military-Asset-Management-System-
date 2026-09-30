import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PurchasesPage from './pages/PurchasesPage';
import TransfersPage from './pages/TransfersPage';
import AssignmentsExpendituresPage from './pages/AssignmentsExpendituresPage';
import InventoryLedgerPage from './pages/InventoryLedgerPage';
import AuditLogsPage from './pages/AuditLogsPage';

// Protected Layout Component
const ProtectedLayout = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        color: 'var(--accent-orange)',
        fontFamily: 'var(--font-main)',
        fontSize: '1rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
      }}>
        INITIALIZING DEFENSE ASSET MANAGEMENT SYSTEM...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', background: 'var(--bg-primary)' }}>
      {/* Background Artwork Layer */}
      <div className="app-military-bg" />

      {/* Main UI Container */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <main style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'transparent' }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('mams-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/"
            element={
              <ProtectedLayout>
                <DashboardPage />
              </ProtectedLayout>
            }
          />

          <Route
            path="/purchases"
            element={
              <ProtectedLayout>
                <PurchasesPage />
              </ProtectedLayout>
            }
          />

          <Route
            path="/transfers"
            element={
              <ProtectedLayout>
                <TransfersPage />
              </ProtectedLayout>
            }
          />

          <Route
            path="/assignments-expenditures"
            element={
              <ProtectedLayout>
                <AssignmentsExpendituresPage />
              </ProtectedLayout>
            }
          />

          <Route
            path="/inventory"
            element={
              <ProtectedLayout>
                <InventoryLedgerPage />
              </ProtectedLayout>
            }
          />

          <Route
            path="/audit-logs"
            element={
              <ProtectedLayout>
                <AuditLogsPage />
              </ProtectedLayout>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
