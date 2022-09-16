import { Router } from 'express';

import { testController } from '../controllers/testController';
import { validateSchema } from '../middlewares/schemaValidationMiddleware';
import { validateToken } from '../middlewares/tokenValidationMiddleware';
import { testSchemas } from '../schemas/testSchemas';

export const testRouter = Router();

testRouter.post(
  '/create',
  validateToken,
  validateSchema(testSchemas.create),
  testController.createTest
);
