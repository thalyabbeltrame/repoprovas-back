import { prisma } from '../config/prisma';

export interface ITerm {
  id: number;
  number: number;
}

async function findAll(): Promise<ITerm[]> {
  return await prisma.term.findMany({
    select: {
      id: true,
      number: true,
    },
  });
}

export const termRepository = {
  findAll,
};
