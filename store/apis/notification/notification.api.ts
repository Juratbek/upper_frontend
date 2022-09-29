import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { INotification } from 'types';

import { baseQuery } from '../config';

export const notificationApi = createApi({
  reducerPath: 'notifications',
  baseQuery: baseQuery('notifications'),
  endpoints: (build) => ({
    getAll: build.query<INotification, void>({
      query: () => 'list',
    }),
  }),
});

export const { useGetAllQuery: useGetAllNotificationsQuery } = notificationApi;
