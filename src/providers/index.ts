import { container } from 'tsyringe';

import { DateProvider } from './DateProvider/DateProvider';
import { IDateProvider } from './DateProvider/IDateProvider';
import { EtherealMailProvider } from './MailProvider/EtherealMailProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { SESMailProvider } from './MailProvider/SESMailProvider';
import { AWSS3StorageProvider } from './StorageProvider/AWSS3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './StorageProvider/LocalStorageProvider';

const diskStorage = {
  local: LocalStorageProvider,
  S3: AWSS3StorageProvider
};

const mailProvider = {
  local: container.resolve(EtherealMailProvider),
  S3: container.resolve(SESMailProvider)
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.DISK]
);

container.registerSingleton<IDateProvider>('DayjsDateProvider', DateProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.DISK]
);
