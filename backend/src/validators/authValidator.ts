import Joi, { ObjectSchema } from 'joi';

const registerSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
});

const loginSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateRegister = (data: any) => registerSchema.validate(data);
const validateLogin = (data: any) => loginSchema.validate(data);

export { validateRegister, validateLogin, registerSchema, loginSchema };
