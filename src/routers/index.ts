import { Router } from 'express';

import { userRouter } from './userRouter';

export const router = Router();

router.use('/users', userRouter);
