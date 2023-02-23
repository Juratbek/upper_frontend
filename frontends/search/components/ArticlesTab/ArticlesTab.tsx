import { ApiErrorBoundary, Article, ArticleSkeleton, StorysetImage } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazySearchPublishedArticleQuery } from 'store/apis';
import { addUriToArticleImages } from 'utils';
import { ARTICLES_SKELETON_COUNT, SEARCH_PAGE_ARTICLE_ICONS, SEARCH_PAGE_TAB_IDS } from 'variables';

export const ArticlesTab: FC = () => {
  const {
    query: { search, tab },
  } = useRouter();
  const [searchArticle, searchArticleRes] = useLazySearchPublishedArticleQuery();

  useEffect(() => {
    if (search && search.length > 1 && tab === SEARCH_PAGE_TAB_IDS.articles) {
      searchArticle({ search: search.toString() });
    }
  }, [search]);

  return (
    <ApiErrorBoundary
      res={searchArticleRes}
      defaultComponent={
        <div className='text-center mt-5'>
          <StorysetImage
            storysetUri='data'
            width={300}
            height={300}
            src='/storyset/search_data.svg'
          />
        </div>
      }
      fallback={<ArticleSkeleton className='px-2 py-2' />}
      fallbackItemCount={ARTICLES_SKELETON_COUNT}
      className='tab'
    >
      {searchArticleRes.data?.length === 0 && (
        <div className='text-center mt-5'>
          <StorysetImage storysetUri='data' width={300} height={300} src='/storyset/no_data.svg' />
          <h3>Maqola topilmadi</h3>
        </div>
      )}
      {addUriToArticleImages(searchArticleRes.data).map((article) => (
        <Article
          className='p-2 px-xs-1 my-2'
          key={article.id}
          article={article}
          author={article.author}
          icons={SEARCH_PAGE_ARTICLE_ICONS}
        />
      ))}
    </ApiErrorBoundary>
  );
};