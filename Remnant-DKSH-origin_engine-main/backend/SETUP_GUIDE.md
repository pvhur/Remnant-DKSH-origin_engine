# 백엔드 설정 가이드

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
cd backend
npm install
```

### 2. 환경 변수 설정
```bash
# env.example.txt를 참고하여 .env 파일 생성
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/origin_ai_db
```

### 3. 데이터베이스 설정

#### 옵션 A: Docker 사용 (추천)
```bash
# PostgreSQL만 실행
docker-compose up -d postgres

# 또는 전체 스택 실행 (PostgreSQL + Backend)
docker-compose up -d
```

#### 옵션 B: 로컬 PostgreSQL 설치
```bash
# PostgreSQL 설치 후
createdb origin_ai_db
```

### 4. Prisma 설정
```bash
# Prisma Client 생성
npm run db:generate

# 데이터베이스 마이그레이션
npm run db:migrate
```

### 5. 서버 실행
```bash
# 개발 모드
npm run dev

# 프로덕션 모드
npm run build
npm start
```

---

## 📋 회원가입/로그인 테스트

### 회원가입
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "테스트 사용자"
  }'
```

### 로그인
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 현재 사용자 정보 조회
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔐 보안 기능 확인

모든 보안 기능이 자동으로 적용됩니다:
- ✅ 비밀번호는 bcrypt로 해시되어 저장
- ✅ JWT 토큰으로 인증
- ✅ Rate Limiting (로그인: 15분에 5번)
- ✅ CSRF 토큰 검증
- ✅ XSS 방어
- ✅ 보안 헤더 설정

---

## 🐳 Docker 사용

### 전체 스택 실행
```bash
docker-compose up -d
```

### 로그 확인
```bash
docker-compose logs -f backend
```

### 중지
```bash
docker-compose down
```

---

## 📊 데이터베이스 관리

### Prisma Studio 실행
```bash
npm run db:studio
```
브라우저에서 `http://localhost:5555` 접속

### 마이그레이션 상태 확인
```bash
npx prisma migrate status
```

### 데이터베이스 리셋 (주의: 모든 데이터 삭제)
```bash
npx prisma migrate reset
```

---

## ☁️ 오라클 클라우드 배포

자세한 내용은 `OCI_DEPLOYMENT.md`를 참고하세요.

### 주요 단계:
1. OCI 계정 생성 (미국 리전 선택)
2. Autonomous Database 또는 Compute Instance 생성
3. 환경 변수 설정
4. Docker 이미지 빌드 및 배포
5. 데이터베이스 마이그레이션 실행

---

## 🔧 문제 해결

### 데이터베이스 연결 실패
```bash
# 연결 테스트
psql $DATABASE_URL

# Prisma 연결 테스트
npx prisma db pull
```

### 포트 충돌
```bash
# 포트 사용 확인
lsof -i :3001  # macOS/Linux
netstat -ano | findstr :3001  # Windows
```

### Prisma Client 오류
```bash
# Prisma Client 재생성
npm run db:generate
```

---

**이제 회원가입/로그인 기능이 완전히 작동합니다!**

