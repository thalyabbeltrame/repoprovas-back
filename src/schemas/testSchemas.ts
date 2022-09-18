import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is not allowed to be empty',
  }),
  pdfUrl: Joi.string().trim().uri().required().messages({
    'any.required': 'PDF URL is required',
    'string.pattern.base': 'PDF URL is invalid',
  }),
  categoryId: Joi.number().integer().required().messages({
    'any.required': 'Category ID is required',
    'number.base': 'Category ID must be a number',
    'number.integer': 'Category ID must be an integer',
  }),
  teacherId: Joi.number().integer().required().messages({
    'any.required': 'Teacher ID is required',
    'number.base': 'Teacher ID must be a number',
    'number.integer': 'Teacher ID must be an integer',
  }),
  disciplineId: Joi.number().integer().required().messages({
    'any.required': 'Discipline ID is required',
    'number.base': 'Discipline ID must be a number',
    'number.integer': 'Discipline ID must be an integer',
  }),
});

export const testSchemas = {
  create,
};
