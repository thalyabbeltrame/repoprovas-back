import { prisma } from '../config/prisma';

async function findAll(): Promise<any> {
  return await prisma.discipline.findMany({
    select: {
      id: true,
      name: true,
      termId: true,
    },
  });
}

export const disciplineRepository = {
  findAll,
};
