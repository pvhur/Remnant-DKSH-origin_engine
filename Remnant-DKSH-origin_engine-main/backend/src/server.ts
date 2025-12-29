import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import { setupSecurityHeaders, enforceHTTPS } from './middleware/security.middleware.js';
import { apiLimiter, loginLimiter, registerLimiter } from './middleware/rate-limit.middleware.js';
import { sanitizeBody } from './middleware/xss.middleware.js';
import { issueCSRFToken } from './middleware/csrf.middleware.js';

const app: Express = express();

// 1. 기본 보안 설정 (가장 먼저 적용)
setupSecurityHeaders(app);
enforceHTTPS(app);

// 2. CORS 설정
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));

// 3. Body Parser (크기 제한 설정)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 4. XSS 방어 (입력 데이터 Sanitization)
app.use(sanitizeBody);

// 5. Rate Limiting
app.use('/api/', apiLimiter);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// CSRF 토큰 발급 엔드포인트
app.get('/api/csrf-token', issueCSRFToken, (req: Request, res: Response) => {
  res.json({ 
    success: true, 
    message: 'CSRF token issued',
    token: res.getHeader('X-CSRF-Token'),
  });
});

// Routes
// 로그인/회원가입에 Rate Limiting 적용
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth/register', registerLimiter);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
});

