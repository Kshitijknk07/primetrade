import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

interface ValidatedRequest extends Request {
  validatedData?: any;
}

const validate = (schema: Schema) => {
  return (req: ValidatedRequest, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      const message = error.details[0]?.message || 'Validation failed';
      res.status(400).json({
        success: false,
        message,
      });
      return;
    }

    req.validatedData = value;
    next();
  };
};

export { validate, ValidatedRequest };
