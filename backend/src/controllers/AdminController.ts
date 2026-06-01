import { Response } from 'express';
import User from '../models/User';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

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
      id: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (error: any) {
    errorResponse(res, 'Failed to update user role', 500, error.message);
  }
};

const deleteUser = async (req: any, res: Response): Promise<void> => {
  try {
    if (req.user.role !== 'admin') {
      errorResponse(res, 'Insufficient permissions', 403);
      return;
    }

    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      errorResponse(res, 'User not found', 404);
      return;
    }

    if (user.id === req.user.id) {
      errorResponse(res, 'Cannot delete your own account', 400);
      return;
    }

    await user.destroy();

    successResponse(res, 'User deleted successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to delete user', 500, error.message);
  }
};

export { getAllUsers, updateUserRole, deleteUser };
