import { ApiErrorBoundary } from 'components';
import { Divider, Spinner } from 'components/lib';
import {
  ForYouLabel,
  LABEL_ID_PARAM,
  LoadMoreButton,
  NoArticle,
  PublishedArticle,
  UserLabels,
} from 'components/molecules';
import { useUrlParams } from 'hooks';
import { FC, Fragment } from 'react';
import { usePublishedArticlesList } from 'store/clients/published-article';
import { addAmazonBucketUrl } from 'utils/published-article';

export const HomePage: FC = () => {
  const { getParam } = useUrlParams();
  const label = (getParam(LABEL_ID_PARAM) ?? ForYouLabel) as string;
  const { fetchNextPage, list: articles, ...articlesRes } = usePublishedArticlesList(label);

  return (
    <>
      <UserLabels />
      <ApiErrorBoundary res={articlesRes} fallback={<Spinner />}>
        {articles.length === 0 && !articlesRes.isLoading && <NoArticle label={label} />}
        {articles.map(addAmazonBucketUrl).map((article) => (
          <Fragment key={article.id}>
            <Divider color='secondary' />
            <PublishedArticle article={article} />
          </Fragment>
        ))}
        {articles.length !== 0 && (
          <LoadMoreButton
            onClick={() => fetchNextPage()}
            loading={articlesRes.isFetchingNextPage}
          />
        )}
      </ApiErrorBoundary>
    </>
  );
};
