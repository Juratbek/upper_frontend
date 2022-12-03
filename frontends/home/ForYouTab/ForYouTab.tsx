import { ApiErrorBoundary, Article, ArticleSkeleton, Button } from 'components';
import { useInfiniteScroll } from 'hooks';
import { FC, useEffect } from 'react';
import { useLazyGetArticleSuggestionsQuery } from 'store/apis';
import { addUriToArticleImages } from 'utils';
import {
  ARTICLES_SKELETON_COUNT,
  SEARCH_PAGE_ARTICLE_ACTIONS,
  SEARCH_PAGE_ARTICLE_ICONS,
} from 'variables';

export const ForYouTab: FC = () => {
  const [fetchArticleSuggestions, fetchArticleSuggestionsRes] = useLazyGetArticleSuggestionsQuery();
  const lastItemRef = useInfiniteScroll(() => console.log('fetch next page'));
  const { data: articles } = fetchArticleSuggestionsRes;

  useEffect(() => {
    fetchArticleSuggestions();
  }, []);

  return (
    <ApiErrorBoundary
      fallback={<ArticleSkeleton className='px-2 py-2' />}
      fallbackItemCount={ARTICLES_SKELETON_COUNT}
      res={fetchArticleSuggestionsRes}
      className='tab'
    >
      <h1>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum assumenda id sequi nostrum
        odit quas dolore, voluptatum delectus quibusdam nam distinctio vel officiis. Fugiat
        doloribus odit quaerat. Aliquid corporis voluptatum asperiores sed sequi eius iste, itaque
        modi quo veniam. Aliquid quas, esse laudantium neque vel inventore beatae voluptate porro
        molestias corporis voluptatem optio quasi sed maxime pariatur! Et ut rem accusantium
        voluptatem voluptatum aliquam blanditiis officia earum minima aliquid similique magnam,
        ipsam sapiente mollitia est! Obcaecati neque officia numquam doloribus ea eum labore magnam
        omnis, explicabo debitis placeat quibusdam aut iure sit corporis consequuntur consequatur
        harum atque! Assumenda, ipsa hic.
      </h1>
      {articles?.length === 0 && <h3 className='text-center'>Maqolalar mavjud emas</h3>}
      {addUriToArticleImages(articles).map((article, index) => {
        if (index + 1 === articles?.length)
          return (
            <div ref={lastItemRef}>
              <p>last item</p>
              <Article
                className='p-2 px-xs-1'
                key={article.id}
                article={article}
                author={article.author}
                actions={SEARCH_PAGE_ARTICLE_ACTIONS}
                icons={SEARCH_PAGE_ARTICLE_ICONS}
              />
            </div>
          );
        return (
          <Article
            className='p-2 px-xs-1'
            key={article.id}
            article={article}
            author={article.author}
            actions={SEARCH_PAGE_ARTICLE_ACTIONS}
            icons={SEARCH_PAGE_ARTICLE_ICONS}
          />
        );
      })}
      <div>
        <Button color='outline-dark' className='mx-auto'>
          Yana yuklash
        </Button>
      </div>
    </ApiErrorBoundary>
  );
};
