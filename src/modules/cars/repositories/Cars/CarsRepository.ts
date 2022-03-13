import { getRepository, Repository } from 'typeorm';

import { ICreateCarsDTO } from '../../dtos/ICreateCarsDTO';
import { Cars } from '../../entities/Cars';
import { ICarsRepository } from './ICarsRepository';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Cars>;

  constructor() {
    this.repository = getRepository(Cars);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    available = true
  }: ICreateCarsDTO): Promise<Cars> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      available
    });

    await this.repository.save(car);

    return car;
  }

  async findCarByLicensePlate(license_plate: string): Promise<Cars> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAvailableCars(
    name?: string,
    category_id?: string,
    brand?: string
  ): Promise<Cars[]> {
    // doc at: https://typeorm.io/#/select-query-builder
    const carsQuery = this.repository
      .createQueryBuilder('car')
      .where('car.available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('car.name = :name', { name });
    }
    if (brand) {
      carsQuery.andWhere('car.brand = :brand', { brand });
    }
    if (category_id) {
      carsQuery.andWhere('car.category_id = :category_id', { category_id });
    }

    const cars = carsQuery.getMany();

    return cars;
  }
}

export { CarsRepository };
