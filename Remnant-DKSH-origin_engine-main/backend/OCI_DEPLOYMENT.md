# Oracle Cloud Infrastructure (OCI) 배포 가이드 - 미국 리전

## 📍 미국 리전 설정

오라클 클라우드에서 **미국 리전 (US Region)**을 사용합니다.

### 주요 미국 리전:
- **us-ashburn-1** (Ashburn, Virginia) - 미국 동부
- **us-phoenix-1** (Phoenix, Arizona) - 미국 서부

---

## 🚀 배포 단계

### 1. OCI 계정 설정

1. Oracle Cloud Console에 로그인
2. 리전을 **미국 리전**으로 선택
3. Compute Instance 생성

### 2. 데이터베이스 설정

#### 옵션 A: OCI Autonomous Database 사용 (추천)
```bash
# OCI Console에서:
1. Autonomous Database 생성
2. 리전: us-ashburn-1 또는 us-phoenix-1
3. 데이터베이스 타입: PostgreSQL (또는 Oracle)
4. 연결 정보 확인
```

#### 옵션 B: Compute Instance에 PostgreSQL 설치
```bash
# SSH로 접속 후
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# PostgreSQL 설정
sudo -u postgres psql
CREATE DATABASE origin_ai_db;
CREATE USER origin_user WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE origin_ai_db TO origin_user;
```

### 3. 환경 변수 설정

`.env` 파일 생성:
```bash
# 서버 설정
PORT=3001
NODE_ENV=production

# JWT 설정
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS 설정
CORS_ORIGIN=https://your-frontend-domain.com

# 데이터베이스 설정 (OCI Autonomous Database)
DATABASE_URL=postgresql://username:password@your-db-host.oraclecloud.com:1521/origin_ai_db

# 또는 OCI Compute Instance의 PostgreSQL
DATABASE_URL=postgresql://origin_user:password@your-server-ip:5432/origin_ai_db
```

### 4. Docker를 사용한 배포

#### Docker 이미지 빌드
```bash
cd backend
docker build -t origin-ai-backend:latest .
```

#### Docker 이미지를 OCI Container Registry에 푸시
```bash
# OCI Container Registry 로그인
docker login <region-key>.ocir.io

# 이미지 태그
docker tag origin-ai-backend:latest <region-key>.ocir.io/<tenancy-namespace>/origin-ai-backend:latest

# 푸시
docker push <region-key>.ocir.io/<tenancy-namespace>/origin-ai-backend:latest
```

#### OCI Container Instances에서 실행
```bash
# OCI Console에서:
1. Container Instances 생성
2. 리전: us-ashburn-1
3. 이미지: ocir.io/<tenancy-namespace>/origin-ai-backend:latest
4. 환경 변수 설정
5. 네트워크 설정 (포트 3001)
```

### 5. Compute Instance에 직접 배포

#### 서버 설정
```bash
# Node.js 설치
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 프로젝트 클론 및 설정
git clone <your-repo>
cd backend
npm install

# Prisma 마이그레이션
npx prisma migrate deploy
npx prisma generate

# PM2로 프로세스 관리
sudo npm install -g pm2
pm2 start dist/server.js --name origin-ai-backend
pm2 save
pm2 startup
```

### 6. 데이터베이스 마이그레이션

```bash
# Prisma 마이그레이션 실행
npx prisma migrate deploy

# 또는 개발 환경에서
npx prisma migrate dev
```

### 7. 보안 그룹 설정

OCI Security List에서 다음 포트 허용:
- **3001** (HTTP API)
- **5432** (PostgreSQL - 내부 네트워크만)
- **22** (SSH)

### 8. 로드 밸런서 설정 (선택사항)

```bash
# OCI Load Balancer 생성
1. 리전: us-ashburn-1
2. 백엔드 서버: Compute Instances
3. Health Check: /health
4. 리스너: HTTP/HTTPS 포트 80/443
```

---

## 🔧 환경별 설정

### 개발 환경 (로컬)
```bash
DATABASE_URL=postgresql://localhost:5432/origin_ai_db
NODE_ENV=development
```

### 스테이징 환경 (OCI)
```bash
DATABASE_URL=postgresql://user:pass@staging-db.oraclecloud.com:5432/origin_ai_db
NODE_ENV=staging
```

### 프로덕션 환경 (OCI - 미국 리전)
```bash
DATABASE_URL=postgresql://user:pass@prod-db.us-ashburn-1.oraclecloud.com:5432/origin_ai_db
NODE_ENV=production
```

---

## 📋 배포 체크리스트

- [ ] OCI 계정 생성 및 미국 리전 선택
- [ ] 데이터베이스 생성 (Autonomous Database 또는 Compute Instance)
- [ ] Compute Instance 또는 Container Instance 생성
- [ ] 환경 변수 설정 (.env 파일)
- [ ] 데이터베이스 마이그레이션 실행
- [ ] 보안 그룹 설정 (포트 열기)
- [ ] 도메인 및 SSL 인증서 설정 (선택사항)
- [ ] 모니터링 및 로깅 설정
- [ ] 백업 전략 수립

---

## 🔐 보안 고려사항

1. **환경 변수**: `.env` 파일을 절대 Git에 커밋하지 않기
2. **데이터베이스**: OCI VCN 내부 네트워크에서만 접근 가능하도록 설정
3. **HTTPS**: 프로덕션에서는 반드시 HTTPS 사용
4. **방화벽**: 필요한 포트만 열기
5. **백업**: 정기적인 데이터베이스 백업 설정

---

## 📞 문제 해결

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
sudo lsof -i :3001

# 프로세스 종료
sudo kill -9 <PID>
```

---

**이 가이드를 따라 OCI 미국 리전에 배포하세요!**

