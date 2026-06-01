import { Response } from 'express';
import Task from '../models/Task';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

const createTask = async (req: any, res: Response): Promise<void> => {
  try {
    const { title, description, status, priority, dueDate } = req.validatedData;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.user.id,
    });

    successResponse(res, 'Task created successfully', task, 201);
  } catch (error: any) {
    errorResponse(res, 'Failed to create task', 500, error.message);
  }
};

const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, priority } = req.query;
    const where: any = { userId: req.user?.id };

    if (status) where.status = status;
    if (priority) where.priority = priority;

    const tasks = await Task.findAll({ where, order: [['createdAt', 'DESC']] });

    successResponse(res, 'Tasks retrieved successfully', tasks);
  } catch (error: any) {
    errorResponse(res, 'Failed to fetch tasks', 500, error.message);
  }
};

const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user?.id },
    });

    if (!task) {
      errorResponse(res, 'Task not found', 404);
      return;
    }

    successResponse(res, 'Task retrieved successfully', task);
  } catch (error: any) {
    errorResponse(res, 'Failed to fetch task', 500, error.message);
  }
};

const updateTask = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      errorResponse(res, 'Task not found', 404);
      return;
    }

    await task.update(req.validatedData);

    successResponse(res, 'Task updated successfully', task);
  } catch (error: any) {
    errorResponse(res, 'Failed to update task', 500, error.message);
  }
};

const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user?.id },
    });

    if (!task) {
      errorResponse(res, 'Task not found', 404);
      return;
    }

    await task.destroy();

    successResponse(res, 'Task deleted successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to delete task', 500, error.message);
  }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
