import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rentals } from '../entities/Rentals';

interface IRentalsRepository {
  create({
    car_id,
    user_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rentals>;
  findOpenRentalByCar(car_id: string): Promise<Rentals>;
  findOpenRentalByUser(user_id: string): Promise<Rentals>;
}

export { IRentalsRepository };
