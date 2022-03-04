import { Router, Request, Response } from 'express';
import multer from 'multer';

import {
  createCategoryController,
  importCategoriesController,
  listCategoriesController
} from '../modules/cars/controllers/Categories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp'
});

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  (request: Request, response: Response) => {
    return importCategoriesController.handle(request, response);
  }
);

export { categoriesRoutes };
