import { userRepository } from '../repositories/userRepository';
import { AppError } from '../utils/AppError';

async function validateUserId(userId: number): Promise<void> {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
}

export const authService = {
  validateUserId,
};
