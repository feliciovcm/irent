import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordService } from './ResetPasswordService';

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({ password, token: String(token) });

    return response.status(201).send();
  }
}

export { ResetPasswordController };
