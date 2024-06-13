import { BackButton } from 'components/lib';
import { GenericWrapper } from 'components/wrappers';
import { ArticlePageMain, ReadArticleBottomBar } from 'frontends/article';
import { convert } from 'html-to-text';
import { GetServerSideProps, NextPage } from 'next';
import { apiClient } from 'store/config';
import { IArticle, IResponseError } from 'types';
import { get } from 'utils';
import { ApiError } from 'utils/error';

export interface IArticlePageProps {
  title: string;
  article: IArticle | null;
  error: IResponseError | null;
  fullUrl: string;
}

const ArticlePage: NextPage<IArticlePageProps> = (props: IArticlePageProps) => {
  return (
    <GenericWrapper
      areNavigationAndSidebarEqual
      isSidebarHidden
      desktopNavigation={<BackButton />}
      header={<></>}
      tabletNavigation={<ReadArticleBottomBar />}
      mobileNavigation={<ReadArticleBottomBar />}
    >
      <ArticlePageMain {...props} />
    </GenericWrapper>
  );
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = async (context) => {
  const host = context.req.headers.host ?? '';
  const url = context.req.url;

  const articleId = get<number>(context, 'query.id');
  let article;
  let error;
  try {
    article = await apiClient.get<IArticle>(`published-article/open/${articleId}`);
  } catch (e) {
    const apiError = e as ApiError;
    error = { status: apiError.status ?? '' } satisfies Partial<IResponseError>;
  }
  return {
    props: {
      title: convert(article?.title ?? ''),
      article: article ?? null,
      error: (error as IResponseError) ?? null,
      fullUrl: `https://${host}${url}`,
    },
  };
};

export default ArticlePage;
