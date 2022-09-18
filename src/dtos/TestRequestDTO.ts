import { Test } from '@prisma/client';

export type TestRequestDTO = Omit<Test, 'id' | 'teacherDisciplineId'> & {
  teacherId: number;
  disciplineId: number;
};

export type InsertTestDTO = Omit<Test, 'id'>;
