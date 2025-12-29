import helmet from 'helmet';
import { Express } from 'express';
import { config } from '../config/env.js';

/**
 * 기본 보안 헤더 설정 (Helmet)
 */
export const setupSecurityHeaders = (app: Express) => {
  app.use(helmet({
    // XSS 방어
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    // 클릭재킹 방어
    frameguard: { action: 'deny' },
    // MIME 타입 스니핑 방어
    noSniff: true,
    // XSS 필터
    xssFilter: true,
    // HSTS (HTTPS 강제)
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }));
};

/**
 * HTTPS 강제 (프로덕션 환경)
 */
export const enforceHTTPS = (app: Express) => {
  if (config.nodeEnv === 'production') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
      } else {
        next();
      }
    });
  }
};

