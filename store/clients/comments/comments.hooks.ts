import { UseMutationResult, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import {
  apiClient,
  IPage,
  TInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from 'store/config';
import { IComment } from 'types';

export const useCommentsList = (articleId: number): TInfiniteQueryResult<IComment> =>
  useInfiniteQuery<IComment>(
    'comments-list',
    (params) =>
      apiClient.get(`comment/open/${articleId}`, {
        page: params.pageParam ?? 0,
      }),
    {
      getNextPageParam: (lastPage: IPage) => (lastPage.hasMore ? ++lastPage.page : undefined),
    },
  );

export const useCreateComment = (): UseMutationResult<
  IComment,
  unknown,
  { articleId: number; text: string }
> => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (body) => apiClient.post({ path: 'comment/create', body }),
    onSuccess: () => client.invalidateQueries('comments-list'),
  });
};

export const useCommentsCount = (articleId: number): UseQueryResult<number> =>
  useQuery({
    queryKey: ['comments-count', articleId],
    queryFn: () => apiClient.get(`comment/open/count/${articleId}`),
  });
