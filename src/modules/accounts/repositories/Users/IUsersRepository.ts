import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';

interface IUserRepository {
  create({
    name,
    username,
    password,
    email,
    driver_license
  }: ICreateUserDTO): Promise<void>;
  // list(): Promise<Category[]>;
  findByName(name: string): Promise<User>;
}

export { IUserRepository };
