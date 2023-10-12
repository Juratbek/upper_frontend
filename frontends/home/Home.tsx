import { ApiErrorBoundary, Article, ArticleSkeleton } from 'components';
import { Divider } from 'components/lib';
import { useAuth, useInfiniteScroll, useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLazyGetPublishedArticlesByLabelQuery } from 'store/apis';
import { IArticleResult } from 'types';
import { addUriToArticleImages } from 'utils';
import { ARTICLES_SKELETON_COUNT } from 'variables';

import { Labels } from './components';
import { ForYouLabel, LABEL_ID_PARAM, TopLabel } from './Home.constants';

export const HomePage: FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { query, isReady } = useRouter();
  const { label } = query;
  const { setParam } = useUrlParams();
  const [fetchArticles, fetchArticlesRes, fetchNextArticlesPage] =
    useInfiniteScroll<IArticleResult>(useLazyGetPublishedArticlesByLabelQuery, {
      removeDublicates: true,
      itemUniqueKey: 'id',
    });
  const { list: articles, hasMore } = fetchArticlesRes;

  const fetchNextPage = (): Promise<void> => fetchNextArticlesPage({ label });

  useEffect(() => {
    fetchArticles({ label, page: 0 }, { reset: true });
  }, [label]);

  useEffect(() => {
    if (isLoading || !isReady) return;
    if (label) {
      fetchArticles({ label, page: 0 });
      return;
    }

    if (isAuthenticated) {
      setParam(LABEL_ID_PARAM, ForYouLabel.id);
      fetchArticles({ label: ForYouLabel.id, page: 0 });
      return;
    }
    setParam(LABEL_ID_PARAM, TopLabel.id);
    fetchArticles({ label: TopLabel.id, page: 0 });
  }, [isAuthenticated, isLoading, isReady]);

  return (
    <>
      <Labels />
      <ApiErrorBoundary
        fallback={<ArticleSkeleton className='p-2' />}
        fallbackItemCount={ARTICLES_SKELETON_COUNT}
        res={fetchArticlesRes}
        className='tab'
      >
        <InfiniteScroll
          hasMore={hasMore}
          loader={<ArticleSkeleton className='p-2' />}
          dataLength={articles.length}
          next={fetchNextPage}
          scrollableTarget='main'
        >
          {articles.length === 0 && <h3 className='text-center'>Maqolalar mavjud emas</h3>}
          {addUriToArticleImages(articles).map((article) => (
            <Fragment key={article.id}>
              <Divider color='secondary' />
              <Article article={article} author={article.author} />
            </Fragment>
          ))}
        </InfiniteScroll>
      </ApiErrorBoundary>
    </>
  );
};
