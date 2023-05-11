import {
  ApiErrorBoundary,
  Article,
  ArticleSkeleton,
  Button,
  Pagination,
  StorysetImage,
} from 'components';
import { useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect } from 'react';
import { useCreateArticleMutation, useLazyGetBlogArticlesQuery } from 'store/apis';
import { addUriToArticleImages } from 'utils';
import { ARTICLES_SKELETON_COUNT, PAGINATION_SIZE, WEB_APP_ROOT_DIR } from 'variables';

export const ArticlesTab: FC = () => {
  const [getBlogArticles, getBlogArticlesRes] = useLazyGetBlogArticlesQuery();
  const [createArticle, createArticleRes] = useCreateArticleMutation();
  const { push } = useRouter();
  const {
    query: { tab, page },
  } = useRouter();
  const { setParam } = useUrlParams();

  useEffect(() => {
    if (tab) {
      const p = (page as unknown as number) || 1;
      getBlogArticles({ page: p - 1 });
    }
  }, [tab, page]);

  const changePage = (page: number): void => {
    setParam('page', page);
  };

  const writeArticleHandler = useCallback(async () => {
    try {
      const res = await createArticle({ title: '', blocks: [], labels: [] }).unwrap();
      push(`${WEB_APP_ROOT_DIR}/user/articles/${res.id}`);
    } catch (err) {
      alert('Maqola yaratishda xatolik yuz berdi');
    }
  }, []);

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
          <div className='text-center'>
            <StorysetImage
              width={350}
              height={350}
              src='/storyset/write_article.svg'
              storysetUri='creativity'
            />
            <p>Maqola yozing va bilimlaringizni ulashing</p>
            <Button
              onClick={writeArticleHandler}
              loading={createArticleRes.isLoading}
              color='outline-dark'
            >
              Maqola yozish
            </Button>
          </div>
        )}
        {addUriToArticleImages(data?.list || []).map((article) => {
          return (
            <Article
              redirectUrl={`${WEB_APP_ROOT_DIR}/user/articles`}
              className='p-2 px-xs-1 my-2'
              key={article.id}
              article={article}
              showStatus
              showLikeCount
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
