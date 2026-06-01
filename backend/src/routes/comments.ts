import { Router } from 'express';
import { createComment, getTaskComments, deleteComment } from '../controllers/CommentController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
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
