import { Request, Response } from 'express';

import { userService } from '../services/userService';

async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;

  await userService.createUser({ email, password });
  res.status(201).send('User registered with success');
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const token = await userService.login({ email, password });
  res.status(200).json({ token });
}

export const userController = {
  createUser,
  login,
};
