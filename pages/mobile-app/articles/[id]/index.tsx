import { GetServerSideProps, NextPage } from 'next';
import { apiClient } from 'store/config';
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

  return null;
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = async (context) => {
  const host = context.req.headers.host || '';
  const url = context.req.url;

  const articleId = get<number>(context, 'query.id');
  let article;
  let error;
  try {
    article = await apiClient.get<IArticle>(`published-article/open/${articleId}`);
  } catch (e) {
    error = e;
  }

  return {
    props: {
      article: article || null,
      error: (error as IResponseError) || null,
      fullUrl: `https://${host}${url}`,
    },
  };
};

export default MobileAppReadArticlePage;
