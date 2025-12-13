import React from 'react';
import { Megaphone, Activity, ArrowRight, Bell, LayoutGrid, LogOut } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn';

interface DashboardPageProps {
  onLogout?: () => void;
  onNavigateToEMS?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout, onNavigateToEMS }) => {
  return (
    <div className="min-h-screen bg-toss-grey font-sans text-toss-dark">
      {/* Dashboard Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-xl font-bold text-toss-dark tracking-tighter">
              origin<span className="text-toss-blue">.AI</span>
            </span>
            <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md tracking-wide">
              BETA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <LayoutGrid size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-toss-blueLight text-toss-blue flex items-center justify-center font-semibold text-sm ml-2">
              U
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="로그아웃"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <FadeIn>
          <div className="mb-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-toss-dark tracking-tight">
              반가워요!
            </h1>
            <p className="text-toss-greyDark text-lg">
              Origin AI와 함께 생산성을 높여보세요.
            </p>
          </div>
        </FadeIn>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Marketing Card */}
          <FadeIn delay={100}>
            <div className="group bg-white rounded-[28px] p-8 h-[320px] flex flex-col justify-between cursor-pointer hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-[120px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-toss-blueLight text-toss-blue rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Megaphone size={26} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-toss-dark tracking-tight">리테일 마케팅</h2>
                <p className="text-toss-greyDark leading-relaxed text-[17px]">
                  CLV 예측 모델 · 하이퍼 개인화<br/>
                  <span className="text-sm">CLV 33% 증대 · GenAI 500% ROI</span>
                </p>
              </div>

              <div className="flex items-center text-toss-blue font-semibold mt-auto relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                시작하기 <ArrowRight size={18} className="ml-1" />
              </div>
            </div>
          </FadeIn>

          {/* EMS System Card (BETA) - 응급의료체계 */}
          <FadeIn delay={200}>
            <div 
              className="group bg-white rounded-[28px] p-8 h-[320px] flex flex-col justify-between cursor-pointer hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              onClick={onNavigateToEMS}
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-bl-[120px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-[#E5F7E8] text-[#24B368] rounded-2xl flex items-center justify-center shadow-sm">
                    <Activity size={26} strokeWidth={2.5} />
                  </div>
                  <span className="bg-[#FFF0E6] text-[#FF5F00] text-[11px] font-bold px-2 py-1.5 rounded-lg tracking-wide">
                    BETA
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-toss-dark tracking-tight">EMS 시스템</h2>
                <p className="text-toss-greyDark leading-relaxed text-[17px]">
                  위협 예측 센싱 · 능동형 국소 봉쇄<br/>
                  <span className="text-sm">10초 이내 봉쇄 · 골든타임 5분 단축</span>
                </p>
              </div>

              <div className="flex items-center text-[#24B368] font-semibold mt-auto relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                접속하기 <ArrowRight size={18} className="ml-1" />
              </div>
            </div>
          </FadeIn>

          {/* System Status Banner */}
          <FadeIn delay={300} className="md:col-span-2">
            <div className="bg-white rounded-[24px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm border border-gray-100">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                    <Bell size={20} />
                 </div>
                 <div>
                    <h3 className="font-bold text-toss-dark text-lg">시스템 안정</h3>
                    <p className="text-toss-greyDark">모든 서비스가 정상적으로 운영 중입니다.</p>
                 </div>
              </div>
              <button className="text-gray-400 text-sm hover:text-gray-600 whitespace-nowrap px-2">
                 닫기
              </button>
            </div>
          </FadeIn>

        </div>
      </main>
    </div>
  );
};
