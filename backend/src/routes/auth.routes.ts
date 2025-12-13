import { Router } from 'express';
import { loginController, registerController } from '../controllers/auth.controller.js';

const router = Router();

// POST /api/auth/register
router.post('/register', registerController);

// POST /api/auth/login
router.post('/login', loginController);

export default router;

