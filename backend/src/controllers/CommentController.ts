import { Response } from 'express';
import Comment from '../models/Comment';
import Task from '../models/Task';
import User from '../models/User';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

const createComment = async (req: any, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { content } = req.body;

    const task = await Task.findOne({
      where: { id: taskId, userId: req.user.id },
    });

    if (!task) {
      errorResponse(res, 'Task not found', 404);
      return;
    }

    const comment = await Comment.create({
      content,
      taskId,
      userId: req.user.id,
    });

    const commentWithAuthor = await Comment.findByPk(comment.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'username', 'email'] }],
    });

    successResponse(res, 'Comment created successfully', commentWithAuthor, 201);
  } catch (error: any) {
    errorResponse(res, 'Failed to create comment', 500, error.message);
  }
};

const getTaskComments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;

    const comments = await Comment.findAll({
      where: { taskId },
      include: [{ model: User, as: 'author', attributes: ['id', 'username', 'email'] }],
      order: [['createdAt', 'DESC']],
    });

    successResponse(res, 'Comments retrieved successfully', comments);
  } catch (error: any) {
    errorResponse(res, 'Failed to fetch comments', 500, error.message);
  }
};

const deleteComment = async (req: any, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      errorResponse(res, 'Comment not found', 404);
      return;
    }

    if (comment.userId !== req.user.id && req.user.role !== 'admin') {
      errorResponse(res, 'Insufficient permissions', 403);
      return;
    }

    await comment.destroy();

    successResponse(res, 'Comment deleted successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to delete comment', 500, error.message);
  }
};

export { createComment, getTaskComments, deleteComment };
