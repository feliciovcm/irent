import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalsController } from '../modules/rentals/useCases/CreateRentalsUseCase/CreateRentalsController';
import { DevolutionRentalController } from '../modules/rentals/useCases/DevolutionRentalUseCase/DevolutionRentalController';

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalsController.handle);

rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);
export { rentalsRoutes };
