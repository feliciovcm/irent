import { container } from 'tsyringe';

import { DateProvider } from './DateProvider/DateProvider';
import { IDateProvider } from './DateProvider/IDateProvider';
import { EtherealMailProvider } from './MailProvider/EtherealMailProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { AWSS3StorageProvider } from './StorageProvider/AWSS3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './StorageProvider/LocalStorageProvider';

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
);

container.registerSingleton<IDateProvider>('DayjsDateProvider', DateProvider);

const diskStorage = {
  local: LocalStorageProvider,
  S3: AWSS3StorageProvider
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.DISK]
);
