import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { INotification, IPagingResponse, TOptionalPagingRequest } from 'types';

import { baseQuery } from '../config';

export const notificationApi = createApi({
  reducerPath: 'notification',
  baseQuery: baseQuery('notification'),
  tagTypes: ['count'],
  endpoints: (build) => ({
    getByType: build.query<
      IPagingResponse<INotification>,
      TOptionalPagingRequest<{ type: string }>
    >({
      query: ({ type, page = 0 }) => `list?type=${type}&page=${page}`,
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
