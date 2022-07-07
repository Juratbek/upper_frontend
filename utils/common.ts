import { TClassName } from 'types';

export const getClassName = (...classNames: TClassName[]): string =>
  classNames.filter((className) => !!className).join(' ');

export const isClientSide = (): boolean => !!window;
