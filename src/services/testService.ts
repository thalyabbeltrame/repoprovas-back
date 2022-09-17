import { TestRequestDTO } from '../dtos/TestRequestDTO';
import { Test } from '../entities/Test';
import { testRepository } from '../repositories/testRepository';
import { authService } from './authService';
import { categoryService } from './categoryService';
import { teacherDisciplineService } from './teacherDisciplineService';

async function createTest(userId: number, test: TestRequestDTO) {
  await authService.validateUserId(userId);
  await categoryService.validateCategoryId(test.categoryId);
  const teacherDiscipline =
    await teacherDisciplineService.validateTeacherIdAndDisciplineId(
      test.teacherId,
      test.disciplineId
    );

  const newTest = new Test({
    name: test.name,
    pdfUrl: test.pdfUrl,
    categoryId: test.categoryId,
    teacherDisciplineId: teacherDiscipline.id,
  });

  await testRepository.create(newTest);
}

async function getTestsByDiscipline(userId: number) {
  await authService.validateUserId(userId);
  return await testRepository.getByDisciplines();
}

export const testService = {
  createTest,
  getTestsByDiscipline,
};
