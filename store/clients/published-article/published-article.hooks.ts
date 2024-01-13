import { UseMutationResult } from 'react-query';
import {
  apiClient,
  IInfiniteQueryConfig,
  IMutationResult,
  IPage,
  TInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
} from 'store/config';
import { IPublishedArticleItem } from 'types';

export const usePublishedArticlesList = (
  label: string,
  config?: IInfiniteQueryConfig,
): TInfiniteQueryResult<IPublishedArticleItem> => {
  return useInfiniteQuery<IPublishedArticleItem>(
    ['published-articles', label],
    (params) =>
      apiClient.get('published-article/open/get-by-label', {
        page: params.pageParam ?? 0,
        label,
      }),
    {
      getNextPageParam: (lastPage: IPage) => (lastPage.hasMore ? ++lastPage.page : undefined),
      ...config,
    },
  );
};

export const useIncrementViewCount = (): IMutationResult<void, { id: number; token: string }> =>
  useMutation('increment-view-count', ({ id, token }) =>
    apiClient.post({ path: `published-article/v2/open/has-updates/${id}`, body: token }),
  );

export const useLike = (articleId: number): UseMutationResult =>
  useMutation(['like-article', articleId], () =>
    apiClient.post({ path: `published-article/v2/like/${articleId}` }),
  );

export const useDislike = (articleId: number): UseMutationResult =>
  useMutation(['like-article', articleId], () =>
    apiClient.post({ path: `published-article/v2/dislike/${articleId}` }),
  );
