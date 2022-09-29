import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { INotification } from 'types';

import { baseQuery } from '../config';

export const notificationApi = createApi({
  reducerPath: 'notification',
  baseQuery: baseQuery('notification'),
  endpoints: (build) => ({
    getByType: build.query<INotification[], string>({
      query: (type) => `list/${type}`,
    }),
  }),
});

export const { useLazyGetByTypeQuery: useLazyGetNotificationsByTypeQuery } = notificationApi;
