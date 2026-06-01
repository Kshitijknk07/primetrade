import Joi, { ObjectSchema } from 'joi';

const createTaskSchema: ObjectSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(2000).optional(),
  status: Joi.string().valid('pending', 'in_progress', 'completed').default('pending'),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  dueDate: Joi.date().optional(),
});

const updateTaskSchema: ObjectSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  description: Joi.string().max(2000).optional(),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  dueDate: Joi.date().optional(),
}).min(1);

const validateCreateTask = (data: any) => createTaskSchema.validate(data);
const validateUpdateTask = (data: any) => updateTaskSchema.validate(data);

export { validateCreateTask, validateUpdateTask, createTaskSchema, updateTaskSchema };
