import { Spinner } from 'components/lib';
import { ApiErrorBoundary } from 'components/molecules';
import {
  DefaultLabel,
  LABEL_ID_PARAM,
  LoadMoreButton,
  NoArticle,
  PublishedArticle,
  UserLabels,
} from 'components/molecules';
import { useUrlParams } from 'hooks';
import { FC } from 'react';
import { usePublishedArticlesList } from 'store/clients/published-article';
import { addAmazonBucketUrl } from 'utils/published-article';

export const HomePage: FC = () => {
  const { getParam } = useUrlParams();
  const label = (getParam(LABEL_ID_PARAM) ?? DefaultLabel) as string;
  const {
    fetchNextPage,
    list: articles,
    hasNextPage,
    ...articlesRes
  } = usePublishedArticlesList(label);

  return (
    <div>
      <UserLabels />
      <ApiErrorBoundary
        res={articlesRes}
        fallback={
          <div style={{ height: '15rem' }} className='content-center'>
            <Spinner />
          </div>
        }
      >
        {articles.length === 0 && !articlesRes.isLoading && <NoArticle label={label} />}
        {articles.map(addAmazonBucketUrl).map((article) => (
          <PublishedArticle article={article} key={article.id} />
        ))}
        {articles.length !== 0 && hasNextPage && (
          <LoadMoreButton
            onClick={() => fetchNextPage()}
            loading={articlesRes.isFetchingNextPage}
          />
        )}
      </ApiErrorBoundary>
    </div>
  );
};
