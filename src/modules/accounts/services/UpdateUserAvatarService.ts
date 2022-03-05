import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../utils/deleteFile';
import { IUserRepository } from '../repositories/Users/IUsersRepository';

interface IUpdateAvatar {
  user_id: string;
  avatar_path: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({ user_id, avatar_path }: IUpdateAvatar): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);

    user.avatar = avatar_path;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarService };
