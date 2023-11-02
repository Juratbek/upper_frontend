import { ReadArticle } from 'frontends/mobile';
import { GetServerSideProps, NextPage } from 'next';
import { wrapper } from 'store';
import { publishedArticleApi } from 'store/apis';
import { IArticle, IResponseError } from 'types';
import { get } from 'utils';

interface IArticlePageProps {
  article: IArticle | null;
  error: IResponseError | null;
  fullUrl: string;
}

const MobileAppReadArticlePage: NextPage<IArticlePageProps> = ({
  article,
  error,
}: IArticlePageProps) => {
  if (!article) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return <ReadArticle {...article} />;
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = wrapper.getServerSideProps(
  (store) => async (context) => {
    const host = context.req.headers.host || '';
    const url = context.req.url;

    const articleId = get<number>(context, 'query.id');
    const { data: article, error } = await store.dispatch(
      publishedArticleApi.endpoints.getById.initiate({ id: articleId }, { forceRefetch: 5 }),
    );
    return {
      props: {
        article: article || null,
        error: (error as IResponseError) || null,
        fullUrl: `https://${host}${url}`,
      },
    };
  },
);

export default MobileAppReadArticlePage;
