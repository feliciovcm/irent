import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/Users/UserRepository';

interface ITokenPayload {
  sub: string;
}

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
    const { sub: user_id } = verify(
      token,
      'f2d3afdfffbff1fa624b3cbb39b185c4071d92fd'
    ) as ITokenPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    next();
  } catch (error) {
    throw new AppError('Token invalid!', 401);
  }
}
