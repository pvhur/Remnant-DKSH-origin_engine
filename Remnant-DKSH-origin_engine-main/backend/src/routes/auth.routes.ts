import { Router } from 'express';
import { 
  loginController, 
  registerController, 
  refreshTokenController,
  logoutController 
} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import prisma from '../db/prisma.js';

const router = Router();

// POST /api/auth/register - 회원가입
router.post('/register', registerController);

// POST /api/auth/login - 로그인
router.post('/login', loginController);

// POST /api/auth/refresh - 토큰 갱신
router.post('/refresh', refreshTokenController);

// POST /api/auth/logout - 로그아웃
router.post('/logout', authenticateToken, logoutController);

// GET /api/auth/me - 현재 사용자 정보
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다',
      });
    }
    
    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: '사용자 정보 조회 중 오류가 발생했습니다',
    });
  }
});

export default router;

