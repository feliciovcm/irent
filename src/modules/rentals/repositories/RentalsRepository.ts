import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rentals } from '../entities/Rentals';
import { IRentalsRepository } from './IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rentals>;

  constructor() {
    this.repository = getRepository(Rentals);
  }

  async create({
    car_id,
    user_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rentals> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rentals> {
    const rental = await this.repository.findOne({ car_id });
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rentals> {
    const rental = await this.repository.findOne({ user_id });
    return rental;
  }
}

export { RentalsRepository };
