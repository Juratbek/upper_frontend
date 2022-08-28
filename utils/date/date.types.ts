export interface IDateUtilConfig {
  month?: 'long' | 'short';
}

export interface IMonths {
  [monthNumber: string]: {
    long: string;
    short: string;
  };
}
