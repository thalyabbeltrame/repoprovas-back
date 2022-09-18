import { faker } from '@faker-js/faker';

interface ITestRequest {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherId: number;
  disciplineId: number;
}

function createTestRequest(): ITestRequest {
  return {
    name: faker.name.firstName(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    teacherId: 1,
    disciplineId: 1,
  };
}

export const testFactory = {
  createTestRequest,
};
