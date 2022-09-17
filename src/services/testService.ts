import { TestRequestDTO } from '../dtos/TestRequestDTO';
import { Test } from '../entities/Test';
import { testRepository } from '../repositories/testRepository';
import { authService } from './authService';
import { categoryService } from './categoryService';
import { disciplineService } from './disciplineService';
import { teacherDisciplineService } from './teacherDisciplineService';
import { termService } from './termService';

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

  const terms = await termService.getTerms();
  const disciplines = await disciplineService.getDisciplines();
  const categories = await categoryService.getCategories();
  const tests = await testRepository.getTests();

  return getTestsByDisciplinesAndTerms(terms, disciplines, categories, tests);
}

async function getTestsByDisciplinesAndTerms(
  terms: any[],
  disciplines: any[],
  categories: any[],
  tests: any[]
) {
  const categoryHashTable: { [key: number]: any } = {};
  for (let i = 0; i < categories.length; i++) {
    categoryHashTable[categories[i].id] = {
      name: categories[i].name,
      tests: {},
    };
  }

  const disciplineHashTable: { [key: number]: any } = {};
  for (let i = 0; i < disciplines.length; i++) {
    disciplineHashTable[disciplines[i].id] = {
      name: disciplines[i].name,
      termId: disciplines[i].termId,
      categories: JSON.parse(JSON.stringify(categoryHashTable)),
    };
  }

  const testHashTable: { [key: number]: any } = {};
  for (let i = 0; i < tests.length; i++) {
    testHashTable[tests[i].id] = {
      name: tests[i].name,
      pdfUrl: tests[i].pdfUrl,
      disciplineId: tests[i].teacherDiscipline.discipline.id,
      categoryId: tests[i].categoryId,
      teacherId: tests[i].teacherDiscipline.teacher.id,
      teacherName: tests[i].teacherDiscipline.teacher.name,
    };
  }

  for (const testId in testHashTable) {
    const test = testHashTable[testId];
    const { disciplineId, categoryId } = test;
    disciplineHashTable[disciplineId].categories[categoryId].tests[testId] = {
      name: test.name,
      pdfUrl: test.pdfUrl,
      teacherId: test.teacherId,
      teacherName: test.teacherName,
    };
  }

  const termHashTable: { [key: number]: any } = {};
  for (let i = 0; i < terms.length; i++) {
    termHashTable[terms[i].id] = {
      number: terms[i].number,
      disciplines: {},
    };
  }

  for (const disciplineId in disciplineHashTable) {
    const discipline = disciplineHashTable[disciplineId];
    termHashTable[discipline.termId].disciplines = {
      ...termHashTable[discipline.termId].disciplines,
      [disciplineId]: discipline,
    };
  }

  return termHashTable;
}

export const testService = {
  createTest,
  getTestsByDiscipline,
};
