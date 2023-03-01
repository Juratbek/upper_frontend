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
  let rangeTime = '';
  const currentDate: Date = new Date();
  const diffInSec: number = Math.floor((currentDate.getTime() - new Date(date).getTime()) / 1000);
  const diffInMin: number = Math.floor(diffInSec / 60);
  const diffInHour: number = Math.floor(diffInMin / 60);
  const diffInDay: number = Math.floor(diffInHour / 24);
  const diffInMon: number = Math.floor(diffInDay / 30);
  const diffInYear: number = Math.floor(diffInMon / 365);
  if (diffInYear >= 1) {
    rangeTime = `${diffInYear} yil oldin`;
  } else if (diffInMon >= 1) {
    rangeTime = `${diffInMon} oy oldin`;
  } else if (diffInDay >= 1) {
    rangeTime = `${diffInDay} kun avval`;
  } else if (diffInHour >= 1) {
    rangeTime = `${diffInHour} soat avval`;
  } else if (diffInMin >= 1) {
    rangeTime = `${diffInMin} minut avval`;
  } else {
    rangeTime = 'Hozirgina';
  }
  return rangeTime;
};
