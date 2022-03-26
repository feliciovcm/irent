import { container } from 'tsyringe';

import { DateProvider } from './DateProvider/DateProvider';
import { IDateProvider } from './DateProvider/IDateProvider';
import { EtherealMailProvider } from './MailProvider/EtherealMailProvider';
import { IMailProvider } from './MailProvider/IMailProvider';

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
);

container.registerSingleton<IDateProvider>('DayjsDateProvider', DateProvider);
