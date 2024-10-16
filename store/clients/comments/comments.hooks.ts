import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { apiClient, useInfiniteQuery, useMutation, useQuery } from 'store/config';
import { IComment } from 'types';

export const useCommentsList = (articleId: number) =>
  useInfiniteQuery<IComment>({
    queryKey: ['comments-list', articleId],
    queryFn: (params) => {
      return apiClient.get(`comment/list/${articleId}`, {
        page: params.pageParam.toString(),
        size: '10',
      });
    },
  });

export const useCreateComment = (
  onSuccess: VoidFunction,
): UseMutationResult<unknown, unknown, { articleId: number; text: string }> => {
  return useMutation({
    mutationFn: (body) => apiClient.post({ path: 'comment/create', body }),
    onSuccess,
  });
};

export const useCommentsCount = (articleId: number): UseQueryResult<{ count: number }> =>
  useQuery({
    queryKey: ['comments-count', articleId],
    queryFn: () => apiClient.get(`comment/count/${articleId}`),
  });
