import { Divider } from 'components/lib';
import { Labels, PublishedArticle, TopLabel } from 'components/molecules';
import { Fragment } from 'react';
import { usePublishedArticlesList } from 'store/clients/published-article';
import { addAmazonBucketUrl } from 'utils/published-article';

import classes from './Body.module.scss';

export const Body = (): JSX.Element => {
  const { list: articles } = usePublishedArticlesList(TopLabel);

  return (
    <section className={classes.container}>
      <Labels />
      {articles.map(addAmazonBucketUrl).map((article) => (
        <Fragment key={article.id}>
          <Divider color='secondary' />
          <PublishedArticle article={article} />
        </Fragment>
      ))}
    </section>
  );
};
