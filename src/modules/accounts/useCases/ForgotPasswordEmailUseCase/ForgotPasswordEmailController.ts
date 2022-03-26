import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ForgotPasswordEmailService } from './ForgotPasswordEmailService';

class ForgotPasswordEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordEmailService = container.resolve(
      ForgotPasswordEmailService
    );

    await forgotPasswordEmailService.execute(email);

    return response.send();
  }
}

export { ForgotPasswordEmailController };
