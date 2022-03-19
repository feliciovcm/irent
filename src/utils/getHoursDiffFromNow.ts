import dayjs from 'dayjs';

export function getHoursDiffFromNow(date: Date) {
  const now = new Date();
  const compare = dayjs(date).diff(now, 'hours');

  return compare;
}
