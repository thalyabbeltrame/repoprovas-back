import { UserRequestDTO } from '../dtos/UserRequestDTO';
import { User } from '../entities/User';
import { userRepository } from '../repositories/userRepository';
import { AppError } from '../utils/AppError';

async function createUser(data: UserRequestDTO): Promise<void> {
  const userAlreadyExists = await userRepository.findByEmail(data.email);
  if (userAlreadyExists) {
    throw new AppError('User already exists', 409);
  }

  const newUser = new User(data);
  await userRepository.create(newUser);
}

export const userService = {
  createUser,
};
