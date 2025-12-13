import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { FadeIn } from '../ui/FadeIn';

interface HeroProps {
  onNavigateToLogin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToLogin }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-toss-blueLight rounded-full blur-[120px] opacity-40 -z-10" />

      <FadeIn delay={0}>
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="px-3 py-1 rounded-full bg-toss-blueLight text-toss-blue text-sm font-semibold">
            BETA
          </span>
          <span className="text-toss-greyDark font-medium">Origin 2.5 웹 버전 출시</span>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-toss-dark tracking-tighter leading-[1.1] mb-8">
          Predict Profit.<br />
          <span className="text-toss-blue">Preserve Life.</span>
        </h1>
      </FadeIn>

      <FadeIn delay={400}>
        <p className="text-lg md:text-xl text-toss-greyDark max-w-3xl mx-auto mb-12 leading-relaxed">
          Origin Engine: AI 예측으로 비즈니스와 생명을 동시에 최적화합니다.<br />
          <span className="text-base text-toss-greyText">통합 AI 예측 및 최적화 엔진으로 수익성 극대화(리테일)와 생존율 극대화(EMS)를 실현합니다.</span>
        </p>
      </FadeIn>

      <FadeIn delay={600}>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-sm mx-auto md:max-w-none">
          <Button size="xl" className="w-full md:w-auto shadow-xl shadow-blue-500/20" onClick={onNavigateToLogin}>
            무료로 시작하기
          </Button>
          <Button variant="secondary" size="xl" className="w-full md:w-auto group">
            기능 살펴보기 <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </FadeIn>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow text-toss-greyDark">
        <ChevronDown size={32} />
      </div>

      {/* 3D Mockup Placeholder - Showing Web Interface */}
      <div className="mt-20 relative w-full max-w-5xl mx-auto">
        <FadeIn delay={800} className="relative z-10">
          <div className="aspect-[16/10] bg-white rounded-t-2xl border border-gray-200 shadow-2xl overflow-hidden">
             {/* Browser Header */}
             <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 flex-1 h-5 bg-white rounded-md border border-gray-200 text-[10px] text-gray-400 flex items-center px-2">origin.ai/beta</div>
             </div>
             
             <div className="w-full h-full bg-toss-grey flex relative overflow-hidden group">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col p-4 gap-4">
                   <div className="w-8 h-8 bg-toss-blue rounded-lg mb-4"></div>
                   <div className="w-full h-8 bg-toss-blueLight rounded-lg"></div>
                   <div className="w-3/4 h-4 bg-gray-50 rounded-lg mt-auto"></div>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 p-8 flex flex-col items-center justify-center relative bg-gray-50/50">
                   <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                   
                   <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 max-w-lg w-full z-10">
                      <div className="flex gap-4 mb-4">
                         <div className="w-10 h-10 rounded-full bg-toss-blue flex items-center justify-center text-white font-bold">Ai</div>
                         <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-4 bg-toss-blue text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium">
                      "다음 구매 확률 높은 고객 세그먼트 분석해줘"
                   </div>
                </div>
             </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};