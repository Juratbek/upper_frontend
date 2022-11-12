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
    read: build.mutation<void, number>({
      query: (id) => ({
        url: `read/${id}`,
        method: 'POST',
      }),
    }),
    getBlogNotificationsCount: build.query<number, string>({
      query: (status) => `blog-notifications-count?status=${status}`,
    }),
  }),
});

export const {
  useLazyGetByTypeQuery: useLazyGetNotificationsByTypeQuery,
  useReadMutation: useReadNotificationMutation,
  useLazyGetBlogNotificationsCountQuery,
} = notificationApi;
