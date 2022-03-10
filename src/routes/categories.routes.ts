import { Router } from 'express';
import multer from 'multer';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCategoryController } from '../modules/cars/useCases/CreateCategoriesUseCase/CreateCategoryController';
import { ImportCategoriesController } from '../modules/cars/useCases/ImportCategoriesUseCase/ImportCategoriesController';
import { ListCategoriesController } from '../modules/cars/useCases/ListCategoriesUseCase/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp'
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle
);

export { categoriesRoutes };
