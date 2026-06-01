import { Router } from 'express';
import { getProfile, getAllUsers, updateProfile, updateUserRole } from '../controllers/UserController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/', authorize(['admin']), getAllUsers);
router.put('/:userId/role', authorize(['admin']), updateUserRole);

export = router;
