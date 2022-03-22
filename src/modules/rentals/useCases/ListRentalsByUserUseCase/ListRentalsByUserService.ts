import { inject, injectable } from 'tsyringe';

import { Rentals } from '../../entities/Rentals';
import { RentalsRepository } from '../../repositories/RentalsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalsByUserService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: RentalsRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<Rentals[]> {
    const rentalsByUser = await this.rentalsRepository.findByUserId(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserService };
