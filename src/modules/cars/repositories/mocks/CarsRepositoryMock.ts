import { ICreateCarsDTO } from '../../dtos/ICreateCarsDTO';
import { Cars } from '../../entities/Cars';
import { ICarsRepository } from '../Cars/ICarsRepository';

class CarsRepositoryMock implements ICarsRepository {
  cars: Cars[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name
  }: ICreateCarsDTO): Promise<Cars> {
    const car = new Cars();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    });

    this.cars.push(car);
    return car;
  }

  async findCarByLicensePlate(license_plate: string): Promise<Cars> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }
}

export { CarsRepositoryMock };
