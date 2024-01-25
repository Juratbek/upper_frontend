import { ApiErrorBoundary, ArticleSkeleton } from 'components';
import { Button, StorysetImage } from 'components/lib';
import { Article } from 'components/molecules';
import { useAppRouter } from 'hooks';
import { FC, useCallback } from 'react';
import { useBlogArticles, useCreateArticle } from 'store/clients/article';
import { ARTICLES_SKELETON_COUNT } from 'variables';

export const DraftArticles: FC = () => {
  const { mutate: createArticle, ...createArticleRes } = useCreateArticle({
    onSuccess: (id) => push(`/user/articles/${id}`),
  });
  const { push } = useAppRouter();
  const blogArticlesRes = useBlogArticles('SAVED');

  const writeArticleHandler = useCallback(async () => createArticle(), []);

  const { list } = blogArticlesRes;

  return (
    <div>
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
      </ApiErrorBoundary>
    </div>
  );
};
