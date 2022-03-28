import { AppError } from '../../../../../errors/AppError';
import { EtherealMailProviderMock } from '../../../../../providers/mocks/EtherealMailProviderMock';
import { UserRepositoryMock } from '../../../repositories/mocks/UserRepositoryMock';
import { UsersTokensRepositoryMock } from '../../../repositories/mocks/UsersTokensRepositoryMock';
import { ForgotPasswordEmailService } from '../ForgotPasswordEmailService';

let usersTokensRepositoryMocked: UsersTokensRepositoryMock;
let usersRepositoryMocked: UserRepositoryMock;
let etherealMailProviderMocked: EtherealMailProviderMock;
let forgotPasswordEmailService: ForgotPasswordEmailService;

describe('Forgot Password Send Email', () => {
  beforeEach(() => {
    usersTokensRepositoryMocked = new UsersTokensRepositoryMock();
    usersRepositoryMocked = new UserRepositoryMock();
    etherealMailProviderMocked = new EtherealMailProviderMock();
    forgotPasswordEmailService = new ForgotPasswordEmailService(
      usersRepositoryMocked,
      usersTokensRepositoryMocked,
      etherealMailProviderMocked
    );
  });
  it('should be able to send a forgot password email to user', async () => {
    const sendEmail = jest.spyOn(etherealMailProviderMocked, 'sendMail');

    await usersRepositoryMocked.create({
      driver_license: 'fake-driver-license',
      email: 'fake@email.com',
      name: 'fake-user',
      password: '123456'
    });

    await forgotPasswordEmailService.execute('fake@email.com');

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to send a forgot password email if user does not exists', async () => {
    await expect(
      forgotPasswordEmailService.execute('fake-email@email.com')
    ).rejects.toEqual(new AppError('User does not exist'));
  });

  it('should be able to create a new token', async () => {
    const generateToken = jest.spyOn(usersTokensRepositoryMocked, 'create');

    await usersRepositoryMocked.create({
      driver_license: 'fake-driver-license',
      email: 'fake@email.com',
      name: 'fake-user',
      password: '123456'
    });

    await forgotPasswordEmailService.execute('fake@email.com');

    expect(generateToken).toHaveBeenCalled();
  });
});
