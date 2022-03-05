import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/controllers/Specifications/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
