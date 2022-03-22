import { AppError } from '../../../../../errors/AppError';
import { CarsRepositoryMock } from '../../../../cars/repositories/mocks/CarsRepositoryMock';
import { RentalsRepositoryMock } from '../../../repositories/mocks/RentalsRepositoryMock';
import { CreateRentalsService } from '../CreateRentalsService';

let rentalsRepositoryMocked: RentalsRepositoryMock;
let carsRepositoryMocked: CarsRepositoryMock;
let createRentalsService: CreateRentalsService;

function addHoursFromNow(hours: number) {
  const now = new Date();
  const expectedDate = now.setSeconds(now.getSeconds() + hours * 3601);

  return new Date(expectedDate);
}

describe('Create rental', () => {
  beforeEach(() => {
    rentalsRepositoryMocked = new RentalsRepositoryMock();
    carsRepositoryMocked = new CarsRepositoryMock();
    createRentalsService = new CreateRentalsService(
      rentalsRepositoryMocked,
      carsRepositoryMocked
    );
  });

  it('should create a new rental', async () => {
    const car = await carsRepositoryMocked.create({
      name: 'Fake-car',
      description: 'fake-description',
      daily_rate: 100,
      license_plate: 'fake-license',
      fine_amount: 40,
      category_id: 'fake-category-id',
      brand: 'brand'
    });

    const rental = await createRentalsService.execute({
      user_id: 'fake-user-id',
      car_id: car.id,
      expected_return_date: addHoursFromNow(24)
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not create a new rental if user has an open rent', async () => {
    await rentalsRepositoryMocked.create({
      user_id: 'fake-user-id',
      car_id: 'fake-car-id',
      expected_return_date: addHoursFromNow(24)
    });

    await expect(
      createRentalsService.execute({
        car_id: 'fake-car-id-2',
        expected_return_date: addHoursFromNow(24),
        user_id: 'fake-user-id'
      })
    ).rejects.toEqual(new AppError('User already has an open rental'));
  });

  it('should not create a new rental if car has an open rent', async () => {
    const rental = await rentalsRepositoryMocked.create({
      user_id: 'fake-user-id',
      car_id: 'fake-car-id',
      expected_return_date: addHoursFromNow(24)
    });

    await expect(
      createRentalsService.execute({
        user_id: 'fake-user-id-2',
        car_id: rental.car_id,
        expected_return_date: addHoursFromNow(24)
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('should not create a new rental if expected return date is under 24 hours', async () => {
    const car = await carsRepositoryMocked.create({
      name: 'Fake-car',
      description: 'fake-description',
      daily_rate: 100,
      license_plate: 'fake-license',
      fine_amount: 40,
      category_id: 'fake-category-id',
      brand: 'brand'
    });
    await expect(
      createRentalsService.execute({
        user_id: 'fake-user-id',
        car_id: car.id,
        expected_return_date: addHoursFromNow(23)
      })
    ).rejects.toEqual(new AppError('Rental must be at least 24hours'));
  });
});
