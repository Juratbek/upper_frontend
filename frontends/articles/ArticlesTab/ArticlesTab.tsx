import { ApiErrorBoundary, Article, ArticleSkeleton, Button } from 'components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazyGetBlogArticlesQuery } from 'store/apis';
import { TArticleStatus } from 'types';
import { ARTICLES_SKELETON_COUNT, ARTICLES_TAB_MENUS } from 'variables';

export const ArticlesTab: FC = () => {
  const [getBlogArticles, getBlogArticlesRes] = useLazyGetBlogArticlesQuery();
  const {
    query: { tab },
  } = useRouter();

  const TAB = ARTICLES_TAB_MENUS.find((TAB) => TAB.id === tab);

  useEffect(() => {
    if (tab) {
      getBlogArticles([tab as TArticleStatus]);
    }
  }, [tab]);

  return (
    <ApiErrorBoundary
      res={getBlogArticlesRes}
      fallback={<ArticleSkeleton className='px-2 py-2' />}
      fallbackItemCount={ARTICLES_SKELETON_COUNT}
      className='tab'
    >
      {getBlogArticlesRes.data?.length === 0 && (
        <div className='text-center mt-3'>
          <h2>{TAB?.name} maqolalar mavjuda emas</h2>
          <Link href='/write-article'>
            <Button color='outline-dark'>Maqola yozish</Button>
          </Link>
        </div>
      )}
      {getBlogArticlesRes.data?.map((article) => {
        return (
          <Article
            redirectUrl='/user/articles'
            className='px-2 py-2'
            key={article.id}
            article={article}
          />
        );
      })}
    </ApiErrorBoundary>
  );
};
