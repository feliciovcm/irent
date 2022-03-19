import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalsController } from '../modules/rentals/useCases/CreateRentalsUseCase/CreateRentalsController';

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalsController.handle);

export { rentalsRoutes };
