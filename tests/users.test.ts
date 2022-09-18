import { PrismaClient } from '@prisma/client';
import supertest from 'supertest';

import { app } from '../src/app';
import { userFactory } from './factories/userFactory';

const client = new PrismaClient();

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE tests;`;
  await client.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
  await client.$disconnect();
});

describe('POST users/signup', () => {
  it('Should return 201 and create a new user', async () => {
    const user = userFactory.createUserRequest();
    const response = await supertest(app).post('/users/signup').send(user);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
  });

  it('Should return 422 if body is invalid or passwords do not match', async () => {
    const user = userFactory.createUserRequest();
    const response = await supertest(app)
      .post('/users/signup')
      .send({ ...user, email: 'invalidemail' });

    expect(response.status).toBe(422);
  });

  it('Shouls return 409 if user already exists', async () => {
    const user = userFactory.createUserRequest();
    await supertest(app).post('/users/signup').send(user);
    const response = await supertest(app).post('/users/signup').send(user);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      status: 'error',
      message: 'User already exists',
    });
  });
});

describe('POST users/login', () => {
  it('Should return 200 and return a token', async () => {
    const user = userFactory.createUserRequest();
    await supertest(app).post('/users/signup').send(user);

    const response = await supertest(app)
      .post('/users/login')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Should return 422 if body is invalid', async () => {
    const user = userFactory.createUserRequest();
    await supertest(app).post('/users/signup').send(user);

    const response = await supertest(app)
      .post('/users/login')
      .send({ ...user, email: 'invalidemail' });

    expect(response.status).toBe(422);
  });

  it('Should return 401 if user does not exist', async () => {
    const user = userFactory.createUserRequest();
    const response = await supertest(app)
      .post('/users/login')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Incorrect email/password',
    });
  });
});
