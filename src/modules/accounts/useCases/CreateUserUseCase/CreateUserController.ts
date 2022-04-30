import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from './CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      password,
      email,
      driver_license
    });
    console.log(user);

    return response.status(201).json(user);
  }
}

export { CreateUserController };
