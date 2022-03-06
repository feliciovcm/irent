import { Category } from '../../entities/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO
} from '../Categories/ICategoriesRepository';

class CategoriesRepositoryMock implements ICategoryRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    const allCategories = this.categories;
    return allCategories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepositoryMock };
