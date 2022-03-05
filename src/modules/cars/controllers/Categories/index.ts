import { CategoriesRepository } from '../../repositories/Categories/CategoriesRepository';
import { CreateCategoryService } from '../../services/Categories/CreateCategoryService';
import { ImportCategoriesService } from '../../services/Categories/ImportCategoriesService';
import { ListCategoriesService } from '../../services/Categories/ListCategoriesService';
import { CreateCategoryController } from './CreateCategoryController';
import { ImportCategoriesController } from './ImportCategoriesController';
import { ListCategoriesController } from './ListCategoriesController';

// Repository instance
function createCategoryController(): CreateCategoryController {
  const categoriesRepository = new CategoriesRepository();
  // Create categories instances
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  const createCategoryController = new CreateCategoryController(
    createCategoryService
  );

  return createCategoryController;
}

function listCategoriesController(): ListCategoriesController {
  const categoriesRepository = new CategoriesRepository();

  // List categories instances
  const listCategoriesService = new ListCategoriesService(categoriesRepository);
  const listCategoriesController = new ListCategoriesController(
    listCategoriesService
  );

  return listCategoriesController;
}

function importCategoriesController(): ImportCategoriesController {
  const categoriesRepository = new CategoriesRepository();

  // import file categories
  const importCategoriesService = new ImportCategoriesService(
    categoriesRepository
  );
  const importCategoriesController = new ImportCategoriesController(
    importCategoriesService
  );
  return importCategoriesController;
}

export default {
  importCategoriesController,
  createCategoryController,
  listCategoriesController
};
