import { Router } from 'express';

import { testController } from '../controllers/testController';
import { validateSchema } from '../middlewares/schemaValidationMiddleware';
import { validateToken } from '../middlewares/tokenValidationMiddleware';
import { testSchemas } from '../schemas/testSchemas';

export const testRouter = Router();

testRouter.use(validateToken);

testRouter.post(
  '/create',
  validateSchema(testSchemas.create),
  testController.createTest
);
testRouter.get('/by-disciplines', testController.getTestsByDiscipline);
testRouter.get('/by-teachers', testController.getTestsByTeacher);
