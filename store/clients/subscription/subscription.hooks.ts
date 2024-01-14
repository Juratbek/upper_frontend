import { useAuth } from 'hooks';
import { UseMutationResult, useQueryClient, UseQueryResult } from 'react-query';
import { apiClient, useMutation, useQuery } from 'store/config';

export const useSubscriptionStatus = (blogId: number): UseQueryResult<boolean> => {
  const { isAuthenticated } = useAuth();

  return useQuery(
    ['subscription-status', blogId],
    () => apiClient.get(`subscription/check-subscription/${blogId}`),
    { enabled: isAuthenticated ?? false },
  );
};

export const useSubscribe = (blogId: number): UseMutationResult => {
  const queryClient = useQueryClient();

  return useMutation(
    ['subscribe', blogId],
    () => apiClient.post({ path: `subscription/subscribe/${blogId}` }),
    {
      onSuccess: () => {
        queryClient.setQueryData(['subscription-status', blogId], true);
      },
    },
  );
};

export const useUnsubscribe = (blogId: number): UseMutationResult => {
  const queryClient = useQueryClient();

  return useMutation(
    ['unsubscribe', blogId],
    () => apiClient.post({ path: `subscription/unsubscribe/${blogId}` }),
    {
      onSuccess: () => {
        queryClient.setQueryData(['subscription-status', blogId], false);
      },
    },
  );
};
