import React, { useState, useEffect } from 'react';
import { ArrowLeft, Megaphone, TrendingUp, Users, DollarSign, RefreshCw, BarChart3, Target, Sparkles, FileText, AlertCircle, CheckCircle2, Clock, XCircle, LayoutDashboard, Code, Key, BookOpen, Copy, Check } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FadeIn } from '../components/ui/FadeIn';
import { getKPIs, getRefunds, getRefundAnalytics, getCustomerSegments, getCLVTrend, getRefundTrend, getCampaigns, getPersonalizations, type KPIData, type Refund, type RefundAnalytics, type CustomerSegment, type CLVTrend, type RefundTrend } from '../services/originApi';

interface RetailMarketingDashboardPageProps {
  onBack?: () => void;
  onLogout?: () => void;
}

type TabType = 'dashboard' | 'refunds' | 'customers' | 'marketing' | 'api';

export const RetailMarketingDashboardPage: React.FC<RetailMarketingDashboardPageProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedRefund, setSelectedRefund] = useState<number | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  
  // API 데이터 상태
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [refundAnalytics, setRefundAnalytics] = useState<RefundAnalytics[]>([]);
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [clvTrend, setClvTrend] = useState<CLVTrend[]>([]);
  const [refundTrend, setRefundTrend] = useState<RefundTrend[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [personalizations, setPersonalizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // API 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [kpis, refundsData, analytics, segmentsData, clvData, refundTrendData, campaignsData, personalizationsData] = await Promise.all([
          getKPIs(),
          getRefunds(),
          getRefundAnalytics(),
          getCustomerSegments(),
          getCLVTrend(),
          getRefundTrend(),
          getCampaigns(),
          getPersonalizations(),
        ]);
        
        setKpiData(kpis);
        setRefunds(refundsData);
        setRefundAnalytics(analytics);
        setSegments(segmentsData);
        setClvTrend(clvData);
        setRefundTrend(refundTrendData);
        setCampaigns(campaignsData);
        setPersonalizations(personalizationsData);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // 30초마다 데이터 새로고침
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // KPI 카드 데이터 변환
  const kpiCards = kpiData ? [
    {
      id: 1,
      title: 'CLV 증가율',
      value: `+${kpiData.clvGrowth}%`,
      change: `+${kpiData.clvGrowthChange}%`,
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 2,
      title: 'GenAI ROI',
      value: `${kpiData.roi}%`,
      change: `+${kpiData.roiChange}%`,
      trend: 'up' as const,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 3,
      title: '환불율',
      value: `${kpiData.refundRate}%`,
      change: kpiData.refundRateChange > 0 ? `+${kpiData.refundRateChange}%` : `${kpiData.refundRateChange}%`,
      trend: kpiData.refundRateChange < 0 ? 'down' as const : 'up' as const,
      icon: RefreshCw,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 4,
      title: '활성 고객',
      value: kpiData.activeCustomers.toLocaleString(),
      change: `+${kpiData.activeCustomersChange.toLocaleString()}`,
      trend: 'up' as const,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ] : [];

  // 환불 이유 분석 데이터 색상 매핑
  const refundReasonColors: Record<string, string> = {
    '제품 품질': '#ef4444',
    '배송': '#f97316',
    '제품 정보': '#eab308',
    '기타': '#6b7280',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '처리 완료':
        return 'bg-green-100 text-green-700';
      case '처리 중':
        return 'bg-blue-100 text-blue-700';
      case '대기':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-toss-grey font-sans text-toss-dark">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Megaphone size={24} className="text-toss-blue" />
              <span className="text-xl font-bold text-toss-dark tracking-tighter">
                origin<span className="text-toss-blue">.AI</span>
              </span>
              <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md tracking-wide">
                BETA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="로그아웃"
              >
                로그아웃
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'dashboard' as TabType, label: '대시보드', icon: LayoutDashboard },
              { id: 'refunds' as TabType, label: '환불 관리', icon: RefreshCw },
              { id: 'customers' as TabType, label: '고객 분석', icon: Users },
              { id: 'marketing' as TabType, label: '마케팅', icon: Sparkles },
              { id: 'api' as TabType, label: 'API 통합', icon: Code },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedRefund(null);
                    setSelectedSegment(null);
                  }}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'text-toss-blue border-toss-blue bg-blue-50/50'
                      : 'text-toss-greyDark border-transparent hover:text-toss-dark hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20">
        {/* KPI Cards - 모든 탭에서 표시 */}
        <FadeIn>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-12 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {kpiCards.map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={kpi.id}
                    className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${kpi.bgColor} ${kpi.color} rounded-2xl flex items-center justify-center`}>
                        <Icon size={24} />
                      </div>
                      <span className={`text-sm font-semibold ${
                        kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-toss-greyDark mb-1">{kpi.title}</p>
                      <p className="text-2xl font-bold text-toss-dark">{kpi.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </FadeIn>

        {/* Dashboard Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* CLV 트렌드 차트 */}
            <FadeIn delay={100}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-toss-blue rounded-2xl flex items-center justify-center">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">CLV 트렌드</h2>
                    <p className="text-sm text-toss-greyDark">최근 7일간 고객 생애 가치 변화</p>
                  </div>
                </div>
                {loading ? (
                  <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={clvTrend}>
                      <defs>
                        <linearGradient id="colorClv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3182F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3182F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px',
                          padding: '12px'
                        }}
                        formatter={(value: number) => [`${value.toLocaleString()}원`, 'CLV']}
                        labelFormatter={(label) => new Date(label).toLocaleDateString('ko-KR')}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3182F6" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorClv)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </FadeIn>

            {/* 환불 트렌드 차트 */}
            <FadeIn delay={150}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">환불 트렌드</h2>
                    <p className="text-sm text-toss-greyDark">최근 7일간 환불 건수 및 금액</p>
                  </div>
                </div>
                {loading ? (
                  <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={refundTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis yAxisId="left" tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px',
                          padding: '12px'
                        }}
                        formatter={(value: number, name: string) => {
                          if (name === 'count') return [value, '건수'];
                          return [`${value.toLocaleString()}원`, '금액'];
                        }}
                        labelFormatter={(label) => new Date(label).toLocaleDateString('ko-KR')}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" fill="#f97316" name="건수" radius={[8, 8, 0, 0]} />
                      <Bar yAxisId="right" dataKey="amount" fill="#ef4444" name="금액" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </FadeIn>

            {/* 환불 이유 분석 파이 차트 */}
            <FadeIn delay={200}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">환불 이유 분석</h2>
                    <p className="text-sm text-toss-greyDark">환불 사유별 비율</p>
                  </div>
                </div>
                {loading ? (
                  <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={refundAnalytics}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="percentage"
                        >
                          {refundAnalytics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={refundReasonColors[entry.reason] || '#6b7280'} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col justify-center space-y-4">
                      {refundAnalytics.map((item) => (
                        <div key={item.reason}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-toss-dark">{item.reason}</span>
                            <span className="text-sm text-toss-greyDark">
                              {item.count}건 ({item.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all"
                              style={{ 
                                width: `${item.percentage}%`,
                                backgroundColor: refundReasonColors[item.reason] || '#6b7280'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        )}

        {/* Refunds Tab Content */}
        {activeTab === 'refunds' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 환불 내역 */}
            <FadeIn delay={100}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                    <RefreshCw size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">환불 내역</h2>
                    <p className="text-sm text-toss-greyDark">최근 환불 요청 및 처리 현황</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {refunds.map((refund) => (
                    <div
                      key={refund.id}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedRefund === refund.id
                          ? 'border-toss-blue bg-blue-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                      onClick={() => setSelectedRefund(refund.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-toss-dark">
                              {refund.orderId}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(refund.status)}`}>
                              {refund.status}
                            </span>
                          </div>
                          <p className="text-sm text-toss-greyDark mb-1">
                            {refund.customerName} · {refund.category}
                          </p>
                          <p className="text-lg font-bold text-toss-dark">
                            {formatCurrency(refund.amount)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-toss-greyDark">
                        <span className="flex items-center gap-1">
                          <FileText size={14} />
                          {refund.reason}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {refund.requestDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* 환불 이유 분석 */}
            <FadeIn delay={150}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">환불 이유 분석</h2>
                    <p className="text-sm text-toss-greyDark">환불 사유별 통계</p>
                  </div>
                </div>

                  <div className="space-y-4">
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      refundAnalytics.map((item) => (
                        <div key={item.reason}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-toss-dark">{item.reason}</span>
                            <span className="text-sm text-toss-greyDark">
                              {item.count}건 ({item.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all"
                              style={{ 
                                width: `${item.percentage}%`,
                                backgroundColor: refundReasonColors[item.reason] || '#6b7280'
                              }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
              </div>
            </FadeIn>
          </div>
        )}

        {/* Customers Tab Content */}
        {activeTab === 'customers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CLV 예측 */}
            <FadeIn delay={100}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-toss-blue rounded-2xl flex items-center justify-center">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">CLV 예측</h2>
                    <p className="text-sm text-toss-greyDark">고객 생애 가치 예측 모델</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {segments.map((segment) => (
                    <div
                      key={segment.id}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedSegment === segment.id
                          ? 'border-toss-blue bg-blue-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                      onClick={() => setSelectedSegment(segment.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-toss-dark text-lg">
                              {segment.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${segment.color}`}>
                              {segment.growth}
                            </span>
                          </div>
                          <p className="text-sm text-toss-greyDark mb-1">
                            고객 수: {segment.count.toLocaleString()}명
                          </p>
                          <p className="text-lg font-bold text-toss-dark">
                            평균 CLV: {formatCurrency(segment.clv)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* 고객 세그먼트 관리 */}
            <FadeIn delay={150}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">고객 세그먼트</h2>
                    <p className="text-sm text-toss-greyDark">세그먼트별 통계 및 관리</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {segments.map((segment) => (
                    <div
                      key={segment.id}
                      className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-toss-dark text-lg">
                            {segment.name}
                          </h3>
                          <p className="text-sm text-toss-greyDark mt-1">
                            {segment.count.toLocaleString()}명
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${segment.color}`}>
                          {segment.growth}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ 
                            width: `${(segment.count / segments.reduce((sum, s) => sum + s.count, 0)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        )}

        {/* Marketing Tab Content */}
        {activeTab === 'marketing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 개인화 추천 엔진 */}
            <FadeIn delay={100}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">개인화 추천</h2>
                    <p className="text-sm text-toss-greyDark">AI 기반 하이퍼 개인화 캠페인</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {personalizations.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-toss-dark text-lg mb-1">
                            {campaign.campaignName}
                          </h3>
                          <p className="text-sm text-toss-greyDark mb-2">
                            대상: {campaign.targetSegment} · 발송: {campaign.sentCount.toLocaleString()}명
                          </p>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <p className="text-toss-greyDark">오픈율</p>
                              <p className="font-bold text-toss-dark">{campaign.openRate}%</p>
                            </div>
                            <div>
                              <p className="text-toss-greyDark">클릭율</p>
                              <p className="font-bold text-toss-dark">{campaign.clickRate}%</p>
                            </div>
                            <div>
                              <p className="text-toss-greyDark">전환율</p>
                              <p className="font-bold text-green-600">{campaign.conversionRate}%</p>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          campaign.status === '진행 중' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* 마케팅 캠페인 성과 */}
            <FadeIn delay={150}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <Target size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">캠페인 성과</h2>
                    <p className="text-sm text-toss-greyDark">마케팅 캠페인 ROI 분석</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-toss-dark text-lg mb-1">
                            {campaign.name}
                          </h3>
                          <p className="text-sm text-toss-greyDark mb-2">
                            예산: {formatCurrency(campaign.budget)} · 매출: {formatCurrency(campaign.revenue)}
                          </p>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-xs text-toss-greyDark">ROI</p>
                              <p className="text-xl font-bold text-green-600">{campaign.roi}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-toss-greyDark">시작일</p>
                              <p className="text-sm font-semibold text-toss-dark">{campaign.startDate}</p>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          campaign.status === '진행 중' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        )}

        {/* API Integration Tab Content */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API 개요 */}
            <FadeIn delay={100}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <Code size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">API 통합 가이드</h2>
                    <p className="text-sm text-toss-greyDark">Origin AI API를 사용하여 자신의 웹사이트에 통합하세요</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <BookOpen size={20} />
                      시작하기
                    </h3>
                    <p className="text-blue-800 text-sm mb-4">
                      Origin AI API를 사용하면 환불 관리, 고객 분석, 마케팅 데이터를 자신의 웹사이트나 애플리케이션에 쉽게 통합할 수 있습니다.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-xl p-4">
                        <div className="text-2xl font-bold text-toss-dark mb-1">1단계</div>
                        <p className="text-sm text-toss-greyDark">API 키 발급</p>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <div className="text-2xl font-bold text-toss-dark mb-1">2단계</div>
                        <p className="text-sm text-toss-greyDark">코드 통합</p>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <div className="text-2xl font-bold text-toss-dark mb-1">3단계</div>
                        <p className="text-sm text-toss-greyDark">테스트 및 배포</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* API 키 관리 */}
            <FadeIn delay={150}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                    <Key size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">API 키 관리</h2>
                    <p className="text-sm text-toss-greyDark">API 키를 발급하고 관리하세요</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-toss-greyDark">현재 API 키</span>
                      <button
                        onClick={() => copyToClipboard(apiKey, 'apikey')}
                        className="text-xs text-toss-blue hover:text-blue-600 flex items-center gap-1"
                      >
                        {copiedCode === 'apikey' ? (
                          <>
                            <Check size={14} />
                            복사됨
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            복사
                          </>
                        )}
                      </button>
                    </div>
                    <div className="font-mono text-sm bg-white p-3 rounded-lg border border-gray-200 break-all">
                      {apiKey}
                    </div>
                  </div>
                  <button className="w-full px-4 py-3 bg-toss-blue text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                    새 API 키 생성
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* API 엔드포인트 */}
            <FadeIn delay={200}>
              <div className="bg-white rounded-[28px] p-8">
                <h2 className="text-2xl font-bold text-toss-dark mb-6">API 엔드포인트</h2>
                
                <div className="space-y-6">
                  {/* 환불 API */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-toss-dark mb-4">환불 관리 API</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">GET</span>
                          <code className="text-sm font-mono text-toss-dark">/api/refunds</code>
                        </div>
                        <p className="text-sm text-toss-greyDark">환불 목록 조회</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">GET</span>
                          <code className="text-sm font-mono text-toss-dark">/api/refunds/:id</code>
                        </div>
                        <p className="text-sm text-toss-greyDark">환불 상세 조회</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">POST</span>
                          <code className="text-sm font-mono text-toss-dark">/api/refunds</code>
                        </div>
                        <p className="text-sm text-toss-greyDark">환불 처리</p>
                      </div>
                    </div>
                  </div>

                  {/* 고객 분석 API */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-toss-dark mb-4">고객 분석 API</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">GET</span>
                          <code className="text-sm font-mono text-toss-dark">/api/customers/segments</code>
                        </div>
                        <p className="text-sm text-toss-greyDark">고객 세그먼트 목록</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">GET</span>
                          <code className="text-sm font-mono text-toss-dark">/api/customers/clv</code>
                        </div>
                        <p className="text-sm text-toss-greyDark">CLV 예측 데이터</p>
                      </div>
                    </div>
                  </div>

                  {/* 마케팅 API */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-toss-dark mb-4">마케팅 API</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">GET</span>
                          <code className="text-sm font-mono text-toss-dark">/api/campaigns</code>
                        </div>
                        <p className="text-sm text-toss-greyDark">캠페인 목록</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">GET</span>
                          <code className="text-sm font-mono text-toss-dark">/api/dashboard/kpis</code>
                        </div>
                        <p className="text-sm text-toss-greyDark">KPI 데이터</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 코드 예제 */}
            <FadeIn delay={250}>
              <div className="bg-white rounded-[28px] p-8">
                <h2 className="text-2xl font-bold text-toss-dark mb-6">코드 예제</h2>
                
                <div className="space-y-6">
                  {/* JavaScript/React 예제 */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-toss-dark">JavaScript / React</h3>
                      <button
                        onClick={() => copyToClipboard(`// API 키 설정
const API_KEY = '${apiKey}';
const API_BASE_URL = 'https://api.origin.ai';

// 환불 목록 조회
async function getRefunds() {
  const response = await fetch(\`\${API_BASE_URL}/api/refunds\`, {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();
  return data;
}

// React 컴포넌트에서 사용
function RefundList() {
  const [refunds, setRefunds] = useState([]);
  
  useEffect(() => {
    getRefunds().then(setRefunds);
  }, []);
  
  return (
    <div>
      {refunds.map(refund => (
        <div key={refund.id}>
          <h3>{refund.orderId}</h3>
          <p>{refund.amount}원</p>
        </div>
      ))}
    </div>
  );
}`, 'js')}
                        className="text-xs text-toss-blue hover:text-blue-600 flex items-center gap-1"
                      >
                        {copiedCode === 'js' ? (
                          <>
                            <Check size={14} />
                            복사됨
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            복사
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`// API 키 설정
const API_KEY = '${apiKey}';
const API_BASE_URL = 'https://api.origin.ai';

// 환불 목록 조회
async function getRefunds() {
  const response = await fetch(\`\${API_BASE_URL}/api/refunds\`, {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();
  return data;
}

// React 컴포넌트에서 사용
function RefundList() {
  const [refunds, setRefunds] = useState([]);
  
  useEffect(() => {
    getRefunds().then(setRefunds);
  }, []);
  
  return (
    <div>
      {refunds.map(refund => (
        <div key={refund.id}>
          <h3>{refund.orderId}</h3>
          <p>{refund.amount}원</p>
        </div>
      ))}
    </div>
  );
}`}</code>
                    </pre>
                  </div>

                  {/* Python 예제 */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-toss-dark">Python</h3>
                      <button
                        onClick={() => copyToClipboard(`import requests

API_KEY = '${apiKey}'
API_BASE_URL = 'https://api.origin.ai'

# 환불 목록 조회
def get_refunds():
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json',
    }
    
    response = requests.get(
        f'{API_BASE_URL}/api/refunds',
        headers=headers
    )
    
    return response.json()

# 사용 예제
refunds = get_refunds()
for refund in refunds:
    print(f"주문번호: {refund['orderId']}, 금액: {refund['amount']}원")`, 'python')}
                        className="text-xs text-toss-blue hover:text-blue-600 flex items-center gap-1"
                      >
                        {copiedCode === 'python' ? (
                          <>
                            <Check size={14} />
                            복사됨
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            복사
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`import requests

API_KEY = '${apiKey}'
API_BASE_URL = 'https://api.origin.ai'

# 환불 목록 조회
def get_refunds():
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json',
    }
    
    response = requests.get(
        f'{API_BASE_URL}/api/refunds',
        headers=headers
    )
    
    return response.json()

# 사용 예제
refunds = get_refunds()
for refund in refunds:
    print(f"주문번호: {refund['orderId']}, 금액: {refund['amount']}원")`}</code>
                    </pre>
                  </div>

                  {/* cURL 예제 */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-toss-dark">cURL</h3>
                      <button
                        onClick={() => copyToClipboard(`curl -X GET "https://api.origin.ai/api/refunds" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`, 'curl')}
                        className="text-xs text-toss-blue hover:text-blue-600 flex items-center gap-1"
                      >
                        {copiedCode === 'curl' ? (
                          <>
                            <Check size={14} />
                            복사됨
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            복사
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`curl -X GET "https://api.origin.ai/api/refunds" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 통합 가이드 */}
            <FadeIn delay={300}>
              <div className="bg-white rounded-[28px] p-8">
                <h2 className="text-2xl font-bold text-toss-dark mb-6">통합 가이드</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-toss-blue pl-6">
                    <h3 className="font-bold text-lg text-toss-dark mb-2">1단계: API 키 발급</h3>
                    <p className="text-sm text-toss-greyDark mb-3">
                      대시보드에서 API 키를 발급받으세요. API 키는 모든 요청에 포함되어야 합니다.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <code className="text-toss-dark">Authorization: Bearer YOUR_API_KEY</code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="font-bold text-lg text-toss-dark mb-2">2단계: 환경 설정</h3>
                    <p className="text-sm text-toss-greyDark mb-3">
                      API 키를 환경 변수나 설정 파일에 저장하세요. 절대 공개 저장소에 커밋하지 마세요.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <code className="text-toss-dark">.env 파일: ORIGIN_API_KEY=your_api_key</code>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="font-bold text-lg text-toss-dark mb-2">3단계: API 호출 구현</h3>
                    <p className="text-sm text-toss-greyDark mb-3">
                      위의 코드 예제를 참고하여 API를 호출하는 함수를 구현하세요.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="font-bold text-lg text-toss-dark mb-2">4단계: 테스트</h3>
                    <p className="text-sm text-toss-greyDark mb-3">
                      개발 환경에서 API 호출을 테스트하고 응답 데이터를 확인하세요.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="font-bold text-lg text-toss-dark mb-2">5단계: 배포</h3>
                    <p className="text-sm text-toss-greyDark">
                      모든 테스트가 완료되면 프로덕션 환경에 배포하세요.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        )}
      </main>
    </div>
  );
};

