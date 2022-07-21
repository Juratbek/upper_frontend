import { Article } from 'frontends/article';
import { articleData } from 'frontends/EditorJs/sample-article';
import { NextPage } from 'next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { IArticle } from 'types';
import { toDateString } from 'utils';

interface IArticlePageProps {
  article: IArticle;
}

const ArticlePage: NextPage<IArticlePageProps> = ({ article }: IArticlePageProps) => {
  return <Article {...article} />;
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const articleId = context.query.id; // Do something with this
  const article: IArticle = {
    content: articleData,
    id: +articleId!,
    viewCount: 3000,
    labels: [{ id: 1, name: 'JavaScript' }],
    publishedDate: toDateString(new Date()),
    updatedDate: toDateString(new Date()),
    title: 'Article Title',
  };
  return {
    props: {
      article,
    },
  };
};

export default ArticlePage;
