import { injectable, inject } from 'tsyringe';

import { Category } from '../../entities/Category';
import { ICategoryRepository } from '../../repositories/Categories/ICategoriesRepository';

@injectable()
class ListCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}
  async execute(): Promise<Category[]> {
    const allCategories = await this.categoriesRepository.list();

    return allCategories;
  }
}

export { ListCategoriesService };
