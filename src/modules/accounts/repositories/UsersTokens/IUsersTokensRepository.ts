import { ICreateusersTokensDTO } from '../../dtos/ICreateUsersTokensDTO';
import { UsersTokens } from '../../entities/UsersTokens';

interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token
  }: ICreateusersTokensDTO): Promise<UsersTokens>;
}

export { IUsersTokensRepository };
