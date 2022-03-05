import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IUserRepository } from '../repositories/Users/IUsersRepository';

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
}

@injectable()
class AuthenticationService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
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

    const token = sign({}, 'f2d3afdfffbff1fa624b3cbb39b185c4071d92fd', {
      subject: user.id,
      expiresIn: '1d'
    });

    const userResponse: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    };

    return userResponse;
  }
}

export { AuthenticationService };
