import { Router } from 'express';

import { userController } from '../controllers/userController';
import { validateSchema } from '../middlewares/schemaValidationMiddleware';
import { signUpSchema } from '../schemas/userSchema';

export const userRouter = Router();

userRouter.post(
  '/signup',
  validateSchema(signUpSchema),
  userController.createUser
);
