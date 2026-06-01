import { Response } from 'express';
import User from '../models/User';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.user?.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      errorResponse(res, 'User not found', 404);
      return;
    }

    successResponse(res, 'Profile retrieved successfully', user);
  } catch (error: any) {
    errorResponse(res, 'Failed to fetch profile', 500, error.message);
  }
};

const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      errorResponse(res, 'Insufficient permissions', 403);
      return;
    }

    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });

    successResponse(res, 'Users retrieved successfully', users);
  } catch (error: any) {
    errorResponse(res, 'Failed to fetch users', 500, error.message);
  }
};

const updateProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const { firstName, lastName } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      errorResponse(res, 'User not found', 404);
      return;
    }

    await user.update({ firstName, lastName });

    successResponse(res, 'Profile updated successfully', {
      ...user.toJSON(),
      password: undefined,
    });
  } catch (error: any) {
    errorResponse(res, 'Failed to update profile', 500, error.message);
  }
};

const updateUserRole = async (req: any, res: Response): Promise<void> => {
  try {
    if (req.user.role !== 'admin') {
      errorResponse(res, 'Insufficient permissions', 403);
      return;
    }

    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      errorResponse(res, 'Invalid role', 400);
      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      errorResponse(res, 'User not found', 404);
      return;
    }

    await user.update({ role });

    successResponse(res, 'User role updated successfully', {
      ...user.toJSON(),
      password: undefined,
    });
  } catch (error: any) {
    errorResponse(res, 'Failed to update user role', 500, error.message);
  }
};

export { getProfile, getAllUsers, updateProfile, updateUserRole };
