import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface IResponseError<T = unknown> {
  status: number;
  data: {
    code: number;
    message: string;
    data?: T;
    httpStatus: string;
  };
}

export type TRtkError = FetchBaseQueryError | SerializedError | undefined;

export interface IPagingResponse<T> {
  list: T[];
  totalItemCount: number;
  totalPages?: number;
}
