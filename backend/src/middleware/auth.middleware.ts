import { Request, Response, NextFunction } from 'express';

// TODO: 실제 JWT 검증 로직 구현
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: '인증 토큰이 필요합니다',
    });
  }

  // TODO: JWT 토큰 검증 로직 추가
  // const decoded = jwt.verify(token, config.jwt.secret);
  // req.user = decoded;

  next();
};

