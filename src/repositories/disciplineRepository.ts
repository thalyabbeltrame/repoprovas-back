import { prisma } from '../config/prisma';

export interface Discipline {
  id: number;
  name: string;
  term: {
    id: number;
    number: number;
  };
}

async function findAll(): Promise<Discipline[] | []> {
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
