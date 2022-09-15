import { User } from '@prisma/client';

export type UserRequestDTO = Omit<User, 'id' | 'createdAt'>;
