import { ApiErrorBoundary } from 'components';
import { Button, Spinner, StorysetImage } from 'components/lib';
import { Article, LoadMoreButton } from 'components/molecules';
import { useAppRouter } from 'hooks';
import { FC, useCallback } from 'react';
import { useBlogArticles, useCreateArticle } from 'store/clients/article';

export const DraftArticles: FC = () => {
  const { push } = useAppRouter();
  const { mutate: createArticle, ...createArticleRes } = useCreateArticle({
    onSuccess: (id) => push(`/user/articles/${id}`),
  });
  const blogArticlesRes = useBlogArticles('SAVED');

  const writeArticleHandler = useCallback(async () => createArticle(), []);

  const { list, fetchNextPage, hasNextPage, isFetchingNextPage } = blogArticlesRes;

  return (
    <ApiErrorBoundary
      res={blogArticlesRes}
      fallback={
        <div style={{ height: 300, display: 'grid', placeItems: 'center' }}>
          <Spinner />
        </div>
      }
      className='tab'
      memoizationDependencies={[createArticleRes.isPending]}
    >
      {list.length === 0 && (
        <div className='text-center'>
          <StorysetImage
            width={250}
            height={250}
            src='/storyset/write_article.svg'
            storysetUri='creativity'
          />
          <p>Maqola yozing va bilimlaringizni ulashing</p>
          <Button
            onClick={writeArticleHandler}
            loading={createArticleRes.isPending}
            loader='Maqola yaratilmoqda...'
          >
            Maqola yozish
          </Button>
        </div>
      )}
      {list.map((article) => {
        return <Article key={article.id} article={article} />;
      })}
      {hasNextPage && <LoadMoreButton loading={isFetchingNextPage} onClick={fetchNextPage} />}
    </ApiErrorBoundary>
  );
};
