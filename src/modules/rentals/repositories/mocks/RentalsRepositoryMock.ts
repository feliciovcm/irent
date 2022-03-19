import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO';
import { Rentals } from '../../entities/Rentals';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryMock implements IRentalsRepository {
  rentals: Rentals[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rentals> {
    const rental = new Rentals();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rentals> {
    const rental = this.rentals.find(
      (rent) => rent.car_id === car_id && !rent.end_date
    );

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rentals> {
    const rental = this.rentals.find(
      (rent) => rent.user_id === user_id && !rent.end_date
    );

    return rental;
  }
}

export { RentalsRepositoryMock };
