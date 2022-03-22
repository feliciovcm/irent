import { AppError } from '../../../../../errors/AppError';
import { ICreateCarsDTO } from '../../../dtos/ICreateCarsDTO';
import { CarsRepositoryMock } from '../../../repositories/mocks/CarsRepositoryMock';
import { SpecificationRepositoryMock } from '../../../repositories/mocks/SpecificationRepositoryMock';
import { ICreateSpecificationDTO } from '../../../repositories/Specifications/ISpecificationRepository';
import { CreateCarsSpecificationsService } from '../CreateCarsSpecificationsService';

let carsRepositoryMocked: CarsRepositoryMock;
let specificationsRepositoryMocked: SpecificationRepositoryMock;
let createCarsSpecificationsService: CreateCarsSpecificationsService;

describe('Create cars specifications', () => {
  beforeEach(() => {
    carsRepositoryMocked = new CarsRepositoryMock();
    specificationsRepositoryMocked = new SpecificationRepositoryMock();
    createCarsSpecificationsService = new CreateCarsSpecificationsService(
      carsRepositoryMocked,
      specificationsRepositoryMocked
    );
  });

  it('should create specifications to an existent car', async () => {
    const car1: ICreateCarsDTO = {
      brand: 'fake-brand',
      category_id: 'fake-category-id',
      daily_rate: 123,
      description: 'fake-description',
      fine_amount: 1000,
      license_plate: 'fake-license-plate',
      name: 'fake-car'
    };

    const car = await carsRepositoryMocked.create(car1);

    const specification1: ICreateSpecificationDTO = {
      description: 'fake-description-1',
      name: 'fake-specification-1'
    };

    const specification2: ICreateSpecificationDTO = {
      description: 'fake-description-2',
      name: 'fake-specification-2'
    };

    const newSpecification1 = await specificationsRepositoryMocked.create(
      specification1
    );

    const newSpecification2 = await specificationsRepositoryMocked.create(
      specification2
    );

    const updatedCar = await createCarsSpecificationsService.execute({
      car_id: car.id,
      specifications_id: [newSpecification1.id, newSpecification2.id]
    });

    const cars = await carsRepositoryMocked.findAvailableCars();

    expect(updatedCar.specifications).toEqual([
      newSpecification1,
      newSpecification2
    ]);
  });

  it('should not be able to create specifications to an nonexistent car', async () => {
    const car_id = 'fake-car-id';
    const specifications_id = [
      'fake-specification-id-1',
      'fake-specification-id-2'
    ];

    await expect(
      createCarsSpecificationsService.execute({
        car_id,
        specifications_id
      })
    ).rejects.toEqual(new AppError('Car does not exist'));
  });
});
