import { Router } from 'express';

import { AuthenticationController } from '../modules/accounts/controllers/AuthenticationController';

const loginRoutes = Router();

const authenticationController = new AuthenticationController();

loginRoutes.post('/', authenticationController.handle);

export { loginRoutes };
