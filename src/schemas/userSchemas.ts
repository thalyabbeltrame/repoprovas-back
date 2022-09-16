import Joi from 'joi';

const signUp = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email',
  }),
  password: Joi.string().trim().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
  }),
});

const login = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email',
  }),
  password: Joi.string().trim().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
  }),
});

export const userSchemas = {
  signUp,
  login,
};
