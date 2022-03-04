import { Category } from '../../model/Category';
import { ICategoryRepository } from '../../repositories/Categories/ICategoriesRepository';

class ListCategoriesService {
  constructor(private categoriesRepository: ICategoryRepository) {}
  execute(): Category[] {
    const allCategories = this.categoriesRepository.list();

    return allCategories;
  }
}

export { ListCategoriesService };
