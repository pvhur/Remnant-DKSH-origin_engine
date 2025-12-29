import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

/**
 * 일반 API Rate Limiting
 * 15분에 100번 요청 허용
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100번 요청
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true, // RateLimit-* 헤더 반환
  legacyHeaders: false,
});

/**
 * 로그인 Rate Limiting (더 엄격)
 * 15분에 5번만 시도 허용
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 5, // 최대 5번만 시도
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes.',
  },
  skipSuccessfulRequests: true, // 성공한 요청은 카운트에서 제외
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * 회원가입 Rate Limiting
 * 1시간에 3번만 허용
 */
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1시간
  max: 3, // 최대 3번만 시도
  message: {
    success: false,
    message: 'Too many registration attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * 비밀번호 재설정 Rate Limiting
 * 1시간에 3번만 허용
 */
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1시간
  max: 3,
  message: {
    success: false,
    message: 'Too many password reset attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

