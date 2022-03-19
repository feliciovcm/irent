import { AppError } from '../../../../../errors/AppError';
import { RentalsRepositoryMock } from '../../../repositories/mocks/RentalsRepositoryMock';
import { CreateRentalsService } from '../CreateRentalsService';

let rentalsRepositoryMocked: RentalsRepositoryMock;
let createRentalsService: CreateRentalsService;

function addHoursFromNow(hours: number) {
  const now = new Date();
  const expectedDate = now.setSeconds(now.getSeconds() + hours * 3601);

  return new Date(expectedDate);
}

describe('Create rental', () => {
  beforeEach(() => {
    rentalsRepositoryMocked = new RentalsRepositoryMock();
    createRentalsService = new CreateRentalsService(rentalsRepositoryMocked);
  });

  it('should create a new rental', async () => {
    const rental = await createRentalsService.execute({
      user_id: 'fake-user-id',
      car_id: 'fake-car-id',
      expected_return_date: addHoursFromNow(24)
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not create a new rental if user has an open rent', async () => {
    async function executeCreateRentalsService() {
      await createRentalsService.execute({
        user_id: 'fake-user-id',
        car_id: 'fake-car-id-1',
        expected_return_date: addHoursFromNow(24)
      });

      await createRentalsService.execute({
        user_id: 'fake-user-id',
        car_id: 'fake-car-id-2',
        expected_return_date: addHoursFromNow(24)
      });
    }
    expect(executeCreateRentalsService).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a new rental if car has an open rent', async () => {
    async function executeCreateRentalsService() {
      await createRentalsService.execute({
        user_id: 'fake-user-id-1',
        car_id: 'fake-car-id',
        expected_return_date: addHoursFromNow(24)
      });

      await createRentalsService.execute({
        user_id: 'fake-user-id-2',
        car_id: 'fake-car-id',
        expected_return_date: addHoursFromNow(24)
      });
    }
    expect(executeCreateRentalsService).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a new rental if expected return date is under 24 hours', async () => {
    async function executeCreateRentalsService() {
      await createRentalsService.execute({
        user_id: 'fake-user-id',
        car_id: 'fake-car-id',
        expected_return_date: addHoursFromNow(23)
      });
    }

    expect(executeCreateRentalsService).rejects.toBeInstanceOf(AppError);
  });
});
