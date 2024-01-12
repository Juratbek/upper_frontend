import { Divider } from 'components/lib';
import { Labels, PublishedArticle, TopLabel } from 'components/molecules';
import { Fragment } from 'react';
import { usePublishedArticlesList } from 'store/clients/published-article';
import { addAmazonBucketUrl } from 'utils/published-article';

import { BlueBox } from './blue-box/BlueBox';
import { LandingHeader } from './header/LandingHeader';

export const LandingPage = (): JSX.Element => {
  const { list: articles } = usePublishedArticlesList(TopLabel);
  return (
    <div>
      <LandingHeader />
      <main className='container' style={{ paddingTop: 48 }}>
        <BlueBox />
        <section style={{ maxWidth: 720 }}>
          <Labels />
          {articles.map(addAmazonBucketUrl).map((article) => (
            <Fragment key={article.id}>
              <Divider color='secondary' />
              <PublishedArticle article={article} />
            </Fragment>
          ))}
        </section>
      </main>
    </div>
  );
};
