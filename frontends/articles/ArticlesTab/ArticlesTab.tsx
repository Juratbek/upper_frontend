import { ApiErrorBoundary, Article, ArticleSkeleton, Button, Pagination } from 'components';
import { useUrlParams } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazyGetBlogArticlesQuery } from 'store/apis';
import { TArticleStatus } from 'types';
import { addUriToArticleImages } from 'utils';
import { ARTICLES_SKELETON_COUNT, ARTICLES_TAB_MENUS, PAGINATION_SIZE } from 'variables';

export const ArticlesTab: FC = () => {
  const [getBlogArticles, getBlogArticlesRes] = useLazyGetBlogArticlesQuery();
  const {
    query: { tab, page },
  } = useRouter();
  const { setParam } = useUrlParams();

  const TAB = ARTICLES_TAB_MENUS.find((TAB) => TAB.id === tab);

  useEffect(() => {
    if (tab) {
      const p = (page as unknown as number) || 1;
      getBlogArticles({ statuses: [tab as TArticleStatus], page: p - 1 });
    }
  }, [tab, page]);

  const changePage = (page: number): void => {
    setParam('page', page);
  };

  const { data } = getBlogArticlesRes;

  return (
    <div>
      <ApiErrorBoundary
        res={getBlogArticlesRes}
        fallback={<ArticleSkeleton className='px-2 py-2' />}
        fallbackItemCount={ARTICLES_SKELETON_COUNT}
        className='tab'
      >
        {getBlogArticlesRes.data?.list.length === 0 && (
          <div className='text-center mt-3'>
            <h2>{TAB?.name} maqolalar mavjuda emas</h2>
            <Link href='/write-article'>
              <a>
                <Button color='outline-dark'>Maqola yozish</Button>
              </a>
            </Link>
          </div>
        )}
        {addUriToArticleImages(data?.list || []).map((article) => {
          return (
            <Article
              redirectUrl='/user/articles'
              className='p-2 px-xs-1 my-2'
              key={article.id}
              article={article}
            />
          );
        })}
      </ApiErrorBoundary>
      <div className='text-center'>
        {data && (
          <Pagination
            count={data.totalItemCount / PAGINATION_SIZE}
            className='my-3'
            onPageChange={changePage}
          />
        )}
      </div>
    </div>
  );
};
