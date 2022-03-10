import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/Users/UserRepository';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // request.user with id added by ensureAuthenticated middleware
  const { id } = request.user;

  const userRepository = new UserRepository();

  const user = await userRepository.findById(id);

  if (!user.admin) {
    throw new AppError('User must be admin');
  }

  next();
}
