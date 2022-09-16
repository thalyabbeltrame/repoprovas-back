import { teacherDisciplineRepository } from '../repositories/teacherDisciplineRepository';
import { AppError } from '../utils/AppError';

async function validateId(id: number): Promise<void> {
  const teacherDiscipline = await teacherDisciplineRepository.findById(id);
  if (!teacherDiscipline) {
    throw new AppError('Teacher discipline not found', 404);
  }
}

export const teacherDisciplineService = {
  validateId,
};
