import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'store/api/api';

import { blogEndpoints } from './blog.endpoints';

export const blogApi = createApi({
  reducerPath: 'blog',
  baseQuery: baseQuery('blogs'),
  endpoints: (build) => blogEndpoints(build),
});
