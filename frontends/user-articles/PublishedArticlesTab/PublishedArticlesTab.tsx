import { ApiErrorBoundary, ArticleSkeleton, Pagination } from 'components';
import { Button, StorysetImage } from 'components/lib';
import { useAppRouter, useUrlParams } from 'hooks';
import { FC, useCallback } from 'react';
import { useBlogArticles, useCreateArticle } from 'store/clients/article';
import { TArticleStatus } from 'types';
import { addUriToArticleImages } from 'utils';
import { ARTICLES_SKELETON_COUNT } from 'variables';

import { Article } from '../Article/Article';

const PublishedArticlesTab: FC = () => {
  const {
    query: { tab, page },
    push,
  } = useAppRouter();
  const { setParam } = useUrlParams();
  const blogArticlesRes = useBlogArticles(tab as TArticleStatus, (page ?? '0') as string);
  const { mutate: createArticle, ...createArticleRes } = useCreateArticle({
    onSuccess: (id) => push(`/user/articles/${id}`),
  });

  const changePage = (page: number): void => {
    setParam('page', page);
  };

  const writeArticleHandler = useCallback(() => createArticle(), []);

  const { data } = blogArticlesRes;

  return (
    <div>
      <ApiErrorBoundary
        res={blogArticlesRes}
        fallback={<ArticleSkeleton className='px-2 py-2' />}
        fallbackItemCount={ARTICLES_SKELETON_COUNT}
        className='tab'
        memoizationDependencies={[createArticleRes.isLoading]}
      >
        {blogArticlesRes.data?.list.length === 0 && (
          <div className='text-center'>
            <StorysetImage
              width={250}
              height={250}
              src='/storyset/write_article.svg'
              storysetUri='creativity'
            />
            <p>Maqola yozing va bilimlaringizni ulashing</p>
            <Button onClick={writeArticleHandler} loading={createArticleRes.isLoading}>
              Maqola yozish
            </Button>
          </div>
        )}
        {addUriToArticleImages(data?.list || []).map((article) => {
          return <Article key={article.id} article={article} />;
        })}
      </ApiErrorBoundary>
      <div className='text-center'>
        {data?.totalPages && (
          <Pagination
            activePage={parseInt(page as string)}
            count={data.totalPages}
            className='my-3'
            onPageChange={changePage}
          />
        )}
      </div>
    </div>
  );
};

export default PublishedArticlesTab;
