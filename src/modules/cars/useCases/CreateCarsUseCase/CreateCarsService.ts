import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateCarsDTO } from '../../dtos/ICreateCarsDTO';
import { Cars } from '../../entities/Cars';
import { ICarsRepository } from '../../repositories/Cars/ICarsRepository';

@injectable()
class CreateCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    available = true,
    license_plate,
    name
  }: ICreateCarsDTO): Promise<Cars> {
    const carAlreadyExist = await this.carsRepository.findCarByLicensePlate(
      license_plate
    );

    if (carAlreadyExist) {
      throw new AppError('Car already exists');
    }

    const car = await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      available
    });

    return car;
  }
}

export { CreateCarsService };
