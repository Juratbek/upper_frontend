import { apiClient, IQeuryResult, TMutationHook, useMutation, useQuery } from 'store/config';
import { INotification, IPagingResponse } from 'types';

export const useNotificationsList = (page: string): IQeuryResult<IPagingResponse<INotification>> =>
  useQuery(['notifications-list'], () => apiClient.get(`notification/list?page=${page}`));

export const useResetNotificationsCount = (): IQeuryResult =>
  useQuery(['reset-notifications-count'], () =>
    apiClient.get('notification/reset-notifications-count'),
  );

export const useNotificationsCount = (): IQeuryResult<number> =>
  useQuery(['notifications-count'], () => apiClient.get<number>('notification/count'));

export const useDeleteNotification: TMutationHook<unknown, number> = () =>
  useMutation(['delete-notification'], (id) => apiClient.delete(`notification/${id}`));

export const useReadNotification: TMutationHook = () =>
  useMutation(['read-notification'], (id) => apiClient.post({ path: `notification/read/${id}` }));
