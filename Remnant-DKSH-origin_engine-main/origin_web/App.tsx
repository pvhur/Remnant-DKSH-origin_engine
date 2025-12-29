import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { RetailMarketingDashboardPage } from './pages/RetailMarketingDashboardPage';

type Page = 'landing' | 'login' | 'signup' | 'dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
    window.scrollTo(0, 0);
  };

  const handleNavigateToSignup = () => {
    setCurrentPage('signup');
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

  const handleSignupSuccess = () => {
    // 회원가입 성공 시 자동 로그인 처리되어 있으므로 대시보드로 이동
    setCurrentPage('dashboard');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage onNavigateToLogin={handleNavigateToLogin} />
      )}
      {currentPage === 'login' && (
        <LoginPage 
          onBack={handleBackToLanding} 
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={handleNavigateToSignup}
        />
      )}
      {currentPage === 'signup' && (
        <SignupPage 
          onBack={handleBackToLanding} 
          onSignupSuccess={handleSignupSuccess}
        />
      )}
      {currentPage === 'dashboard' && (
        <RetailMarketingDashboardPage onBack={handleLogout} />
      )}
    </>
  );
};

export default App;