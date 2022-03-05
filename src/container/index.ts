import { container } from 'tsyringe';

import { CategoriesRepository } from '../modules/cars/repositories/Categories/CategoriesRepository';
import { ICategoryRepository } from '../modules/cars/repositories/Categories/ICategoriesRepository';
import { ISpecificationRepository } from '../modules/cars/repositories/Specifications/ISpecificationRepository';
import { SpecificationRepository } from '../modules/cars/repositories/Specifications/SpecificationRepository';

// criando um singleton que terá a nossa interface ICategoryRepository,
// sendo uma instancia da classe CategoriesRepository, com o nome similar.
container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);
