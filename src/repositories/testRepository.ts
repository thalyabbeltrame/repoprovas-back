import { prisma } from '../config/prisma';

import { InsertTestDTO } from '../dtos/TestRequestDTO';

export interface ITest {
  id: number;
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDiscipline: {
    id: number;
    teacher: {
      id: number;
      name: string;
    };
    discipline: {
      id: number;
      name: string;
    };
  };
}

async function create(data: InsertTestDTO): Promise<void> {
  await prisma.test.create({
    data,
  });
}

async function getTests(): Promise<ITest[]> {
  return await prisma.test.findMany({
    select: {
      id: true,
      name: true,
      pdfUrl: true,
      categoryId: true,
      teacherDiscipline: {
        include: {
          teacher: true,
          discipline: {
            include: {
              term: true,
            },
          },
        },
      },
    },
  });
}

export const testRepository = {
  create,
  getTests,
};
