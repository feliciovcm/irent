import { Request, Response } from 'express';

import { ImportCategoriesService } from '../../services/Categories/ImportCategoriesService';

class ImportCategoriesController {
  constructor(private importCategoriesService: ImportCategoriesService) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    await this.importCategoriesService.execute(file);

    return response.send();
  }
}

export { ImportCategoriesController };
