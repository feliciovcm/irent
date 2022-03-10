import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/CreateSpecificationsUsecase/CreateSpecificationController';
import { ListSpecificationsController } from '../modules/cars/useCases/ListSpecificationsUseCase/ListSpecificationsController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.get('/', listSpecificationsController.handle);

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post(
  '/',
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
