import { Router } from 'express';

import { CreateCarsController } from '../modules/cars/controllers/Cars/CreateCarsController';

const carsRoutes = Router();

const createCarsController = new CreateCarsController();

carsRoutes.post('/', createCarsController.handle);

export { carsRoutes };
