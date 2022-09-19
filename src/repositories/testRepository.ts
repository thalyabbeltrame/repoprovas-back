import { prisma } from '../config/prisma';

import { InsertTestDTO } from '../dtos/TestRequestDTO';

async function create(data: InsertTestDTO): Promise<void> {
  await prisma.test.create({
    data,
  });
}

async function findAll(): Promise<any[]> {
  const tests = await prisma.test.findMany({
    select: {
      id: true,
      name: true,
      pdfUrl: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      teacherDiscipline: {
        include: {
          teacher: true,
          discipline: {
            select: {
              id: true,
              name: true,
              term: {
                select: {
                  id: true,
                  number: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return tests;
}

export const testRepository = {
  create,
  findAll,
};
