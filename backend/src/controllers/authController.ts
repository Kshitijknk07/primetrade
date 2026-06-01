import { Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/password';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middlewares/auth';

const register = async (req: any, res: Response): Promise<void> => {
  try {
    const { email, username, password, firstName, lastName } = req.validatedData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      errorResponse(res, 'Email already registered', 400);
      return;
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      errorResponse(res, 'Username already taken', 400);
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'user',
      isActive: true,
    });

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    successResponse(
      res,
      'User registered successfully',
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        token,
      },
      201
    );
  } catch (error: any) {
    errorResponse(res, 'Registration failed', 500, error.message);
  }
};

const login = async (req: any, res: Response): Promise<void> => {
  try {
    const { email, password } = req.validatedData;

    const user = await User.findOne({ where: { email } });
    if (!user || !user.isActive) {
      errorResponse(res, 'Invalid credentials', 401);
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      errorResponse(res, 'Invalid credentials', 401);
      return;
    }

    await user.update({ lastLogin: new Date() });

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    successResponse(res, 'Login successful', {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error: any) {
    errorResponse(res, 'Login failed', 500, error.message);
  }
};

const logout = async (_req: AuthRequest, res: Response): Promise<void> => {
  successResponse(res, 'Logout successful');
};

export { register, login, logout };
