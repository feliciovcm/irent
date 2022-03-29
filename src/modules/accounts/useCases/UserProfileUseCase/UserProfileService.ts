import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '../../dtos/IUserResponseDTO';
import { UserMap } from '../../mappers/UserMap';
import { IUserRepository } from '../../repositories/Users/IUsersRepository';

@injectable()
class UserProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { UserProfileService };
