import { ICategoryRepository } from '../../repositories/Categories/ICategoriesRepository';

interface IRequestBody {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoryRepository) {}
  async execute({ name, description }: IRequestBody): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
