import { Test } from '@prisma/client';

export type TestRequestDTO = Omit<
  Test,
  'id' | 'createdAt' | 'teacherDisciplineId'
> & {
  teacherId: number;
  disciplineId: number;
};

export type InsertTestDTO = Omit<Test, 'id' | 'createdAt'>;
