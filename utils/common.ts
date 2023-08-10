import { IOption } from 'components';
import { ILabel, ITag, TClassName } from 'types';

export const getClassName = (...classNames: TClassName[]): string =>
  classNames.filter((className) => !!className).join(' ');

export const isClientSide = (): boolean => typeof window !== 'undefined';

export const extractInnerTexts = (node: Node): string => {
  const text = node.textContent || '';
  const childNodes = node.childNodes;
  if (!childNodes || !childNodes.length) return text;
  return Array.from(childNodes).reduce((res, childNode) => {
    return res + extractInnerTexts(childNode);
  }, '');
};

export const get = <T>(
  obj: Record<string | symbol, any> | undefined | null,
  getters: string,
): T => {
  const fields = getters.split('.');
  return fields.reduce((res, field) => {
    return res ? res[field] : res;
  }, obj) as T;
};

export const convertToOptions = (
  arr: any[] | undefined,
  valueKey: string,
  labelKey: string,
): IOption[] => {
  if (Array.isArray(arr)) {
    return arr.map((item) => ({ ...item, value: item[valueKey], label: item[labelKey] }));
  }
  return [];
};

export const convertOptionsToLabels = (options: IOption[]): ILabel[] =>
  options.map((option) => ({ id: +option.value, name: option.label }));

export const convertLabelsToOptions = (labels: ILabel[] = []): IOption[] =>
  convertToOptions(labels, 'id', 'name');

export const convertTagsToOptions = (tags: ITag[] = []): IOption[] =>
  convertToOptions(tags, 'id', 'name');

export const convertOptionsToTags = <T extends ITag>(options: IOption[]): T[] =>
  options.map((option) => ({ id: +option.value, name: option.label })) as T[];

export const validatePassword = (value: string): boolean =>
  /[A-ZА-Я]/.test(value) && /[a-zа-я]/.test(value) && /[0-9]/.test(value);

export const validateLogin = (value: string): boolean =>
  /^[A-Za-z][A-Za-z0-9_]*[A-Za-z]$/.test(value);

export const addAmazonBucketUri = <T extends { imgUrl: string }>(
  entity: T,
  bucketUrl: string,
): T => {
  const imgUrl = entity.imgUrl;
  if (!imgUrl || imgUrl.startsWith('http')) return entity;
  return {
    ...entity,
    imgUrl: `${bucketUrl}${imgUrl}`,
  };
};

export const log = (value: unknown): string => JSON.stringify(value, null, 2);
