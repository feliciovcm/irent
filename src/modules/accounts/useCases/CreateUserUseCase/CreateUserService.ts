import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/Users/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    console.log('oi');

    if (userAlreadyExists) {
      throw new AppError('User already exists', 400);
    }

    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license
    });

    return user;
  }
}

export { CreateUserService };
