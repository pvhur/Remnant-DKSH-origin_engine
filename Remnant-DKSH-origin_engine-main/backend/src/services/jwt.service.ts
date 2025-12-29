import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export interface JWTPayload {
  userId: string;
  email: string;
}

/**
 * JWT 토큰 생성
 * @param payload 사용자 정보
 * @returns JWT 토큰
 */
export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(
    payload,
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

/**
 * JWT 토큰 검증
 * @param token JWT 토큰
 * @returns 디코딩된 페이로드
 */
export const verifyToken = (token: string): JWTPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Refresh Token 생성 (더 긴 만료 시간)
 * @param payload 사용자 정보
 * @returns Refresh Token
 */
export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(
    payload,
    config.jwt.secret,
    { expiresIn: '30d' } // 30일
  );
};

