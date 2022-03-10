import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarsService } from './CreateCarsService';

class CreateCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    } = request.body;

    const createCarsService = container.resolve(CreateCarsService);

    const car = await createCarsService.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    });

    return response.status(201).json(car);
  }
}

export { CreateCarsController };
