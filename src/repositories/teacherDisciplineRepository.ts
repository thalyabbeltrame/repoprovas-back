import { TeacherDiscipline } from '@prisma/client';

import { prisma } from '../config/prisma';

async function findByTeacherIdAndDisciplineId(
  teacherId: number,
  disciplineId: number
): Promise<TeacherDiscipline | null> {
  return await prisma.teacherDiscipline.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });
}

export const teacherDisciplineRepository = {
  findByTeacherIdAndDisciplineId,
};
