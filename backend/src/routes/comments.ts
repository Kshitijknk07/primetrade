import { Router } from 'express';
import { createComment, getTaskComments, deleteComment } from '../controllers/commentController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import Joi from 'joi';

const router = Router();

router.use(authenticate);

const commentSchema = Joi.object({
  content: Joi.string().min(1).max(5000).required(),
});

router.post('/:taskId', validate(commentSchema), createComment);
router.get('/:taskId', getTaskComments);
router.delete('/:commentId', deleteComment);

export = router;
