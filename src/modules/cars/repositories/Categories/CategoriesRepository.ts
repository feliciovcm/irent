import { Category } from '../../model/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    // Fazer um singleton para retornar sempre a mesma instancia
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    // é possível usar classe somente para tipar, sem instanciar
    //  const category: Category = {
    //   name,
    //   description,
    //   created_at: new Date()
    //  };

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
