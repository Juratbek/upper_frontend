import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery } from '../config';
import { ICreateLabelRequestDto } from './labelRequest.types';

export const labelRequestApi = createApi({
  reducerPath: 'label-request',
  baseQuery: baseQuery('label-request'),
  endpoints: (build) => ({
    create: build.mutation<void, ICreateLabelRequestDto>({
      query: (labelRequest) => ({
        url: 'create',
        body: labelRequest,
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreateMutation: useCreateLabelRequestMutation } = labelRequestApi;
