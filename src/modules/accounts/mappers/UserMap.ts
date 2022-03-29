import { instanceToInstance } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../entities/User';

class UserMap {
  static toDTO({
    name,
    email,
    id,
    avatar,
    driver_license,
    created_at,
    avatar_url
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      name,
      email,
      id,
      avatar,
      driver_license,
      created_at,
      avatar_url
    });
    return user;
  }
}

export { UserMap };
