import { ApiErrorBoundary, Article } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useLazyGetBlogPublishedArticlesQuery } from 'store/apis';
import { SEARCH_PAGE_ARTICLE_ACTIONS, SEARCH_PAGE_ARTICLE_ICONS } from 'variables';
import { BLOG_TAB_IDS } from 'variables';

export const ArticlesTab: FC = () => {
  const {
    query: { id, tab },
  } = useRouter();
  const [fetchBlogArticles, fetchBlogArticlesRes] = useLazyGetBlogPublishedArticlesQuery();

  useEffect(() => {
    if (id && tab === BLOG_TAB_IDS.articles) {
      fetchBlogArticles(+id);
    }
  }, [id]);

  const articles = useMemo(() => {
    const { data: articles } = fetchBlogArticlesRes;
    if (!articles || articles.length === 0) return <p>Maqolalar mavjud emas</p>;
    return articles.map((article) => (
      <Article
        className='px-2 py-2'
        key={article.id}
        article={article}
        author={article.author}
        actions={SEARCH_PAGE_ARTICLE_ACTIONS}
        icons={SEARCH_PAGE_ARTICLE_ICONS}
      />
    ));
  }, [fetchBlogArticlesRes.data]);

  return (
    <ApiErrorBoundary res={fetchBlogArticlesRes} className='tab'>
      {articles}
    </ApiErrorBoundary>
  );
};
