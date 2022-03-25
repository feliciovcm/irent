import { Router } from 'express';

import { AuthenticationController } from '../modules/accounts/useCases/AuthenticationUseCase/AuthenticationController';
import { RefreshTokenController } from '../modules/accounts/useCases/RefreshTokenUseCase/RefreshTokenController';

const loginRoutes = Router();

const authenticationController = new AuthenticationController();
const refreshTokenController = new RefreshTokenController();

loginRoutes.post('/', authenticationController.handle);
loginRoutes.post('/refresh-token', refreshTokenController.handle);

export { loginRoutes };
