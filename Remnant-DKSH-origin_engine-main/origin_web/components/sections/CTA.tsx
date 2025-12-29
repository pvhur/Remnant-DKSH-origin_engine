import React from 'react';
import { Button } from '../ui/Button';
import { FadeIn } from '../ui/FadeIn';

interface CTAProps {
  onNavigateToLogin?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onNavigateToLogin }) => {
  return (
    <section className="py-32 px-4 bg-toss-grey flex items-center justify-center">
      <FadeIn>
        <div className="bg-[#191F28] rounded-[40px] p-10 md:p-20 text-center max-w-5xl mx-auto relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              지금 웹에서 바로 시작하세요
            </h2>
            <p className="text-gray-400 text-xl mb-10 relative z-10">
              별도의 설치 과정 없이,<br className="md:hidden"/> Origin AI의 모든 기능을 경험할 수 있습니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button size="xl" className="bg-toss-blue text-white hover:bg-blue-600 border-none" onClick={onNavigateToLogin}>
                무료로 시작하기
              </Button>
              <Button size="xl" className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-none">
                문의하기
              </Button>
            </div>
        </div>
      </FadeIn>
    </section>
  );
};