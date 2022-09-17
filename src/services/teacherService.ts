import { teacherRepository } from '../repositories/teachersRepository';

async function getTeachers() {
  return await teacherRepository.findAll();
}

export const teacherService = {
  getTeachers,
};
