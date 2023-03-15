import { MONTHS } from './date.constants';
import { IDateUtilConfig } from './date.types';

export const toDateString = (date: Date | string | undefined, config?: IDateUtilConfig): string => {
  if (!date) {
    return '';
  }
  const d = typeof date === 'object' ? date : new Date(date);
  let localeDate = d.toLocaleDateString('ru');
  const monthConfig = config?.month;
  if (monthConfig) {
    const dateDetails = localeDate.split('.');
    const monthNumber = dateDetails[1];
    let month = MONTHS[monthNumber][monthConfig];
    monthConfig === 'short' && (month = month + '.');
    const year = dateDetails[2];
    const day = dateDetails[0].startsWith('0') ? dateDetails[0].slice(1) : dateDetails[0];
    localeDate = `${day}-${month} ${year}`;
  }
  return localeDate;
};

export const dateInterval = (date: Date | string | undefined): string => {
  if (!date) {
    return '';
  }
  const serverDate = typeof date === 'string' ? new Date(date) : date;
  const dateWithTimezone = new Date(serverDate.getTime() - serverDate.getTimezoneOffset() * 60000);
  // const dateWithTimezoneMilliseconds =
  //   serverDate.getTime() - serverDate.getTimezoneOffset() * 60000;
  const currentDate: Date = new Date();

  const diffInSec: number = Math.floor((currentDate.getTime() - dateWithTimezone.getTime()) / 1000);
  if (diffInSec < 60) {
    return 'Hozirgina';
  }

  const diffInMin: number = Math.floor(diffInSec / 60);
  if (diffInMin < 60) {
    return `${diffInMin} minut avval`;
  }

  const diffInHour: number = Math.floor(diffInMin / 60);
  if (diffInHour < 24) {
    return `${diffInHour} soat avval`;
  }

  const diffInDay: number = Math.floor(diffInHour / 24);
  if (diffInDay < 30) {
    return `${diffInDay} kun avval`;
  }

  const diffInMon: number = Math.floor(diffInDay / 30);
  if (diffInMon < 12) {
    return `${diffInMon} oy oldin`;
  }

  const diffInYear: number = Math.floor(diffInDay / 365);
  return `${diffInYear} yil oldin`;
};
