import {
  disciplineRepository,
  DisciplineResponse,
} from '../repositories/disciplineRepository';

async function findAll(): Promise<DisciplineResponse[]> {
  const disciplines = await disciplineRepository.findAll();
  return disciplines;
}

export const disciplineService = {
  findAll,
};
