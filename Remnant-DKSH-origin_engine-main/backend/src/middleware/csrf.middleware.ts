import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// 세션 저장소 (실제로는 Redis나 DB 사용 권장)
const sessionStore = new Map<string, string>();

/**
 * CSRF 토큰 생성
 * @returns CSRF 토큰
 */
export const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * CSRF 토큰을 세션에 저장
 * @param sessionId 세션 ID
 * @param token CSRF 토큰
 */
export const setCSRFToken = (sessionId: string, token: string): void => {
  sessionStore.set(sessionId, token);
};

/**
 * 세션에서 CSRF 토큰 가져오기
 * @param sessionId 세션 ID
 * @returns CSRF 토큰 또는 null
 */
export const getCSRFToken = (sessionId: string): string | null => {
  return sessionStore.get(sessionId) || null;
};

/**
 * CSRF 토큰 검증 미들웨어
 * GET 요청은 제외 (읽기 전용)
 */
export const verifyCSRFToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // GET, HEAD, OPTIONS 요청은 CSRF 검증 제외
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const token = req.headers['x-csrf-token'] as string;
  const sessionId = req.headers['x-session-id'] as string || req.ip;

  if (!token || !sessionId) {
    res.status(403).json({
      success: false,
      message: 'CSRF token or session ID missing',
    });
    return;
  }

  const storedToken = getCSRFToken(sessionId);

  if (!storedToken || token !== storedToken) {
    res.status(403).json({
      success: false,
      message: 'Invalid CSRF token',
    });
    return;
  }

  next();
};

/**
 * CSRF 토큰 발급 엔드포인트용 미들웨어
 */
export const issueCSRFToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const sessionId = req.headers['x-session-id'] as string || req.ip;
  const token = generateCSRFToken();
  setCSRFToken(sessionId, token);

  res.setHeader('X-CSRF-Token', token);
  next();
};

