import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onNavigateToLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen ? 'bg-white/80 backdrop-blur-md border-b border-gray-100' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo with BETA Badge */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-2xl font-bold text-toss-dark tracking-tighter flex items-center gap-2">
              origin<span className="text-toss-blue">.AI</span>
            </span>
            <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md tracking-wide">
              BETA
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-toss-greyDark font-medium hover:text-toss-blue transition-colors">기능 소개</a>
            <a href="#" className="text-toss-greyDark font-medium hover:text-toss-blue transition-colors">요금제</a>
            <a href="#" className="text-toss-greyDark font-medium hover:text-toss-blue transition-colors">고객센터</a>
            <Button variant="secondary" size="sm" onClick={onNavigateToLogin}>로그인</Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-toss-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden animate-fade-in">
          <div className="flex flex-col gap-6 text-lg font-medium">
            <a href="#" className="py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>기능 소개</a>
            <a href="#" className="py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>요금제</a>
            <a href="#" className="py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>고객센터</a>
            <div className="mt-4">
              <Button fullWidth size="lg" onClick={() => { setMobileMenuOpen(false); onNavigateToLogin?.(); }}>로그인</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};