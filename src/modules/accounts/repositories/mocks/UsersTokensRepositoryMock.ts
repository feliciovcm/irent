import { ICreateusersTokensDTO } from '../../dtos/ICreateUsersTokensDTO';
import { UsersTokens } from '../../entities/UsersTokens';
import { IUsersTokensRepository } from '../UsersTokens/IUsersTokensRepository';

class UsersTokensRepositoryMock implements IUsersTokensRepository {
  usersTokens: UsersTokens[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token
  }: ICreateusersTokensDTO): Promise<UsersTokens> {
    const userToken = new UsersTokens();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token
    });

    return userToken;
  }
  async findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(
      (item) => item.user_id === user_id && item.refresh_token === refresh_token
    );
    return userToken;
  }
  async deleteByTokenId(token_id: string): Promise<void> {
    const indexOfItem = this.usersTokens.findIndex(
      (item) => item.id === token_id
    );

    this.usersTokens.splice(indexOfItem, 1);
  }
  async findByToken(token: string): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(
      (item) => item.refresh_token === token
    );

    return userToken;
  }
}

export { UsersTokensRepositoryMock };
