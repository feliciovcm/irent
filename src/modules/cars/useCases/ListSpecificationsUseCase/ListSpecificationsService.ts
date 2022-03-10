import { inject, injectable } from 'tsyringe';

import { Specification } from '../../entities/Specification';
import { ISpecificationRepository } from '../../repositories/Specifications/ISpecificationRepository';

@injectable()
class ListSpecificationsService {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute(): Promise<Specification[]> {
    const allSpecifications = await this.specificationRepository.list();

    return allSpecifications;
  }
}

export { ListSpecificationsService };
