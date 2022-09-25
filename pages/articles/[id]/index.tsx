import { ApiError } from 'components';
import { Article } from 'frontends/article';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import { useAppDispatch, wrapper } from 'store';
import { publishedArticleApi, useIncrementViewCountMutation } from 'store/apis';
import { setArticleAuthor } from 'store/states/readArticle';
import { IArticle, IResponseError } from 'types';
import { get } from 'utils';

interface IArticlePageProps {
  article?: IArticle | null;
  error?: IResponseError;
}

const ArticlePage: NextPage<IArticlePageProps> = ({ article, error }: IArticlePageProps) => {
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

  return <Article {...article} />;
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = wrapper.getServerSideProps(
  (store) => async (context) => {
    const articleId = get<number>(context, 'query.id');
    const { data: article, error = {} } = await store.dispatch(
      publishedArticleApi.endpoints.getById.initiate(articleId),
    );
    return {
      props: {
        article: article || null,
        error: error as IResponseError,
      },
    };
  },
);

export default ArticlePage;
