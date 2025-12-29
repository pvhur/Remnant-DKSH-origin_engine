import React from 'react';
import { TrendingUp, Shield, Zap, Target, AlertCircle, Activity } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';

export const Features: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-toss-grey relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-toss-dark mb-6 tracking-tight">
              Origin Engine의<br className="md:hidden"/> 이중 가치
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-xl text-toss-greyDark">
              하나의 코어 기술이 어떻게 두 가지 극단적인 결과를 만들어내는지.<br />
              실시간 예측 및 최적화로 비즈니스와 생명을 동시에 보호합니다.
            </p>
          </FadeIn>
        </div>

        {/* Two Column Layout - Retail vs EMS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Retail Marketing Section */}
          <FadeIn delay={200}>
            <div className="bg-white rounded-3xl p-8 md:p-10">
              <div className="mb-8">
                <div className="w-14 h-14 bg-toss-blueLight text-toss-blue rounded-2xl flex items-center justify-center mb-4">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-3xl font-bold text-toss-dark mb-2">수익 가속화</h3>
                <p className="text-toss-greyDark text-lg">리테일 마케팅 모듈</p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={20} className="text-toss-blue" />
                    <h4 className="font-bold text-toss-dark">CLV 예측 모델</h4>
                  </div>
                  <p className="text-toss-greyDark text-sm leading-relaxed">
                    미래 잠재 가치를 기반으로 고객을 분류하고, 마케팅 예산을 가장 높은 수익을 낼 고객에게 집중.
                    <span className="font-semibold text-toss-dark"> CLV 33% 증대</span>
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={20} className="text-toss-blue" />
                    <h4 className="font-bold text-toss-dark">하이퍼 개인화</h4>
                  </div>
                  <p className="text-toss-greyDark text-sm leading-relaxed">
                    실시간 브라우징 의도 및 이탈 확률을 감지하여, 마진을 해치지 않는 최적의 인센티브를 즉각 제공. 
                    <span className="font-semibold text-toss-dark"> 1:1 상황 인지</span> 기반 개인화로 전환율 극대화.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={20} className="text-toss-blue" />
                    <h4 className="font-bold text-toss-dark">GenAI CX 자동화</h4>
                  </div>
                  <p className="text-toss-greyDark text-sm leading-relaxed">
                    고객 서비스 자동 응대 및 개인화된 마케팅 카피 즉시 생성.
                    <span className="font-semibold text-toss-dark"> GenAI 500% ROI</span>
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* EMS Section */}
          <FadeIn delay={300}>
            <div className="bg-white rounded-3xl p-8 md:p-10">
              <div className="mb-8">
                <div className="w-14 h-14 bg-[#E5F7E8] text-[#24B368] rounded-2xl flex items-center justify-center mb-4">
                  <Shield size={28} />
                </div>
                <h3 className="text-3xl font-bold text-toss-dark mb-2">생존율 최적화</h3>
                <p className="text-toss-greyDark text-lg">EMS/위협 대응 모듈</p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={20} className="text-[#24B368]" />
                    <h4 className="font-bold text-toss-dark">위협 예측 센싱</h4>
                  </div>
                  <p className="text-toss-greyDark text-sm leading-relaxed">
                    CCTV, 음성, 출입 통제 데이터를 통합하여 비정상 활동 지수(AAI) 예측. 
                    <span className="font-semibold text-toss-dark"> 피해 발생 '전'</span>에 위협 감지 및 자동 대응.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={20} className="text-[#24B368]" />
                    <h4 className="font-bold text-toss-dark">능동형 국소 봉쇄</h4>
                  </div>
                  <p className="text-toss-greyDark text-sm leading-relaxed">
                    AI 예측에 따라 위협 구역만 
                    <span className="font-semibold text-toss-dark"> 10초 이내</span> 자동으로 잠가 위협 확산을 물리적으로 차단.
                    국소 격리로 초기 사상자 발생 가능성 극적으로 낮춤.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={20} className="text-[#24B368]" />
                    <h4 className="font-bold text-toss-dark">실질 병원 수용 예측</h4>
                  </div>
                  <p className="text-toss-greyDark text-sm leading-relaxed">
                    환자 중증도와 병원의 실시간 전문의 가용성을 예측하여 최적 병원 추천. 
                    <span className="font-semibold text-toss-dark"> 골든타임 5분 단축</span>, 응급실 뺑뺑이 문제 원천 해결.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* Core Engine Section */}
        <FadeIn delay={400}>
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-toss-dark mb-4">Origin Core Engine</h3>
              <p className="text-lg text-toss-greyDark max-w-2xl mx-auto">
                두 버티컬의 모든 기능을 뒷받침하는 공유 기술 플랫폼
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-toss-blueLight text-toss-blue rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Activity size={24} />
                </div>
                <h4 className="font-bold text-toss-dark mb-2">통합 데이터 플랫폼</h4>
                <p className="text-sm text-toss-greyDark">
                  파편화된 데이터를 단일 프로필 및 상황 인식 형태로 실시간 통합
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-toss-blueLight text-toss-blue rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target size={24} />
                </div>
                <h4 className="font-bold text-toss-dark mb-2">ML 예측 프레임워크</h4>
                <p className="text-sm text-toss-greyDark">
                  미래의 행동 또는 상태 변화 확률을 예측하는 모델의 뼈대
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-toss-blueLight text-toss-blue rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap size={24} />
                </div>
                <h4 className="font-bold text-toss-dark mb-2">GenAI 연동 모듈</h4>
                <p className="text-sm text-toss-greyDark">
                  챗봇, 콘텐츠 생성, 비정형 데이터 구조화 등 자동화 기능 담당
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
