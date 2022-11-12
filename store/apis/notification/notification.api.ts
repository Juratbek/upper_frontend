import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { INotification } from 'types';

import { baseQuery } from '../config';

export const notificationApi = createApi({
  reducerPath: 'notification',
  baseQuery: baseQuery('notification'),
  tagTypes: ['count'],
  endpoints: (build) => ({
    getByType: build.query<INotification[], string>({
      query: (type) => `list/${type}`,
    }),
    read: build.mutation<void, number>({
      query: (id) => ({
        url: `read/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['count'],
    }),
    getBlogNotificationsCount: build.query<number, string>({
      query: (status) => `blog-notifications-count?status=${status}`,
      providesTags: ['count'],
    }),
  }),
});

export const {
  useLazyGetByTypeQuery: useLazyGetNotificationsByTypeQuery,
  useReadMutation: useReadNotificationMutation,
  useLazyGetBlogNotificationsCountQuery,
} = notificationApi;
