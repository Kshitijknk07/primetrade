import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

interface ValidatedRequest extends Request {
  validatedData?: any;
}

const validate = (schema: Schema) => {
  return (req: ValidatedRequest, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        error: 'Validation failed',
        details: error.details.map((d) => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
      return;
    }

    req.validatedData = value;
    next();
  };
};

export { validate, ValidatedRequest };
