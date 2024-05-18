import { ApiErrorBoundary } from 'components';
import { Spinner } from 'components/lib';
import {
  DefaultLabel,
  LABEL_ID_PARAM,
  LoadMoreButton,
  NoArticle,
  PublishedArticle,
  UserLabels,
} from 'components/molecules';
import { Advertisement } from 'components/organisms';
import { useDevice, useUrlParams } from 'hooks';
import { FC } from 'react';
import { usePublishedArticlesList } from 'store/clients/published-article';
import { addAmazonBucketUrl } from 'utils/published-article';

export const HomePage: FC = () => {
  const { getParam } = useUrlParams();
  const { isDesktop } = useDevice();
  const label = (getParam(LABEL_ID_PARAM) ?? DefaultLabel) as string;
  const {
    fetchNextPage,
    list: articles,
    hasNextPage,
    ...articlesRes
  } = usePublishedArticlesList(label);

  return (
    <>
      <UserLabels />
      {!isDesktop && <Advertisement />}
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
    </>
  );
};
