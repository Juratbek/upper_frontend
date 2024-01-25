import { useAuth } from 'hooks';
import { apiClient, useInfiniteQuery, useMutation, useQuery } from 'store/config';
import { INotification } from 'types';

export const useNotificationsList = () =>
  useInfiniteQuery<INotification>({
    queryKey: ['notifications-list'],
    queryFn: ({ pageParam }) => apiClient.get(`notification/list?page=${pageParam}`),
  });

export const useResetNotificationsCount = () =>
  useQuery({
    queryKey: ['reset-notifications-count'],
    queryFn: () => apiClient.get('notification/reset-notifications-count'),
  });

export const useNotificationsCount = () => {
  const { isAuthenticated } = useAuth();
  return useQuery<number>({
    queryKey: ['notifications-count'],
    queryFn: () => apiClient.get<number>('notification/blog-notifications-count'),
    enabled: isAuthenticated ?? false,
  });
};

export const useDeleteNotification = () =>
  useMutation<unknown, number>({
    mutationFn: (id) => apiClient.delete(`notification/${id}`),
    mutationKey: ['delete-notification'],
  });

export const useReadNotification = () =>
  useMutation({
    mutationKey: ['read-notification'],
    mutationFn: (id) => apiClient.post({ path: `notification/read/${id}` }),
  });
