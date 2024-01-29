import { ApiErrorBoundary } from 'components';
import { Divider, Spinner } from 'components/lib';
import {
  LABEL_ID_PARAM,
  Labels,
  LoadMoreButton,
  NoArticle,
  PublishedArticle,
  TopLabel,
} from 'components/molecules';
import { Sidebar } from 'components/organisms';
import { useUrlParams } from 'hooks';
import { Fragment } from 'react';
import { usePublishedArticlesList } from 'store/clients/published-article';
import { addAmazonBucketUrl } from 'utils/published-article';

import { labels } from './Body.constants';
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
        <Labels labels={labels} activeLabel={activeLabel} onSelect={labelSelectHandler} />
        <ApiErrorBoundary
          res={articlesListRes}
          fallback={
            <div style={{ height: '15rem' }} className='content-center'>
              <Spinner />
            </div>
          }
        >
          {articles.map(addAmazonBucketUrl).map((article) => (
            <Fragment key={article.id}>
              <Divider color='secondary' />
              <PublishedArticle article={article} />
            </Fragment>
          ))}
          {articles.length === 0 && <NoArticle label={activeLabel} />}
          {articles.length !== 0 && <LoadMoreButton onClick={fetchNextPage} />}
        </ApiErrorBoundary>
      </section>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
    </div>
  );
};
