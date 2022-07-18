import { OutputData } from '@editorjs/editorjs';
import { Article } from 'frontends/article';
import { articleData } from 'frontends/EditorJs/sample-article';
import { NextPage } from 'next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface IArticlePageProps {
  articleData: OutputData;
}

const ArticlePage: NextPage<IArticlePageProps> = ({ articleData }: IArticlePageProps) => {
  return <Article articleData={articleData} />;
};

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const articleId = context.query.id; // Do something with this
  return {
    props: {
      articleData: articleData,
    },
  };
};

export default ArticlePage;
