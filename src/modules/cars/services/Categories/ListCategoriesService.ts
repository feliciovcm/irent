import { Category } from '../../entities/Category';
import { ICategoryRepository } from '../../repositories/Categories/ICategoriesRepository';

class ListCategoriesService {
  constructor(private categoriesRepository: ICategoryRepository) {}
  async execute(): Promise<Category[]> {
    const allCategories = await this.categoriesRepository.list();

    return allCategories;
  }
}

export { ListCategoriesService };
