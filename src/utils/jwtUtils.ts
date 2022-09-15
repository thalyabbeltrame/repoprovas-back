import { User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';

import '../config/env';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function generateToken(user: User): string {
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
}

function verifyToken(token: string): string | JwtPayload {
  return jwt.verify(token, JWT_SECRET);
}

export const jwtUtils = {
  generateToken,
  verifyToken,
};
