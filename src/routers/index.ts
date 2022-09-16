import { Router } from 'express';

import { testRouter } from './testRouter';
import { userRouter } from './userRouter';

export const router = Router();

router.use('/users', userRouter);
router.use('/tests', testRouter);
