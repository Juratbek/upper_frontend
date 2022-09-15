import { Article } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazyGetBlogArticlesQuery } from 'store/apis';
import { TArticleStatus } from 'types';
import { get } from 'utils';

export const ArticlesTab: FC = () => {
  const [getBlogArticles, { data: articles, isFetching, isError, error }] =
    useLazyGetBlogArticlesQuery();
  const {
    query: { tab },
  } = useRouter();

  useEffect(() => {
    if (tab) {
      getBlogArticles([tab as TArticleStatus]);
    }
  }, [tab]);

  if (isFetching) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>{get(error, 'data.message')}</p>;

  return (
    <div className='tab'>
      {articles &&
        articles.map((article) => {
          return (
            <Article
              redirectUrl='/user/articles'
              className='px-2 py-2'
              key={article.id}
              article={article}
            />
          );
        })}
    </div>
  );
};
