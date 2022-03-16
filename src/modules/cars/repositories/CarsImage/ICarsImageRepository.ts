import { ICreateCarsImageDTO } from '../../dtos/ICreateCarsImageDTO';
import { CarsImage } from '../../entities/CarsImage';

interface ICarsImageRepository {
  create({ car_id, image_name }: ICreateCarsImageDTO): Promise<CarsImage>;
}

export { ICarsImageRepository };
