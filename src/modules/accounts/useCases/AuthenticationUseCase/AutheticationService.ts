import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { AppError } from '../../../../errors/AppError';
import { addDays } from '../../../../utils/DateDiffFromNow';
import { IUserRepository } from '../../repositories/Users/IUsersRepository';
import { UsersTokensRepository } from '../../repositories/UsersTokens/UsersTokensRepository';

interface IRequestBody {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticationService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: UsersTokensRepository
  ) {}

  async execute({ email, password }: IRequestBody): Promise<IResponse> {
    // verificar se usuario existe

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect', 400);
    }

    // vverificar se senha está correta

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 400);
    }

    const token = sign({}, auth.token_secret, {
      subject: user.id,
      expiresIn: auth.token_expires_in
    });

    const refresh_token = sign({ email }, auth.refresh_token_secret, {
      subject: user.id,
      expiresIn: auth.refresh_token_expires_in
    });

    const refresh_token_expires_date = addDays(30);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
    });

    const userResponse: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    };

    return userResponse;
  }
}

export { AuthenticationService };
