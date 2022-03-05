import { Request, Response } from 'express';

import { ListCategoriesService } from '../../services/Categories/ListCategoriesService';

class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const allCategories = await this.listCategoriesService.execute();

    return response.json(allCategories);
  }
}

export { ListCategoriesController };
