import Joi from 'joi';

export const signUpSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'string.email': 'Invalid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().trim().required().messages({
    'string.empty': 'Password is required',
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().trim().required().messages({
    'string.empty': 'Password is required',
  }),
});
