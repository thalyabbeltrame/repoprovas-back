import { TestRequestDTO } from '../dtos/TestRequestDTO';
import { testRepository } from '../repositories/testRepository';
import { authService } from './authService';
import { categoryService } from './categoryService';
import { teacherDisciplineService } from './teacherDisciplineService';

async function createTest(userId: number, test: TestRequestDTO) {
  await authService.validateUserId(userId);
  await teacherDisciplineService.validateId(test.teacherDisciplineId);
  await categoryService.validateId(test.categoryId);

  await testRepository.create(test);
}

export const testService = {
  createTest,
};
