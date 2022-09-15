import { User } from '@prisma/client';

import { UserRequestDTO } from '../dtos/UserRequestDTO';
import { prisma } from '../config/prisma';

async function create(data: UserRequestDTO): Promise<void> {
  await prisma.user.create({
    data,
  });
}

async function findByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export const userRepository = {
  create,
  findByEmail,
};
