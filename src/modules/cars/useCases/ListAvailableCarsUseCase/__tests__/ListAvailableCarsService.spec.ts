import { ICreateCarsDTO } from '../../../dtos/ICreateCarsDTO';
import { CarsRepositoryMock } from '../../../repositories/mocks/CarsRepositoryMock';
import { CreateCarsService } from '../../CreateCarsUseCase/CreateCarsService';
import { ListAvailableCarsService } from '../ListAvailableCarsService';

let carsRepositoryMocked: CarsRepositoryMock;
let listAvailableCarsService: ListAvailableCarsService;
let createCarsService: CreateCarsService;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryMocked = new CarsRepositoryMock();
    createCarsService = new CreateCarsService(carsRepositoryMocked);
    listAvailableCarsService = new ListAvailableCarsService(
      carsRepositoryMocked
    );
  });

  it('should list all available cars', async () => {
    const carAvailable1: ICreateCarsDTO = {
      brand: 'fake-brand',
      category_id: 'fake-category-id',
      daily_rate: 123,
      description: 'fake-description',
      fine_amount: 1000,
      license_plate: 'fake-license-plate',
      name: 'fake-car'
    };

    const carAvailable2: ICreateCarsDTO = {
      brand: 'fake-brand-2',
      category_id: 'fake-category-id-2',
      daily_rate: 1234,
      description: 'fake-description-2',
      fine_amount: 1000,
      license_plate: 'fake-license-plate-2',
      name: 'fake-car-2'
    };

    const car1 = await createCarsService.execute(carAvailable1);
    const car2 = await createCarsService.execute(carAvailable2);

    const cars = await listAvailableCarsService.execute({});

    expect(cars).toEqual([car1, car2]);
  });

  it('should list all available cars by name', async () => {
    const carAvailable1: ICreateCarsDTO = {
      brand: 'fake-brand',
      category_id: 'fake-category-id',
      daily_rate: 123,
      description: 'fake-description',
      fine_amount: 1000,
      license_plate: 'fake-license-plate-name',
      name: 'fake-car'
    };

    const carAvailable2: ICreateCarsDTO = {
      brand: 'fake-brand-2',
      category_id: 'fake-category-id-2',
      daily_rate: 1234,
      description: 'fake-description-2',
      fine_amount: 1000,
      license_plate: 'fake-license-plate-name-2',
      name: 'fake-car-2'
    };

    const car1 = await createCarsService.execute(carAvailable1);
    await createCarsService.execute(carAvailable2);

    const cars = await listAvailableCarsService.execute({
      name: carAvailable1.name
    });

    expect(cars).toEqual([car1]);
  });

  it('should list all available cars by brand', async () => {
    const carAvailable1: ICreateCarsDTO = {
      brand: 'fake-brand',
      category_id: 'fake-category-id',
      daily_rate: 123,
      description: 'fake-description',
      fine_amount: 1000,
      license_plate: 'fake-license-plate-brand',
      name: 'fake-car'
    };

    const carAvailable2: ICreateCarsDTO = {
      brand: 'fake-brand-2',
      category_id: 'fake-category-id-2',
      daily_rate: 1234,
      description: 'fake-description-2',
      fine_amount: 1000,
      license_plate: 'fake-license-plate-brand-2',
      name: 'fake-car-2'
    };

    const car1 = await createCarsService.execute(carAvailable1);
    await createCarsService.execute(carAvailable2);

    const cars = await listAvailableCarsService.execute({
      brand: carAvailable1.brand
    });

    expect(cars).toEqual([car1]);
  });

  it('should list all available cars by category id', async () => {
    const carAvailable1: ICreateCarsDTO = {
      brand: 'fake-brand',
      category_id: 'fake-category-id',
      daily_rate: 123,
      description: 'fake-description',
      fine_amount: 1000,
      license_plate: 'fake-license-plate-categoryID',
      name: 'fake-car'
    };

    const carAvailable2: ICreateCarsDTO = {
      brand: 'fake-brand-2',
      category_id: 'fake-category-id-2',
      daily_rate: 1234,
      description: 'fake-description-2',
      fine_amount: 1000,
      license_plate: 'fake-license-plate-categoryID-2',
      name: 'fake-car-2'
    };

    const car1 = await createCarsService.execute(carAvailable1);
    await createCarsService.execute(carAvailable2);

    const cars = await listAvailableCarsService.execute({
      category_id: carAvailable1.category_id
    });

    expect(cars).toEqual([car1]);
  });
});
