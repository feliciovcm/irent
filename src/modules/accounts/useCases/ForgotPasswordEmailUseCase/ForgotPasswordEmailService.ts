import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { AppError } from '../../../../errors/AppError';
import { IMailProvider } from '../../../../providers/MailProvider/IMailProvider';
import { addHours } from '../../../../utils/DateDiffFromNow';
import { IUserRepository } from '../../repositories/Users/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/UsersTokens/IUsersTokensRepository';

@injectable()
class ForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('EtherealMailProvider')
    private etherealMailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const expires_date = addHours(3);

    const token = uuidV4();

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    });
    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'templates',
      'emails',
      'forgotPassword.hbs'
    );

    const variables = {
      name: user.name,
      link: `${process.env.BASE_URL}/password/reset?token=${token}`
    };

    await this.etherealMailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath
    );
  }
}

export { ForgotPasswordEmailService };
