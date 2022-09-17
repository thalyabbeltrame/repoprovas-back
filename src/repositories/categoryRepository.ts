import { Category } from '@prisma/client';

import { prisma } from '../config/prisma';

export interface ICategory {
  id: number;
  name: string;
}

async function findById(id: number): Promise<Category | null> {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}

async function findAll(): Promise<ICategory[]> {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

export const categoryRepository = {
  findById,
  findAll,
};
