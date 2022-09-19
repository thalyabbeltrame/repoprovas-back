import { Term } from '@prisma/client';

import { termRepository } from '../repositories/termsRepository';

async function findAll(): Promise<Term[]> {
  const terms = await termRepository.findAll();
  return terms;
}

export const termService = {
  findAll,
};
