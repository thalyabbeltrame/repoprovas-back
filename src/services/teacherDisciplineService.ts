import { TeacherDiscipline } from '@prisma/client';
import { teacherDisciplineRepository } from '../repositories/teacherDisciplineRepository';
import { AppError } from '../utils/AppError';

async function validateTeacherIdAndDisciplineId(
  teacherId: number,
  disciplineId: number
): Promise<TeacherDiscipline> {
  const teacherDiscipline =
    await teacherDisciplineRepository.findByTeacherIdAndDisciplineId(
      teacherId,
      disciplineId
    );
  if (!teacherDiscipline) {
    throw new AppError('Teacher discipline not found', 404);
  }

  return teacherDiscipline;
}

export const teacherDisciplineService = {
  validateTeacherIdAndDisciplineId,
};
