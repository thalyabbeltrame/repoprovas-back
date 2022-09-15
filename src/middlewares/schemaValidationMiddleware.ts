import { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/AppError';

export function validateSchema(schema: any) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details
        .map((detail: any) => detail.message)
        .join('; ');
      throw new AppError(errorMessage, 422);
    }

    next();
  };
}
