import { ArticlePageMain } from 'frontends/article';
import { GetServerSideProps, NextPage } from 'next';
import { IArticlePageProps } from 'pages/web/articles/[id]';
import { wrapper } from 'store';
import { publishedArticleApi } from 'store/apis';
import { IResponseError } from 'types';
import { get } from 'utils';

const TutorialNextPage: NextPage<IArticlePageProps> = ({
  article,
  error,
  fullUrl,
}: IArticlePageProps) => {
  return <ArticlePageMain error={error} article={article} fullUrl={fullUrl} />;
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = wrapper.getServerSideProps(
  (store) =>
    async (context): Promise<{ props: IArticlePageProps }> => {
      const host = context.req.headers.host || '';
      const url = context.req.url;

      const articleId = get<number>(context, 'query.articleId');

      if (!articleId) {
        return {
          props: {
            article: null,
            error: {
              data: { message: '', code: 200 },
              status: 200,
            },
            fullUrl: `https://${host}${url}`,
          },
        };
      }
      const { data: article, error = {} } = await store.dispatch(
        publishedArticleApi.endpoints.getById.initiate(
          { id: articleId, withAuthor: false },
          { forceRefetch: 5 },
        ),
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

export default TutorialNextPage;
