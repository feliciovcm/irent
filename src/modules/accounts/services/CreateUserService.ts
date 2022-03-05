import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUserRepository } from '../repositories/Users/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    username,
    password,
    email,
    driver_license
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByName(name);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    await this.userRepository.create({
      name,
      username,
      password,
      email,
      driver_license
    });
  }
}

export { CreateUserService };
