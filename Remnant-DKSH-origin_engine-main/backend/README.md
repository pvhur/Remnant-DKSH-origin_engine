# Origin AI Backend

백엔드 API 서버입니다.

## 기술 스택

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- PostgreSQL
- JWT (인증)
- bcryptjs (비밀번호 해시)
- Helmet (보안)
- Express Rate Limit (Rate Limiting)

## 설치

```bash
cd backend
npm install
```

## 환경 변수 설정

`env.example.txt` 파일을 참고하여 `.env` 파일을 생성하세요:

```bash
cp env.example.txt .env
```

`.env` 파일 내용:
```
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/origin_ai_db
```

## 데이터베이스 설정

### 1. PostgreSQL 설치 (로컬 개발)

Docker를 사용하는 경우:
```bash
docker-compose up -d postgres
```

또는 직접 설치:
```bash
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. 데이터베이스 생성

```bash
createdb origin_ai_db
```

### 3. Prisma 마이그레이션

```bash
# Prisma Client 생성
npm run db:generate

# 마이그레이션 실행
npm run db:migrate
```

## 실행

### 개발 모드
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 프로덕션 모드
```bash
npm start
```

## API 엔드포인트

### 인증 (Auth)

- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/refresh` - 토큰 갱신
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보 (인증 필요)

### 헬스 체크

- `GET /health` - 서버 상태 확인

### CSRF 토큰

- `GET /api/csrf-token` - CSRF 토큰 발급

## 보안 기능

- ✅ JWT 토큰 인증
- ✅ 비밀번호 해시 (bcrypt)
- ✅ CSRF 방어
- ✅ XSS 방어
- ✅ Rate Limiting
- ✅ 보안 헤더 (Helmet)
- ✅ 입력 검증 (Zod, Express Validator)

## 데이터베이스 관리

### Prisma Studio (데이터베이스 GUI)
```bash
npm run db:studio
```

### 마이그레이션
```bash
# 개발 환경
npm run db:migrate

# 프로덕션 환경
npm run db:migrate:deploy
```

## 배포

오라클 클라우드 (OCI) 미국 리전 배포 가이드는 `OCI_DEPLOYMENT.md`를 참고하세요.

## 개발 참고사항

- 데이터베이스는 PostgreSQL을 사용합니다
- Prisma를 ORM으로 사용합니다
- 모든 보안 기능이 구현되어 있습니다

