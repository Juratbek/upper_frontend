import { useAuth } from 'hooks';
import { apiClient, useMutation, useQuery } from 'store/config';

export const useNotificationsList = (page: string) =>
  useQuery({
    queryKey: ['notifications-list'],
    queryFn: () => apiClient.get(`notification/list?page=${page}`),
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
