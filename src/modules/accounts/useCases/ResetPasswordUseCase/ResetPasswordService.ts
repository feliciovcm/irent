import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IDateProvider } from '../../../../providers/DateProvider/IDateProvider';
import { IUserRepository } from '../../repositories/Users/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/UsersTokens/IUsersTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token invalid!');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError('Token expired!');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.userRepository.create(user);

    await this.usersTokensRepository.deleteByTokenId(userToken.id);
  }
}

export { ResetPasswordService };
