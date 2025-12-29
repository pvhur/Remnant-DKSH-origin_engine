# Origin AI 프로젝트 분석 보고서

## 📋 프로젝트 개요

**프로젝트명**: Origin AI (origin.AI)  
**상태**: BETA 버전  
**타입**: 풀스택 웹 애플리케이션  
**목적**: AI 기반 서비스 플랫폼 (리테일 마케팅, EMS 시스템 등)

---

## 🏗️ 아키텍처 구조

### 전체 구조
```
Remnant-DKSH-origin_engine-main/
├── backend/          # Node.js/Express 백엔드 서버
├── origin_web/       # React/Vite 프론트엔드
├── origin_engine/    # (비어있음 - 향후 확장 예정)
└── testweb/         # (미사용)
```

---

## 🔧 기술 스택

### Backend
- **런타임**: Node.js
- **프레임워크**: Express.js
- **언어**: TypeScript
- **인증**: JWT (jsonwebtoken) - 현재 미구현
- **유효성 검사**: Zod
- **보안**: bcryptjs (비밀번호 해싱) - 현재 미사용
- **환경 변수**: dotenv

### Frontend
- **프레임워크**: React 19.2.0
- **빌드 도구**: Vite 6.2.0
- **언어**: TypeScript 5.8.2
- **아이콘**: Lucide React
- **스타일링**: Tailwind CSS (추정)
- **폰트**: Inter (Google Fonts)

---

## 📁 주요 파일 구조

### Backend 구조
```
backend/
├── src/
│   ├── config/
│   │   └── env.ts              # 환경 변수 설정
│   ├── controllers/
│   │   └── auth.controller.ts  # 인증 컨트롤러 (로그인/회원가입)
│   ├── middleware/
│   │   └── auth.middleware.ts   # JWT 인증 미들웨어 (미구현)
│   ├── routes/
│   │   └── auth.routes.ts       # 인증 라우트
│   ├── utils/
│   │   └── errorHandler.ts      # 에러 핸들링 유틸리티
│   └── server.ts                # Express 서버 진입점
├── package.json
├── tsconfig.json
└── README.md
```

### Frontend 구조
```
origin_web/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── ValueProp.tsx
│   │   └── CTA.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── FadeIn.tsx
├── pages/
│   ├── LandingPage.tsx          # 랜딩 페이지
│   ├── LoginPage.tsx            # 로그인 페이지
│   ├── DashboardPage.tsx        # 대시보드 (서비스 선택)
│   └── EMSDashboardPage.tsx     # EMS 시스템 대시보드
├── styles/
│   └── main.css                 # 글로벌 스타일
├── App.tsx                       # 메인 앱 컴포넌트 (라우팅)
├── index.tsx                     # 진입점
├── vite.config.ts
└── package.json
```

---

## 🔍 주요 기능 분석

### 1. 인증 시스템 (Authentication)

#### 현재 상태: ⚠️ **임시 구현 상태**

**Backend (`auth.controller.ts`)**:
- ✅ Zod를 사용한 입력 유효성 검사 구현됨
- ❌ 실제 데이터베이스 연동 없음
- ❌ 실제 JWT 토큰 생성 없음 (임시 토큰 반환)
- ❌ 비밀번호 해싱 없음
- ❌ 사용자 조회/저장 로직 없음

**Frontend (`LoginPage.tsx`)**:
- ✅ 폼 유효성 검사 구현됨
- ✅ API 호출 로직 구현됨 (`http://localhost:3001/api/auth/login`)
- ✅ 로컬 스토리지에 토큰 저장
- ✅ 에러 핸들링 구현됨

**미들웨어 (`auth.middleware.ts`)**:
- ⚠️ 토큰 존재 여부만 확인
- ❌ JWT 검증 로직 미구현

### 2. 페이지 구조

#### LandingPage
- 목적: 서비스 소개 및 로그인 유도
- 구성: Navbar, Hero, Features, ValueProp, CTA, Footer
- 기능: 로그인 페이지로 네비게이션

#### LoginPage
- 목적: 사용자 인증
- 기능:
  - 이메일/비밀번호 입력
  - 폼 유효성 검사
  - 백엔드 API 연동
  - 로그인 상태 유지 체크박스 (UI만 존재)
  - 비밀번호 찾기 버튼 (기능 없음)
  - 회원가입 링크 (기능 없음)

#### DashboardPage
- 목적: 서비스 선택 대시보드
- 기능:
  - 리테일 마케팅 서비스 카드 (클릭 기능 없음)
  - EMS 시스템 카드 (클릭 시 EMS 대시보드로 이동)
  - 시스템 상태 배너
  - 로그아웃 기능

#### EMSDashboardPage
- 목적: 응급의료체계 관리 대시보드
- 기능:
  - 환자 상태 파악 (샘플 데이터)
  - 병원 추천 시스템 (샘플 데이터)
  - 의사 주무 현황 (샘플 데이터)
  - 환자-의사 배정 (UI만 존재, 기능 없음)
  - 병상 현황 (고정 데이터)
- 상태: 베타 서비스 안내 표시

