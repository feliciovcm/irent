import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCarsController } from '../modules/cars/useCases/CreateCarsUseCase/CreateCarsController';
import { ListAvailableCarsController } from '../modules/cars/useCases/ListAvailableCarsUseCase/ListAvailableCarsController';

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
