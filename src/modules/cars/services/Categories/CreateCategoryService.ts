import { ICategoryRepository } from '../../repositories/Categories/ICategoriesRepository';

interface IRequestBody {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoryRepository) {}
  execute({ name, description }: IRequestBody): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