### 3. UI/UX 특징

- **디자인 시스템**: Toss 스타일 디자인 (toss-blue, toss-grey 등)
- **애니메이션**: FadeIn 컴포넌트로 페이드인 효과
- **반응형**: 모바일/데스크톱 대응
- **아이콘**: Lucide React 사용
- **색상 체계**: 
  - Primary: Blue (#3182F6 추정)
  - Success: Green (#24B368)
  - Warning: Orange (#FF5F00)
  - Danger: Red

---

## ⚠️ 현재 문제점 및 TODO 항목

### Backend

1. **인증 시스템 미완성**
   - [ ] 실제 데이터베이스 연동 필요
   - [ ] JWT 토큰 생성 로직 구현 필요
   - [ ] 비밀번호 해싱 (bcryptjs) 구현 필요
   - [ ] 사용자 모델/스키마 정의 필요
   - [ ] JWT 검증 미들웨어 완성 필요

2. **데이터베이스**
   - [ ] 데이터베이스 선택 및 설정 (MongoDB, PostgreSQL 등)
   - [ ] ORM/ODM 설정 (Prisma, Mongoose 등)
   - [ ] 마이그레이션 설정

3. **에러 핸들링**
   - [ ] 더 상세한 에러 메시지
   - [ ] 로깅 시스템 (Winston, Pino 등)

### Frontend

1. **라우팅**
   - [ ] React Router 도입 고려 (현재는 상태 기반 라우팅)
   - [ ] 보호된 라우트 구현 (인증 필요 페이지)

2. **상태 관리**
   - [ ] 전역 상태 관리 필요 (Context API, Zustand, Redux 등)
   - [ ] 인증 상태 관리 개선

3. **API 통신**
   - [ ] API 클라이언트 추상화 (Axios 등)
   - [ ] 인터셉터 설정 (토큰 자동 추가, 에러 처리)
   - [ ] 환경 변수로 API URL 관리

4. **기능 미완성**
   - [ ] 회원가입 페이지/기능
   - [ ] 비밀번호 찾기 기능
   - [ ] 리테일 마케팅 서비스 페이지
   - [ ] EMS 시스템 실제 기능 구현

### 공통

1. **환경 설정**
   - [ ] `.env.example` 파일 생성
   - [ ] 환경별 설정 분리 (dev, staging, prod)

2. **보안**
   - [ ] CORS 설정 검토
   - [ ] Rate limiting 구현
   - [ ] 입력 sanitization
   - [ ] XSS/CSRF 방어

3. **테스트**
   - [ ] 단위 테스트 설정
   - [ ] 통합 테스트
   - [ ] E2E 테스트

4. **문서화**
   - [ ] API 문서화 (Swagger/OpenAPI)
   - [ ] 컴포넌트 문서화 (Storybook 등)

---

## 🚀 실행 방법

### Backend 실행
```bash
cd backend
npm install
# .env 파일 생성 필요
npm run dev  # 개발 모드 (포트: 3001)
```

### Frontend 실행
```bash
cd origin_web
npm install
npm run dev  # 개발 모드 (포트: 3000)
```

### 환경 변수 (Backend)
```
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

---

## 📊 코드 품질 평가

### 장점 ✅
1. **타입 안정성**: TypeScript 사용으로 타입 안정성 확보
2. **유효성 검사**: Zod를 사용한 견고한 입력 검증
3. **모던 스택**: 최신 React 19, Vite 6 사용
4. **구조화**: 깔끔한 폴더 구조
5. **UI/UX**: 현대적이고 일관된 디자인

### 개선 필요 ⚠️
1. **인증 시스템**: 실제 구현 필요 (현재는 더미)
2. **데이터베이스**: 데이터 영속성 없음
3. **에러 처리**: 더 상세한 에러 핸들링 필요
4. **테스트**: 테스트 코드 없음
5. **문서화**: API 문서 부족

---

## 🎯 다음 단계 제안

### 우선순위 높음 (P0)
1. 데이터베이스 설정 및 연동
2. 실제 인증 시스템 구현 (JWT, 비밀번호 해싱)
3. 사용자 모델/스키마 정의

### 우선순위 중간 (P1)
4. React Router 도입
5. 전역 상태 관리 설정
6. API 클라이언트 추상화
7. 환경 변수 관리 개선

### 우선순위 낮음 (P2)
8. 테스트 코드 작성
9. 문서화
10. 성능 최적화
11. 추가 기능 구현 (회원가입, 비밀번호 찾기 등)

---

## 📝 결론

이 프로젝트는 **잘 구조화된 베이스**를 가지고 있으나, **핵심 기능들이 아직 구현되지 않은 상태**입니다. 특히 인증 시스템과 데이터베이스 연동이 완료되어야 실제로 동작하는 애플리케이션이 될 수 있습니다.

현재는 **프로토타입/프로젝트 초기 단계**로 보이며, 프론트엔드 UI는 상당히 완성도가 높지만, 백엔드 로직은 대부분 TODO 상태입니다.

---

**분석 일자**: 2024년  
**분석자**: AI Assistant

