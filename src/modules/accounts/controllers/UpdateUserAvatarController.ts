import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatar_path = request.file.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    updateUserAvatarService.execute({ user_id: id, avatar_path });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
