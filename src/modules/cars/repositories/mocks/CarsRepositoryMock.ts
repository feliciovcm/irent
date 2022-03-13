import { ICreateCarsDTO } from '../../dtos/ICreateCarsDTO';
import { Cars } from '../../entities/Cars';
import { ICarsRepository } from '../Cars/ICarsRepository';

class CarsRepositoryMock implements ICarsRepository {
  cars: Cars[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id
  }: ICreateCarsDTO): Promise<Cars> {
    if (id) {
      const car = this.cars.find((car) => car.id === id);
      car.specifications = specifications;
      return car;
    }
    const car = new Cars();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications
    });

    this.cars.push(car);
    return car;
  }

  async findCarByLicensePlate(license_plate: string): Promise<Cars> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findAvailableCars(
    name?: string,
    category_id?: string,
    brand?: string
  ): Promise<Cars[]> {
    if (!name && !category_id && !brand) {
      const cars = this.cars.filter((car) => car.available === true);
      return cars;
    }

    const cars = this.cars.filter((car) => {
      if (
        car.available &&
        ((name && car.name === name) ||
          (category_id && car.category_id === category_id) ||
          (brand && car.brand === brand))
      ) {
        return car;
      }
      return null;
    });

    return cars;
  }

  async findById(car_id: string): Promise<Cars> {
    const car = this.cars.find((car) => car.id === car_id);

    return car;
  }
}

export { CarsRepositoryMock };
