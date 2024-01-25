import { UseMutationResult, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { apiClient, useInfiniteQuery, useMutation, useQuery } from 'store/config';
import { IComment } from 'types';

export const useCommentsList = (articleId: number) =>
  useInfiniteQuery<IComment>({
    queryKey: ['comments-list', articleId],
    queryFn: (params) => {
      return apiClient.get(`comment/open/${articleId}`, {
        page: params.pageParam.toString(),
      });
    },
  });

export const useCreateComment = (): UseMutationResult<
  IComment,
  unknown,
  { articleId: number; text: string }
> => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (body) => apiClient.post({ path: 'comment/create', body }),
    onSuccess: () => client.invalidateQueries({ queryKey: ['comments-list'] }),
  });
};

export const useCommentsCount = (articleId: number): UseQueryResult<number> =>
  useQuery({
    queryKey: ['comments-count', articleId],
    queryFn: () => apiClient.get(`comment/open/count/${articleId}`),
  });
