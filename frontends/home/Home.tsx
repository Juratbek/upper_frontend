import { Button, Divider } from 'components/lib';
import { ForYouLabel, LABEL_ID_PARAM, PublishedArticle, UserLabels } from 'components/molecules';
import { useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';
import { usePublishedArticlesList } from 'store/clients/published-article';
import { addAmazonBucketUrl } from 'utils/published-article';

export const HomePage: FC = () => {
  const { isReady } = useRouter();
  const { getParam } = useUrlParams();
  const label = getParam(LABEL_ID_PARAM) ?? ForYouLabel;
  const {
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    list: articles,
  } = usePublishedArticlesList(label as string, {
    enabled: typeof label === 'string' && isReady,
  });

  return (
    <>
      <UserLabels />
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
        onClick={() => fetchNextPage()}
        loading={isFetchingNextPage}
        loader='Yuklanmoqda...'
      >
        Yana yuklash
      </Button>
    </>
  );
};
