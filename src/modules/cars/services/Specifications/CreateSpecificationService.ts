import { ISpecificationRepository } from '../../repositories/Specifications/ISpecificationRepository';

interface IRequestBody {
  name: string;
  description: string;
}

class CreateSpecificationService {
  private specificationRepository: ISpecificationRepository; // Outra maneira de declarar o this.specif....
  constructor(specificationRepository: ISpecificationRepository) {
    this.specificationRepository = specificationRepository;
  }
  execute({ name, description }: IRequestBody): void {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
