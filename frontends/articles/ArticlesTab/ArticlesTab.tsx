import { Article, Button } from 'components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazyGetBlogArticlesQuery } from 'store/apis';
import { TArticleStatus } from 'types';
import { get } from 'utils';
import { ARTICLES_TAB_MENUS } from 'variables';

export const ArticlesTab: FC = () => {
  const [getBlogArticles, { data: articles, isFetching, isError, error }] =
    useLazyGetBlogArticlesQuery();
  const {
    query: { tab },
  } = useRouter();

  const TAB = ARTICLES_TAB_MENUS.find((TAB) => TAB.id === tab);

  useEffect(() => {
    if (tab) {
      getBlogArticles([tab as TArticleStatus]);
    }
  }, [tab]);

  if (isFetching) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>{get(error, 'data.message')}</p>;

  return (
    <div className='tab'>
      {articles?.length === 0 && (
        <div className='text-center mt-3'>
          <h2>{TAB?.name} maqolalar mavjuda emas</h2>
          <Link href='/write-article'>
            <Button color='outline-dark'>Maqola yozish</Button>
          </Link>
        </div>
      )}
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
