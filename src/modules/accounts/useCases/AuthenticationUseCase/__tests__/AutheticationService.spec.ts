import { AppError } from '../../../../../errors/AppError';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { UserRepositoryMock } from '../../../repositories/mocks/UserRepositoryMock';
import { CreateUserService } from '../../CreateUserUseCase/CreateUserService';
import { AuthenticationService } from '../AutheticationService';

let authenticationService: AuthenticationService;
let userRepositoryMocked: UserRepositoryMock;
let createUserService: CreateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryMocked = new UserRepositoryMock();
    authenticationService = new AuthenticationService(userRepositoryMocked);
    createUserService = new CreateUserService(userRepositoryMocked);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: 'fake-driver-license',
      email: 'fake-email@email.com',
      name: 'fake-name',
      password: 'fake-password'
    };

    await createUserService.execute({
      driver_license: user.driver_license,
      email: user.email,
      name: user.name,
      password: user.password
    });

    const result = await authenticationService.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty('token');
  });

  it('should not authenticate a nonexistent user', async () => {
    await expect(
      authenticationService.execute({
        email: 'fake-email123@email.com',
        password: 'fake-password123'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not authenticate an user with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: 'fake-driver-license',
      email: 'fake-email@email.com',
      name: 'fake-name',
      password: 'fake-password'
    };

    await createUserService.execute({
      driver_license: user.driver_license,
      email: user.email,
      name: user.name,
      password: user.password
    });

    const createdUser = await userRepositoryMocked.findByEmail(user.email);

    expect(createdUser).toHaveProperty('email', user.email);
    await expect(
      authenticationService.execute({
        email: user.email,
        password: 'fake-wrong-password'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
