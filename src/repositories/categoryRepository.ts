import { Category } from '@prisma/client';

import { prisma } from '../config/prisma';

async function findById(id: number): Promise<Category | null> {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}

export const categoryRepository = {
  findById,
};
