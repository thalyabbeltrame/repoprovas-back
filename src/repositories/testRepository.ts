import { prisma } from '../config/prisma';

import { TestRequestDTO } from '../dtos/TestRequestDTO';

async function create(data: TestRequestDTO): Promise<void> {
  await prisma.test.create({
    data,
  });
}

export const testRepository = {
  create,
};
