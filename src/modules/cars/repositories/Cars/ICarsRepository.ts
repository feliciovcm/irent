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
    name
  }: ICreateCarsDTO): Promise<Cars>;

  findCarByLicensePlate(license_plate: string): Promise<Cars>;
}

export { ICarsRepository };
