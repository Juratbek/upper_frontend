import { IConfig } from './useInfiniteScrollV2.types';

export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_CONFIG: IConfig = {
  size: DEFAULT_PAGE_SIZE,
  shouldBeInvalidated: false,
};
