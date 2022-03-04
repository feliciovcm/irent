import { CategoriesRepository } from '../../repositories/Categories/CategoriesRepository';
import { CreateCategoryService } from '../../services/Categories/CreateCategoryService';
import { ImportCategoriesService } from '../../services/Categories/ImportCategoriesService';
import { ListCategoriesService } from '../../services/Categories/ListCategoriesService';
import { CreateCategoryController } from './CreateCategoryController';
import { ImportCategoriesController } from './ImportCategoriesController';
import { ListCategoriesController } from './ListCategoriesController';

// Repository instance
const categoriesRepository = CategoriesRepository.getInstance();

// Create categories instances
const createCategoryService = new CreateCategoryService(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryService
);

// List categories instances
const listCategoriesService = new ListCategoriesService(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesService
);

// import file categories
const importCategoriesService = new ImportCategoriesService(
  categoriesRepository
);
const importCategoriesController = new ImportCategoriesController(
  importCategoriesService
);

export {
  createCategoryController,
  listCategoriesController,
  importCategoriesController
};
