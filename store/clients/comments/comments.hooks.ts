import { UseMutationResult, useQueryClient } from 'react-query';
import {
  apiClient,
  IPage,
  TInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
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

  return useMutation('create-comment', (body) => apiClient.post({ path: 'comment/create', body }), {
    onSuccess: () => client.invalidateQueries('comments-list'),
  });
};