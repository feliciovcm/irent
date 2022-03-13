import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';

interface IUserRepository {
  create({
    name,
    password,
    email,
    driver_license,
    id
  }: ICreateUserDTO): Promise<void>;
  // list(): Promise<Category[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository };
