import { ICreateCarsDTO } from '../../dtos/ICreateCarsDTO';
import { Cars } from '../../entities/Cars';

interface ICarsRepository {
  create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id
  }: ICreateCarsDTO): Promise<Cars>;

  findCarByLicensePlate(license_plate: string): Promise<Cars>;

  findAvailableCars(
    name?: string,
    category_id?: string,
    brand?: string
  ): Promise<Cars[]>;

  findById(car_id: string): Promise<Cars>;
  updateAvailability(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
