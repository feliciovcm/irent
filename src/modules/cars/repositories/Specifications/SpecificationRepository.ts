import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from './ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private Specifications: Specification[];

  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.Specifications = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    });

    this.Specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.Specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}

export { SpecificationRepository };
