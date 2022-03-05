import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from './IUsersRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    password,
    email,
    driver_license
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      driver_license
    });

    await this.repository.save(user);
  }

  async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({ name });

    return user;
  }
}

export { UserRepository };
