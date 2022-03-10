import { Router } from 'express';

import { AuthenticationController } from '../modules/accounts/useCases/AuthenticationUseCase/AuthenticationController';

const loginRoutes = Router();

const authenticationController = new AuthenticationController();

loginRoutes.post('/', authenticationController.handle);

export { loginRoutes };
