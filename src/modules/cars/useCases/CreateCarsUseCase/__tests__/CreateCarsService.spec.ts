import { AppError } from '../../../../../errors/AppError';
import { ICreateCarsDTO } from '../../../dtos/ICreateCarsDTO';
import { CarsRepositoryMock } from '../../../repositories/mocks/CarsRepositoryMock';
import { CreateCarsService } from '../CreateCarsService';

let carsRepositoryMocked: CarsRepositoryMock;
let createCarsService: CreateCarsService;

describe('Create Cars', () => {
  beforeEach(() => {
    carsRepositoryMocked = new CarsRepositoryMock();
    createCarsService = new CreateCarsService(carsRepositoryMocked);
  });

  it('should be able to create a new car', async () => {
    const car: ICreateCarsDTO = {
      brand: 'fake-brand',
      category_id: 'fake-category-id',
      daily_rate: 123,
      description: 'fake-description',
      fine_amount: 1000,
      license_plate: 'fake-license-plate',
      name: 'fake-car'
    };

    const createdCar = await createCarsService.execute(car);

    expect(createdCar).toHaveProperty('id');
  });

  it('should not be able to create a new car with same license plate', async () => {
    const car1: ICreateCarsDTO = {
      brand: 'fake-brand',
      category_id: 'fake-category-id',
      daily_rate: 123,
      description: 'fake-description',
      fine_amount: 1000,
      license_plate: 'fake-license-plate',
      name: 'fake-car'
    };

    const car2: ICreateCarsDTO = {
      brand: 'fake-brand2',
      category_id: 'fake-category-id2',
      daily_rate: 1234,
      description: 'fake-description2',
      fine_amount: 1200,
      license_plate: 'fake-license-plate',
      name: 'fake-car2'
    };

    async function executeCarsCreation() {
      await createCarsService.execute(car1);
      await createCarsService.execute(car2);
    }

    expect(executeCarsCreation).rejects.toBeInstanceOf(AppError);
  });

  it('should create a new car with available equals true by default', async () => {
    const car: ICreateCarsDTO = {
      brand: 'fake-brand',
      category_id: 'fake-category-id',
      daily_rate: 123,
      description: 'fake-description',
      fine_amount: 1000,
      license_plate: 'fake-license-plate',
      name: 'fake-car'
    };

    const createdCar = await createCarsService.execute(car);

    expect(createdCar).toHaveProperty('available', true);
  });
});
