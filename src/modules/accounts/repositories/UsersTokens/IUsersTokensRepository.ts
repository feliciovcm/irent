import { ICreateusersTokensDTO } from '../../dtos/ICreateUsersTokensDTO';
import { UsersTokens } from '../../entities/UsersTokens';

interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token
  }: ICreateusersTokensDTO): Promise<UsersTokens>;

  findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens>;

  deleteByTokenId(token_id: string): Promise<void>;

  findByToken(token: string): Promise<UsersTokens>;
}

export { IUsersTokensRepository };
