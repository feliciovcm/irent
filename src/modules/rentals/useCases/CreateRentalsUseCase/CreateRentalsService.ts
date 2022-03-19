import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { getHoursDiffFromNow } from '../../../../utils/getHoursDiffFromNow';
import { Rentals } from '../../entities/Rentals';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalsService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    car_id,
    expected_return_date,
    user_id
  }: IRequest): Promise<Rentals> {
    // - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    // - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário

    const openRentalByUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (openRentalByUser) {
      throw new AppError('User already has an open rental');
    }

    // - O aluguel deve ter duração mínima de 24 horas.

    const compare = getHoursDiffFromNow(expected_return_date);
    const minimumHour = 24;

    if (compare < minimumHour) {
      throw new AppError('Rental must be at least 24hours');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id
    });

    return rental;
  }
}

export { CreateRentalsService };
