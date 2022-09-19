import { Category } from '@prisma/client';

import { categoryRepository } from '../repositories/categoryRepository';
import { AppError } from '../utils/AppError';

async function validateCategoryId(id: number): Promise<void> {
  const category = await categoryRepository.findById(id);
  if (!category) {
    throw new AppError('Category not found', 404);
  }
}

async function findAll(): Promise<Category[] | []> {
  const categories = await categoryRepository.findAll();
  return categories;
}

export const categoryService = {
  validateCategoryId,
  findAll,
};
