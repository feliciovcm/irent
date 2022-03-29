import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '../../../../providers/StorageProvider/IStorageProvider';
import { IUserRepository } from '../../repositories/Users/IUsersRepository';

interface IUpdateAvatar {
  user_id: string;
  avatar_path: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatar_path }: IUpdateAvatar): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    await this.storageProvider.save(avatar_path, 'avatar');
    user.avatar = avatar_path;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarService };
