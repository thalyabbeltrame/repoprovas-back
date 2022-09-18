import { Request, Response } from 'express';
import { testService } from '../services/testService';

async function createTest(req: Request, res: Response) {
  const { name, pdfUrl } = req.body;
  const categoryId = Number(req.body.categoryId) || 0;
  const teacherId = Number(req.body.teacherId) || 0;
  const disciplineId = Number(req.body.disciplineId) || 0;
  const userId = Number(res.locals.userId) || 0;

  await testService.createTest(userId, {
    name,
    pdfUrl,
    categoryId,
    teacherId,
    disciplineId,
  });

  res.status(201).send('Test created');
}

async function getTestsByDisciplines(_req: Request, res: Response) {
  const userId = Number(res.locals.userId) || 0;

  const tests = await testService.getTestsByDisciplines(userId);

  res.status(200).send(tests);
}

async function getTestsByTeachers(_req: Request, res: Response) {
  const userId = Number(res.locals.userId) || 0;

  const tests = await testService.getTestsByTeachers(userId);

  res.status(200).send(tests);
}

export const testController = {
  createTest,
  getTestsByDisciplines,
  getTestsByTeachers,
};
