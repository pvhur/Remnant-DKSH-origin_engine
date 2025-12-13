import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export const ValueProp: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-bold text-toss-dark mb-16 tracking-tight leading-tight">
            능동적 예측. 지능적 최적화.<br />
            <span className="text-toss-greyDark">기존 시스템의 한계를 넘어서.</span>
          </h2>
        </FadeIn>

        <div className="space-y-32">
          {/* Point 1 - Retail Value */}
          <FadeIn className="flex flex-col items-center">
            <div className="w-20 h-20 bg-toss-blue rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6">
              1
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-toss-dark mb-4">
              P&L에 직접 기여하는 수익 최적화
            </h3>
            <p className="text-xl text-toss-greyDark leading-relaxed max-w-2xl">
              기존 CRM의 '고객 만족'을 넘어,<br />
              <span className="font-semibold text-toss-dark">과거 구매 기록이 아닌 '미래 가치'를 기준</span>으로 마케팅 자원을 배분하여<br />
              마진을 보호하고 ROI를 극대화합니다.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 max-w-xl">
              <div className="bg-toss-blueLight rounded-2xl p-6">
                <div className="text-4xl font-bold text-toss-blue mb-2">33%</div>
                <p className="text-sm text-toss-greyDark">CLV 증대</p>
              </div>
              <div className="bg-toss-blueLight rounded-2xl p-6">
                <div className="text-4xl font-bold text-toss-blue mb-2">500%</div>
                <p className="text-sm text-toss-greyDark">GenAI ROI</p>
              </div>
            </div>
          </FadeIn>

          {/* Point 2 - EMS Value */}
          <FadeIn className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#24B368] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6">
              2
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-toss-dark mb-4">
              사후 대응에서 능동형 예측 대응으로
            </h3>
            <p className="text-xl text-toss-greyDark leading-relaxed max-w-2xl">
              'Reactive'에서 <span className="font-semibold text-toss-dark">'Proactive'</span>로 전환하여,<br />
              다수 사상자 발생 상황에서 골든타임을 확보합니다.<br />
              전체 시설 봉쇄(사후 대응)가 아닌, <span className="font-semibold text-toss-dark">국소 격리(사전 예방)</span>로<br />
              초기 사상자 발생 가능성을 극적으로 낮춥니다.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 max-w-xl">
              <div className="bg-[#E5F7E8] rounded-2xl p-6">
                <div className="text-4xl font-bold text-[#24B368] mb-2">10초</div>
                <p className="text-sm text-toss-greyDark">이내 국소 봉쇄</p>
              </div>
              <div className="bg-[#E5F7E8] rounded-2xl p-6">
                <div className="text-4xl font-bold text-[#24B368] mb-2">5분</div>
                <p className="text-sm text-toss-greyDark">골든타임 단축</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
