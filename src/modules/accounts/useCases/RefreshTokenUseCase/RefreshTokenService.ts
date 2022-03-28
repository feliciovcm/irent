import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { AppError } from '../../../../errors/AppError';
import { addDays } from '../../../../utils/DateDiffFromNow';
import { IUsersTokensRepository } from '../../repositories/UsersTokens/IUsersTokensRepository';

interface IRequest {
  refresh_token: string;
}

interface IDecode {
  email: string;
  sub: string;
}

interface IResponse {
  new_refresh_token: string;
  new_token: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ refresh_token }: IRequest): Promise<IResponse> {
    const { sub, email } = verify(
      refresh_token,
      auth.refresh_token_secret
    ) as IDecode;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findUserByIdAndRefreshToken(
        user_id,
        refresh_token
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exist!');
    }

    await this.usersTokensRepository.deleteByTokenId(userToken.id);

    const new_refresh_token = sign({ email }, auth.refresh_token_secret, {
      subject: user_id,
      expiresIn: auth.refresh_token_expires_in
    });

    const new_token = sign({}, auth.token_secret, {
      subject: user_id,
      expiresIn: auth.token_expires_in
    });

    const expires_date = addDays(30);

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: new_refresh_token,
      expires_date
    });

    return { new_refresh_token, new_token };
  }
}

export { RefreshTokenService };
