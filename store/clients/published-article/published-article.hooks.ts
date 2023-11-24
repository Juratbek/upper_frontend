import {
  apiClient,
  IInfiniteQueryConfig,
  IInfiniteQueryResult,
  IMutationResult,
  IPage,
  useInfiniteQuery,
  useMutation,
} from 'store/config';
import { IPublishedArticleItem } from 'types';

export const usePublishedArticlesList = (
  label: string,
  config?: IInfiniteQueryConfig,
): IInfiniteQueryResult<IPublishedArticleItem> => {
  return useInfiniteQuery(
    ['published-articles', label],
    (params) =>
      apiClient.get<IPage>('published-article/open/get-by-label', {
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
