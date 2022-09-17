import { prisma } from '../config/prisma';

export interface IDiscipline {
  id: number;
  name: string;
  termId: number;
}

async function findAll(): Promise<IDiscipline[]> {
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
