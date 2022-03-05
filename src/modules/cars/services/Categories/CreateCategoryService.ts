import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/Categories/ICategoriesRepository';

interface IRequestBody {
  name: string;
  description: string;
}

// Dizendo que essa classe de service é injetávevl
@injectable()
class CreateCategoryService {
  constructor(
    // Injetando a classe, com esse nome declarada no nosso container
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}
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
