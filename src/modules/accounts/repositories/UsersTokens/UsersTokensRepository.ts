import { getRepository, Repository } from 'typeorm';

import { ICreateusersTokensDTO } from '../../dtos/ICreateUsersTokensDTO';
import { UsersTokens } from '../../entities/UsersTokens';
import { IUsersTokensRepository } from './IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;
  constructor() {
    this.repository = getRepository(UsersTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }: ICreateusersTokensDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokensRepository };
