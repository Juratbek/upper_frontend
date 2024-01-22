import { UseMutationResult, UseQueryResult } from 'react-query';
import {
  apiClient,
  IInfiniteQueryConfig,
  IMutationResult,
  IPage,
  TInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
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
        tag: label,
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

export const useLikeCount = (articleId: number): UseQueryResult<number> =>
  useQuery(['like-count', articleId], () =>
    apiClient.get(`published-article/v2/open/like-count/${articleId}`),
  );

export const useSearch = (value: string): UseQueryResult<IPublishedArticleItem[]> =>
  useQuery(
    'search-published-article',
    () => apiClient.get('published-article/open/search', { search: value, limit: '5' }),
    {
      enabled: Boolean(value?.trim()),
    },
  );
