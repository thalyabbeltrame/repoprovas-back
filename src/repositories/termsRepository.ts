import { Term } from '@prisma/client';

import { prisma } from '../config/prisma';

async function findAll(): Promise<Term[]> {
  return await prisma.term.findMany({
    select: {
      id: true,
      number: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
}

export const termRepository = {
  findAll,
};
