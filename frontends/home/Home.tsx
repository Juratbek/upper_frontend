import { ApiErrorBoundary, Article, ArticleSkeleton, Button } from 'components';
import { SEARCH_PAGE_ARTICLE_ICONS } from 'frontends/search';
import { useAuth, useInfiniteScroll, useTheme, useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  useLazyGetCurrentBlogLabelsQuery,
  useLazyGetPublishedArticlesByLabelQuery,
} from 'store/apis';
import { IArticleResult } from 'types';
import { addUriToArticleImages } from 'utils';
import { ARTICLES_SKELETON_COUNT } from 'variables';

import { FOR_YOU, LABEL_ID_PARAM, TOP } from './Home.constants';
import classes from './Home.module.scss';

export const HomePage: FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();
  const { query, isReady } = useRouter();
  const { tag } = query;
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
    fetchArticles({ tag: id, page: 0 }, { reset: true });
  };

  const fetchNextPage = (): Promise<void> => fetchNextArticlesPage({ tag });

  useEffect(() => {
    isAuthenticated && fetchCurrentBlogLabels();
  }, [isAuthenticated]);

  useEffect(() => {
    if (isLoading || !isReady) return;
    if (tag) {
      fetchArticles({ tag, page: 0 });
      return;
    }

    if (isAuthenticated) {
      setParam(LABEL_ID_PARAM, FOR_YOU);
      fetchArticles({ tag: FOR_YOU, page: 0 });
      return;
    }
    setParam(LABEL_ID_PARAM, TOP);
    fetchArticles({ tag: TOP, page: 0 });
  }, [isAuthenticated, isLoading, isReady]);

  const labels = useMemo(() => {
    const labels: string[] = [TOP];

    if (isAuthenticated) labels.unshift(FOR_YOU);

    const { data, isSuccess } = fetchCurrentBlogLabelsRes;
    if (isSuccess) labels.push(...data);

    return labels;
  }, [isAuthenticated, fetchCurrentBlogLabelsRes]);

  return (
    <div className='container'>
      <h1 className='mb-1'>UPPER - Yanada yuqoriroq</h1>
      <div className='my-2' />
      <div className={`${classes['labels-container']} ${classes[theme]}`}>
        {labels.map((label) => (
          <Button
            onClick={(): void => labelSelectHandler(label)}
            size='small'
            color={query.tag === label ? 'dark' : 'outline-dark'}
            className={classes['label-buttons']}
            key={label}
          >
            {label}
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
