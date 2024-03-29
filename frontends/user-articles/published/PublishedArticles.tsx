import { ApiErrorBoundary, ArticleSkeleton } from 'components';
import { Button, StorysetImage } from 'components/lib';
import { Article, LoadMoreButton } from 'components/molecules';
import { useAppRouter } from 'hooks';
import { FC, useCallback } from 'react';
import { useBlogArticles, useCreateArticle } from 'store/clients/article';
import { ARTICLES_SKELETON_COUNT } from 'variables';

export const PublishedArticles: FC = () => {
  const { push } = useAppRouter();
  const blogArticlesRes = useBlogArticles('PUBLISHED');
  const { mutate: createArticle, ...createArticleRes } = useCreateArticle({
    onSuccess: (id) => push(`/user/articles/${id}`),
  });

  const writeArticleHandler = useCallback(() => createArticle(), []);

  const { list, fetchNextPage, hasNextPage } = blogArticlesRes;

  return (
    <ApiErrorBoundary
      res={blogArticlesRes}
      fallback={<ArticleSkeleton className='px-2 py-2' />}
      fallbackItemCount={ARTICLES_SKELETON_COUNT}
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
          <Button onClick={writeArticleHandler} loading={createArticleRes.isPending}>
            Maqola yozish
          </Button>
        </div>
      )}
      {list.map((article) => {
        return <Article key={article.id} article={article} />;
      })}
      {hasNextPage && <LoadMoreButton onClick={fetchNextPage} />}
    </ApiErrorBoundary>
  );
};
