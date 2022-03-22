import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import {
  getDaysDiffFromNow,
  getHoursDiffFromNow
} from '../../../../utils/DateDiffFromNow';
import { ICarsRepository } from '../../../cars/repositories/Cars/ICarsRepository';
import { Rentals } from '../../entities/Rentals';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rentals> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;

    if (!rental) {
      throw new AppError('Rental does not exist');
    }

    // check return date lower than 24hr, bill 1 whole day

    let daily = getDaysDiffFromNow(rental.start_date);

    if (daily <= 0) {
      daily = minimum_daily;
    }

    // delay logic
    let delay = 0;

    const delayInDays = getDaysDiffFromNow(rental.expected_return_date);

    if (delayInDays > 0) {
      delay = delayInDays;
    } else {
      const delayInHours = getHoursDiffFromNow(rental.expected_return_date);
      if (delayInHours > 0 && delayInHours <= 24) {
        delay = 1;
      }
      delay = 0;
    }
    const total = delay * car.fine_amount + daily * car.daily_rate;

    rental.end_date = new Date();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailability(car.id, true);

    return rental;
  }
}
export { DevolutionRentalService };
