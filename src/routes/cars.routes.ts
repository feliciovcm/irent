import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCarsSpecificationsController } from '../modules/cars/useCases/createCarsSpecifications/CreateCarsSpecificationsController';
import { CreateCarsController } from '../modules/cars/useCases/CreateCarsUseCase/CreateCarsController';
import { ListAvailableCarsController } from '../modules/cars/useCases/ListAvailableCarsUseCase/ListAvailableCarsController';

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsSpecificationsController =
  new CreateCarsSpecificationsController();

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

export { carsRoutes };
