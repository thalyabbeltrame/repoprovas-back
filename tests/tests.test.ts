import { PrismaClient } from '@prisma/client';
import supertest from 'supertest';

import { app } from '../src/app';
import { testFactory } from './factories/testFactory';
import { userFactory } from './factories/userFactory';

const client = new PrismaClient();

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE tests;`;
  await client.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
  await client.$disconnect();
});

describe('POST tests/create', () => {
  it('Should return 201 and create a new test', async () => {
    const user = userFactory.createUserRequest();
    await supertest(app).post('/users/signup').send(user);

    const loginResponse = await supertest(app)
      .post('/users/login')
      .send({ email: user.email, password: user.password });
    const token = { Authorization: `Bearer ${loginResponse.body.token}` };

    const test = testFactory.createTestRequest();
    const response = await supertest(app)
      .post('/tests/create')
      .set(token)
      .send(test);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
  });

  it('Should return 401 when token is not provided', async () => {
    const test = testFactory.createTestRequest();
    const response = await supertest(app).post('/tests/create').send(test);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Token not provided',
    });
  });

  it('Should return 401 when token is invalid', async () => {
    const test = testFactory.createTestRequest();
    const response = await supertest(app)
      .post('/tests/create')
      .set({ Authorization: 'Bearer invalidtoken' })
      .send(test);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid token',
    });
  });

  it('Should return 422 if body is invalid', async () => {
    const user = userFactory.createUserRequest();
    await supertest(app).post('/users/signup').send(user);

    const loginResponse = await supertest(app)
      .post('/users/login')
      .send({ email: user.email, password: user.password });
    const token = { Authorization: `Bearer ${loginResponse.body.token}` };

    const test = testFactory.createTestRequest();
    const response = await supertest(app)
      .post('/tests/create')
      .set(token)
      .send({ ...test, name: '' });

    expect(response.status).toBe(422);
  });
});

describe('GET tests/by-disciplines', () => {
  it('Should return 200 and return all tests by discipline', async () => {
    const user = userFactory.createUserRequest();
    await supertest(app).post('/users/signup').send(user);

    const loginResponse = await supertest(app)
      .post('/users/login')
      .send({ email: user.email, password: user.password });
    const token = { Authorization: `Bearer ${loginResponse.body.token}` };

    const test = testFactory.createTestRequest();
    await supertest(app).post('/tests/create').set(token).send(test);

    const response = await supertest(app)
      .get('/tests/by-disciplines')
      .set(token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Should return 401 when token is not provided', async () => {
    const response = await supertest(app).get('/tests/by-disciplines');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Token not provided',
    });
  });

  it('Should return 401 when token is invalid', async () => {
    const response = await supertest(app)
      .get('/tests/by-disciplines')
      .set({ Authorization: 'Bearer invalidtoken' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid token',
    });
  });
});

describe('GET tests/by-teachers', () => {
  it('Should return 200 and return all tests by teachers', async () => {
    const user = userFactory.createUserRequest();
    await supertest(app).post('/users/signup').send(user);

    const loginResponse = await supertest(app)
      .post('/users/login')
      .send({ email: user.email, password: user.password });
    const token = { Authorization: `Bearer ${loginResponse.body.token}` };

    const test = testFactory.createTestRequest();
    await supertest(app).post('/tests/create').set(token).send(test);

    const response = await supertest(app).get('/tests/by-teachers').set(token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Should return 401 when token is not provided', async () => {
    const response = await supertest(app).get('/tests/by-teachers');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Token not provided',
    });
  });

  it('Should return 401 when token is invalid', async () => {
    const response = await supertest(app)
      .get('/tests/by-teachers')
      .set({ Authorization: 'Bearer invalidtoken' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid token',
    });
  });
});
