import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

const successResponse = <T>(res: Response, message: string, data?: T, statusCode: number = 200): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  } as ApiResponse<T>);
};

const errorResponse = (res: Response, message: string, statusCode: number = 500, error?: any): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error : undefined,
  } as ApiResponse<null>);
};

export { successResponse, errorResponse, ApiResponse };
