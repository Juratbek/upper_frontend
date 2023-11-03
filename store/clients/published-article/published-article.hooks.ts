import {
  apiClient,
  IInfiniteQueryConfig,
  IInfiniteQueryResult,
  IPage,
  useInfiniteQuery,
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
