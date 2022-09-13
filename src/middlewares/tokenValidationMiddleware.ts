import { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/AppError';
import { jwtUtils } from '../utils/jwtUtils';

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('Token not provided', 401);
  }

  if (!authorization.startsWith('Bearer')) {
    throw new AppError('Invalid token', 401);
  }

  const token = authorization.split(' ')[1];

  try {
    const { userId } = jwtUtils.verifyToken(token) as { userId: string };

    res.locals.userId = userId;
    next();
  } catch (_err) {
    throw new AppError('Invalid token', 401);
  }
};
