import {
  disciplineRepository,
  Discipline,
} from '../repositories/disciplineRepository';

async function findAll(): Promise<Discipline[] | []> {
  const disciplines = await disciplineRepository.findAll();
  return disciplines;
}

export const disciplineService = {
  findAll,
};
