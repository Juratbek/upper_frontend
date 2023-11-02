import { ApiErrorBoundary, ArticleSkeleton } from 'components';
import { Button, PublishedArticle, StorysetImage } from 'components/lib';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useCreateArticleMutation, useLazyGetBlogPublishedArticlesQuery } from 'store/apis';
import { addUriToArticleImages } from 'utils';
import { ARTICLES_SKELETON_COUNT, WEB_APP_ROOT_DIR } from 'variables';

export const ArticlesTab: FC = () => {
  const {
    query: { id },
    push,
  } = useRouter();
  const [fetchBlogArticles, fetchBlogArticlesRes] = useLazyGetBlogPublishedArticlesQuery();
  const [createArticle, createArticleRes] = useCreateArticleMutation();

  useEffect(() => {
    if (id) {
      fetchBlogArticles(+id);
    }
  }, [id]);

  const writeArticleHandler = useCallback(async () => {
    try {
      const res = await createArticle({ title: '', blocks: [], labels: [] }).unwrap();
      push(`${WEB_APP_ROOT_DIR}/user/articles/${res.id}`);
    } catch (err) {
      alert('Maqola yaratishda xatolik yuz berdi');
    }
  }, []);

  const articles = useMemo(() => {
    const { data: articles } = fetchBlogArticlesRes;
    if (!articles || articles.length === 0)
      return (
        <div style={{ textAlign: 'center' }} className='mb-1'>
          <StorysetImage
            width={250}
            height={250}
            src='/storyset/write_article.svg'
            storysetUri='creativity'
          />
          <p>Maqolalar hozircha yo&apos;q</p>
          <p className='text-gray'>O&apos;z maqolangizni yozing va bilimlaringizni ulashing</p>
          <Button onClick={writeArticleHandler} loading={createArticleRes.isLoading}>
            Maqola yozish
          </Button>
        </div>
      );
    return addUriToArticleImages(articles).map((article) => (
      <PublishedArticle key={article.id} article={article} author={article.author} />
    ));
  }, [fetchBlogArticlesRes.data, createArticleRes.isLoading, writeArticleHandler]);

  return (
    <ApiErrorBoundary
      res={fetchBlogArticlesRes}
      memoizationDependencies={[articles]}
      fallback={<ArticleSkeleton className='p-2' />}
      fallbackItemCount={ARTICLES_SKELETON_COUNT}
      className='tab'
    >
      {articles}
    </ApiErrorBoundary>
  );
};
