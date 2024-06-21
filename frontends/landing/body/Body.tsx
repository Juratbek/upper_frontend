import { ApiErrorBoundary } from 'components';
import { Spinner } from 'components/lib';
import {
  LABEL_ID_PARAM,
  Labels,
  LastPublished,
  LoadMoreButton,
  NoArticle,
  PublishedArticle,
  TopLabel,
} from 'components/molecules';
import { Sidebar } from 'components/organisms';
import { COMMON_SPACE_FROM_TOP } from 'components/wrappers';
import { useUrlParams } from 'hooks';
import { usePublishedArticlesList } from 'store/clients/published-article';
import { getClassName } from 'utils';
import { addAmazonBucketUrl } from 'utils/published-article';
import { PopularLabels } from 'variables';

import classes from './Body.module.scss';

export const Body = (): JSX.Element => {
  const { setParam, getParam } = useUrlParams();
  const activeLabel = (getParam(LABEL_ID_PARAM) ?? TopLabel) as string;
  const {
    list: articles,
    fetchNextPage,
    ...articlesListRes
  } = usePublishedArticlesList(activeLabel);

  const labelSelectHandler = (label: string): void => {
    setParam(LABEL_ID_PARAM, label);
  };

  return (
    <div className={classes.root}>
      <section className={classes.container}>
        <Labels
          labels={[LastPublished, TopLabel, ...PopularLabels]}
          activeLabel={activeLabel}
          onSelect={labelSelectHandler}
        />
        <ApiErrorBoundary
          res={articlesListRes}
          fallback={
            <div className={getClassName('content-center', classes.loading)}>
              <Spinner />
            </div>
          }
        >
          {articles.map(addAmazonBucketUrl).map((article) => (
            <PublishedArticle article={article} key={article.id} />
          ))}
          {articles.length === 0 && <NoArticle label={activeLabel} />}
          {articles.length !== 0 && articlesListRes.hasNextPage && (
            <LoadMoreButton loading={articlesListRes.isFetchingNextPage} onClick={fetchNextPage} />
          )}
        </ApiErrorBoundary>
      </section>
      <div className={classes.sidebar} style={{ top: COMMON_SPACE_FROM_TOP }}>
        <Sidebar />
      </div>
    </div>
  );
};
