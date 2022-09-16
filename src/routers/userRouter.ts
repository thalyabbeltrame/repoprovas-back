import { Router } from 'express';

import { userController } from '../controllers/userController';
import { validateSchema } from '../middlewares/schemaValidationMiddleware';
import { userSchemas } from '../schemas/userSchemas';

export const userRouter = Router();

userRouter.post(
  '/signup',
  validateSchema(userSchemas.signUp),
  userController.createUser
);
userRouter.post(
  '/login',
  validateSchema(userSchemas.login),
  userController.login
);
