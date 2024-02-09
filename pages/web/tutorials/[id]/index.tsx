import { ArticlePageMain } from 'frontends/article';
import { convert } from 'html-to-text';
import { GetServerSideProps, NextPage } from 'next';
import { IArticlePageProps } from 'pages/web/articles/[id]';
import { apiClient } from 'store/config';
import { IArticle, IResponseError } from 'types';
import { get } from 'utils';

const TutorialNextPage: NextPage<IArticlePageProps> = (props: IArticlePageProps) => {
  return <ArticlePageMain {...props} />;
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = async (
  context,
): Promise<{ props: IArticlePageProps }> => {
  const host = context.req.headers.host ?? '';
  const url = context.req.url;

  const articleId = get<number>(context, 'query.articleId');

  if (!articleId) {
    return {
      props: {
        article: null,
        title: '',
        error: {
          data: { message: '', code: 200 },
          status: 200,
        },
        fullUrl: `https://${host}${url}`,
      },
    };
  }
  let article;
  let error;
  try {
    article = await apiClient.get<IArticle>(`published-article/open/${articleId}`);
  } catch (e) {
    error = e;
  }

  return {
    props: {
      title: convert(article?.title ?? ''),
      article: article ?? null,
      error: (error as IResponseError) || null,
      fullUrl: `https://${host}${url}`,
    },
  };
};

export default TutorialNextPage;
