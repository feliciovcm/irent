import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCarsSpecificationsController } from '../modules/cars/useCases/createCarsSpecifications/CreateCarsSpecificationsController';
import { CreateCarsController } from '../modules/cars/useCases/CreateCarsUseCase/CreateCarsController';
import { ListAvailableCarsController } from '../modules/cars/useCases/ListAvailableCarsUseCase/ListAvailableCarsController';
import { UploadCarsImageController } from '../modules/cars/useCases/UploadCarsImageUseCase/UploadCarsImageController';

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsSpecificationsController =
  new CreateCarsSpecificationsController();

const uploadCarsImageController = new UploadCarsImageController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarsSpecificationsController.handle
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarsImageController.handle
);

export { carsRoutes };
