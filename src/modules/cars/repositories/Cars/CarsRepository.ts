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
    name
  }: ICreateCarsDTO): Promise<Cars> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    });

    await this.repository.save(car);

    return car;
  }

  findCarByLicensePlate(license_plate: string): Promise<Cars> {
    const car = this.repository.findOne({ license_plate });

    return car;
  }
}

export { CarsRepository };
