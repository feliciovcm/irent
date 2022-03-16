import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarsImageService } from './UploadCarsImageService';

interface IFile {
  filename: string;
}

class UploadCarsImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];

    const uploadCarsImageService = container.resolve(UploadCarsImageService);

    const images_name = images.map((file) => file.filename);

    await uploadCarsImageService.execute({ car_id: id, images_name });

    return response.status(201).send();
  }
}

export { UploadCarsImageController };
