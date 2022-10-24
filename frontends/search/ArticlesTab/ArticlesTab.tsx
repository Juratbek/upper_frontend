import { ApiErrorBoundary, Article, ArticleSkeleton } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazySearchArticleQuery } from 'store/apis';
import {
  ARTICLES_SKELETON_COUNT,
  SEARCH_PAGE_ARTICLE_ACTIONS,
  SEARCH_PAGE_ARTICLE_ICONS,
  SEARCH_PAGE_TAB_IDS,
} from 'variables';

export const ArticlesTab: FC = () => {
  const {
    query: { search, tab },
  } = useRouter();
  const [searchArticle, searchArticleRes] = useLazySearchArticleQuery();

  useEffect(() => {
    if (search && search.length > 1 && tab === SEARCH_PAGE_TAB_IDS.articles) {
      searchArticle(search as string);
    }
  }, [search]);

  return (
    <ApiErrorBoundary
      res={searchArticleRes}
      fallback={<ArticleSkeleton className='px-2 py-2' />}
      fallbackItemCount={ARTICLES_SKELETON_COUNT}
      className='tab'
    >
      {searchArticleRes.data?.length === 0 && <h3 className='text-center'>Maqola topilmadi</h3>}
      {searchArticleRes.data?.map((article) => (
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
