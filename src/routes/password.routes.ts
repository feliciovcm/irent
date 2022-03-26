import { Router } from 'express';

import { ForgotPasswordEmailController } from '../modules/accounts/useCases/ForgotPasswordEmailUseCase/ForgotPasswordEmailController';
import { ResetPasswordController } from '../modules/accounts/useCases/ResetPasswordUseCase/ResetPasswordController';

const passwordRoutes = Router();

const forgotPasswordEmailController = new ForgotPasswordEmailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', forgotPasswordEmailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
