import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/jwt.service.js';

// Request 타입 확장
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

/**
 * JWT 토큰 인증 미들웨어
 * Authorization 헤더에서 Bearer 토큰을 추출하고 검증
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({
      success: false,
      message: '인증 토큰이 필요합니다',
    });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // 사용자 정보를 request에 추가
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: '유효하지 않거나 만료된 토큰입니다',
    });
    return;
  }
};

/**
 * 선택적 인증 미들웨어 (토큰이 있으면 검증, 없으면 통과)
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
    } catch (error) {
      // 토큰이 유효하지 않아도 계속 진행
    }
  }
  next();
};

