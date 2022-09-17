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

export const testController = {
  createTest,
};
