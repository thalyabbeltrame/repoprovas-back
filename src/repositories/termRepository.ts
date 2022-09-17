import { prisma } from '../config/prisma';

async function findAll(): Promise<any> {
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
