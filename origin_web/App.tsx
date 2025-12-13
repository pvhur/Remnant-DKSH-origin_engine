import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EMSDashboardPage } from './pages/EMSDashboardPage';

type Page = 'landing' | 'login' | 'dashboard' | 'ems';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
    window.scrollTo(0, 0);
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  const handleNavigateToEMS = () => {
    setCurrentPage('ems');
    window.scrollTo(0, 0);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage onNavigateToLogin={handleNavigateToLogin} />
      )}
      {currentPage === 'login' && (
        <LoginPage onBack={handleBackToLanding} onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'dashboard' && (
        <DashboardPage onLogout={handleLogout} onNavigateToEMS={handleNavigateToEMS} />
      )}
      {currentPage === 'ems' && (
        <EMSDashboardPage onBack={handleBackToDashboard} />
      )}
    </>
  );
};

export default App;