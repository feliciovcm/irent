import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rentals } from '../entities/Rentals';

interface IRentalsRepository {
  create({
    id,
    end_date,
    total,
    car_id,
    user_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rentals>;
  findOpenRentalByCar(car_id: string): Promise<Rentals>;
  findOpenRentalByUser(user_id: string): Promise<Rentals>;
  findById(id: string): Promise<Rentals>;
}

export { IRentalsRepository };
