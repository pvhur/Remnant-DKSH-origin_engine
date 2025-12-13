ㅞㅞ# Paging BETA Backend

백엔드 API 서버입니다.

## 기술 스택

- Node.js
- Express
- TypeScript
- Zod (유효성 검사)

## 설치

```bash
cd backend
npm install
```

## 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
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

### 헬스 체크

- `GET /health` - 서버 상태 확인

## 개발 참고사항

- 현재는 임시 구현 상태입니다
- 데이터베이스 연결 및 실제 인증 로직은 추후 구현 예정입니다

