import { prisma } from '../config/prisma';

export interface DisciplineResponse {
  id: number;
  name: string;
  term: {
    id: number;
    number: number;
  };
}

async function findAll(): Promise<DisciplineResponse[]> {
  return await prisma.discipline.findMany({
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
    orderBy: {
      id: 'asc',
    },
  });
}

export const disciplineRepository = {
  findAll,
};
