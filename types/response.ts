import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface IResponseError {
  status: number;
  data: {
    code: number;
    message: string;
    httpStatus: string;
  };
}

export type TRtkError = FetchBaseQueryError | SerializedError | undefined;
