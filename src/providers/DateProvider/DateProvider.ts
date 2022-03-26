import dayjs from 'dayjs';

import { IDateProvider } from './IDateProvider';

class DateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}
export { DateProvider };
