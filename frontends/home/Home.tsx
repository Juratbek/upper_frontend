import { Button, Divider } from 'components/lib';
import { PublishedArticle } from 'components/molecules';
import { useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';
import { usePublishedArticlesList } from 'store/clients/published-article';
import { IPublishedArticleItem } from 'types';
import { addAmazonBucketUrl } from 'utils/published-article';

import { Labels } from './components';
import { LABEL_ID_PARAM, TopLabel } from './Home.constants';

export const HomePage: FC = () => {
  const { isReady } = useRouter();
  const { getParam } = useUrlParams();
  const label = getParam(LABEL_ID_PARAM) ?? TopLabel;
  const { data, fetchNextPage, isFetchingNextPage, isLoading } = usePublishedArticlesList(
    label as string,
    {
      enabled: typeof label === 'string' && isReady,
    },
  );
  const { pages = [] } = data ?? {};
  const articles = pages.reduce<IPublishedArticleItem[]>((res, page) => [...res, ...page.list], []);

  return (
    <>
      <Labels />
      {articles.length === 0 && !isLoading && (
        <h3 className='text-center'>Maqolalar mavjud emas</h3>
      )}
      {articles.map(addAmazonBucketUrl).map((article) => (
        <Fragment key={article.id}>
          <Divider color='secondary' />
          <PublishedArticle article={article} />
        </Fragment>
      ))}
      <Button
        className='w-100'
        onClick={fetchNextPage}
        loading={isFetchingNextPage}
        loader='Yuklanmoqda...'
      >
        Yana yuklash
      </Button>
    </>
  );
};
