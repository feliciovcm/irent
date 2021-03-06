import { container } from 'tsyringe';

import '../providers/index';

import { IUserRepository } from '../modules/accounts/repositories/Users/IUsersRepository';
import { UserRepository } from '../modules/accounts/repositories/Users/UserRepository';
import { IUsersTokensRepository } from '../modules/accounts/repositories/UsersTokens/IUsersTokensRepository';
import { UsersTokensRepository } from '../modules/accounts/repositories/UsersTokens/UsersTokensRepository';
import { CarsRepository } from '../modules/cars/repositories/Cars/CarsRepository';
import { ICarsRepository } from '../modules/cars/repositories/Cars/ICarsRepository';
import { CarsImageRepository } from '../modules/cars/repositories/CarsImage/CarsImageRepository';
import { ICarsImageRepository } from '../modules/cars/repositories/CarsImage/ICarsImageRepository';
import { CategoriesRepository } from '../modules/cars/repositories/Categories/CategoriesRepository';
import { ICategoryRepository } from '../modules/cars/repositories/Categories/ICategoriesRepository';
import { ISpecificationRepository } from '../modules/cars/repositories/Specifications/ISpecificationRepository';
import { SpecificationRepository } from '../modules/cars/repositories/Specifications/SpecificationRepository';
import { IRentalsRepository } from '../modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '../modules/rentals/repositories/RentalsRepository';

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

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImageRepository>(
  'CarsImageRepository',
  CarsImageRepository
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);
