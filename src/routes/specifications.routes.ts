import { Request, Response, Router } from 'express';

import { createSpecificationController } from '../modules/cars/controllers/Specifications';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request: Request, response: Response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationsRoutes };
