import { getRepository, Repository } from 'typeorm';

import { ICreateCarsImageDTO } from '../../dtos/ICreateCarsImageDTO';
import { CarsImage } from '../../entities/CarsImage';
import { ICarsImageRepository } from './ICarsImageRepository';

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarsImage>;

  constructor() {
    this.repository = getRepository(CarsImage);
  }

  async create({
    car_id,
    image_name
  }: ICreateCarsImageDTO): Promise<CarsImage> {
    const carImage = this.repository.create({ car_id, image_name });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImageRepository };
