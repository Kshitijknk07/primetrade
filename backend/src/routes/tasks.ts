import { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createTaskSchema, updateTaskSchema } from '../validators/taskValidator';

const router = Router();

router.use(authenticate);

router.post('/', validate(createTaskSchema), createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export = router;
