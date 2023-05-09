import { Article } from 'frontends/article';
import { useDevice } from 'hooks';
import { GetServerSideProps, NextPage } from 'next';
import { wrapper } from 'store';
import { publishedArticleApi } from 'store/apis';
import { IArticle, IResponseError } from 'types';
import { get } from 'utils';

export interface IArticlePageProps {
  article: IArticle | null;
  error: IResponseError;
  fullUrl: string;
}

const ArticlePage: NextPage<IArticlePageProps> = (props: IArticlePageProps) => {
  const { isMobile } = useDevice();

  return <Article {...props} showAuthor={isMobile} />;
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = wrapper.getServerSideProps(
  (store) => async (context) => {
    const host = context.req.headers.host || '';
    const url = context.req.url;

    const articleId = get<number>(context, 'query.id');
    const { data: article, error = {} } = await store.dispatch(
      publishedArticleApi.endpoints.getById.initiate({ id: articleId }, { forceRefetch: 5 }),
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
