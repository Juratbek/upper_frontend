import { MONTHS } from './date.constants';
import { IDateUtilConfig } from './date.types';

export const toDateString = (date: Date | string, config?: IDateUtilConfig): string => {
  if (!date) {
    return '';
  }
  const d = typeof date === 'object' ? date : new Date(date);
  let localeDate = d.toLocaleDateString('ru');
  const monthConfig = config?.month;
  if (monthConfig) {
    const dateDetails = localeDate.split('.');
    const monthNumber = dateDetails[1];
    const month = MONTHS[monthNumber][monthConfig];
    const year = dateDetails[2];
    const day = dateDetails[0].startsWith('0') ? dateDetails[0].slice(1) : dateDetails[0];
    localeDate = `${day}-${month} ${year}-yil`;
  }
  return localeDate;
};
