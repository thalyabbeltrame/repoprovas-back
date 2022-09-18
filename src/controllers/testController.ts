import { Request, Response } from 'express';
import { testService } from '../services/testService';

async function create(req: Request, res: Response) {
  const { name, pdfUrl } = req.body;
  const categoryId = Number(req.body.categoryId) || 0;
  const teacherId = Number(req.body.teacherId) || 0;
  const disciplineId = Number(req.body.disciplineId) || 0;
  const userId = Number(res.locals.userId) || 0;

  await testService.create(userId, {
    name,
    pdfUrl,
    categoryId,
    teacherId,
    disciplineId,
  });

  res.status(201).send('Test created');
}

async function getByDisciplines(_req: Request, res: Response) {
  const userId = Number(res.locals.userId) || 0;

  const tests = await testService.getByDisciplines(userId);

  res.status(200).send(tests);
}

async function getByTeachers(_req: Request, res: Response) {
  const userId = Number(res.locals.userId) || 0;

  const tests = await testService.getByTeachers(userId);

  res.status(200).send(tests);
}

export const testController = {
  create,
  getByDisciplines,
  getByTeachers,
};
