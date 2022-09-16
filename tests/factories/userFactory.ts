import { faker } from '@faker-js/faker';

interface IUserRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

function createUserRequest(): IUserRequest {
  const password = faker.internet.password();

  return {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
  };
}

export const userFactory = {
  createUserRequest,
};
