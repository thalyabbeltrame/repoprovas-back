import { Category } from '@prisma/client';

import { prisma } from '../config/prisma';

async function findById(id: number): Promise<Category | null> {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}

async function findAll(): Promise<Category[] | []> {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
}

export const categoryRepository = {
  findById,
  findAll,
};
