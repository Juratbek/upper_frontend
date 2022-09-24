import { IOption } from 'components';
import { ILabel, TClassName } from 'types';

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

export const convertToOptions = (arr: any[], valueKey: string, labelKey: string): IOption[] =>
  arr.map((item) => ({ value: item[valueKey], label: item[labelKey] }));

export const convertOptionsToLabels = (options: IOption[]): ILabel[] =>
  options.map((option) => ({ id: +option.value, name: option.label }));

export const convertLabelsToOptions = (labels: ILabel[] = []): IOption[] =>
  convertToOptions(labels, 'id', 'name');
