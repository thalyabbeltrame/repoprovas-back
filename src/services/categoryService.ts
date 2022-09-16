import { categoryRepository } from '../repositories/categoryRepository';
import { AppError } from '../utils/AppError';

async function validateId(id: number): Promise<void> {
  const category = await categoryRepository.findById(id);
  if (!category) {
    throw new AppError('Category not found', 404);
  }
}

export const categoryService = {
  validateId,
};
