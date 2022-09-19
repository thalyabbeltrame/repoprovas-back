import { Teacher } from '@prisma/client';

import { prisma } from '../config/prisma';

async function findAll(): Promise<Teacher[] | []> {
  return await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
}

export const teacherRepository = {
  findAll,
};
