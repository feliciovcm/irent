import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalsController } from '../modules/rentals/useCases/CreateRentalsUseCase/CreateRentalsController';
import { DevolutionRentalController } from '../modules/rentals/useCases/DevolutionRentalUseCase/DevolutionRentalController';
import { ListRentalsByUserController } from '../modules/rentals/useCases/ListRentalsByUserUseCase/ListRentalsByUserController';

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalsController.handle);

rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);

rentalsRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
