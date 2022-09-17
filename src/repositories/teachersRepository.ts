import { Category } from '@prisma/client';

import { prisma } from '../config/prisma';

export interface ITeacher {
  id: number;
  name: string;
}

async function findAll(): Promise<ITeacher[]> {
  return await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
      teachersDisciplines: {
        select: {
          discipline: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

export const teacherRepository = {
  findAll,
};
