import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticationService } from './AutheticationService';

class AuthenticationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;
    console.log(request.body);

    const authenticationService = container.resolve(AuthenticationService);

    const session = await authenticationService.execute({
      email,
      password
    });

    return response.json(session);
  }
}

export { AuthenticationController };
