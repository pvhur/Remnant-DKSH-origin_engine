// Origin AI API 서비스
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_KEY = import.meta.env.VITE_API_KEY || '';

// API 응답 타입 정의
export interface KPIData {
  clvGrowth: number;
  roi: number;
  refundRate: number;
  activeCustomers: number;
  clvGrowthChange: number;
  roiChange: number;
  refundRateChange: number;
  activeCustomersChange: number;
}

export interface Refund {
  id: number;
  orderId: string;
  customerName: string;
  amount: number;
  reason: string;
  status: string;
  requestDate: string;
  processDate: string | null;
  category: string;
}

export interface RefundAnalytics {
  reason: string;
  count: number;
  percentage: number;
}

export interface CustomerSegment {
  id: number;
  name: string;
  count: number;
  clv: number;
  growth: string;
  color: string;
}

export interface Campaign {
  id: number;
  name: string;
  budget: number;
  revenue: number;
  roi: number;
  status: string;
  startDate: string;
}

export interface Personalization {
  id: number;
  campaignName: string;
  targetSegment: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  status: string;
}

export interface CLVTrend {
  date: string;
  value: number;
  segment: string;
}

export interface RefundTrend {
  date: string;
  count: number;
  amount: number;
}

// API 호출 헬퍼 함수
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || data;
}

// KPI 데이터 조회
export async function getKPIs(): Promise<KPIData> {
  // 실제 API가 없으므로 임시로 모의 데이터 반환
  // 실제 구현 시: return apiCall<KPIData>('/api/dashboard/kpis');
  
  // 모의 데이터 (나중에 실제 API로 교체)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        clvGrowth: 33,
        roi: 500,
        refundRate: 2.4,
        activeCustomers: 12458,
        clvGrowthChange: 5.2,
        roiChange: 12,
        refundRateChange: -0.8,
        activeCustomersChange: 1234,
      });
    }, 500);
  });
}

// 환불 목록 조회
export async function getRefunds(): Promise<Refund[]> {
  // 실제 API가 없으므로 임시로 모의 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          orderId: 'ORD-2024-001',
          customerName: '김고객',
          amount: 125000,
          reason: '상품 불만족',
          status: '처리 완료',
          requestDate: '2024-01-15',
          processDate: '2024-01-16',
          category: '제품 품질',
        },
        {
          id: 2,
          orderId: 'ORD-2024-002',
          customerName: '이고객',
          amount: 89000,
          reason: '배송 지연',
          status: '처리 중',
          requestDate: '2024-01-16',
          processDate: null,
          category: '배송',
        },
        {
          id: 3,
          orderId: 'ORD-2024-003',
          customerName: '박고객',
          amount: 156000,
          reason: '사이즈 불일치',
          status: '대기',
          requestDate: '2024-01-17',
          processDate: null,
          category: '제품 정보',
        },
        {
          id: 4,
          orderId: 'ORD-2024-004',
          customerName: '최고객',
          amount: 67000,
          reason: '상품 불만족',
          status: '처리 완료',
          requestDate: '2024-01-14',
          processDate: '2024-01-15',
          category: '제품 품질',
        },
      ]);
    }, 500);
  });
}

// 환불 분석 데이터 조회
export async function getRefundAnalytics(): Promise<RefundAnalytics[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { reason: '제품 품질', count: 45, percentage: 38 },
        { reason: '배송', count: 32, percentage: 27 },
        { reason: '제품 정보', count: 28, percentage: 24 },
        { reason: '기타', count: 13, percentage: 11 },
      ]);
    }, 500);
  });
}

// 고객 세그먼트 조회
export async function getCustomerSegments(): Promise<CustomerSegment[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'VIP 고객',
          count: 1245,
          clv: 850000,
          growth: '+15%',
          color: 'bg-purple-100 text-purple-700',
        },
        {
          id: 2,
          name: '일반 고객',
          count: 8567,
          clv: 320000,
          growth: '+8%',
          color: 'bg-blue-100 text-blue-700',
        },
        {
          id: 3,
          name: '신규 고객',
          count: 2646,
          clv: 120000,
          growth: '+25%',
          color: 'bg-green-100 text-green-700',
        },
      ]);
    }, 500);
  });
}

// CLV 트렌드 데이터 조회
export async function getCLVTrend(): Promise<CLVTrend[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dates = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      
      resolve([
        { date: dates[0], value: 280000, segment: '전체' },
        { date: dates[1], value: 295000, segment: '전체' },
        { date: dates[2], value: 310000, segment: '전체' },
        { date: dates[3], value: 325000, segment: '전체' },
        { date: dates[4], value: 340000, segment: '전체' },
        { date: dates[5], value: 355000, segment: '전체' },
        { date: dates[6], value: 370000, segment: '전체' },
      ]);
    }, 500);
  });
}

// 환불 트렌드 데이터 조회
export async function getRefundTrend(): Promise<RefundTrend[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dates = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      
      resolve([
        { date: dates[0], count: 12, amount: 1250000 },
        { date: dates[1], count: 15, amount: 1450000 },
        { date: dates[2], count: 8, amount: 980000 },
        { date: dates[3], count: 18, amount: 2100000 },
        { date: dates[4], count: 10, amount: 1150000 },
        { date: dates[5], count: 14, amount: 1350000 },
        { date: dates[6], count: 9, amount: 1050000 },
      ]);
    }, 500);
  });
}

// 캠페인 목록 조회
export async function getCampaigns(): Promise<Campaign[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '봄맞이 프로모션',
          budget: 5000000,
          revenue: 25000000,
          roi: 400,
          status: '진행 중',
          startDate: '2024-01-10',
        },
        {
          id: 2,
          name: '신규 고객 유치',
          budget: 3000000,
          revenue: 18000000,
          roi: 500,
          status: '완료',
          startDate: '2024-01-05',
        },
        {
          id: 3,
          name: '재구매 유도',
          budget: 2000000,
          revenue: 12000000,
          roi: 500,
          status: '완료',
          startDate: '2024-01-01',
        },
      ]);
    }, 500);
  });
}

// 개인화 추천 조회
export async function getPersonalizations(): Promise<Personalization[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          campaignName: '겨울 신상 추천',
          targetSegment: 'VIP 고객',
          sentCount: 1245,
          openRate: 68,
          clickRate: 24,
          conversionRate: 12,
          status: '진행 중',
        },
        {
          id: 2,
          campaignName: '할인 상품 알림',
          targetSegment: '일반 고객',
          sentCount: 8567,
          openRate: 52,
          clickRate: 18,
          conversionRate: 8,
          status: '완료',
        },
        {
          id: 3,
          campaignName: '신규 고객 환영',
          targetSegment: '신규 고객',
          sentCount: 2646,
          openRate: 75,
          clickRate: 32,
          conversionRate: 15,
          status: '진행 중',
        },
      ]);
    }, 500);
  });
}

