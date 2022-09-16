import { Request, Response } from 'express';
import { testService } from '../services/testService';

async function createTest(req: Request, res: Response) {
  const { name, pdfUrl } = req.body;
  const categoryId = Number(req.body.categoryId) || 0;
  const teacherDisciplineId = Number(req.body.teacherDisciplineId) || 0;
  const userId = Number(res.locals.userId) || 0;

  await testService.createTest(userId, {
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId,
  });

  res.status(201).send('Test created');
}

export const testController = {
  createTest,
};
