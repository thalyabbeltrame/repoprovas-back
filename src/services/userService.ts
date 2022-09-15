import { UserRequestDTO } from '../dtos/UserRequestDTO';
import { User } from '../entities/User';
import { userRepository } from '../repositories/userRepository';
import { AppError } from '../utils/AppError';
import { bcryptUtils } from '../utils/bcryptUtils';
import { jwtUtils } from '../utils/jwtUtils';

async function createUser(data: UserRequestDTO): Promise<void> {
  const userAlreadyExists = await userRepository.findByEmail(data.email);
  if (userAlreadyExists) {
    throw new AppError('User already exists', 409);
  }

  const newUser = new User(data);
  await userRepository.create(newUser);
}

async function login(data: UserRequestDTO): Promise<string> {
  const user = await userRepository.findByEmail(data.email);
  if (!user) {
    throw new AppError('Incorrect email/password', 401);
  }

  const passwordMatch = bcryptUtils.checkPassword(data.password, user.password);
  if (!passwordMatch) {
    throw new AppError('Incorrect email/password', 401);
  }

  const token = jwtUtils.generateToken(user);
  return token;
}

export const userService = {
  createUser,
  login,
};
