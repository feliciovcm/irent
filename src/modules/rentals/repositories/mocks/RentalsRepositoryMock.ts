import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO';
import { Rentals } from '../../entities/Rentals';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryMock implements IRentalsRepository {
  rentals: Rentals[] = [];

  async create({
    id,
    end_date,
    total,
    car_id,
    user_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rentals> {
    if (id) {
      const rental = this.rentals.find((rental) => rental.id === id);
      rental.end_date = end_date;
      rental.total = total;

      return rental;
    }

    const rental = new Rentals();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });
    this.rentals.push(rental);
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

  async findById(id: string): Promise<Rentals> {
    const rental = this.rentals.find((rent) => rent.id === id);

    return rental;
  }

  async findByUserId(user_id: string): Promise<Rentals[]> {
    const rentals = this.rentals.filter((rental) => rental.user_id === user_id);

    return rentals;
  }
}

export { RentalsRepositoryMock };
