import { ApiErrorBoundary, Article, ArticleSkeleton } from 'components';
import { useInfiniteScroll } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLazyGetArticleSuggestionsQuery } from 'store/apis';
import { addUriToArticleImages } from 'utils';
import { ARTICLES_SKELETON_COUNT, SEARCH_PAGE_ARTICLE_ICONS } from 'variables';

import { HOME_TAB_IDS } from '../Home.constants';

export const ForYouTab: FC = () => {
  const {
    query: { tab },
  } = useRouter();
  const [fetchArticles, fetchArticlesRes, fetchNextArticlesPage] = useInfiniteScroll(
    useLazyGetArticleSuggestionsQuery,
    { removeDublicates: true, itemUniqueKey: 'id' },
  );
  const { list: articles, hasMore } = fetchArticlesRes;

  useEffect(() => {
    if (tab === HOME_TAB_IDS.forYou && articles.length === 0) fetchArticles();
  }, [tab]);

  return (
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
        next={fetchNextArticlesPage}
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
  );
};
