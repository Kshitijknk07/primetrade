import { Router } from 'express';
import { getAllUsers, updateUserRole, deleteUser } from '../controllers/AdminController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.use(authorize(['admin']));

router.get('/users', getAllUsers);
router.put('/users/:userId/role', updateUserRole);
router.delete('/users/:userId', deleteUser);

export = router;
