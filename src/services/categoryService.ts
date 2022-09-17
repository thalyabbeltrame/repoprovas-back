import { categoryRepository } from '../repositories/categoryRepository';
import { AppError } from '../utils/AppError';

async function validateCategoryId(id: number): Promise<void> {
  const category = await categoryRepository.findById(id);
  if (!category) {
    throw new AppError('Category not found', 404);
  }
}

async function getCategories() {
  return await categoryRepository.findAll();
}

export const categoryService = {
  validateCategoryId,
  getCategories,
};
