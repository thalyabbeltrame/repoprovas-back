import { prisma } from '../config/prisma';

import { InsertTestDTO } from '../dtos/TestRequestDTO';

async function create(data: InsertTestDTO): Promise<void> {
  await prisma.test.create({
    data,
  });
}

async function getTests(): Promise<any> {
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
