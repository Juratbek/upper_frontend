import { ApiErrorBoundary, Article, ArticleSkeleton } from 'components';
import { FC } from 'react';
import { useGetTopArticlesQuery } from 'store/apis';
import { addUriToArticleImages } from 'utils';
import {
  ARTICLES_SKELETON_COUNT,
  SEARCH_PAGE_ARTICLE_ACTIONS,
  SEARCH_PAGE_ARTICLE_ICONS,
} from 'variables';

export const TopTab: FC = () => {
  const res = useGetTopArticlesQuery();

  return (
    <ApiErrorBoundary
      fallback={<ArticleSkeleton className='px-2 py-2' />}
      fallbackItemCount={ARTICLES_SKELETON_COUNT}
      res={res}
      className='tab'
    >
      {res.data?.length === 0 && <h3 className='text-center'>Maqolalar mavjud emas</h3>}
      {addUriToArticleImages(res.data).map((article) => (
        <Article
          className='p-2 px-xs-1'
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
