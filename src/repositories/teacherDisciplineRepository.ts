import { TeacherDiscipline } from '@prisma/client';

import { prisma } from '../config/prisma';

async function findById(id: number): Promise<TeacherDiscipline | null> {
  return await prisma.teacherDiscipline.findUnique({
    where: {
      id,
    },
  });
}

export const teacherDisciplineRepository = {
  findById,
};
