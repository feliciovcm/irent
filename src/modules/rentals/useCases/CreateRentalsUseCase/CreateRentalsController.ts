import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalsService } from './CreateRentalsService';

class CreateRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, expected_return_date } = request.body;
    const { id } = request.user;

    const createRentalService = container.resolve(CreateRentalsService);

    const rental = await createRentalService.execute({
      car_id,
      user_id: id,
      expected_return_date
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalsController };
