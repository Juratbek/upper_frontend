import { OutputBlockData } from '@editorjs/editorjs';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery } from '../config';

export const docsApi = createApi({
  reducerPath: 'docs',
  baseQuery: baseQuery('docs'),
  endpoints: (build) => ({
    getById: build.query<OutputBlockData[], string>({
      query: (id) => id,
    }),
  }),
});

export const { useLazyGetByIdQuery: useLazyGetDocByIdQuery } = docsApi;
