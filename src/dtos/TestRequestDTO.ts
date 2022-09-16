import { Test } from '@prisma/client';

export type TestRequestDTO = Omit<Test, 'id' | 'createdAt'>;
