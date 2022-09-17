import { prisma } from '../config/prisma';

import { InsertTestDTO } from '../dtos/TestRequestDTO';

async function create(data: InsertTestDTO): Promise<void> {
  await prisma.test.create({
    data,
  });
}

export const testRepository = {
  create,
};
