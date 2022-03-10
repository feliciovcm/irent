import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ISpecificationRepository } from '../../repositories/Specifications/ISpecificationRepository';

interface IRequestBody {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationService {
  private specificationRepository: ISpecificationRepository; // Outra maneira de declarar o this.specif....
  constructor(
    @inject('SpecificationRepository')
    specificationRepository: ISpecificationRepository
  ) {
    this.specificationRepository = specificationRepository;
  }
  async execute({ name, description }: IRequestBody): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists', 400);
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
