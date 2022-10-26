import { ApiError } from 'components';
import { Article } from 'frontends/article';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAppDispatch, wrapper } from 'store';
import { publishedArticleApi, useIncrementViewCountMutation } from 'store/apis';
import { setArticleAuthor } from 'store/states/readArticle';
import { IArticle, IResponseError } from 'types';
import { get } from 'utils';

interface IArticlePageProps {
  article?: IArticle | null;
  error?: IResponseError;
  fullUrl: string;
}

const ArticlePage: NextPage<IArticlePageProps> = ({
  article,
  error,
  fullUrl,
}: IArticlePageProps) => {
  const dispatch = useAppDispatch();
  const [incrementViewCountRequest] = useIncrementViewCountMutation();

  if (!article) {
    if (error?.status === 500) return <ApiError className='container mt-2' error={error} />;
    return <h1>{get(error, 'data.message')}</h1>;
  }

  dispatch(setArticleAuthor(article.author));

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (article.token) {
        const { id, token } = article;
        incrementViewCountRequest({ id, token });
      }
    }, 15 * 1000);
    return () => clearTimeout(timeout);
  }, [article.id]);

  return (
    <div>
      <Head>
        <meta property='og:site_name' content='UPPER' />
        <meta property='og:title' content={article.title} />
        <meta property='og:image' content={article.imgUrl} />
        <meta property='og:description' content={article.content} />
        <meta property='og:type' content='article' />
        <meta property='og:locale' content='uz' />
        <meta property='og:url' content={fullUrl} />
        <meta name='author' content={article.author.name} />
        <meta name='published_date' content={article.publishedDate} />
        <title>{article.title}</title>
      </Head>
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
      publishedArticleApi.endpoints.getById.initiate(articleId),
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
