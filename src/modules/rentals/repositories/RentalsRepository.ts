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
    id,
    end_date,
    total,
    car_id,
    user_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rentals> {
    const rental = this.repository.create({
      id,
      end_date,
      total,
      car_id,
      user_id,
      expected_return_date
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rentals> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null }
    });
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rentals> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: null }
    });
    return rental;
  }

  async findById(id: string): Promise<Rentals> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findByUserId(user_id: string): Promise<Rentals[]> {
    // trazer os dados do carro na listagem dos alugueis
    // necessita o manytoone joincolumn na entidade de alugies
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car']
    });

    return rentals;
  }
}

export { RentalsRepository };
