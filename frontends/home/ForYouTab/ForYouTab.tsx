import { ApiErrorBoundary, Article, ArticleSkeleton } from 'components';
import { FC, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useLazyGetArticleSuggestionsQuery } from 'store/apis';
import { addUriToArticleImages } from 'utils';
import {
  ARTICLES_SKELETON_COUNT,
  SEARCH_PAGE_ARTICLE_ACTIONS,
  SEARCH_PAGE_ARTICLE_ICONS,
} from 'variables';

export const ForYouTab: FC = () => {
  const [fetchArticleSuggestions, fetchArticleSuggestionsRes] = useLazyGetArticleSuggestionsQuery();
  const { data } = fetchArticleSuggestionsRes;
  const { list: articles } = data || {};

  useEffect(() => {
    fetchArticleSuggestions({ page: 0 });
  }, []);

  return (
    <ApiErrorBoundary
      fallback={<ArticleSkeleton className='px-2 py-2' />}
      fallbackItemCount={ARTICLES_SKELETON_COUNT}
      res={fetchArticleSuggestionsRes}
      className='tab'
    >
      <InfiniteScroll>
        {articles?.length === 0 && <h3 className='text-center'>Maqolalar mavjud emas</h3>}
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
