import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '../../../../providers/StorageProvider/IStorageProvider';
import { ICarsImageRepository } from '../../repositories/CarsImage/ICarsImageRepository';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarsImageService {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image_name) => {
      await this.storageProvider.save(image_name, 'cars');
      await this.carsImageRepository.create({
        car_id,
        image_name
      });
    });
  }
}
export { UploadCarsImageService };
