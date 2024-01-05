import { BackButton } from 'components/lib';
import { GenericWrapper } from 'components/wrappers';
import { ArticlePageMain, ReadArticleBottomBar } from 'frontends/article';
import { GetServerSideProps, NextPage } from 'next';
import { wrapper } from 'store';
import { apiClient } from 'store/config';
import { IArticle, IResponseError } from 'types';
import { get } from 'utils';

export interface IArticlePageProps {
  article: IArticle | null;
  error: IResponseError | null;
  fullUrl: string;
}

const ArticlePage: NextPage<IArticlePageProps> = (props: IArticlePageProps) => {
  return (
    <GenericWrapper
      sidebar={null}
      desktopNavigation={<BackButton />}
      header={<></>}
      tabletNavigation={<ReadArticleBottomBar />}
      mobileNavigation={<ReadArticleBottomBar />}
    >
      <ArticlePageMain {...props} />
    </GenericWrapper>
  );
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = wrapper.getServerSideProps(
  () => async (context) => {
    const host = context.req.headers.host ?? '';
    const url = context.req.url;

    const articleId = get<number>(context, 'query.id');
    let article;
    let error;
    try {
      article = await apiClient.get<IArticle>(`published-article/open/${articleId}`);
    } catch (e) {
      console.log(e);
      error = e;
    }
    return {
      props: {
        article: article ?? null,
        error: (error as IResponseError) ?? null,
        fullUrl: `https://${host}${url}`,
      },
    };
  },
);

export default ArticlePage;
