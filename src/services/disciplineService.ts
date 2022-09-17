import { disciplineRepository } from '../repositories/disciplinesRespository';

async function getDisciplines() {
  return await disciplineRepository.findAll();
}

export const disciplineService = {
  getDisciplines,
};
