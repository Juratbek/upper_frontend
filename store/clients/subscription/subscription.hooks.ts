import { UseMutationResult, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from 'hooks';
import { apiClient, useMutation, useQuery } from 'store/config';

export const useSubscriptionStatus = (blogId: number): UseQueryResult<boolean> => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['subscription-status', blogId],
    queryFn: () => apiClient.get(`subscription/check-subscription/${blogId}`),
    enabled: isAuthenticated ?? false,
  });
};

export const useSubscribe = (blogId: number): UseMutationResult<unknown, unknown, void> => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, void>({
    mutationFn: () => apiClient.post({ path: `subscription/subscribe/${blogId}` }),
    mutationKey: ['subscribe', blogId],
    onSuccess: () => {
      queryClient.setQueryData(['subscription-status', blogId], true);
    },
  });
};

export const useUnsubscribe = (blogId: number): UseMutationResult => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.post({ path: `subscription/unsubscribe/${blogId}` }),
    mutationKey: ['unsubscribe', blogId],
    onSuccess: () => {
      queryClient.setQueryData(['subscription-status', blogId], false);
    },
  });
};
