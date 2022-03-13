import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from '../Specifications/ISpecificationRepository';

class SpecificationRepositoryMock implements ISpecificationRepository {
  specifications: Specification[] = [];
  async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
  async list(): Promise<Specification[]> {
    const allSpecifications = this.specifications;

    return allSpecifications;
  }

  async findByIds(specifications_ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) =>
      specifications_ids.includes(specification.id)
    );

    return specifications;
  }
}

export { SpecificationRepositoryMock };
