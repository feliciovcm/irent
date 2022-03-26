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

  async findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    const userToken = await this.repository.findOne({
      user_id,
      refresh_token
    });

    return userToken;
  }

  async deleteByTokenId(token_id: string): Promise<void> {
    const id = token_id;
    await this.repository.delete(id);
  }

  async findByToken(token: string): Promise<UsersTokens> {
    const userToken = await this.repository.findOne({ refresh_token: token });
    return userToken;
  }
}

export { UsersTokensRepository };
