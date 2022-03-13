import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarsSpecificationsService } from './CreateCarsSpecificationsService';

class CreateCarsSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarsSpecificationsService = container.resolve(
      CreateCarsSpecificationsService
    );

    const car = await createCarsSpecificationsService.execute({
      car_id: id,
      specifications_id
    });

    return response.status(201).json(car);
  }
}

export { CreateCarsSpecificationsController };
