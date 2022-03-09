import { Router } from 'express';

import { loginRoutes } from './authenticates.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/account', usersRoutes);
router.use('/login', loginRoutes);
router.use('/cars', carsRoutes);

export { router };
