interface IDateProvider {
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  dateNow(): Date;
}

export { IDateProvider };
