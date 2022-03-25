import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../config/auth';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/Users/UserRepository';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError('Token is missing!', 401);
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.token_secret);

    const userRepository = new UserRepository();

    const user = await userRepository.findById(user_id as string);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    request.user = {
      id: user_id as string
    };

    next();
  } catch (error) {
    throw new AppError('Token invalid!', 401);
  }
}
