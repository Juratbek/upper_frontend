import { ApiErrorBoundary, Article, ArticleSkeleton, Button, Divider } from 'components';
import { useAuth, useInfiniteScroll, useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  useLazyGetCurrentBlogLabelsQuery,
  useLazyGetPublishedArticlesByLabelQuery,
} from 'store/apis';
import { IArticleResult } from 'types';
import { addUriToArticleImages } from 'utils';
import { ARTICLES_SKELETON_COUNT, SEARCH_PAGE_ARTICLE_ICONS } from 'variables';

import { ForYouLabel, LABEL_ID_PARAM, TopLabel } from './Home.constants';
import classes from './Home.module.scss';

export const HomePage: FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { query, isReady } = useRouter();
  const { label } = query;
  const { setParam } = useUrlParams();
  const [fetchCurrentBlogLabels, fetchCurrentBlogLabelsRes] = useLazyGetCurrentBlogLabelsQuery();
  const [fetchArticles, fetchArticlesRes, fetchNextArticlesPage] =
    useInfiniteScroll<IArticleResult>(useLazyGetPublishedArticlesByLabelQuery, {
      removeDublicates: true,
      itemUniqueKey: 'id',
    });
  const { list: articles, hasMore } = fetchArticlesRes;

  const labelSelectHandler = (id: number | string): void => {
    setParam(LABEL_ID_PARAM, id);
    fetchArticles({ label: id }, { reset: true });
  };

  const fetchNextPage = (): Promise<void> => fetchNextArticlesPage({ label });

  useEffect(() => {
    isAuthenticated && fetchCurrentBlogLabels();
  }, [isAuthenticated]);

  useEffect(() => {
    if (isLoading || !isReady) return;
    if (label) {
      fetchArticles({ label });
      return;
    }

    if (isAuthenticated) {
      setParam(LABEL_ID_PARAM, ForYouLabel.id);
      fetchArticles({ label: ForYouLabel.id });
      return;
    }
    setParam(LABEL_ID_PARAM, TopLabel.id);
    fetchArticles({ label: TopLabel.id });
  }, [isAuthenticated, isLoading, isReady]);

  const labels = useMemo(() => {
    const labels: { id: number | string; name: string }[] = [TopLabel];

    if (isAuthenticated) labels.unshift(ForYouLabel);

    const { data, isSuccess } = fetchCurrentBlogLabelsRes;
    if (isSuccess) labels.push(...data);

    return labels;
  }, [isAuthenticated, fetchCurrentBlogLabelsRes]);

  return (
    <div className='container'>
      <h1 className='mb-1'>UPPER - Yanada yuqoriroq</h1>
      <Divider />
      <div className={classes['labels-container']}>
        {labels.map((label) => (
          <Button
            onClick={(): void => labelSelectHandler(label.id)}
            size='small'
            color={query.label === label.id.toString() ? 'dark' : 'outline-dark'}
            className='me-1'
            key={label.id}
          >
            {label.name}
          </Button>
        ))}
      </div>
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
            <Article
              className='p-2 px-xs-1 my-2'
              key={article.id}
              article={article}
              author={article.author}
              icons={SEARCH_PAGE_ARTICLE_ICONS}
            />
          ))}
        </InfiniteScroll>
      </ApiErrorBoundary>
    </div>
  );
};
