import Joi from 'joi';

const pdfUrlRegex =
  /^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?(.pdf)$/;

const create = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is not allowed to be empty',
  }),
  pdfUrl: Joi.string().trim().regex(pdfUrlRegex).required().messages({
    'any.required': 'PDF URL is required',
    'string.pattern.base': 'PDF URL is invalid',
  }),
  categoryId: Joi.number().integer().required().messages({
    'any.required': 'Category ID is required',
    'number.base': 'Category ID must be a number',
    'number.integer': 'Category ID must be an integer',
  }),
  teacherDisciplineId: Joi.number().integer().required().messages({
    'any.required': 'Teacher Discipline ID is required',
    'number.base': 'Teacher Discipline ID must be a number',
    'number.integer': 'Teacher Discipline ID must be an integer',
  }),
});

export const testSchemas = {
  create,
};