import { Category, Teacher, Term } from '@prisma/client';

import { TestRequestDTO } from '../dtos/TestRequestDTO';
import { Test } from '../entities/Test';
import { DisciplineResponse } from '../repositories/disciplineRepository';
import { testRepository } from '../repositories/testRepository';
import { authService } from './authService';
import { categoryService } from './categoryService';
import { disciplineService } from './disciplineService';
import { teacherDisciplineService } from './teacherDisciplineService';
import { teacherService } from './teacherService';
import { termService } from './termService';

async function create(userId: number, test: TestRequestDTO): Promise<void> {
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

async function getByDisciplines(userId: number) {
  await authService.validateUserId(userId);

  const terms = await termService.findAll();
  const disciplines = await disciplineService.findAll();
  const categories = await categoryService.findAll();
  const tests = await testRepository.findAll();
  const formattedTests = formatTestsByDisciplines(
    terms,
    disciplines,
    categories,
    tests
  );

  return formattedTests;
}

async function getByTeachers(userId: number) {
  await authService.validateUserId(userId);

  const teachers = await teacherService.findAll();
  const categories = await categoryService.findAll();
  const tests = await testRepository.findAll();
  const formattedTests = formatTestsByTeachers(teachers, categories, tests);

  return formattedTests;
}

function formatTestsByDisciplines(
  terms: Term[],
  disciplines: DisciplineResponse[],
  categories: Category[],
  tests: any[]
) {
  const categoriesResponse = [];
  for (let i = 0; i < categories.length; i++) {
    categoriesResponse[i] = {
      ...categories[i],
      tests: [],
    };
  }

  const disciplinesResponse = [];
  for (let i = 0; i < disciplines.length; i++) {
    disciplinesResponse[i] = {
      ...disciplines[i],
      categories: JSON.parse(JSON.stringify(categoriesResponse)),
    };
  }

  const termsResponse = [];
  for (let i = 0; i < terms.length; i++) {
    termsResponse[i] = {
      ...terms[i],
      disciplines: JSON.parse(
        JSON.stringify(
          disciplinesResponse.filter(
            (discipline) => discipline.term.id === terms[i].id
          )
        )
      ),
    };
  }

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    const termId = test.teacherDiscipline.discipline.term.id;
    const disciplineId = test.teacherDiscipline.discipline.id;
    const categoryId = test.category.id;

    const disciplineIdIndex = termsResponse[termId - 1].disciplines.findIndex(
      (discipline: { id: any }) => discipline.id === disciplineId
    );

    termsResponse[termId - 1].disciplines[disciplineIdIndex].categories[
      categoryId - 1
    ].tests.push({
      id: test.id,
      name: test.name,
      pdfUrl: test.pdfUrl,
      teacher: {
        id: test.teacherDiscipline.teacher.id,
        name: test.teacherDiscipline.teacher.name,
      },
    });
  }

  return termsResponse;
}

function formatTestsByTeachers(
  teachers: Teacher[],
  categories: Category[],
  tests: any[]
) {
  const categoriesResponse = [];
  for (let i = 0; i < categories.length; i++) {
    categoriesResponse[i] = {
      ...categories[i],
      tests: [],
    };
  }

  const teachersResponse = [];
  for (let i = 0; i < teachers.length; i++) {
    teachersResponse[i] = {
      ...teachers[i],
      categories: JSON.parse(JSON.stringify(categoriesResponse)),
    };
  }

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    const teacherId = test.teacherDiscipline.teacherId;
    const categoryId = test.category.id;

    teachersResponse[teacherId - 1].categories[categoryId - 1].tests.push({
      id: test.id,
      name: test.name,
      pdfUrl: test.pdfUrl,
      discipline: {
        id: test.teacherDiscipline.discipline.id,
        name: test.teacherDiscipline.discipline.name,
        term: {
          id: test.teacherDiscipline.discipline.term.id,
          number: test.teacherDiscipline.discipline.term.number,
        },
      },
    });
  }

  return teachersResponse;
}

export const testService = {
  create,
  getByDisciplines,
  getByTeachers,
};
