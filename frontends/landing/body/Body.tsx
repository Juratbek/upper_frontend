import { AuthButton } from 'components';
import { Divider } from 'components/lib';
import { LABEL_ID_PARAM, Labels, PublishedArticle, TopLabel } from 'components/molecules';
import { useUrlParams } from 'hooks';
import { Fragment } from 'react';
import { usePublishedArticlesList } from 'store/clients/published-article';
import { addAmazonBucketUrl } from 'utils/published-article';

import { labels } from './Body.constants';
import classes from './Body.module.scss';

export const Body = (): JSX.Element => {
  const { setParam, getParam } = useUrlParams();
  const activeLabel = (getParam(LABEL_ID_PARAM) ?? TopLabel) as string;
  const { list: articles } = usePublishedArticlesList(activeLabel);

  const labelSelectHandler = (label: string): void => {
    setParam(LABEL_ID_PARAM, label);
  };

  return (
    <section className={classes.container}>
      <Labels labels={labels} activeLabel={activeLabel} onSelect={labelSelectHandler} />
      {articles.map(addAmazonBucketUrl).map((article) => (
        <Fragment key={article.id}>
          <Divider color='secondary' />
          <PublishedArticle article={article} />
        </Fragment>
      ))}
      {articles.length === 0 && (
        <div className=''>
          <h3>{activeLabel} uchun maqolalar topilmadi</h3>
          <p>{activeLabel} mavzusida maqolalar yozing va bilim ulashing</p>
          <AuthButton>Maqola yozish</AuthButton>
        </div>
      )}
    </section>
  );
};
