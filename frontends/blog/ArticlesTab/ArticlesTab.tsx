import { ApiErrorBoundary, Article } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useLazyGetBlogPublishedArticlesQuery } from 'store/apis';
import { addUriToArticleImages } from 'utils';
import { SEARCH_PAGE_ARTICLE_ACTIONS, SEARCH_PAGE_ARTICLE_ICONS } from 'variables';

export const ArticlesTab: FC = () => {
  const {
    query: { id },
  } = useRouter();
  const [fetchBlogArticles, fetchBlogArticlesRes] = useLazyGetBlogPublishedArticlesQuery();

  useEffect(() => {
    if (id) {
      fetchBlogArticles(+id);
    }
  }, [id]);

  const articles = useMemo(() => {
    const { data: articles } = fetchBlogArticlesRes;
    if (!articles || articles.length === 0) return <p>Maqolalar mavjud emas</p>;
    return addUriToArticleImages(articles).map((article) => (
      <Article
        className='p-2 my-2'
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
