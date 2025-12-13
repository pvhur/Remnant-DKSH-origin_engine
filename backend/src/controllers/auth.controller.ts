import { Request, Response } from 'express';
import { z } from 'zod';

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

export const loginController = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    // TODO: 실제 로그인 로직 구현 (데이터베이스 조회, 비밀번호 검증 등)
    // 현재는 임시로 성공 응답만 반환
    
    res.json({
      success: true,
      message: '로그인 성공',
      data: {
        user: {
          id: '1',
          email: validatedData.email,
          name: '테스트 사용자',
        },
        token: 'temp-jwt-token', // TODO: 실제 JWT 토큰 생성
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
    
    res.status(500).json({
      success: false,
      message: '로그인 중 오류가 발생했습니다',
    });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    // TODO: 실제 회원가입 로직 구현 (데이터베이스 저장, 비밀번호 해싱 등)
    // 현재는 임시로 성공 응답만 반환
    
    res.status(201).json({
      success: true,
      message: '회원가입 성공',
      data: {
        user: {
          id: '1',
          email: validatedData.email,
          name: validatedData.name,
        },
        token: 'temp-jwt-token', // TODO: 실제 JWT 토큰 생성
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
    
    res.status(500).json({
      success: false,
      message: '회원가입 중 오류가 발생했습니다',
    });
  }
};

