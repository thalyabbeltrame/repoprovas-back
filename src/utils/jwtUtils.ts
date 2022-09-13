import jwt, { JwtPayload } from 'jsonwebtoken';

import '../config/env';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function verifyToken(token: string): string | JwtPayload {
  return jwt.verify(token, JWT_SECRET);
}

export const jwtUtils = {
  verifyToken,
};
