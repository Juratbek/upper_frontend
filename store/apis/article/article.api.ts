import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery } from '../config';
import { articleEndpoints } from './article.endpoints';

export const articleApi = createApi({
  reducerPath: 'article',
  baseQuery: baseQuery('articles'),
  endpoints: (build) => articleEndpoints(build),
});
