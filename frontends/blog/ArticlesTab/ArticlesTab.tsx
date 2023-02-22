import { ApiErrorBoundary, Article, Button, StorysetImage } from 'components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useLazyGetBlogPublishedArticlesQuery } from 'store/apis';
import { addUriToArticleImages } from 'utils';
import { SEARCH_PAGE_ARTICLE_ICONS } from 'variables';

export const ArticlesTab: FC = () => {
  const {
    query: { id },
  } = useRouter();
  const [fetchBlogArticles, fetchBlogArticlesRes] = useLazyGetBlogPublishedArticlesQuery();

  useEffect(() => {
    if (id) {
      fetchBlogArticles(+id);
    }
  }, [id]);

  const articles = useMemo(() => {
    const { data: articles } = fetchBlogArticlesRes;
    if (!articles || articles.length === 0)
      return (
        <div style={{ textAlign: 'center' }} className='mb-1'>
          <StorysetImage
            width={350}
            height={350}
            src='/storyset/write_article.svg'
            storysetUri='creativity'
          />
          <p>Maqolalar hozircha yo&apos;q</p>
          <p className='text-gray'>O&apos;z maqolangizni yozing va bilimlaringizni ulashing</p>
          <Link href='/write-article'>
            <a>
              <Button color='outline-dark'>Maqola yozish</Button>
            </a>
          </Link>
        </div>
      );
    return addUriToArticleImages(articles).map((article) => (
      <Article
        className='p-2 my-2'
        key={article.id}
        article={article}
        author={article.author}
        icons={SEARCH_PAGE_ARTICLE_ICONS}
      />
    ));
  }, [fetchBlogArticlesRes.data]);

  return (
    <ApiErrorBoundary res={fetchBlogArticlesRes} className='tab'>
      {articles}
    </ApiErrorBoundary>
  );
};
