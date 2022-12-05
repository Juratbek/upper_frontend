import { ApiErrorBoundary, Article, ArticleSkeleton } from 'components';
import { useInfiniteScroll } from 'hooks';
import { FC, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLazyGetArticleSuggestionsQuery } from 'store/apis';
import { addUriToArticleImages } from 'utils';
import {
  ARTICLES_SKELETON_COUNT,
  SEARCH_PAGE_ARTICLE_ACTIONS,
  SEARCH_PAGE_ARTICLE_ICONS,
} from 'variables';

export const ForYouTab: FC = () => {
  const [fetchArticles, fetchArticlesRes, fetchNextArticlesPage] = useInfiniteScroll(
    useLazyGetArticleSuggestionsQuery,
  );
  const { list: articles, hasMore } = fetchArticlesRes;

  useEffect(() => {
    fetchArticles();
  }, []);

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
            className='p-2 px-xs-1'
            key={article.id}
            article={article}
            author={article.author}
            actions={SEARCH_PAGE_ARTICLE_ACTIONS}
            icons={SEARCH_PAGE_ARTICLE_ICONS}
          />
        ))}
      </InfiniteScroll>
    </ApiErrorBoundary>
  );
};
