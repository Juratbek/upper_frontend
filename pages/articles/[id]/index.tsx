import { ApiError, Blog, Button, Divider, Head } from 'components';
import { Article } from 'frontends/article';
import { useDevice } from 'hooks';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAppDispatch, wrapper } from 'store';
import { publishedArticleApi, useIncrementViewCountMutation } from 'store/apis';
import { setArticleAuthor } from 'store/states/readArticle';
import { IArticle, IResponseError } from 'types';
import { addAmazonBucketUriToArticle, addAmazonUri, convertToHeadProp, get } from 'utils';
import { ICONS } from 'variables';

interface IArticlePageProps {
  article?: IArticle | null;
  error?: IResponseError;
  fullUrl: string;
}

const HeartIcon = ICONS.heart;

const ArticlePage: NextPage<IArticlePageProps> = ({
  article,
  error,
  fullUrl,
}: IArticlePageProps) => {
  const dispatch = useAppDispatch();
  const [incrementViewCountRequest] = useIncrementViewCountMutation();
  const { isMobile } = useDevice();

  useEffect(() => {
    if (!article) return;
    dispatch(setArticleAuthor(article.author));
    const timeout = setTimeout(() => {
      if (article.token) {
        const { id, token } = article;
        incrementViewCountRequest({ id, token });
      }
    }, 15 * 1000);
    return () => clearTimeout(timeout);
  }, [article?.id]);

  if (!article) {
    if (error?.status === 500) return <ApiError className='container mt-2' error={error} />;
    if (error?.status === 404)
      return (
        <div className='text-center mt-4'>
          <h1>Maqola topilmadi</h1>
          <h3>404 :(</h3>
          <p className='text-gray'>Maqola o`chirilgan yoki bloklangan bo`lishi mumkin</p>
        </div>
      );
    return <h2>{get(error, 'data.message')}</h2>;
  }

  return (
    <div className='container'>
      <Head {...convertToHeadProp(addAmazonBucketUriToArticle<IArticle>(article))} url={fullUrl} />
      {isMobile && (
        <>
          <Blog {...addAmazonUri(article.author)} />
          {Boolean(article.author.cardNumber) && (
            <>
              <div style={{ height: '1rem' }} />
              <Link href={`/blogs/${article.author.id}/support`}>
                <a className='link'>
                  <Button className='w-100'>
                    <span className='sponsor-icon'>
                      <HeartIcon />
                    </span>
                    Blog faoliyatiga hissa qo&apos;shing
                  </Button>
                </a>
              </Link>
            </>
          )}
          <Divider className='mt-1' />
        </>
      )}
      <Article {...article} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = wrapper.getServerSideProps(
  (store) => async (context) => {
    const host = context.req.headers.host || '';
    const url = context.req.url;

    const articleId = get<number>(context, 'query.id');
    const { data: article, error = {} } = await store.dispatch(
      publishedArticleApi.endpoints.getById.initiate(articleId, { forceRefetch: 5 }),
    );
    return {
      props: {
        article: article || null,
        error: error as IResponseError,
        fullUrl: `https://${host}${url}`,
      },
    };
  },
);

export default ArticlePage;
