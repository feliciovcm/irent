import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryService } from '../../services/Categories/CreateCategoryService';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    // injeção da instancia do service
    const createCategoryService = container.resolve(CreateCategoryService);

    await createCategoryService.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
