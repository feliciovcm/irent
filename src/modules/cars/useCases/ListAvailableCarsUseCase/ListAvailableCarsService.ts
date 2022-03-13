import { inject, injectable } from 'tsyringe';

import { Cars } from '../../entities/Cars';
import { ICarsRepository } from '../../repositories/Cars/ICarsRepository';

interface IListCarsDTO {
  name?: string;
  category_id?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, category_id, brand }: IListCarsDTO): Promise<Cars[]> {
    const cars = this.carsRepository.findAvailableCars(
      name,
      category_id,
      brand
    );

    return cars;
  }
}

export { ListAvailableCarsService };
