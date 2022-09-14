import { IOption } from 'components';
import { TClassName } from 'types';

export const getClassName = (...classNames: TClassName[]): string =>
  classNames.filter((className) => !!className).join(' ');

export const isClientSide = (): boolean => typeof window !== 'undefined';

export const get = <T>(
  obj: Record<string | symbol, any> | undefined | null,
  getters: string,
): T => {
  const fields = getters.split('.');
  return fields.reduce((res, field) => {
    return res ? res[field] : res;
  }, obj) as T;
};

export const convertToOptions = (arr: any[], valueKey: string, labelKey: string): IOption[] => {
  return arr.map((item) => ({ value: item[valueKey], label: item[labelKey] }));
};
