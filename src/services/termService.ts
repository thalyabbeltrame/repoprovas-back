import { termRepository } from '../repositories/termRepository';

async function getTerms() {
  return await termRepository.findAll();
}

export const termService = {
  getTerms,
};
