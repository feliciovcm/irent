import { SpecificationRepository } from '../../repositories/Specifications/SpecificationRepository';
import { CreateSpecificationService } from '../../services/Specifications/CreateSpecificationService';
import { CreateSpecificationController } from './CreateSpecificationController';

const specificationRepository = SpecificationRepository.getInstance();

const createSpecificationService = new CreateSpecificationService(
  specificationRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationService
);

export { createSpecificationController };
