import { Override } from 'utils';

export type TPagingRequest<T extends Record<string, unknown>> = Override<T, { page: number }>;

export type TOptionalPagingRequest<T = Record<string, unknown>> = Override<
  T,
  { page?: number; limit?: number }
>;
