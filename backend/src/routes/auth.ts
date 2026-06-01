import { Router } from 'express';
import { register, login, logout } from '../controllers/AuthController';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../validators/AuthValidator';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', authenticate, logout);

export = router;
