import { ApiErrorBoundary, Article, ArticleSkeleton } from 'components';
import { FC } from 'react';
import { useGetArticleSuggestionsQuery } from 'store/apis';
import {
  ARTICLES_SKELETON_COUNT,
  SEARCH_PAGE_ARTICLE_ACTIONS,
  SEARCH_PAGE_ARTICLE_ICONS,
} from 'variables';

export const ForYouTab: FC = () => {
  const res = useGetArticleSuggestionsQuery();
  return (
    <ApiErrorBoundary
      fallback={<ArticleSkeleton className='px-2 py-2' />}
      fallbackItemCount={ARTICLES_SKELETON_COUNT}
      res={res}
      className='tab'
    >
      {res?.data?.map((article) => (
        <Article
          className='px-2 py-2'
          key={article.id}
          article={article}
          author={article.author}
          actions={SEARCH_PAGE_ARTICLE_ACTIONS}
          icons={SEARCH_PAGE_ARTICLE_ICONS}
        />
      ))}
    </ApiErrorBoundary>
  );
};
