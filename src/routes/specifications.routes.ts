import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/controllers/Specifications/CreateSpecificationController';
import { ListSpecificationsController } from '../modules/cars/controllers/Specifications/ListSpecificationsController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post('/', createSpecificationController.handle);

specificationsRoutes.get('/', listSpecificationsController.handle);

export { specificationsRoutes };
