import { Request, Response } from 'express';
import { z } from 'zod';
import { hashPassword, verifyPassword } from '../services/password.service.js';
import { generateToken, generateRefreshToken, verifyToken } from '../services/jwt.service.js';
import prisma from '../db/prisma.js';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

const registerSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const loginController = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    // 데이터베이스에서 사용자 조회
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다',
      });
    }
    
    // 비밀번호 검증
    const isPasswordValid = await verifyPassword(validatedData.password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다',
      });
    }
    
    // JWT 토큰 생성
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });
    
    // Refresh Token 생성 및 저장
    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });
    
    // Refresh Token을 데이터베이스에 저장
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30일 후 만료
    
    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt,
      },
    });
    
    res.json({
      success: true,
      message: '로그인 성공',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
        refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: '입력 데이터가 유효하지 않습니다',
        errors: error.errors,
      });
    }
    
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: '로그인 중 오류가 발생했습니다',
    });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: '이미 사용 중인 이메일입니다',
      });
    }
    
    // 비밀번호 해시
    const hashedPassword = await hashPassword(validatedData.password);
    
    // 사용자 생성 (데이터베이스에 저장)
    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
      },
    });
    
    // JWT 토큰 생성
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
    });
    
    // Refresh Token 생성 및 저장
    const refreshToken = generateRefreshToken({
      userId: newUser.id,
      email: newUser.email,
    });
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    
    await prisma.refreshToken.create({
      data: {
        userId: newUser.id,
        token: refreshToken,
        expiresAt,
      },
    });
    
    res.status(201).json({
      success: true,
      message: '회원가입 성공',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
        token,
        refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: '입력 데이터가 유효하지 않습니다',
        errors: error.errors,
      });
    }
    
    // Prisma 에러 처리
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'P2002') {
        return res.status(409).json({
          success: false,
          message: '이미 사용 중인 이메일입니다',
        });
      }
    }
    
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: '회원가입 중 오류가 발생했습니다',
    });
  }
};

// Refresh Token으로 Access Token 갱신
export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = refreshTokenSchema.parse(req.body);
    
    // Refresh Token 검증
    const decoded = verifyToken(refreshToken);
    
    // 데이터베이스에서 Refresh Token 확인
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });
    
    if (!storedToken || storedToken.expiresAt < new Date()) {
      return res.status(401).json({
        success: false,
        message: '유효하지 않거나 만료된 Refresh Token입니다',
      });
    }
    
    // 새로운 Access Token 생성
    const newToken = generateToken({
      userId: storedToken.userId,
      email: storedToken.user.email,
    });
    
    res.json({
      success: true,
      message: '토큰 갱신 성공',
      data: {
        token: newToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: '입력 데이터가 유효하지 않습니다',
        errors: error.errors,
      });
    }
    
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: '유효하지 않은 Refresh Token입니다',
    });
  }
};

// 로그아웃 (Refresh Token 삭제)
export const logoutController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }
    
    res.json({
      success: true,
      message: '로그아웃 성공',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: '로그아웃 중 오류가 발생했습니다',
    });
  }
};
