import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { ValueProp } from '../components/sections/ValueProp';
import { CTA } from '../components/sections/CTA';
import { Footer } from '../components/layout/Footer';

interface LandingPageProps {
  onNavigateToLogin?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToLogin }) => {
  return (
    <div className="font-sans antialiased text-toss-dark selection:bg-toss-blueLight selection:text-toss-blue">
      <Navbar onNavigateToLogin={onNavigateToLogin} />
      <Hero onNavigateToLogin={onNavigateToLogin} />
      <Features />
      <ValueProp />
      <CTA onNavigateToLogin={onNavigateToLogin} />
      <Footer />
    </div>
  );
};