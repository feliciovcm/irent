import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenService } from './RefreshTokenService';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refresh_token = await refreshTokenService.execute({
      refresh_token: token
    });

    return response.status(201).json(refresh_token);
  }
}

export { RefreshTokenController };
