import { AppError } from '../../../../../errors/AppError';
import { CategoriesRepositoryMock } from '../../../repositories/mocks/CategoriesRepositoryMock';
import { CreateCategoryService } from '../CreateCategoryService';

let categoryRepositoryMocked: CategoriesRepositoryMock;
let createCategoryService: CreateCategoryService;

describe('Create Category', () => {
  beforeEach(() => {
    categoryRepositoryMocked = new CategoriesRepositoryMock();
    createCategoryService = new CreateCategoryService(categoryRepositoryMocked);
  });

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'SUV',
      description: 'Fake description SUV'
    };

    await createCategoryService.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = categoryRepositoryMocked.categories.some(
      (item) => item.name === category.name
    );

    expect(categoryCreated).toBeTruthy();
  });

  it('Should not be able to create a category that already exists', async () => {
    expect(async () => {
      const category = {
        name: 'SUV',
        description: 'Fake description SUV'
      };

      await createCategoryService.execute({
        name: category.name,
        description: category.description
      });

      await createCategoryService.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
