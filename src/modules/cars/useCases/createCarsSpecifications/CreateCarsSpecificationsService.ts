import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateCarSpecificationsDTO } from '../../dtos/ICreateCarSpecificationsDTO';
import { Cars } from '../../entities/Cars';
import { ICarsRepository } from '../../repositories/Cars/ICarsRepository';
import { ISpecificationRepository } from '../../repositories/Specifications/ISpecificationRepository';

@injectable()
class CreateCarsSpecificationsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({
    car_id,
    specifications_id
  }: ICreateCarSpecificationsDTO): Promise<Cars> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car does not exist');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    car.specifications = specifications;

    await this.carsRepository.create(car);

    return car;
  }
}

export { CreateCarsSpecificationsService };
