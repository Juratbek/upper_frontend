import { createApi } from '@reduxjs/toolkit/query/react';
import { INotification, IPagingResponse, TOptionalPagingRequest } from 'types';

import { baseQuery } from '../config';

export const notificationApi = createApi({
  reducerPath: 'notification',
  baseQuery: baseQuery('notification'),
  tagTypes: ['count', 'list'],
  endpoints: (build) => ({
    getByType: build.query<
      IPagingResponse<INotification>,
      TOptionalPagingRequest<{ type: string }>
    >({
      query: ({ type, page = 0 }) => `list?type=${type}&page=${page}`,
      providesTags: ['list'],
    }),
    read: build.mutation<void, number>({
      query: (id) => ({
        url: `read/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['count', 'list'],
    }),
    getBlogNotificationsCount: build.query<number, string>({
      query: (status) => `blog-notifications-count?status=${status}`,
      providesTags: ['count', 'list'],
    }),
    delete: build.mutation<void, number>({
      query: (id) => ({
        url: id.toString(),
        method: 'DELETE',
      }),
      invalidatesTags: ['count', 'list'],
    }),
  }),
});

export const {
  useLazyGetByTypeQuery: useLazyGetNotificationsByTypeQuery,
  useReadMutation: useReadNotificationMutation,
  useLazyGetBlogNotificationsCountQuery,
  useDeleteMutation: useDeleteNotificationMutation,
} = notificationApi;
