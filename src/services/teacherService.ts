import { Teacher } from '@prisma/client';

import { teacherRepository } from '../repositories/teacherRepository';

async function findAll(): Promise<Teacher[] | []> {
  const teachers = await teacherRepository.findAll();
  return teachers;
}
export const teacherService = {
  findAll,
};
