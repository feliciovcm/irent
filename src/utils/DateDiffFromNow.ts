import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function convertToUTC(date: Date): string {
  return dayjs(date).utc().local().format();
}

export function getHoursDiffFromNow(date: Date) {
  const now = dayjs().toDate();
  const formatedNow = convertToUTC(now);
  const formatedDate = convertToUTC(date);

  const compare = dayjs(formatedDate).diff(formatedNow, 'hours');

  return compare;
}

export function getDaysDiffFromNow(date: Date) {
  const now = dayjs().toDate();
  const formatedNow = convertToUTC(now);
  const formatedDate = convertToUTC(date);

  const compare = dayjs(formatedDate).diff(formatedNow, 'days');

  return compare;
}

export function addDays(days: number): Date {
  return dayjs().add(days, 'days').toDate();
}

export function addHours(hours: number): Date {
  return dayjs().add(hours, 'hour').toDate();
}
